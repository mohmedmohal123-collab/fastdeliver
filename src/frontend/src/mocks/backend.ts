import type { backendInterface, OrderPublic, UserPublic, DashboardStats, LoginResult, NotificationPublic, CourierPublic, CompanyPublic, ProductPublic, OfferPublic } from "../backend";
import { OrderStatus, PaymentMethod, NotificationType, PaymentStatus } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleCourier: CourierPublic = {
  id: BigInt(1),
  vehicleType: "Motorcycle",
  userId: BigInt(10),
  name: "محمد المندوب",
  joinedAt: now - BigInt(86_400_000_000_000 * 30),
  isAvailable: true,
  isActive: true,
  rating: 4.8,
  phone: "01055555555",
  totalDeliveries: BigInt(42),
};

const sampleOrder1: OrderPublic = {
  id: BigInt(1),
  status: OrderStatus.InTransit,
  itemDescription: "طرد ملابس - مقاس L",
  paymentMethod: PaymentMethod.VodafoneCash,
  estimatedPrice: 75,
  userId: BigInt(1),
  createdAt: now - BigInt(3_600_000_000_000),
  updatedAt: now - BigInt(1_800_000_000_000),
  pickupAddress: "المعادي، القاهرة",
  dropoffAddress: "مدينة نصر، القاهرة",
  paymentStatus: "Pending" as unknown as import("../backend").PaymentStatus,
};

const sampleOrder2: OrderPublic = {
  id: BigInt(2),
  status: OrderStatus.Pending,
  itemDescription: "أجهزة إلكترونية - لابتوب",
  paymentMethod: PaymentMethod.InstaPay,
  estimatedPrice: 150,
  userId: BigInt(1),
  createdAt: now - BigInt(7_200_000_000_000),
  updatedAt: now - BigInt(7_200_000_000_000),
  pickupAddress: "وسط البلد، القاهرة",
  dropoffAddress: "الزمالك، القاهرة",
  paymentStatus: "Pending" as unknown as import("../backend").PaymentStatus,
};

const sampleOrder3: OrderPublic = {
  id: BigInt(3),
  status: OrderStatus.Delivered,
  itemDescription: "كتب دراسية",
  paymentMethod: PaymentMethod.CashOnDelivery,
  estimatedPrice: 50,
  userId: BigInt(2),
  createdAt: now - BigInt(86_400_000_000_000),
  updatedAt: now - BigInt(43_200_000_000_000),
  pickupAddress: "مصر الجديدة، القاهرة",
  dropoffAddress: "شبرا، القاهرة",
  paymentStatus: "Success" as unknown as import("../backend").PaymentStatus,
};

const sampleUser1: UserPublic = {
  id: BigInt(1),
  name: "أحمد محمد",
  email: "ahmed@example.com",
  phone: "01012345678",
  createdAt: now - BigInt(86_400_000_000_000 * 7),
  isActive: true,
};

const sampleUser2: UserPublic = {
  id: BigInt(2),
  name: "سارة علي",
  email: "sara@example.com",
  phone: "01098765432",
  createdAt: now - BigInt(86_400_000_000_000 * 3),
  isActive: true,
};

const dashboardStats: DashboardStats = {
  totalOrders: BigInt(42),
  totalUsers: BigInt(18),
  ordersByStatus: [
    { status: OrderStatus.Pending, count: BigInt(8) },
    { status: OrderStatus.Accepted, count: BigInt(5) },
    { status: OrderStatus.InTransit, count: BigInt(12) },
    { status: OrderStatus.Delivered, count: BigInt(15) },
    { status: OrderStatus.Cancelled, count: BigInt(2) },
  ],
  ordersLast7Days: [
    { date: "2026-04-09", count: BigInt(4) },
    { date: "2026-04-10", count: BigInt(7) },
    { date: "2026-04-11", count: BigInt(5) },
    { date: "2026-04-12", count: BigInt(9) },
    { date: "2026-04-13", count: BigInt(6) },
    { date: "2026-04-14", count: BigInt(8) },
    { date: "2026-04-15", count: BigInt(3) },
  ],
  ordersByPaymentMethod: [
    { paymentMethod: PaymentMethod.VodafoneCash, count: BigInt(15) },
    { paymentMethod: PaymentMethod.InstaPay, count: BigInt(10) },
    { paymentMethod: PaymentMethod.BankVisa, count: BigInt(8) },
    { paymentMethod: PaymentMethod.CashOnDelivery, count: BigInt(9) },
  ],
};

const sampleNotifications: NotificationPublic[] = [
  {
    id: BigInt(1),
    userId: BigInt(1),
    notifType: NotificationType.OrderCreated,
    orderId: BigInt(3),
    message: "Your order #3 has been created successfully",
    messageAr: "تم إنشاء طلبك رقم #3 بنجاح",
    isRead: true,
    timestamp: now - BigInt(86_400_000_000_000),
  },
  {
    id: BigInt(2),
    userId: BigInt(1),
    notifType: NotificationType.OrderAccepted,
    orderId: BigInt(1),
    message: "A courier has accepted your order #1",
    messageAr: "قبل مندوب طلبك رقم #1",
    isRead: false,
    timestamp: now - BigInt(3_600_000_000_000),
  },
  {
    id: BigInt(3),
    userId: BigInt(1),
    notifType: NotificationType.OrderInTransit,
    orderId: BigInt(1),
    message: "Your order #1 is now in transit",
    messageAr: "طلبك رقم #1 في الطريق إليك",
    isRead: false,
    timestamp: now - BigInt(1_800_000_000_000),
  },
];

let mockNotifications = [...sampleNotifications];

const sampleCompany1: CompanyPublic = {
  id: BigInt(1),
  name: "FastCargo Egypt",
  nameAr: "فاست كارجو مصر",
  description: "Leading delivery company in Egypt",
  descriptionAr: "شركة توصيل رائدة في مصر",
  isActive: true,
  logoUrl: "",
  createdAt: now - BigInt(86_400_000_000_000 * 60),
};

const sampleCompany2: CompanyPublic = {
  id: BigInt(2),
  name: "Nile Express",
  nameAr: "النيل إكسبريس",
  description: "Fast and reliable delivery across Cairo",
  descriptionAr: "توصيل سريع وموثوق في القاهرة",
  isActive: true,
  logoUrl: "",
  createdAt: now - BigInt(86_400_000_000_000 * 30),
};

const sampleProduct1: ProductPublic = {
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
  createdAt: now - BigInt(86_400_000_000_000 * 14),
};

const sampleProduct2: ProductPublic = {
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
  createdAt: now - BigInt(86_400_000_000_000 * 7),
};

const sampleOffer1: OfferPublic = {
  id: BigInt(1),
  title: "Summer Sale 20% Off",
  titleAr: "خصم صيف 20%",
  description: "Get 20% off on all deliveries this summer",
  descriptionAr: "احصل على خصم 20% على جميع التوصيلات هذا الصيف",
  isActive: true,
  discount: 20,
  validUntil: now + BigInt(86_400_000_000_000 * 30),
  createdAt: now - BigInt(86_400_000_000_000 * 5),
};

const sampleOffer2: OfferPublic = {
  id: BigInt(2),
  title: "First Order Free",
  titleAr: "الطلب الأول مجاني",
  description: "Your first order delivery is on us",
  descriptionAr: "توصيل طلبك الأول على حسابنا",
  isActive: true,
  discount: 100,
  validUntil: now + BigInt(86_400_000_000_000 * 60),
  createdAt: now - BigInt(86_400_000_000_000 * 10),
};

let mockCompanies: CompanyPublic[] = [sampleCompany1, sampleCompany2];
let mockProducts: ProductPublic[] = [sampleProduct1, sampleProduct2];
let mockOffers: OfferPublic[] = [sampleOffer1, sampleOffer2];
let mockPaymentSettings = [
  { method: PaymentMethod.VodafoneCash, isEnabled: true },
  { method: PaymentMethod.InstaPay, isEnabled: true },
  { method: PaymentMethod.BankVisa, isEnabled: true },
  { method: PaymentMethod.CashOnDelivery, isEnabled: true },
];

export const mockBackend: backendInterface = {
  login: async (email: string, _password: string): Promise<LoginResult> => ({
    __kind__: "ok",
    ok: { token: "mock-token-user", user: { ...sampleUser1, email } },
  }),

  register: async (_req) => ({
    __kind__: "ok",
    ok: sampleUser1,
  }),

  logout: async (_token) => undefined,

  adminLoginCall: async (_email, _password) => ({
    __kind__: "ok",
    ok: "mock-admin-token",
  }),

  isAdmin: async (_token) => true,

  getMyProfile: async (_token) => sampleUser1,

  updateMyProfile: async (_token, name, phone) => ({
    __kind__: "ok",
    ok: { ...sampleUser1, name, phone },
  }),

  getMyOrders: async (_token) => ({
    __kind__: "ok",
    ok: [sampleOrder1, sampleOrder2, sampleOrder3],
  }),

  getOrder: async (_token, orderId) =>
    orderId === BigInt(1) ? sampleOrder1 : orderId === BigInt(2) ? sampleOrder2 : sampleOrder3,

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
      paymentStatus: "Pending" as unknown as import("../backend").PaymentStatus,
    },
  }),

  cancelOrder: async (_token, orderId) => ({
    __kind__: "ok",
    ok: { ...sampleOrder1, id: orderId, status: OrderStatus.Cancelled },
  }),

  searchOrders: async (_token, _filter) => ({
    __kind__: "ok",
    ok: [sampleOrder1, sampleOrder2, sampleOrder3],
  }),

  getAllOrdersAdmin: async (_token) => ({
    __kind__: "ok",
    ok: [sampleOrder1, sampleOrder2, sampleOrder3],
  }),

  getAllUsersAdmin: async (_token) => ({
    __kind__: "ok",
    ok: [sampleUser1, sampleUser2],
  }),

  getUserByIdAdmin: async (_token, _userId) => ({
    __kind__: "ok",
    ok: sampleUser1,
  }),

  setUserActiveAdmin: async (_token, userId, isActive) => ({
    __kind__: "ok",
    ok: { ...sampleUser1, id: userId, isActive },
  }),

  searchUsersAdmin: async (_token, _query) => ({
    __kind__: "ok",
    ok: [sampleUser1, sampleUser2],
  }),

  updateOrderStatus: async (_token, orderId, status) => ({
    __kind__: "ok",
    ok: { ...sampleOrder1, id: orderId, status },
  }),

  getDashboardStats: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats,
  }),

  getOrdersByStatusAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.ordersByStatus,
  }),

  getOrdersByPaymentMethodAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.ordersByPaymentMethod,
  }),

  getOrdersLast7DaysAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.ordersLast7Days,
  }),

  getTotalOrdersAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.totalOrders,
  }),

  getTotalUsersAdmin: async (_token) => ({
    __kind__: "ok",
    ok: dashboardStats.totalUsers,
  }),

  // Notifications
  getMyNotifications: async (_token) => [...mockNotifications],

  getUnreadNotificationCount: async (_token) =>
    BigInt(mockNotifications.filter((n) => !n.isRead).length),

  markNotificationRead: async (_token, notifId) => {
    mockNotifications = mockNotifications.map((n) =>
      n.id === notifId ? { ...n, isRead: true } : n,
    );
    return { __kind__: "ok", ok: null };
  },

  markAllNotificationsRead: async (_token) => {
    mockNotifications = mockNotifications.map((n) => ({ ...n, isRead: true }));
    return { __kind__: "ok", ok: null };
  },

  createNotification: async () => undefined,

  // Courier/Payment stubs
  getCourierLocation: async () => null,
  getCourierProfile: async () => null,
  getCourierStats: async () => ({
    earningsThisMonth: 850,
    completedThisMonth: BigInt(12),
    averageRating: 4.8,
    totalEarnings: 12500,
    totalDeliveries: BigInt(42),
  }),
  getMyCourierOrders: async () => [sampleOrder1, sampleOrder2],
  getPendingOrdersForCourier: async () => [sampleOrder3],
  acceptOrder: async (_token, orderId) => ({
    __kind__: "ok",
    ok: { ...sampleOrder1, id: orderId, status: OrderStatus.Accepted },
  }),
  confirmPickup: async () => ({ __kind__: "ok", ok: null }),
  confirmDelivery: async () => ({ __kind__: "ok", ok: null }),
  updateCourierLocation: async () => ({ __kind__: "ok", ok: null }),
  courierLogin: async (email: string, _password: string) => {
    if (email === "courier@fastdeliver.com") {
      return {
        __kind__: "ok" as const,
        ok: { courier: sampleCourier, token: "mock-courier-token" },
      };
    }
    return {
      __kind__: "wrongCredentials" as const,
      wrongCredentials: null,
    };
  },
  registerCourier: async (name: string, _phone: string, email: string) => {
    if (email && name) {
      return { __kind__: "ok" as const, ok: { ...sampleCourier, name } };
    }
    return { __kind__: "err" as const, err: "Registration failed" };
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
      amount: 0,
    },
  }),
  getPaymentStatus: async () => null,
  updatePaymentStatus: async () => ({ __kind__: "ok", ok: null }),

  // Products
  adminCreateProduct: async (_token, input) => ({
    __kind__: "ok",
    ok: {
      id: BigInt(mockProducts.length + 1),
      ...input,
      createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    },
  }),
  adminUpdateProduct: async (_token, id, input) => ({
    __kind__: "ok",
    ok: { id, ...input, createdAt: now },
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
      createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    },
  }),
  adminUpdateCompany: async (_token, id, input) => ({
    __kind__: "ok",
    ok: { id, ...input, createdAt: now },
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
      createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    },
  }),
  adminUpdateOffer: async (_token, id, input) => ({
    __kind__: "ok",
    ok: { id, ...input, createdAt: now },
  }),
  adminDeleteOffer: async (_token, _id) => ({ __kind__: "ok", ok: null }),
  listOffers: async (_activeOnly) => [...mockOffers],
  getOffer: async (id) => mockOffers.find((o) => o.id === id) ?? null,
  getActiveOffers: async () => mockOffers.filter((o) => o.isActive),

  // Notifications broadcast
  adminSendBroadcastNotification: async (_token, _message, _messageAr, _segment) => ({
    __kind__: "ok",
    ok: BigInt(mockNotifications.length + 1),
  }),

  // Payment method settings
  adminSetPaymentMethodEnabled: async (_token, method, enabled) => {
    mockPaymentSettings = mockPaymentSettings.map((s) =>
      s.method === method ? { ...s, isEnabled: enabled } : s,
    );
    return { __kind__: "ok", ok: null };
  },
  getAllPaymentMethodSettings: async () => [...mockPaymentSettings],
  getEnabledPaymentMethods: async () =>
    mockPaymentSettings.filter((s) => s.isEnabled).map((s) => s.method),
};
