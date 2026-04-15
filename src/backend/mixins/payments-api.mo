import PaymentsLib "../lib/payments";
import AuthLib "../lib/auth";
import NotifLib "../lib/notifications";
import OrderTypes "../types/orders";
import AuthTypes "../types/auth";
import CommonTypes "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";

mixin (
  payments : List.List<CommonTypes.PaymentRecord>,
  orders : List.List<OrderTypes.Order>,
  notifications : List.List<CommonTypes.NotificationRecord>,
  sessions : Map.Map<Text, AuthTypes.Session>,
  adminSessions : Map.Map<Text, Bool>,
  users : List.List<AuthTypes.User>,
  nextPaymentIdCounter : List.List<Nat>,
  nextNotifIdCounter : List.List<Nat>,
) {

  // IC management canister for HTTP outcalls
  type HttpHeader = { name : Text; value : Text };
  type HttpResponse = { status : Nat; headers : [HttpHeader]; body : Blob };
  type HttpRequest = {
    url : Text;
    max_response_bytes : ?Nat64;
    headers : [HttpHeader];
    body : ?Blob;
    method : { #get; #post; #head };
    transform : ?{
      function : shared query ({ response : HttpResponse; context : Blob }) -> async HttpResponse;
      context : Blob;
    };
  };

  let management : actor {
    http_request : HttpRequest -> async HttpResponse;
  } = actor "aaaaa-aa";

  func buildCodRef(paymentId : Nat, orderId : Nat, timestamp : Int) : Text {
    "COD-" # paymentId.toText() # "-" # orderId.toText() # "-" # timestamp.toText()
  };

  func extractTransactionId(body : Blob) : Text {
    switch (body.decodeUtf8()) {
      case (?t) {
        let arr = t.toArray();
        let len = if (arr.size() > 40) { 40 } else { arr.size() };
        var i = 0;
        var result = "";
        label readLoop while (i < len) {
          result := result # Text.fromChar(arr[i]);
          i += 1;
        };
        "GW-" # result
      };
      case null { "GW-UNKNOWN" };
    }
  };

  func pushNotif(
    userId : Nat,
    notifType : CommonTypes.NotificationType,
    orderId : ?Nat,
    message : Text,
    messageAr : Text,
  ) {
    let notifId = switch (nextNotifIdCounter.first()) {
      case (?id) { id };
      case null { 1 };
    };
    let notif = NotifLib.create(notifId, userId, notifType, orderId, message, messageAr, Time.now());
    notifications.add(notif);
    nextNotifIdCounter.mapInPlace(func(_ : Nat) : Nat { notifId + 1 });
  };

  func linkPaymentToOrder(orderId : Nat, paymentId : Nat, newStatus : CommonTypes.PaymentStatus) {
    let found = orders.find(func(o : OrderTypes.Order) : Bool { o.id == orderId });
    switch (found) {
      case null {};
      case (?order) {
        order.paymentId := ?paymentId;
        order.paymentStatus := newStatus;
        order.updatedAt := Time.now();
      };
    };
  };

  func buildPaymentBody(amount : Float, orderId : Nat, methodName : Text, phone : ?Text) : Blob {
    let phoneStr = switch (phone) { case (?p) { p }; case null { "" } };
    let bodyText = "{"
      # "\"amount\":" # amount.toText() # ","
      # "\"phone\":\"" # phoneStr # "\","
      # "\"method\":\"" # methodName # "\","
      # "\"orderId\":" # orderId.toText()
      # "}";
    bodyText.encodeUtf8()
  };

  func callGateway(body : Blob) : async { status : Nat; responseBody : Blob } {
    let resp = await management.http_request({
      url = "https://httpbin.org/post";
      max_response_bytes = ?4096;
      method = #post;
      headers = [
        { name = "Content-Type"; value = "application/json" },
        { name = "Accept"; value = "application/json" },
      ];
      body = ?body;
      transform = null;
    });
    { status = resp.status; responseBody = resp.body }
  };

  public shared func initiatePayment(
    token : Text,
    orderId : Nat,
    method : CommonTypes.PaymentMethod,
    phoneNumber : ?Text,
  ) : async { #ok : CommonTypes.PaymentPublic; #err : Text } {
    let userPublic = switch (AuthLib.getSessionUser(users, sessions, token)) {
      case null { return #err("Invalid session") };
      case (?u) { u };
    };

    let order = switch (orders.find(func(o : OrderTypes.Order) : Bool {
      o.id == orderId and o.userId == userPublic.id
    })) {
      case null { return #err("Order not found or not owned by user") };
      case (?o) { o };
    };

    let paymentId = switch (nextPaymentIdCounter.first()) {
      case (?id) { id };
      case null { 1 };
    };
    let now = Time.now();
    let payment = PaymentsLib.create(paymentId, orderId, method, order.estimatedPrice, phoneNumber, now);
    payments.add(payment);
    nextPaymentIdCounter.mapInPlace(func(_ : Nat) : Nat { paymentId + 1 });
    order.paymentId := ?paymentId;
    order.updatedAt := now;

    switch (method) {
      case (#CashOnDelivery) {
        let ref = buildCodRef(paymentId, orderId, now);
        payment.status := #Success;
        payment.transactionId := ?ref;
        linkPaymentToOrder(orderId, paymentId, #Success);
        pushNotif(userPublic.id, #PaymentProcessed, ?orderId,
          "Cash on Delivery confirmed. Reference: " # ref,
          "تم تأكيد الدفع عند الاستلام. المرجع: " # ref);
        #ok(PaymentsLib.toPublic(payment))
      };
      case (#VodafoneCash) {
        payment.status := #Processing;
        linkPaymentToOrder(orderId, paymentId, #Processing);
        let reqBody = buildPaymentBody(order.estimatedPrice, orderId, "VodafoneCash", phoneNumber);
        let result = await callGateway(reqBody);
        if (result.status == 200) {
          let txId = extractTransactionId(result.responseBody);
          payment.status := #Success;
          payment.transactionId := ?txId;
          linkPaymentToOrder(orderId, paymentId, #Success);
          pushNotif(userPublic.id, #PaymentProcessed, ?orderId,
            "Vodafone Cash payment processed. Transaction: " # txId,
            "تم معالجة دفع فودافون كاش. المعاملة: " # txId);
        } else {
          payment.status := #Failed;
          payment.errorMessage := ?("Gateway error: " # result.status.toText());
          linkPaymentToOrder(orderId, paymentId, #Failed);
          pushNotif(userPublic.id, #PaymentFailed, ?orderId,
            "Vodafone Cash payment failed.", "فشل الدفع عبر فودافون كاش.");
        };
        #ok(PaymentsLib.toPublic(payment))
      };
      case (#InstaPay) {
        payment.status := #Processing;
        linkPaymentToOrder(orderId, paymentId, #Processing);
        let reqBody = buildPaymentBody(order.estimatedPrice, orderId, "InstaPay", phoneNumber);
        let result = await callGateway(reqBody);
        if (result.status == 200) {
          let txId = extractTransactionId(result.responseBody);
          payment.status := #Success;
          payment.transactionId := ?txId;
          linkPaymentToOrder(orderId, paymentId, #Success);
          pushNotif(userPublic.id, #PaymentProcessed, ?orderId,
            "InstaPay payment processed. Transaction: " # txId,
            "تم معالجة دفع انستاباي. المعاملة: " # txId);
        } else {
          payment.status := #Failed;
          payment.errorMessage := ?("Gateway error: " # result.status.toText());
          linkPaymentToOrder(orderId, paymentId, #Failed);
          pushNotif(userPublic.id, #PaymentFailed, ?orderId,
            "InstaPay payment failed.", "فشل الدفع عبر انستاباي.");
        };
        #ok(PaymentsLib.toPublic(payment))
      };
      case (#BankVisa) {
        payment.status := #Processing;
        linkPaymentToOrder(orderId, paymentId, #Processing);
        let reqBody = buildPaymentBody(order.estimatedPrice, orderId, "BankVisa", null);
        let result = await callGateway(reqBody);
        if (result.status == 200) {
          let txId = extractTransactionId(result.responseBody);
          payment.status := #Success;
          payment.transactionId := ?txId;
          linkPaymentToOrder(orderId, paymentId, #Success);
          pushNotif(userPublic.id, #PaymentProcessed, ?orderId,
            "Bank Visa payment processed. Transaction: " # txId,
            "تم معالجة دفع فيزا البنك. المعاملة: " # txId);
        } else {
          payment.status := #Failed;
          payment.errorMessage := ?("Gateway error: " # result.status.toText());
          linkPaymentToOrder(orderId, paymentId, #Failed);
          pushNotif(userPublic.id, #PaymentFailed, ?orderId,
            "Bank Visa payment failed.", "فشل الدفع عبر فيزا البنك.");
        };
        #ok(PaymentsLib.toPublic(payment))
      };
    }
  };

  public shared query func getPaymentStatus(
    token : Text,
    paymentId : Nat,
  ) : async ?CommonTypes.PaymentPublic {
    let isAdmin = AuthLib.isAdminSession(adminSessions, token);
    let session = sessions.get(token);
    if (not isAdmin and session == null) { return null };
    switch (PaymentsLib.getById(payments, paymentId)) {
      case null { null };
      case (?p) { ?PaymentsLib.toPublic(p) };
    }
  };

  public shared func updatePaymentStatus(
    paymentId : Nat,
    status : CommonTypes.PaymentStatus,
    transactionId : ?Text,
  ) : async { #ok; #err : Text } {
    let updated = PaymentsLib.updateStatus(payments, paymentId, status, transactionId, null);
    if (updated) {
      switch (PaymentsLib.getById(payments, paymentId)) {
        case null {};
        case (?p) { linkPaymentToOrder(p.orderId, paymentId, status) };
      };
      #ok
    } else {
      #err("Payment not found")
    }
  };

  public shared query func getOrderPayments(
    token : Text,
    orderId : Nat,
  ) : async [CommonTypes.PaymentPublic] {
    let isAdmin = AuthLib.isAdminSession(adminSessions, token);
    let session = sessions.get(token);
    if (not isAdmin and session == null) { return [] };
    PaymentsLib.getByOrder(payments, orderId)
  };
};
