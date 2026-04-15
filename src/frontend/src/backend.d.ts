import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CompanyPublic {
    id: CompanyId;
    nameAr: string;
    descriptionAr: string;
    name: string;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    logoUrl: string;
}
export type Timestamp = bigint;
export type CourierLoginResult = {
    __kind__: "ok";
    ok: {
        token: string;
        courier: CourierPublic;
    };
} | {
    __kind__: "wrongCredentials";
    wrongCredentials: null;
} | {
    __kind__: "inactive";
    inactive: null;
};
export interface UserPublic {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    isActive: boolean;
    email: string;
    phone: string;
}
export interface ProductPublic {
    id: ProductId;
    nameAr: string;
    descriptionAr: string;
    name: string;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    imageUrl: string;
    category: string;
    price: number;
    companyId: CompanyId;
}
export interface CourierPublic {
    id: bigint;
    vehicleType: string;
    userId: UserId;
    name: string;
    joinedAt: Timestamp;
    isAvailable: boolean;
    isActive: boolean;
    rating: number;
    phone: string;
    totalDeliveries: bigint;
}
export interface OrderPublic {
    id: OrderId;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    itemDescription: string;
    paymentMethod: PaymentMethod;
    estimatedPrice: number;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    pickupAddress: string;
    dropoffAddress: string;
    paymentId?: bigint;
    courierId?: bigint;
}
export interface OfferInput {
    title: string;
    descriptionAr: string;
    description: string;
    isActive: boolean;
    discount: number;
    titleAr: string;
    validUntil: Timestamp;
}
export interface OfferPublic {
    id: OfferId;
    title: string;
    descriptionAr: string;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    discount: number;
    titleAr: string;
    validUntil: Timestamp;
}
export type AssignOrderResult = {
    __kind__: "ok";
    ok: Order;
} | {
    __kind__: "err";
    err: string;
} | {
    __kind__: "alreadyAssigned";
    alreadyAssigned: null;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "unauthorized";
    unauthorized: null;
};
export interface RegisterRequest {
    password: string;
    name: string;
    email: string;
    phone: string;
}
export interface PaymentMethodSettingPublic {
    method: PaymentMethod;
    isEnabled: boolean;
}
export interface CourierStats {
    earningsThisMonth: number;
    completedThisMonth: bigint;
    averageRating: number;
    totalEarnings: number;
    totalDeliveries: bigint;
}
export interface NotificationPublic {
    id: bigint;
    messageAr: string;
    notifType: NotificationType;
    userId: bigint;
    isRead: boolean;
    orderId?: bigint;
    message: string;
    timestamp: bigint;
}
export interface PaymentMethodCount {
    paymentMethod: PaymentMethod;
    count: bigint;
}
export interface OrderSearchFilter {
    status?: OrderStatus;
    toDate?: Timestamp;
    fromDate?: Timestamp;
}
export interface ProductInput {
    nameAr: string;
    descriptionAr: string;
    name: string;
    description: string;
    isActive: boolean;
    imageUrl: string;
    category: string;
    price: number;
    companyId: CompanyId;
}
export interface StatusCount {
    status: OrderStatus;
    count: bigint;
}
export interface DailyOrderCount {
    date: string;
    count: bigint;
}
export interface PaymentPublic {
    id: bigint;
    status: PaymentStatus;
    method: PaymentMethod;
    errorMessage?: string;
    orderId: bigint;
    timestamp: bigint;
    phoneNumber?: string;
    amount: number;
    transactionId?: string;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    itemDescription: string;
    paymentMethod: PaymentMethod;
    estimatedPrice: number;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    pickupAddress: string;
    dropoffAddress: string;
    paymentId?: bigint;
    courierId?: bigint;
}
export interface DashboardStats {
    ordersByStatus: Array<StatusCount>;
    totalOrders: bigint;
    ordersLast7Days: Array<DailyOrderCount>;
    totalUsers: bigint;
    ordersByPaymentMethod: Array<PaymentMethodCount>;
}
export type UserId = bigint;
export type CompanyId = bigint;
export interface CompanyInput {
    nameAr: string;
    descriptionAr: string;
    name: string;
    description: string;
    isActive: boolean;
    logoUrl: string;
}
export interface CreateOrderRequest {
    itemDescription: string;
    paymentMethod: PaymentMethod;
    estimatedPrice: number;
    pickupAddress: string;
    dropoffAddress: string;
}
export type ProductId = bigint;
export type LoginResult = {
    __kind__: "ok";
    ok: {
        token: string;
        user: UserPublic;
    };
} | {
    __kind__: "err";
    err: string;
};
export type OfferId = bigint;
export type OrderId = bigint;
export enum BroadcastSegment {
    All = "All",
    PendingOrders = "PendingOrders",
    ActiveUsers = "ActiveUsers"
}
export enum NotificationType {
    OrderCancelled = "OrderCancelled",
    CourierArrived = "CourierArrived",
    PaymentFailed = "PaymentFailed",
    PaymentProcessed = "PaymentProcessed",
    OrderCreated = "OrderCreated",
    OrderInTransit = "OrderInTransit",
    OrderAccepted = "OrderAccepted",
    OrderDelivered = "OrderDelivered"
}
export enum OrderStatus {
    InTransit = "InTransit",
    Delivered = "Delivered",
    PickedUp = "PickedUp",
    Accepted = "Accepted",
    Cancelled = "Cancelled",
    Pending = "Pending"
}
export enum PaymentMethod {
    VodafoneCash = "VodafoneCash",
    InstaPay = "InstaPay",
    BankVisa = "BankVisa",
    CashOnDelivery = "CashOnDelivery"
}
export enum PaymentStatus {
    Failed = "Failed",
    Refunded = "Refunded",
    Success = "Success",
    Processing = "Processing",
    Pending = "Pending"
}
export interface backendInterface {
    acceptOrder(token: string, orderId: bigint): Promise<AssignOrderResult>;
    adminCreateCompany(token: string, input: CompanyInput): Promise<{
        __kind__: "ok";
        ok: CompanyPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminCreateOffer(token: string, input: OfferInput): Promise<{
        __kind__: "ok";
        ok: OfferPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminCreateProduct(token: string, input: ProductInput): Promise<{
        __kind__: "ok";
        ok: ProductPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteCompany(token: string, id: CompanyId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteOffer(token: string, id: OfferId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteProduct(token: string, id: ProductId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLoginCall(email: string, password: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminSendBroadcastNotification(token: string, message: string, messageAr: string, segment: BroadcastSegment): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminSetPaymentMethodEnabled(token: string, method: PaymentMethod, enabled: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUpdateCompany(token: string, id: CompanyId, input: CompanyInput): Promise<{
        __kind__: "ok";
        ok: CompanyPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUpdateOffer(token: string, id: OfferId, input: OfferInput): Promise<{
        __kind__: "ok";
        ok: OfferPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUpdateProduct(token: string, id: ProductId, input: ProductInput): Promise<{
        __kind__: "ok";
        ok: ProductPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    cancelOrder(token: string, orderId: bigint): Promise<{
        __kind__: "ok";
        ok: OrderPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    confirmDelivery(token: string, orderId: bigint, lat: number, lng: number): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    confirmPickup(token: string, orderId: bigint, lat: number, lng: number): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    courierLogin(email: string, password: string): Promise<CourierLoginResult>;
    createNotification(userId: bigint, notifType: NotificationType, orderId: bigint | null, message: string, messageAr: string): Promise<void>;
    createOrder(token: string, req: CreateOrderRequest): Promise<{
        __kind__: "ok";
        ok: OrderPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getActiveCompanies(): Promise<Array<CompanyPublic>>;
    getActiveOffers(): Promise<Array<OfferPublic>>;
    getActiveProducts(): Promise<Array<ProductPublic>>;
    getAllOrdersAdmin(token: string): Promise<{
        __kind__: "ok";
        ok: Array<OrderPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAllPaymentMethodSettings(): Promise<Array<PaymentMethodSettingPublic>>;
    getAllUsersAdmin(token: string): Promise<{
        __kind__: "ok";
        ok: Array<UserPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCompany(id: CompanyId): Promise<CompanyPublic | null>;
    getCourierLocation(orderId: bigint): Promise<{
        lat: number;
        lng: number;
        orderId: bigint;
        timestamp: bigint;
        courierId: bigint;
    } | null>;
    getCourierProfile(token: string): Promise<CourierPublic | null>;
    getCourierStats(token: string): Promise<CourierStats>;
    getDashboardStats(token: string): Promise<{
        __kind__: "ok";
        ok: DashboardStats;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getEnabledPaymentMethods(): Promise<Array<PaymentMethod>>;
    getMyCourierOrders(token: string): Promise<Array<OrderPublic>>;
    getMyNotifications(token: string): Promise<Array<NotificationPublic>>;
    getMyOrders(token: string): Promise<{
        __kind__: "ok";
        ok: Array<OrderPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMyProfile(token: string): Promise<UserPublic | null>;
    getOffer(id: OfferId): Promise<OfferPublic | null>;
    getOrder(token: string, orderId: bigint): Promise<OrderPublic | null>;
    getOrderPayments(token: string, orderId: bigint): Promise<Array<PaymentPublic>>;
    getOrdersByPaymentMethodAdmin(token: string): Promise<{
        __kind__: "ok";
        ok: Array<PaymentMethodCount>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getOrdersByStatusAdmin(token: string): Promise<{
        __kind__: "ok";
        ok: Array<StatusCount>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getOrdersLast7DaysAdmin(token: string): Promise<{
        __kind__: "ok";
        ok: Array<DailyOrderCount>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getPaymentStatus(token: string, paymentId: bigint): Promise<PaymentPublic | null>;
    getPendingOrdersForCourier(token: string): Promise<Array<OrderPublic>>;
    getProduct(id: ProductId): Promise<ProductPublic | null>;
    getTotalOrdersAdmin(token: string): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getTotalUsersAdmin(token: string): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getUnreadNotificationCount(token: string): Promise<bigint>;
    getUserByIdAdmin(token: string, userId: bigint): Promise<{
        __kind__: "ok";
        ok: UserPublic | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    initiatePayment(token: string, orderId: bigint, method: PaymentMethod, phoneNumber: string | null): Promise<{
        __kind__: "ok";
        ok: PaymentPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    isAdmin(token: string): Promise<boolean>;
    listCompanies(activeOnly: boolean): Promise<Array<CompanyPublic>>;
    listOffers(activeOnly: boolean): Promise<Array<OfferPublic>>;
    listProducts(activeOnly: boolean): Promise<Array<ProductPublic>>;
    login(email: string, password: string): Promise<LoginResult>;
    logout(token: string): Promise<void>;
    markAllNotificationsRead(token: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markNotificationRead(token: string, notifId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    register(req: RegisterRequest): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    registerCourier(name: string, phone: string, email: string, password: string, vehicleType: string): Promise<{
        __kind__: "ok";
        ok: CourierPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchOrders(token: string, filter: OrderSearchFilter): Promise<{
        __kind__: "ok";
        ok: Array<OrderPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchUsersAdmin(token: string, searchQuery: string): Promise<{
        __kind__: "ok";
        ok: Array<UserPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setUserActiveAdmin(token: string, userId: bigint, isActive: boolean): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateCourierLocation(token: string, orderId: bigint, lat: number, lng: number): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateMyProfile(token: string, name: string, phone: string): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateOrderStatus(token: string, orderId: bigint, status: OrderStatus): Promise<{
        __kind__: "ok";
        ok: OrderPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updatePaymentStatus(paymentId: bigint, status: PaymentStatus, transactionId: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
