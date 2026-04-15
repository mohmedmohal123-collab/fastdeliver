var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { V as Variant, K as Record, O as Opt, M as Vec, P as Service, Q as Func, T as Nat, U as Text, W as Float64, X as Bool, Y as Null, Z as Int } from "./index-DzhgL1zh.js";
const OrderId = Nat;
const OrderStatus$1 = Variant({
  "InTransit": Null,
  "Delivered": Null,
  "PickedUp": Null,
  "Accepted": Null,
  "Cancelled": Null,
  "Pending": Null
});
const PaymentStatus$1 = Variant({
  "Failed": Null,
  "Refunded": Null,
  "Success": Null,
  "Processing": Null,
  "Pending": Null
});
const PaymentMethod$1 = Variant({
  "VodafoneCash": Null,
  "InstaPay": Null,
  "BankVisa": Null,
  "CashOnDelivery": Null
});
const UserId = Nat;
const Timestamp = Int;
const Order = Record({
  "id": OrderId,
  "status": OrderStatus$1,
  "paymentStatus": PaymentStatus$1,
  "itemDescription": Text,
  "paymentMethod": PaymentMethod$1,
  "estimatedPrice": Float64,
  "userId": UserId,
  "createdAt": Timestamp,
  "updatedAt": Timestamp,
  "pickupAddress": Text,
  "dropoffAddress": Text,
  "paymentId": Opt(Nat),
  "courierId": Opt(Nat)
});
const AssignOrderResult = Variant({
  "ok": Order,
  "err": Text,
  "alreadyAssigned": Null,
  "notFound": Null,
  "unauthorized": Null
});
const CompanyInput = Record({
  "nameAr": Text,
  "descriptionAr": Text,
  "name": Text,
  "description": Text,
  "isActive": Bool,
  "logoUrl": Text
});
const CompanyId = Nat;
const CompanyPublic = Record({
  "id": CompanyId,
  "nameAr": Text,
  "descriptionAr": Text,
  "name": Text,
  "createdAt": Timestamp,
  "description": Text,
  "isActive": Bool,
  "logoUrl": Text
});
const OfferInput = Record({
  "title": Text,
  "descriptionAr": Text,
  "description": Text,
  "isActive": Bool,
  "discount": Float64,
  "titleAr": Text,
  "validUntil": Timestamp
});
const OfferId = Nat;
const OfferPublic = Record({
  "id": OfferId,
  "title": Text,
  "descriptionAr": Text,
  "createdAt": Timestamp,
  "description": Text,
  "isActive": Bool,
  "discount": Float64,
  "titleAr": Text,
  "validUntil": Timestamp
});
const ProductInput = Record({
  "nameAr": Text,
  "descriptionAr": Text,
  "name": Text,
  "description": Text,
  "isActive": Bool,
  "imageUrl": Text,
  "category": Text,
  "price": Float64,
  "companyId": CompanyId
});
const ProductId = Nat;
const ProductPublic = Record({
  "id": ProductId,
  "nameAr": Text,
  "descriptionAr": Text,
  "name": Text,
  "createdAt": Timestamp,
  "description": Text,
  "isActive": Bool,
  "imageUrl": Text,
  "category": Text,
  "price": Float64,
  "companyId": CompanyId
});
const BroadcastSegment = Variant({
  "All": Null,
  "PendingOrders": Null,
  "ActiveUsers": Null
});
const OrderPublic = Record({
  "id": OrderId,
  "status": OrderStatus$1,
  "paymentStatus": PaymentStatus$1,
  "itemDescription": Text,
  "paymentMethod": PaymentMethod$1,
  "estimatedPrice": Float64,
  "userId": UserId,
  "createdAt": Timestamp,
  "updatedAt": Timestamp,
  "pickupAddress": Text,
  "dropoffAddress": Text,
  "paymentId": Opt(Nat),
  "courierId": Opt(Nat)
});
const CourierPublic = Record({
  "id": Nat,
  "vehicleType": Text,
  "userId": UserId,
  "name": Text,
  "joinedAt": Timestamp,
  "isAvailable": Bool,
  "isActive": Bool,
  "rating": Float64,
  "phone": Text,
  "totalDeliveries": Nat
});
const CourierLoginResult = Variant({
  "ok": Record({ "token": Text, "courier": CourierPublic }),
  "wrongCredentials": Null,
  "inactive": Null
});
const NotificationType$1 = Variant({
  "OrderCancelled": Null,
  "CourierArrived": Null,
  "PaymentFailed": Null,
  "PaymentProcessed": Null,
  "OrderCreated": Null,
  "OrderInTransit": Null,
  "OrderAccepted": Null,
  "OrderDelivered": Null
});
const CreateOrderRequest = Record({
  "itemDescription": Text,
  "paymentMethod": PaymentMethod$1,
  "estimatedPrice": Float64,
  "pickupAddress": Text,
  "dropoffAddress": Text
});
const PaymentMethodSettingPublic = Record({
  "method": PaymentMethod$1,
  "isEnabled": Bool
});
const UserPublic = Record({
  "id": UserId,
  "name": Text,
  "createdAt": Timestamp,
  "isActive": Bool,
  "email": Text,
  "phone": Text
});
const CourierStats = Record({
  "earningsThisMonth": Float64,
  "completedThisMonth": Nat,
  "averageRating": Float64,
  "totalEarnings": Float64,
  "totalDeliveries": Nat
});
const StatusCount = Record({
  "status": OrderStatus$1,
  "count": Nat
});
const DailyOrderCount = Record({
  "date": Text,
  "count": Nat
});
const PaymentMethodCount = Record({
  "paymentMethod": PaymentMethod$1,
  "count": Nat
});
const DashboardStats = Record({
  "ordersByStatus": Vec(StatusCount),
  "totalOrders": Nat,
  "ordersLast7Days": Vec(DailyOrderCount),
  "totalUsers": Nat,
  "ordersByPaymentMethod": Vec(PaymentMethodCount)
});
const NotificationPublic = Record({
  "id": Nat,
  "messageAr": Text,
  "notifType": NotificationType$1,
  "userId": Nat,
  "isRead": Bool,
  "orderId": Opt(Nat),
  "message": Text,
  "timestamp": Int
});
const PaymentPublic = Record({
  "id": Nat,
  "status": PaymentStatus$1,
  "method": PaymentMethod$1,
  "errorMessage": Opt(Text),
  "orderId": Nat,
  "timestamp": Int,
  "phoneNumber": Opt(Text),
  "amount": Float64,
  "transactionId": Opt(Text)
});
const LoginResult = Variant({
  "ok": Record({ "token": Text, "user": UserPublic }),
  "err": Text
});
const RegisterRequest = Record({
  "password": Text,
  "name": Text,
  "email": Text,
  "phone": Text
});
const OrderSearchFilter = Record({
  "status": Opt(OrderStatus$1),
  "toDate": Opt(Timestamp),
  "fromDate": Opt(Timestamp)
});
Service({
  "acceptOrder": Func([Text, Nat], [AssignOrderResult], []),
  "adminCreateCompany": Func(
    [Text, CompanyInput],
    [Variant({ "ok": CompanyPublic, "err": Text })],
    []
  ),
  "adminCreateOffer": Func(
    [Text, OfferInput],
    [Variant({ "ok": OfferPublic, "err": Text })],
    []
  ),
  "adminCreateProduct": Func(
    [Text, ProductInput],
    [Variant({ "ok": ProductPublic, "err": Text })],
    []
  ),
  "adminDeleteCompany": Func(
    [Text, CompanyId],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminDeleteOffer": Func(
    [Text, OfferId],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminDeleteProduct": Func(
    [Text, ProductId],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminLoginCall": Func(
    [Text, Text],
    [Variant({ "ok": Text, "err": Text })],
    []
  ),
  "adminSendBroadcastNotification": Func(
    [Text, Text, Text, BroadcastSegment],
    [Variant({ "ok": Nat, "err": Text })],
    []
  ),
  "adminSetPaymentMethodEnabled": Func(
    [Text, PaymentMethod$1, Bool],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminUpdateCompany": Func(
    [Text, CompanyId, CompanyInput],
    [Variant({ "ok": CompanyPublic, "err": Text })],
    []
  ),
  "adminUpdateOffer": Func(
    [Text, OfferId, OfferInput],
    [Variant({ "ok": OfferPublic, "err": Text })],
    []
  ),
  "adminUpdateProduct": Func(
    [Text, ProductId, ProductInput],
    [Variant({ "ok": ProductPublic, "err": Text })],
    []
  ),
  "cancelOrder": Func(
    [Text, Nat],
    [Variant({ "ok": OrderPublic, "err": Text })],
    []
  ),
  "confirmDelivery": Func(
    [Text, Nat, Float64, Float64],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "confirmPickup": Func(
    [Text, Nat, Float64, Float64],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "courierLogin": Func([Text, Text], [CourierLoginResult], []),
  "createNotification": Func(
    [Nat, NotificationType$1, Opt(Nat), Text, Text],
    [],
    ["oneway"]
  ),
  "createOrder": Func(
    [Text, CreateOrderRequest],
    [Variant({ "ok": OrderPublic, "err": Text })],
    []
  ),
  "getActiveCompanies": Func([], [Vec(CompanyPublic)], ["query"]),
  "getActiveOffers": Func([], [Vec(OfferPublic)], ["query"]),
  "getActiveProducts": Func([], [Vec(ProductPublic)], ["query"]),
  "getAllOrdersAdmin": Func(
    [Text],
    [Variant({ "ok": Vec(OrderPublic), "err": Text })],
    ["query"]
  ),
  "getAllPaymentMethodSettings": Func(
    [],
    [Vec(PaymentMethodSettingPublic)],
    ["query"]
  ),
  "getAllUsersAdmin": Func(
    [Text],
    [Variant({ "ok": Vec(UserPublic), "err": Text })],
    ["query"]
  ),
  "getCompany": Func([CompanyId], [Opt(CompanyPublic)], ["query"]),
  "getCourierLocation": Func(
    [Nat],
    [
      Opt(
        Record({
          "lat": Float64,
          "lng": Float64,
          "orderId": Nat,
          "timestamp": Int,
          "courierId": Nat
        })
      )
    ],
    ["query"]
  ),
  "getCourierProfile": Func(
    [Text],
    [Opt(CourierPublic)],
    ["query"]
  ),
  "getCourierStats": Func([Text], [CourierStats], ["query"]),
  "getDashboardStats": Func(
    [Text],
    [Variant({ "ok": DashboardStats, "err": Text })],
    ["query"]
  ),
  "getEnabledPaymentMethods": Func(
    [],
    [Vec(PaymentMethod$1)],
    ["query"]
  ),
  "getMyCourierOrders": Func(
    [Text],
    [Vec(OrderPublic)],
    ["query"]
  ),
  "getMyNotifications": Func(
    [Text],
    [Vec(NotificationPublic)],
    ["query"]
  ),
  "getMyOrders": Func(
    [Text],
    [Variant({ "ok": Vec(OrderPublic), "err": Text })],
    ["query"]
  ),
  "getMyProfile": Func([Text], [Opt(UserPublic)], ["query"]),
  "getOffer": Func([OfferId], [Opt(OfferPublic)], ["query"]),
  "getOrder": Func([Text, Nat], [Opt(OrderPublic)], ["query"]),
  "getOrderPayments": Func(
    [Text, Nat],
    [Vec(PaymentPublic)],
    ["query"]
  ),
  "getOrdersByPaymentMethodAdmin": Func(
    [Text],
    [Variant({ "ok": Vec(PaymentMethodCount), "err": Text })],
    ["query"]
  ),
  "getOrdersByStatusAdmin": Func(
    [Text],
    [Variant({ "ok": Vec(StatusCount), "err": Text })],
    ["query"]
  ),
  "getOrdersLast7DaysAdmin": Func(
    [Text],
    [Variant({ "ok": Vec(DailyOrderCount), "err": Text })],
    ["query"]
  ),
  "getPaymentStatus": Func(
    [Text, Nat],
    [Opt(PaymentPublic)],
    ["query"]
  ),
  "getPendingOrdersForCourier": Func(
    [Text],
    [Vec(OrderPublic)],
    ["query"]
  ),
  "getProduct": Func([ProductId], [Opt(ProductPublic)], ["query"]),
  "getTotalOrdersAdmin": Func(
    [Text],
    [Variant({ "ok": Nat, "err": Text })],
    ["query"]
  ),
  "getTotalUsersAdmin": Func(
    [Text],
    [Variant({ "ok": Nat, "err": Text })],
    ["query"]
  ),
  "getUnreadNotificationCount": Func([Text], [Nat], ["query"]),
  "getUserByIdAdmin": Func(
    [Text, Nat],
    [Variant({ "ok": Opt(UserPublic), "err": Text })],
    ["query"]
  ),
  "initiatePayment": Func(
    [Text, Nat, PaymentMethod$1, Opt(Text)],
    [Variant({ "ok": PaymentPublic, "err": Text })],
    []
  ),
  "isAdmin": Func([Text], [Bool], ["query"]),
  "listCompanies": Func([Bool], [Vec(CompanyPublic)], ["query"]),
  "listOffers": Func([Bool], [Vec(OfferPublic)], ["query"]),
  "listProducts": Func([Bool], [Vec(ProductPublic)], ["query"]),
  "login": Func([Text, Text], [LoginResult], []),
  "logout": Func([Text], [], []),
  "markAllNotificationsRead": Func(
    [Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "markNotificationRead": Func(
    [Text, Nat],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "register": Func(
    [RegisterRequest],
    [Variant({ "ok": UserPublic, "err": Text })],
    []
  ),
  "registerCourier": Func(
    [Text, Text, Text, Text, Text],
    [Variant({ "ok": CourierPublic, "err": Text })],
    []
  ),
  "searchOrders": Func(
    [Text, OrderSearchFilter],
    [Variant({ "ok": Vec(OrderPublic), "err": Text })],
    ["query"]
  ),
  "searchUsersAdmin": Func(
    [Text, Text],
    [Variant({ "ok": Vec(UserPublic), "err": Text })],
    ["query"]
  ),
  "setUserActiveAdmin": Func(
    [Text, Nat, Bool],
    [Variant({ "ok": UserPublic, "err": Text })],
    []
  ),
  "updateCourierLocation": Func(
    [Text, Nat, Float64, Float64],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "updateMyProfile": Func(
    [Text, Text, Text],
    [Variant({ "ok": UserPublic, "err": Text })],
    []
  ),
  "updateOrderStatus": Func(
    [Text, Nat, OrderStatus$1],
    [Variant({ "ok": OrderPublic, "err": Text })],
    []
  ),
  "updatePaymentStatus": Func(
    [Nat, PaymentStatus$1, Opt(Text)],
    [Variant({ "ok": Null, "err": Text })],
    []
  )
});
class ExternalBlob {
  constructor(directURL, blob) {
    __publicField(this, "_blob");
    __publicField(this, "directURL");
    __publicField(this, "onProgress");
    if (blob) {
      this._blob = blob;
    }
    this.directURL = directURL;
  }
  static fromURL(url) {
    return new ExternalBlob(url, null);
  }
  static fromBytes(blob) {
    const url = URL.createObjectURL(new Blob([
      new Uint8Array(blob)
    ], {
      type: "application/octet-stream"
    }));
    return new ExternalBlob(url, blob);
  }
  async getBytes() {
    if (this._blob) {
      return this._blob;
    }
    const response = await fetch(this.directURL);
    const blob = await response.blob();
    this._blob = new Uint8Array(await blob.arrayBuffer());
    return this._blob;
  }
  getDirectURL() {
    return this.directURL;
  }
  withUploadProgress(onProgress) {
    this.onProgress = onProgress;
    return this;
  }
}
var NotificationType = /* @__PURE__ */ ((NotificationType2) => {
  NotificationType2["OrderCancelled"] = "OrderCancelled";
  NotificationType2["CourierArrived"] = "CourierArrived";
  NotificationType2["PaymentFailed"] = "PaymentFailed";
  NotificationType2["PaymentProcessed"] = "PaymentProcessed";
  NotificationType2["OrderCreated"] = "OrderCreated";
  NotificationType2["OrderInTransit"] = "OrderInTransit";
  NotificationType2["OrderAccepted"] = "OrderAccepted";
  NotificationType2["OrderDelivered"] = "OrderDelivered";
  return NotificationType2;
})(NotificationType || {});
var OrderStatus = /* @__PURE__ */ ((OrderStatus2) => {
  OrderStatus2["InTransit"] = "InTransit";
  OrderStatus2["Delivered"] = "Delivered";
  OrderStatus2["PickedUp"] = "PickedUp";
  OrderStatus2["Accepted"] = "Accepted";
  OrderStatus2["Cancelled"] = "Cancelled";
  OrderStatus2["Pending"] = "Pending";
  return OrderStatus2;
})(OrderStatus || {});
var PaymentMethod = /* @__PURE__ */ ((PaymentMethod2) => {
  PaymentMethod2["VodafoneCash"] = "VodafoneCash";
  PaymentMethod2["InstaPay"] = "InstaPay";
  PaymentMethod2["BankVisa"] = "BankVisa";
  PaymentMethod2["CashOnDelivery"] = "CashOnDelivery";
  return PaymentMethod2;
})(PaymentMethod || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2["Failed"] = "Failed";
  PaymentStatus2["Refunded"] = "Refunded";
  PaymentStatus2["Success"] = "Success";
  PaymentStatus2["Processing"] = "Processing";
  PaymentStatus2["Pending"] = "Pending";
  return PaymentStatus2;
})(PaymentStatus || {});
const now = BigInt(Date.now()) * BigInt(1e6);
const sampleCourier = {
  id: BigInt(1),
  vehicleType: "Motorcycle",
  userId: BigInt(10),
  name: "محمد المندوب",
  joinedAt: now - BigInt(864e11 * 30),
  isAvailable: true,
  isActive: true,
  rating: 4.8,
  phone: "01055555555",
  totalDeliveries: BigInt(42)
};
const sampleOrder1 = {
  id: BigInt(1),
  status: OrderStatus.InTransit,
  itemDescription: "طرد ملابس - مقاس L",
  paymentMethod: PaymentMethod.VodafoneCash,
  estimatedPrice: 75,
  userId: BigInt(1),
  createdAt: now - BigInt(36e11),
  updatedAt: now - BigInt(18e11),
  pickupAddress: "المعادي، القاهرة",
  dropoffAddress: "مدينة نصر، القاهرة",
  paymentStatus: "Pending"
};
const sampleOrder2 = {
  id: BigInt(2),
  status: OrderStatus.Pending,
  itemDescription: "أجهزة إلكترونية - لابتوب",
  paymentMethod: PaymentMethod.InstaPay,
  estimatedPrice: 150,
  userId: BigInt(1),
  createdAt: now - BigInt(72e11),
  updatedAt: now - BigInt(72e11),
  pickupAddress: "وسط البلد، القاهرة",
  dropoffAddress: "الزمالك، القاهرة",
  paymentStatus: "Pending"
};
const sampleOrder3 = {
  id: BigInt(3),
  status: OrderStatus.Delivered,
  itemDescription: "كتب دراسية",
  paymentMethod: PaymentMethod.CashOnDelivery,
  estimatedPrice: 50,
  userId: BigInt(2),
  createdAt: now - BigInt(864e11),
  updatedAt: now - BigInt(432e11),
  pickupAddress: "مصر الجديدة، القاهرة",
  dropoffAddress: "شبرا، القاهرة",
  paymentStatus: "Success"
};
const sampleUser1 = {
  id: BigInt(1),
  name: "أحمد محمد",
  email: "ahmed@example.com",
  phone: "01012345678",
  createdAt: now - BigInt(864e11 * 7),
  isActive: true
};
const sampleUser2 = {
  id: BigInt(2),
  name: "سارة علي",
  email: "sara@example.com",
  phone: "01098765432",
  createdAt: now - BigInt(864e11 * 3),
  isActive: true
};
const dashboardStats = {
  totalOrders: BigInt(42),
  totalUsers: BigInt(18),
  ordersByStatus: [
    { status: OrderStatus.Pending, count: BigInt(8) },
    { status: OrderStatus.Accepted, count: BigInt(5) },
    { status: OrderStatus.InTransit, count: BigInt(12) },
    { status: OrderStatus.Delivered, count: BigInt(15) },
    { status: OrderStatus.Cancelled, count: BigInt(2) }
  ],
  ordersLast7Days: [
    { date: "2026-04-09", count: BigInt(4) },
    { date: "2026-04-10", count: BigInt(7) },
    { date: "2026-04-11", count: BigInt(5) },
    { date: "2026-04-12", count: BigInt(9) },
    { date: "2026-04-13", count: BigInt(6) },
    { date: "2026-04-14", count: BigInt(8) },
    { date: "2026-04-15", count: BigInt(3) }
  ],
  ordersByPaymentMethod: [
    { paymentMethod: PaymentMethod.VodafoneCash, count: BigInt(15) },
    { paymentMethod: PaymentMethod.InstaPay, count: BigInt(10) },
    { paymentMethod: PaymentMethod.BankVisa, count: BigInt(8) },
    { paymentMethod: PaymentMethod.CashOnDelivery, count: BigInt(9) }
  ]
};
const sampleNotifications = [
  {
    id: BigInt(1),
    userId: BigInt(1),
    notifType: NotificationType.OrderCreated,
    orderId: BigInt(3),
    message: "Your order #3 has been created successfully",
    messageAr: "تم إنشاء طلبك رقم #3 بنجاح",
    isRead: true,
    timestamp: now - BigInt(864e11)
  },
  {
    id: BigInt(2),
    userId: BigInt(1),
    notifType: NotificationType.OrderAccepted,
    orderId: BigInt(1),
    message: "A courier has accepted your order #1",
    messageAr: "قبل مندوب طلبك رقم #1",
    isRead: false,
    timestamp: now - BigInt(36e11)
  },
  {
    id: BigInt(3),
    userId: BigInt(1),
    notifType: NotificationType.OrderInTransit,
    orderId: BigInt(1),
    message: "Your order #1 is now in transit",
    messageAr: "طلبك رقم #1 في الطريق إليك",
    isRead: false,
    timestamp: now - BigInt(18e11)
  }
];
let mockNotifications = [...sampleNotifications];
const sampleCompany1 = {
  id: BigInt(1),
  name: "FastCargo Egypt",
  nameAr: "فاست كارجو مصر",
  description: "Leading delivery company in Egypt",
  descriptionAr: "شركة توصيل رائدة في مصر",
  isActive: true,
  logoUrl: "",
  createdAt: now - BigInt(864e11 * 60)
};
const sampleCompany2 = {
  id: BigInt(2),
  name: "Nile Express",
  nameAr: "النيل إكسبريس",
  description: "Fast and reliable delivery across Cairo",
  descriptionAr: "توصيل سريع وموثوق في القاهرة",
  isActive: true,
  logoUrl: "",
  createdAt: now - BigInt(864e11 * 30)
};
const sampleProduct1 = {
  id: BigInt(1),
  name: "Standard Package",
  nameAr: "طرد عادي",
  description: "Standard delivery package up to 5kg",
  descriptionAr: "طرد توصيل عادي حتى 5 كيلو",
  isActive: true,
  imageUrl: "",
  category: "Delivery",
  price: 50,
  companyId: BigInt(1),
  createdAt: now - BigInt(864e11 * 14)
};
const sampleProduct2 = {
  id: BigInt(2),
  name: "Express Package",
  nameAr: "طرد سريع",
  description: "Express delivery within 2 hours",
  descriptionAr: "توصيل سريع خلال ساعتين",
  isActive: true,
  imageUrl: "",
  category: "Express",
  price: 120,
  companyId: BigInt(1),
  createdAt: now - BigInt(864e11 * 7)
};
const sampleOffer1 = {
  id: BigInt(1),
  title: "Summer Sale 20% Off",
  titleAr: "خصم صيف 20%",
  description: "Get 20% off on all deliveries this summer",
  descriptionAr: "احصل على خصم 20% على جميع التوصيلات هذا الصيف",
  isActive: true,
  discount: 20,
  validUntil: now + BigInt(864e11 * 30),
  createdAt: now - BigInt(864e11 * 5)
};
const sampleOffer2 = {
  id: BigInt(2),
  title: "First Order Free",
  titleAr: "الطلب الأول مجاني",
  description: "Your first order delivery is on us",
  descriptionAr: "توصيل طلبك الأول على حسابنا",
  isActive: true,
  discount: 100,
  validUntil: now + BigInt(864e11 * 60),
  createdAt: now - BigInt(864e11 * 10)
};
let mockCompanies = [sampleCompany1, sampleCompany2];
let mockProducts = [sampleProduct1, sampleProduct2];
let mockOffers = [sampleOffer1, sampleOffer2];
let mockPaymentSettings = [
  { method: PaymentMethod.VodafoneCash, isEnabled: true },
  { method: PaymentMethod.InstaPay, isEnabled: true },
  { method: PaymentMethod.BankVisa, isEnabled: true },
  { method: PaymentMethod.CashOnDelivery, isEnabled: true }
];
const mockBackend = {
  login: async (email, _password) => ({
    __kind__: "ok",
    ok: { token: "mock-token-user", user: { ...sampleUser1, email } }
  }),
  register: async (_req) => ({
    __kind__: "ok",
    ok: sampleUser1
  }),
  logout: async (_token) => void 0,
  adminLoginCall: async (_email, _password) => ({
    __kind__: "ok",
    ok: "mock-admin-token"
  }),
  isAdmin: async (_token) => true,
  getMyProfile: async (_token) => sampleUser1,
  updateMyProfile: async (_token, name, phone) => ({
    __kind__: "ok",
    ok: { ...sampleUser1, name, phone }
  }),
  getMyOrders: async (_token) => ({
    __kind__: "ok",
    ok: [sampleOrder1, sampleOrder2, sampleOrder3]
  }),
  getOrder: async (_token, orderId) => orderId === BigInt(1) ? sampleOrder1 : orderId === BigInt(2) ? sampleOrder2 : sampleOrder3,
  createOrder: async (_token, req) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(99),
      status: OrderStatus.Pending,
      itemDescription: req.itemDescription,
      paymentMethod: req.paymentMethod,
      estimatedPrice: req.estimatedPrice,
      userId: BigInt(1),
      createdAt: now,
      updatedAt: now,
      pickupAddress: req.pickupAddress,
      dropoffAddress: req.dropoffAddress,
      paymentStatus: "Pending"
    }
  }),
  cancelOrder: async (_token, orderId) => ({
    __kind__: "ok",
    ok: { ...sampleOrder1, id: orderId, status: OrderStatus.Cancelled }
  }),
  searchOrders: async (_token, _filter) => ({
    __kind__: "ok",
    ok: [sampleOrder1, sampleOrder2, sampleOrder3]
  }),
  getAllOrdersAdmin: async (_token) => ({
    __kind__: "ok",
    ok: [sampleOrder1, sampleOrder2, sampleOrder3]
  }),
  getAllUsersAdmin: async (_token) => ({
    __kind__: "ok",
    ok: [sampleUser1, sampleUser2]
  }),
  getUserByIdAdmin: async (_token, _userId) => ({
    __kind__: "ok",
    ok: sampleUser1
  }),
  setUserActiveAdmin: async (_token, userId, isActive) => ({
    __kind__: "ok",
    ok: { ...sampleUser1, id: userId, isActive }
  }),
  searchUsersAdmin: async (_token, _query) => ({
    __kind__: "ok",
    ok: [sampleUser1, sampleUser2]
  }),
  updateOrderStatus: async (_token, orderId, status) => ({
    __kind__: "ok",
    ok: { ...sampleOrder1, id: orderId, status }
  }),
  getDashboardStats: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats
  }),
  getOrdersByStatusAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.ordersByStatus
  }),
  getOrdersByPaymentMethodAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.ordersByPaymentMethod
  }),
  getOrdersLast7DaysAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.ordersLast7Days
  }),
  getTotalOrdersAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.totalOrders
  }),
  getTotalUsersAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.totalUsers
  }),
  // Notifications
  getMyNotifications: async (_token) => [...mockNotifications],
  getUnreadNotificationCount: async (_token) => BigInt(mockNotifications.filter((n) => !n.isRead).length),
  markNotificationRead: async (_token, notifId) => {
    mockNotifications = mockNotifications.map(
      (n) => n.id === notifId ? { ...n, isRead: true } : n
    );
    return { __kind__: "ok", ok: null };
  },
  markAllNotificationsRead: async (_token) => {
    mockNotifications = mockNotifications.map((n) => ({ ...n, isRead: true }));
    return { __kind__: "ok", ok: null };
  },
  createNotification: async () => void 0,
  // Courier/Payment stubs
  getCourierLocation: async () => null,
  getCourierProfile: async () => null,
  getCourierStats: async () => ({
    earningsThisMonth: 850,
    completedThisMonth: BigInt(12),
    averageRating: 4.8,
    totalEarnings: 12500,
    totalDeliveries: BigInt(42)
  }),
  getMyCourierOrders: async () => [sampleOrder1, sampleOrder2],
  getPendingOrdersForCourier: async () => [sampleOrder3],
  acceptOrder: async (_token, orderId) => ({
    __kind__: "ok",
    ok: { ...sampleOrder1, id: orderId, status: OrderStatus.Accepted }
  }),
  confirmPickup: async () => ({ __kind__: "ok", ok: null }),
  confirmDelivery: async () => ({ __kind__: "ok", ok: null }),
  updateCourierLocation: async () => ({ __kind__: "ok", ok: null }),
  courierLogin: async (email, _password) => {
    if (email === "courier@fastdeliver.com") {
      return {
        __kind__: "ok",
        ok: { courier: sampleCourier, token: "mock-courier-token" }
      };
    }
    return {
      __kind__: "wrongCredentials",
      wrongCredentials: null
    };
  },
  registerCourier: async (name, _phone, email) => {
    if (email && name) {
      return { __kind__: "ok", ok: { ...sampleCourier, name } };
    }
    return { __kind__: "err", err: "Registration failed" };
  },
  getOrderPayments: async () => [],
  initiatePayment: async (_token, orderId, method) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(1),
      status: PaymentStatus.Pending,
      method,
      orderId,
      timestamp: now,
      amount: 0
    }
  }),
  getPaymentStatus: async () => null,
  updatePaymentStatus: async () => ({ __kind__: "ok", ok: null }),
  // Products
  adminCreateProduct: async (_token, input) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(mockProducts.length + 1),
      ...input,
      createdAt: BigInt(Date.now()) * BigInt(1e6)
    }
  }),
  adminUpdateProduct: async (_token, id, input) => ({
    __kind__: "ok",
    ok: { id, ...input, createdAt: now }
  }),
  adminDeleteProduct: async (_token, _id) => ({ __kind__: "ok", ok: null }),
  listProducts: async (_activeOnly) => [...mockProducts],
  getProduct: async (id) => mockProducts.find((p) => p.id === id) ?? null,
  getActiveProducts: async () => mockProducts.filter((p) => p.isActive),
  // Companies
  adminCreateCompany: async (_token, input) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(mockCompanies.length + 1),
      ...input,
      createdAt: BigInt(Date.now()) * BigInt(1e6)
    }
  }),
  adminUpdateCompany: async (_token, id, input) => ({
    __kind__: "ok",
    ok: { id, ...input, createdAt: now }
  }),
  adminDeleteCompany: async (_token, _id) => ({ __kind__: "ok", ok: null }),
  listCompanies: async (_activeOnly) => [...mockCompanies],
  getCompany: async (id) => mockCompanies.find((c) => c.id === id) ?? null,
  getActiveCompanies: async () => mockCompanies.filter((c) => c.isActive),
  // Offers
  adminCreateOffer: async (_token, input) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(mockOffers.length + 1),
      ...input,
      createdAt: BigInt(Date.now()) * BigInt(1e6)
    }
  }),
  adminUpdateOffer: async (_token, id, input) => ({
    __kind__: "ok",
    ok: { id, ...input, createdAt: now }
  }),
  adminDeleteOffer: async (_token, _id) => ({ __kind__: "ok", ok: null }),
  listOffers: async (_activeOnly) => [...mockOffers],
  getOffer: async (id) => mockOffers.find((o) => o.id === id) ?? null,
  getActiveOffers: async () => mockOffers.filter((o) => o.isActive),
  // Notifications broadcast
  adminSendBroadcastNotification: async (_token, _message, _messageAr, _segment) => ({
    __kind__: "ok",
    ok: BigInt(mockNotifications.length + 1)
  }),
  // Payment method settings
  adminSetPaymentMethodEnabled: async (_token, method, enabled) => {
    mockPaymentSettings = mockPaymentSettings.map(
      (s) => s.method === method ? { ...s, isEnabled: enabled } : s
    );
    return { __kind__: "ok", ok: null };
  },
  getAllPaymentMethodSettings: async () => [...mockPaymentSettings],
  getEnabledPaymentMethods: async () => mockPaymentSettings.filter((s) => s.isEnabled).map((s) => s.method)
};
export {
  ExternalBlob as E,
  mockBackend as m
};
