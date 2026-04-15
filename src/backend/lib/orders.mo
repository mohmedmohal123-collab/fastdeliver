import Types "../types/orders";
import List "mo:core/List";
import Int "mo:core/Int";
import CoreOrder "mo:core/Order";

module {
  public type Order = Types.Order;
  public type OrderPublic = Types.OrderPublic;
  public type CreateOrderRequest = Types.CreateOrderRequest;
  public type OrderSearchFilter = Types.OrderSearchFilter;
  public type OrderStatus = Types.OrderStatus;

  public func toPublic(order : Order) : OrderPublic {
    {
      id = order.id;
      userId = order.userId;
      courierId = order.courierId;
      paymentId = order.paymentId;
      pickupAddress = order.pickupAddress;
      dropoffAddress = order.dropoffAddress;
      itemDescription = order.itemDescription;
      paymentMethod = order.paymentMethod;
      estimatedPrice = order.estimatedPrice;
      status = order.status;
      paymentStatus = order.paymentStatus;
      createdAt = order.createdAt;
      updatedAt = order.updatedAt;
    }
  };

  func sortNewest(arr : [OrderPublic]) : [OrderPublic] {
    arr.sort(func(a : OrderPublic, b : OrderPublic) : CoreOrder.Order {
      Int.compare(b.createdAt, a.createdAt)
    })
  };

  public func createOrder(
    orders : List.List<Order>,
    nextId : Nat,
    userId : Nat,
    req : CreateOrderRequest,
    now : Int,
  ) : OrderPublic {
    let order : Order = {
      id = nextId;
      userId;
      var courierId = null;
      var paymentId = null;
      var pickupAddress = req.pickupAddress;
      var dropoffAddress = req.dropoffAddress;
      var itemDescription = req.itemDescription;
      var paymentMethod = req.paymentMethod;
      var estimatedPrice = req.estimatedPrice;
      var status = #Pending;
      var paymentStatus = #Pending;
      createdAt = now;
      var updatedAt = now;
    };
    orders.add(order);
    toPublic(order)
  };

  public func getOrdersByUser(
    orders : List.List<Order>,
    userId : Nat,
  ) : [OrderPublic] {
    let filtered = orders.filter(func(o : Order) : Bool { o.userId == userId });
    sortNewest(filtered.map<Order, OrderPublic>(func(o : Order) : OrderPublic { toPublic(o) }).toArray())
  };

  public func getOrderById(
    orders : List.List<Order>,
    orderId : Nat,
  ) : ?OrderPublic {
    let found = orders.find(func(o : Order) : Bool { o.id == orderId });
    switch (found) {
      case null { null };
      case (?o) { ?toPublic(o) };
    }
  };

  public func updateOrderStatus(
    orders : List.List<Order>,
    orderId : Nat,
    status : OrderStatus,
    now : Int,
  ) : { #ok : OrderPublic; #err : Text } {
    let found = orders.find(func(o : Order) : Bool { o.id == orderId });
    switch (found) {
      case null { #err("Order not found") };
      case (?order) {
        order.status := status;
        order.updatedAt := now;
        #ok(toPublic(order))
      };
    }
  };

  public func cancelOrder(
    orders : List.List<Order>,
    orderId : Nat,
    userId : Nat,
    isAdmin : Bool,
    now : Int,
  ) : { #ok : OrderPublic; #err : Text } {
    let found = orders.find(func(o : Order) : Bool { o.id == orderId });
    switch (found) {
      case null { #err("Order not found") };
      case (?order) {
        if (not isAdmin and order.userId != userId) {
          return #err("Not authorized")
        };
        if (not isAdmin) {
          switch (order.status) {
            case (#Pending) {};
            case _ { return #err("Only pending orders can be cancelled") };
          }
        };
        order.status := #Cancelled;
        order.updatedAt := now;
        #ok(toPublic(order))
      };
    }
  };

  public func searchOrders(
    orders : List.List<Order>,
    filter : OrderSearchFilter,
  ) : [OrderPublic] {
    let filtered = orders.filter(func(o : Order) : Bool {
      let statusMatch = switch (filter.status) {
        case null { true };
        case (?s) { o.status == s };
      };
      let fromMatch = switch (filter.fromDate) {
        case null { true };
        case (?d) { o.createdAt >= d };
      };
      let toMatch = switch (filter.toDate) {
        case null { true };
        case (?d) { o.createdAt <= d };
      };
      statusMatch and fromMatch and toMatch
    });
    sortNewest(filtered.map<Order, OrderPublic>(func(o : Order) : OrderPublic { toPublic(o) }).toArray())
  };

  public func getAllOrders(orders : List.List<Order>) : [OrderPublic] {
    sortNewest(orders.map<Order, OrderPublic>(func(o : Order) : OrderPublic { toPublic(o) }).toArray())
  };
};
