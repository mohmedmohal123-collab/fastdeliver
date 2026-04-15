export type PaymentMethod =
  | "VodafoneCash"
  | "CashOnDelivery"
  | "InstaPay"
  | "BankVisa";

export type OrderStatus =
  | "Pending"
  | "Accepted"
  | "InTransit"
  | "PickedUp"
  | "Delivered"
  | "Cancelled";

export type VehicleType = "Motorcycle" | "Car" | "Bicycle" | "Truck";

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: number;
}

export interface Order {
  id: number;
  userId: number;
  pickupAddress: string;
  dropoffAddress: string;
  itemDescription: string;
  paymentMethod: PaymentMethod;
  estimatedPrice: number;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
  courierId?: number;
  customerName?: string;
  customerPhone?: string;
}

export interface CourierPublic {
  id: bigint;
  vehicleType: string;
  userId: bigint;
  name: string;
  joinedAt: bigint;
  isAvailable: boolean;
  isActive: boolean;
  rating: number;
  phone: string;
  totalDeliveries: bigint;
}

export interface CourierStats {
  earningsThisMonth: number;
  completedThisMonth: bigint;
  averageRating: number;
  totalEarnings: number;
  totalDeliveries: bigint;
}

export interface StatusCount {
  status: OrderStatus;
  count: number;
}

export interface PaymentMethodCount {
  method: PaymentMethod;
  count: number;
}

export interface DailyOrderCount {
  date: string;
  count: number;
}

export interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  ordersByStatus: StatusCount[];
  ordersByPaymentMethod: PaymentMethodCount[];
  ordersLast7Days: DailyOrderCount[];
}

export type PaymentStatus =
  | "Pending"
  | "Processing"
  | "Success"
  | "Failed"
  | "Refunded";

export interface PaymentPublic {
  id: bigint;
  orderId: bigint;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  transactionId?: string;
  phoneNumber?: string;
  timestamp: bigint;
  errorMessage?: string;
}

export interface NotificationPublic {
  id: bigint;
  userId: bigint;
  notifType: string;
  orderId?: bigint;
  message: string;
  messageAr: string;
  isRead: boolean;
  timestamp: bigint;
}

export interface ProductPublic {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  category: string;
  imageUrl: string;
  companyId?: number;
  isActive: boolean;
  createdAt: number;
}

export interface CompanyPublic {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  logoUrl: string;
  isActive: boolean;
  createdAt: number;
}

export interface OfferPublic {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  discountPercent: number;
  validUntil: string;
  isActive: boolean;
  createdAt: number;
}
