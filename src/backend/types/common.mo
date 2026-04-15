module {
  public type UserId = Nat;
  public type OrderId = Nat;
  public type Timestamp = Int;

  public type PaymentMethod = {
    #VodafoneCash;
    #CashOnDelivery;
    #InstaPay;
    #BankVisa;
  };

  public type OrderStatus = {
    #Pending;
    #Accepted;
    #PickedUp;
    #InTransit;
    #Delivered;
    #Cancelled;
  };

  public type CourierStatus = {
    #Available;
    #Busy;
    #Offline;
  };

  public type NotificationType = {
    #OrderCreated;
    #OrderAccepted;
    #OrderInTransit;
    #CourierArrived;
    #OrderDelivered;
    #OrderCancelled;
    #PaymentProcessed;
    #PaymentFailed;
  };

  public type NotificationRecord = {
    id : Nat;
    userId : Nat;
    notifType : NotificationType;
    orderId : ?Nat;
    message : Text;
    messageAr : Text;
    var isRead : Bool;
    timestamp : Int;
  };

  public type NotificationPublic = {
    id : Nat;
    userId : Nat;
    notifType : NotificationType;
    orderId : ?Nat;
    message : Text;
    messageAr : Text;
    isRead : Bool;
    timestamp : Int;
  };

  public type CourierLocation = {
    courierId : Nat;
    orderId : Nat;
    var lat : Float;
    var lng : Float;
    var timestamp : Int;
  };

  public type PaymentStatus = {
    #Pending;
    #Processing;
    #Success;
    #Failed;
    #Refunded;
  };

  public type PaymentRecord = {
    id : Nat;
    orderId : Nat;
    method : PaymentMethod;
    var status : PaymentStatus;
    amount : Float;
    var transactionId : ?Text;
    phoneNumber : ?Text;
    timestamp : Int;
    var errorMessage : ?Text;
  };

  public type PaymentPublic = {
    id : Nat;
    orderId : Nat;
    method : PaymentMethod;
    status : PaymentStatus;
    amount : Float;
    transactionId : ?Text;
    phoneNumber : ?Text;
    timestamp : Int;
    errorMessage : ?Text;
  };
};
