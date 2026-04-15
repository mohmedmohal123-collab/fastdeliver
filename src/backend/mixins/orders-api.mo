import OrdersLib "../lib/orders";
import AuthLib "../lib/auth";
import OrderTypes "../types/orders";
import AuthTypes "../types/auth";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  orders : List.List<OrderTypes.Order>,
  users : List.List<AuthTypes.User>,
  sessions : Map.Map<Text, AuthTypes.Session>,
  adminSessions : Map.Map<Text, Bool>,
  nextOrderIdCounter : List.List<Nat>,
) {

  public func createOrder(token : Text, req : OrderTypes.CreateOrderRequest) : async { #ok : OrderTypes.OrderPublic; #err : Text } {
    switch (AuthLib.getSessionUser(users, sessions, token)) {
      case null { #err("Invalid session") };
      case (?userPublic) {
        let nextId = switch (nextOrderIdCounter.first()) {
          case (?id) { id };
          case null { 1 };
        };
        let now = Time.now();
        let orderPublic = OrdersLib.createOrder(orders, nextId, userPublic.id, req, now);
        nextOrderIdCounter.mapInPlace(func(_ : Nat) : Nat { nextId + 1 });
        #ok(orderPublic)
      };
    }
  };

  public query func getMyOrders(token : Text) : async { #ok : [OrderTypes.OrderPublic]; #err : Text } {
    switch (AuthLib.getSessionUser(users, sessions, token)) {
      case null { #err("Invalid session") };
      case (?userPublic) {
        #ok(OrdersLib.getOrdersByUser(orders, userPublic.id))
      };
    }
  };

  public query func getOrder(token : Text, orderId : Nat) : async ?OrderTypes.OrderPublic {
    let isAdminReq = AuthLib.isAdminSession(adminSessions, token);
    let userId = switch (AuthLib.getSessionUser(users, sessions, token)) {
      case (?u) { ?u.id };
      case null { null };
    };
    switch (OrdersLib.getOrderById(orders, orderId)) {
      case null { null };
      case (?order) {
        if (isAdminReq) { ?order }
        else {
          switch (userId) {
            case (?uid) {
              if (order.userId == uid) { ?order } else { null }
            };
            case null { null };
          }
        }
      };
    }
  };

  public func updateOrderStatus(token : Text, orderId : Nat, status : OrderTypes.OrderStatus) : async { #ok : OrderTypes.OrderPublic; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    let now = Time.now();
    OrdersLib.updateOrderStatus(orders, orderId, status, now)
  };

  public func cancelOrder(token : Text, orderId : Nat) : async { #ok : OrderTypes.OrderPublic; #err : Text } {
    let isAdminReq = AuthLib.isAdminSession(adminSessions, token);
    let userId = switch (AuthLib.getSessionUser(users, sessions, token)) {
      case (?u) { u.id };
      case null {
        if (not isAdminReq) { return #err("Invalid session") };
        0
      };
    };
    let now = Time.now();
    OrdersLib.cancelOrder(orders, orderId, userId, isAdminReq, now)
  };

  public query func searchOrders(token : Text, filter : OrderTypes.OrderSearchFilter) : async { #ok : [OrderTypes.OrderPublic]; #err : Text } {
    let isAdminReq = AuthLib.isAdminSession(adminSessions, token);
    let userId = switch (AuthLib.getSessionUser(users, sessions, token)) {
      case (?u) { ?u.id };
      case null { null };
    };
    if (not isAdminReq and userId == null) {
      return #err("Invalid session")
    };
    let allResults = OrdersLib.searchOrders(orders, filter);
    // Non-admin: filter to own orders only
    if (isAdminReq) {
      #ok(allResults)
    } else {
      switch (userId) {
        case (?uid) {
          #ok(allResults.filter(func(o : OrderTypes.OrderPublic) : Bool { o.userId == uid }))
        };
        case null { #ok(allResults) };
      }
    }
  };

  public query func getAllOrdersAdmin(token : Text) : async { #ok : [OrderTypes.OrderPublic]; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    #ok(OrdersLib.getAllOrders(orders))
  };
};
