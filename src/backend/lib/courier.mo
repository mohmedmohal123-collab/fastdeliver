import List "mo:core/List";
import Nat "mo:core/Nat";
import Char "mo:core/Char";
import Types "../types/courier";
import OrderTypes "../types/orders";
import CommonTypes "../types/common";

module {
  public type Courier = Types.Courier;
  public type CourierPublic = Types.CourierPublic;
  public type CourierStats = Types.CourierStats;
  public type AssignOrderResult = Types.AssignOrderResult;
  public type CourierLoginResult = Types.CourierLoginResult;
  public type Order = OrderTypes.Order;
  public type OrderPublic = OrderTypes.OrderPublic;
  public type CourierLocation = CommonTypes.CourierLocation;

  public func toPublic(self : Courier) : CourierPublic {
    {
      id = self.id;
      userId = self.userId;
      name = self.name;
      phone = self.phone;
      vehicleType = self.vehicleType;
      isActive = self.isActive;
      isAvailable = self.isAvailable;
      rating = self.rating;
      totalDeliveries = self.totalDeliveries;
      joinedAt = self.joinedAt;
    }
  };

  public func new(
    id : Nat,
    userId : Nat,
    name : Text,
    phone : Text,
    vehicleType : Text,
    joinedAt : Int,
  ) : Courier {
    {
      id;
      userId;
      name;
      phone;
      vehicleType;
      isActive = true;
      var isAvailable = true;
      var rating = 5.0;
      var totalDeliveries = 0;
      joinedAt;
    }
  };

  public func getPendingOrders(
    orders : List.List<Order>,
    _courierId : Nat,
  ) : [OrderPublic] {
    // Return orders that are Pending and have no assigned courier
    let filtered = orders.filter(func(o : Order) : Bool {
      o.status == #Pending and o.courierId == null
    });
    filtered.map<Order, OrderPublic>(func(o : Order) : OrderPublic {
      {
        id = o.id;
        userId = o.userId;
        courierId = o.courierId;
        paymentId = o.paymentId;
        pickupAddress = o.pickupAddress;
        dropoffAddress = o.dropoffAddress;
        itemDescription = o.itemDescription;
        paymentMethod = o.paymentMethod;
        estimatedPrice = o.estimatedPrice;
        status = o.status;
        paymentStatus = o.paymentStatus;
        createdAt = o.createdAt;
        updatedAt = o.updatedAt;
      }
    }).toArray()
  };

  public func getCourierOrders(
    orders : List.List<Order>,
    courierId : Nat,
  ) : [OrderPublic] {
    let filtered = orders.filter(func(o : Order) : Bool {
      o.courierId == ?courierId
    });
    filtered.map<Order, OrderPublic>(func(o : Order) : OrderPublic {
      {
        id = o.id;
        userId = o.userId;
        courierId = o.courierId;
        paymentId = o.paymentId;
        pickupAddress = o.pickupAddress;
        dropoffAddress = o.dropoffAddress;
        itemDescription = o.itemDescription;
        paymentMethod = o.paymentMethod;
        estimatedPrice = o.estimatedPrice;
        status = o.status;
        paymentStatus = o.paymentStatus;
        createdAt = o.createdAt;
        updatedAt = o.updatedAt;
      }
    }).toArray()
  };

  public func computeStats(
    orders : List.List<Order>,
    courierId : Nat,
    now : Int,
  ) : CourierStats {
    // One month = 30 days in nanoseconds
    let oneMonthNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let monthStart = now - oneMonthNs;

    let myOrders = orders.filter(func(o : Order) : Bool {
      o.courierId == ?courierId
    });

    let delivered = myOrders.filter(func(o : Order) : Bool {
      o.status == #Delivered
    });

    let totalDeliveries = delivered.size();

    let thisMonth = delivered.filter(func(o : Order) : Bool {
      o.createdAt >= monthStart
    });
    let completedThisMonth = thisMonth.size();

    // Estimate earnings: 25 EGP per delivery base
    let earningsPerDelivery : Float = 25.0;
    let totalEarnings : Float = totalDeliveries.toFloat() * earningsPerDelivery;
    let earningsThisMonth : Float = completedThisMonth.toFloat() * earningsPerDelivery;

    {
      totalDeliveries;
      completedThisMonth;
      averageRating = 5.0;
      totalEarnings;
      earningsThisMonth;
    }
  };

  // Generate a courier session token
  public func generateCourierToken(courierId : Nat, now : Int) : Text {
    let base = "cour" # courierId.toText() # now.toText();
    let chars = base.toArray();
    var h : Nat = 7777;
    for (c in chars.vals()) {
      let code = c.toNat32().toNat();
      h := (h * 31 + code) % 4294967296;
    };
    "cou-" # courierId.toText() # "-" # h.toText()
  };
};
