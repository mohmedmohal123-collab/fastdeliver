import StatsLib "../lib/stats";
import AuthLib "../lib/auth";
import StatsTypes "../types/stats";
import OrderTypes "../types/orders";
import AuthTypes "../types/auth";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  orders : List.List<OrderTypes.Order>,
  users : List.List<AuthTypes.User>,
  adminSessions : Map.Map<Text, Bool>,
) {

  public query func getDashboardStats(token : Text) : async { #ok : StatsTypes.DashboardStats; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    let now = Time.now();
    #ok(StatsLib.getDashboardStats(orders, users, now))
  };

  public query func getTotalOrdersAdmin(token : Text) : async { #ok : Nat; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    #ok(StatsLib.getTotalOrders(orders))
  };

  public query func getTotalUsersAdmin(token : Text) : async { #ok : Nat; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    #ok(StatsLib.getTotalUsers(users))
  };

  public query func getOrdersByStatusAdmin(token : Text) : async { #ok : [StatsTypes.StatusCount]; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    #ok(StatsLib.getOrdersByStatus(orders))
  };

  public query func getOrdersByPaymentMethodAdmin(token : Text) : async { #ok : [StatsTypes.PaymentMethodCount]; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    #ok(StatsLib.getOrdersByPaymentMethod(orders))
  };

  public query func getOrdersLast7DaysAdmin(token : Text) : async { #ok : [StatsTypes.DailyOrderCount]; #err : Text } {
    if (not AuthLib.isAdminSession(adminSessions, token)) {
      return #err("Admin access required")
    };
    let now = Time.now();
    #ok(StatsLib.getOrdersLast7Days(orders, now))
  };
};
