import List "mo:core/List";
import CommonTypes "../types/common";

module {
  public type PaymentRecord = CommonTypes.PaymentRecord;
  public type PaymentPublic = CommonTypes.PaymentPublic;
  public type PaymentMethod = CommonTypes.PaymentMethod;
  public type PaymentStatus = CommonTypes.PaymentStatus;

  public func toPublic(p : PaymentRecord) : PaymentPublic {
    {
      id = p.id;
      orderId = p.orderId;
      method = p.method;
      status = p.status;
      amount = p.amount;
      transactionId = p.transactionId;
      phoneNumber = p.phoneNumber;
      timestamp = p.timestamp;
      errorMessage = p.errorMessage;
    }
  };

  public func create(
    id : Nat,
    orderId : Nat,
    method : PaymentMethod,
    amount : Float,
    phoneNumber : ?Text,
    timestamp : Int,
  ) : PaymentRecord {
    {
      id;
      orderId;
      method;
      var status = #Pending;
      amount;
      var transactionId = null;
      phoneNumber;
      timestamp;
      var errorMessage = null;
    }
  };

  public func getByOrder(
    payments : List.List<PaymentRecord>,
    orderId : Nat,
  ) : [PaymentPublic] {
    payments
      .filter(func(p : PaymentRecord) : Bool { p.orderId == orderId })
      .map<PaymentRecord, PaymentPublic>(func(p) { toPublic(p) })
      .toArray()
  };

  public func getById(
    payments : List.List<PaymentRecord>,
    paymentId : Nat,
  ) : ?PaymentRecord {
    payments.find(func(p : PaymentRecord) : Bool { p.id == paymentId })
  };

  public func updateStatus(
    payments : List.List<PaymentRecord>,
    paymentId : Nat,
    status : PaymentStatus,
    transactionId : ?Text,
    errorMessage : ?Text,
  ) : Bool {
    let found = payments.find(func(p : PaymentRecord) : Bool { p.id == paymentId });
    switch (found) {
      case null { false };
      case (?p) {
        p.status := status;
        p.transactionId := transactionId;
        p.errorMessage := errorMessage;
        true
      };
    }
  };
};
