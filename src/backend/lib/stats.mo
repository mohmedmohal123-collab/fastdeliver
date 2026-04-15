import StatsTypes "../types/stats";
import OrderTypes "../types/orders";
import AuthTypes "../types/auth";
import List "mo:core/List";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Array "mo:core/Array";

module {
  public type DashboardStats = StatsTypes.DashboardStats;
  public type StatusCount = StatsTypes.StatusCount;
  public type PaymentMethodCount = StatsTypes.PaymentMethodCount;
  public type DailyOrderCount = StatsTypes.DailyOrderCount;

  let nanosPerDay : Int = 86_400_000_000_000;

  func timestampToDateText(ts : Int) : Text {
    let totalDays = Int.abs(ts / nanosPerDay);
    let y400 = 146097;
    var n = totalDays;
    let z = n / y400;
    n := n - z * y400;
    let y100 = 36524;
    let a = Nat.min(n / y100, 3);
    n := n - a * y100;
    let y4 = 1461;
    let b = n / y4;
    n := n - b * y4;
    let y1 = 365;
    let c = Nat.min(n / y1, 3);
    n := n - c * y1;
    let year = 400 * z + 100 * a + 4 * b + c + 1970;
    let leapYear = (year % 4 == 0 and year % 100 != 0) or year % 400 == 0;
    let monthDays : [Nat] = if (leapYear) {
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    } else {
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    };
    var remaining = n;
    var month = 1;
    for (md in monthDays.vals()) {
      if (remaining >= md and month < 12) {
        remaining -= md;
        month += 1;
      }
    };
    let day = remaining + 1;
    let mm = if (month < 10) { "0" # month.toText() } else { month.toText() };
    let dd = if (day < 10) { "0" # day.toText() } else { day.toText() };
    year.toText() # "-" # mm # "-" # dd
  };

  public func getTotalOrders(orders : List.List<OrderTypes.Order>) : Nat {
    orders.size()
  };

  public func getTotalUsers(users : List.List<AuthTypes.User>) : Nat {
    users.size()
  };

  public func getOrdersByStatus(
    orders : List.List<OrderTypes.Order>
  ) : [StatusCount] {
    var pending : Nat = 0;
    var accepted : Nat = 0;
    var inTransit : Nat = 0;
    var delivered : Nat = 0;
    var cancelled : Nat = 0;
    orders.forEach(func(o : OrderTypes.Order) {
      switch (o.status) {
        case (#Pending)   { pending   += 1 };
        case (#Accepted)  { accepted  += 1 };
        case (#PickedUp)  { inTransit += 1 };
        case (#InTransit) { inTransit += 1 };
        case (#Delivered) { delivered += 1 };
        case (#Cancelled) { cancelled += 1 };
      }
    });
    [
      { status = #Pending;   count = pending   },
      { status = #Accepted;  count = accepted  },
      { status = #InTransit; count = inTransit },
      { status = #Delivered; count = delivered },
      { status = #Cancelled; count = cancelled },
    ]
  };

  public func getOrdersByPaymentMethod(
    orders : List.List<OrderTypes.Order>
  ) : [PaymentMethodCount] {
    var vodafone : Nat = 0;
    var cash : Nat = 0;
    var instaPay : Nat = 0;
    var visa : Nat = 0;
    orders.forEach(func(o : OrderTypes.Order) {
      switch (o.paymentMethod) {
        case (#VodafoneCash)   { vodafone += 1 };
        case (#CashOnDelivery) { cash     += 1 };
        case (#InstaPay)       { instaPay += 1 };
        case (#BankVisa)       { visa     += 1 };
      }
    });
    [
      { paymentMethod = #VodafoneCash;   count = vodafone },
      { paymentMethod = #CashOnDelivery; count = cash     },
      { paymentMethod = #InstaPay;       count = instaPay },
      { paymentMethod = #BankVisa;       count = visa     },
    ]
  };

  public func getOrdersLast7Days(
    orders : List.List<OrderTypes.Order>,
    now : Int,
  ) : [DailyOrderCount] {
    // Build date labels for the 7-day window
    let dates = Array.tabulate(7, func(i : Nat) : Text {
      let daysBack = (6 - i : Nat).toInt();
      timestampToDateText(now - daysBack * nanosPerDay)
    });
    // Count orders per date bucket using a mutable array
    let counts = Array.tabulate(7, func(_ : Nat) : Nat { 0 }).toVarArray<Nat>();
    orders.forEach(func(o : OrderTypes.Order) {
      let orderDate = timestampToDateText(o.createdAt);
      var i = 0;
      while (i < 7) {
        if (dates[i] == orderDate) {
          counts[i] += 1;
        };
        i += 1;
      }
    });
    Array.tabulate<DailyOrderCount>(7, func(i : Nat) : DailyOrderCount {
      { date = dates[i]; count = counts[i] }
    })
  };

  public func getDashboardStats(
    orders : List.List<OrderTypes.Order>,
    users : List.List<AuthTypes.User>,
    now : Int,
  ) : DashboardStats {
    {
      totalOrders           = getTotalOrders(orders);
      totalUsers            = getTotalUsers(users);
      ordersByStatus        = getOrdersByStatus(orders);
      ordersByPaymentMethod = getOrdersByPaymentMethod(orders);
      ordersLast7Days       = getOrdersLast7Days(orders, now);
    }
  };
};
