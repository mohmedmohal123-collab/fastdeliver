import Common "common";

module {
  public type UserId = Common.UserId;
  public type OrderId = Common.OrderId;
  public type Timestamp = Common.Timestamp;
  public type PaymentMethod = Common.PaymentMethod;
  public type OrderStatus = Common.OrderStatus;
  public type PaymentStatus = Common.PaymentStatus;

  public type Order = {
    id : OrderId;
    userId : UserId;
    var courierId : ?Nat;
    var paymentId : ?Nat;
    var pickupAddress : Text;
    var dropoffAddress : Text;
    var itemDescription : Text;
    var paymentMethod : PaymentMethod;
    var estimatedPrice : Float;
    var status : OrderStatus;
    var paymentStatus : PaymentStatus;
    createdAt : Timestamp;
    var updatedAt : Timestamp;
  };

  public type OrderPublic = {
    id : OrderId;
    userId : UserId;
    courierId : ?Nat;
    paymentId : ?Nat;
    pickupAddress : Text;
    dropoffAddress : Text;
    itemDescription : Text;
    paymentMethod : PaymentMethod;
    estimatedPrice : Float;
    status : OrderStatus;
    paymentStatus : PaymentStatus;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type CreateOrderRequest = {
    pickupAddress : Text;
    dropoffAddress : Text;
    itemDescription : Text;
    paymentMethod : PaymentMethod;
    estimatedPrice : Float;
  };

  public type OrderSearchFilter = {
    status : ?OrderStatus;
    fromDate : ?Timestamp;
    toDate : ?Timestamp;
  };
};
