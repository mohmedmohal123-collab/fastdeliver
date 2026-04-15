import OrderTypes "orders";

module {
  public type UserId = OrderTypes.UserId;
  public type OrderId = OrderTypes.OrderId;
  public type Timestamp = OrderTypes.Timestamp;
  public type Order = OrderTypes.OrderPublic;

  public type Courier = {
    id : Nat;
    userId : UserId;
    name : Text;
    phone : Text;
    vehicleType : Text;
    isActive : Bool;
    var isAvailable : Bool;
    var rating : Float;
    var totalDeliveries : Nat;
    joinedAt : Timestamp;
  };

  public type CourierPublic = {
    id : Nat;
    userId : UserId;
    name : Text;
    phone : Text;
    vehicleType : Text;
    isActive : Bool;
    isAvailable : Bool;
    rating : Float;
    totalDeliveries : Nat;
    joinedAt : Timestamp;
  };

  public type CourierStats = {
    totalDeliveries : Nat;
    completedThisMonth : Nat;
    averageRating : Float;
    totalEarnings : Float;
    earningsThisMonth : Float;
  };

  public type AssignOrderResult = {
    #ok : Order;
    #notFound;
    #unauthorized;
    #alreadyAssigned;
    #err : Text;
  };

  public type CourierLoginResult = {
    #ok : { courier : CourierPublic; token : Text };
    #wrongCredentials;
    #inactive;
  };
};
