import Common "common";

module {
  public type OrderStatus = Common.OrderStatus;
  public type PaymentMethod = Common.PaymentMethod;

  public type StatusCount = {
    status : OrderStatus;
    count : Nat;
  };

  public type PaymentMethodCount = {
    paymentMethod : PaymentMethod;
    count : Nat;
  };

  public type DailyOrderCount = {
    date : Text;
    count : Nat;
  };

  public type DashboardStats = {
    totalOrders : Nat;
    totalUsers : Nat;
    ordersByStatus : [StatusCount];
    ordersByPaymentMethod : [PaymentMethodCount];
    ordersLast7Days : [DailyOrderCount];
  };
};
