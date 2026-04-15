import AuthTypes "types/auth";
import OrderTypes "types/orders";
import CourierTypes "types/courier";
import CommonTypes "types/common";
import CatalogTypes "types/catalog-notifications";
import List "mo:core/List";
import Map "mo:core/Map";

import AuthMixin "mixins/auth-api";
import OrdersMixin "mixins/orders-api";
import UsersMixin "mixins/users-api";
import StatsMixin "mixins/stats-api";
import NotificationsMixin "mixins/notifications-api";
import CourierMixin "mixins/courier-api";
import PaymentsMixin "mixins/payments-api";
import CatalogMixin "mixins/catalog-notifications-api";
import CatalogLib "lib/catalog-notifications";

actor {
  let users = List.empty<AuthTypes.User>();
  let sessions = Map.empty<Text, AuthTypes.Session>();
  let adminSessions = Map.empty<Text, Bool>();
  // Single-element counter lists used as mutable Nat references
  let nextUserIdCounter : List.List<Nat> = List.singleton<Nat>(1);
  let nextOrderIdCounter : List.List<Nat> = List.singleton<Nat>(1);
  let nextNotifIdCounter : List.List<Nat> = List.singleton<Nat>(1);
  let nextPaymentIdCounter : List.List<Nat> = List.singleton<Nat>(1);

  let orders = List.empty<OrderTypes.Order>();
  let payments = List.empty<CommonTypes.PaymentRecord>();
  let notifications = List.empty<CommonTypes.NotificationRecord>();

  // Courier state
  let couriers = List.empty<CourierTypes.Courier>();
  let courierSessions = Map.empty<Text, Nat>();
  let courierLocations = Map.empty<Nat, CommonTypes.CourierLocation>();
  let nextCourierIdCounter : List.List<Nat> = List.singleton<Nat>(1);

  // Catalog state
  let products = List.empty<CatalogTypes.Product>();
  let companies = List.empty<CatalogTypes.Company>();
  let catalogOffers = List.empty<CatalogTypes.Offer>();
  let paymentSettings = List.empty<CatalogTypes.PaymentMethodSetting>();
  let nextProductIdCounter : List.List<Nat> = List.singleton<Nat>(1);
  let nextCompanyIdCounter : List.List<Nat> = List.singleton<Nat>(1);
  let nextOfferIdCounter : List.List<Nat> = List.singleton<Nat>(1);

  // Initialize payment method settings with all 4 methods enabled
  CatalogLib.initPaymentSettings(paymentSettings);

  include AuthMixin(users, sessions, adminSessions, nextUserIdCounter);
  include OrdersMixin(orders, users, sessions, adminSessions, nextOrderIdCounter);
  include UsersMixin(users, adminSessions);
  include StatsMixin(orders, users, adminSessions);
  include NotificationsMixin(notifications, sessions, users, nextNotifIdCounter);
  include CourierMixin(couriers, courierSessions, orders, users, sessions, courierLocations, nextCourierIdCounter);
  include PaymentsMixin(payments, orders, notifications, sessions, adminSessions, users, nextPaymentIdCounter, nextNotifIdCounter);
  include CatalogMixin(products, companies, catalogOffers, paymentSettings, notifications, users, orders, adminSessions, nextProductIdCounter, nextCompanyIdCounter, nextOfferIdCounter, nextNotifIdCounter);
};
