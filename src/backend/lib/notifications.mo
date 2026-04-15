import List "mo:core/List";
import Int "mo:core/Int";
import CommonTypes "../types/common";

module {
  public type NotificationRecord = CommonTypes.NotificationRecord;
  public type NotificationPublic = CommonTypes.NotificationPublic;
  public type NotificationType = CommonTypes.NotificationType;

  /// Convert internal mutable record to shared public type.
  public func toPublic(n : NotificationRecord) : NotificationPublic {
    {
      id = n.id;
      userId = n.userId;
      notifType = n.notifType;
      orderId = n.orderId;
      message = n.message;
      messageAr = n.messageAr;
      isRead = n.isRead;
      timestamp = n.timestamp;
    }
  };

  /// Build a new NotificationRecord value (does not add to list).
  public func create(
    id : Nat,
    userId : Nat,
    notifType : NotificationType,
    orderId : ?Nat,
    message : Text,
    messageAr : Text,
    timestamp : Int,
  ) : NotificationRecord {
    {
      id;
      userId;
      notifType;
      orderId;
      message;
      messageAr;
      var isRead = false;
      timestamp;
    }
  };

  /// Return predefined bilingual message pair for a given NotificationType.
  public func defaultMessages(notifType : NotificationType) : (Text, Text) {
    switch (notifType) {
      case (#OrderCreated)     ("Your order has been created",       "تم إنشاء طلبك");
      case (#OrderAccepted)    ("A courier has accepted your order", "قبل مندوب طلبك");
      case (#OrderInTransit)   ("Your order is in transit",          "طلبك في الطريق");
      case (#CourierArrived)   ("Courier has arrived at pickup",     "المندوب وصل للاستلام");
      case (#OrderDelivered)   ("Order delivered successfully",      "تم توصيل طلبك بنجاح");
      case (#OrderCancelled)   ("Your order was cancelled",          "تم إلغاء طلبك");
      case (#PaymentProcessed) ("Payment processed successfully",    "تمت معالجة الدفع بنجاح");
      case (#PaymentFailed)    ("Payment failed, please retry",      "فشل الدفع، يرجى المحاولة مجدداً");
    }
  };

  /// Return last 20 notifications for a user, sorted by timestamp descending.
  public func getForUser(
    notifications : List.List<NotificationRecord>,
    userId : Nat,
  ) : [NotificationPublic] {
    let userNotifs = notifications.filter(func(n : NotificationRecord) : Bool {
      n.userId == userId
    });
    let sorted = userNotifs.sort(func(a : NotificationRecord, b : NotificationRecord) : { #less; #equal; #greater } {
      Int.compare(b.timestamp, a.timestamp)
    });
    let size = sorted.size();
    let sliced = if (size <= 20) {
      sorted.toArray()
    } else {
      sorted.sliceToArray(0, 20)
    };
    sliced.map<NotificationRecord, NotificationPublic>(func(n) { toPublic(n) })
  };

  /// Count unread notifications for a user.
  public func countUnread(
    notifications : List.List<NotificationRecord>,
    userId : Nat,
  ) : Nat {
    var count : Nat = 0;
    notifications.forEach(func(n : NotificationRecord) {
      if (n.userId == userId and not n.isRead) { count += 1 }
    });
    count
  };

  /// Mark a specific notification as read. Returns true if found, false otherwise.
  public func markRead(
    notifications : List.List<NotificationRecord>,
    userId : Nat,
    notifId : Nat,
  ) : Bool {
    var found = false;
    notifications.mapInPlace(func(n : NotificationRecord) : NotificationRecord {
      if (n.id == notifId and n.userId == userId) {
        found := true;
        n.isRead := true;
        n
      } else { n }
    });
    found
  };

  /// Mark all notifications for a user as read.
  public func markAllRead(
    notifications : List.List<NotificationRecord>,
    userId : Nat,
  ) {
    notifications.mapInPlace(func(n : NotificationRecord) : NotificationRecord {
      if (n.userId == userId) {
        n.isRead := true;
        n
      } else { n }
    })
  };
};
