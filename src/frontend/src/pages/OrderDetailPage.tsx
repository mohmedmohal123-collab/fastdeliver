import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Navigation,
  Package,
  RefreshCw,
  Smartphone,
  Truck,
  Wallet,
  WifiOff,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { LiveMap } from "../components/LiveMap";
import { PaymentModal } from "../components/PaymentModal";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";
import type {
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentPublic,
  PaymentStatus,
} from "../types";
import { addressToLatLng, estimateETA, haversineDistance } from "../utils/geo";

// ---------- mock data ----------
const MOCK_PAYMENT_STATUS: Record<string, PaymentStatus> = {
  "1": "Pending",
  "2": "Success",
  "3": "Failed",
};

const MOCK_ORDERS: Record<string, Order> = {
  "1": {
    id: 1,
    userId: 1,
    pickupAddress: "15 شارع التحرير، القاهرة",
    dropoffAddress: "22 شارع النيل، الجيزة",
    itemDescription: "مستندات رسمية",
    paymentMethod: "VodafoneCash",
    estimatedPrice: 45,
    status: "InTransit",
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now(),
  },
  "2": {
    id: 2,
    userId: 1,
    pickupAddress: "مول العرب، 6 أكتوبر",
    dropoffAddress: "5 شارع الجامعة، المهندسين",
    itemDescription: "طرد صغير",
    paymentMethod: "CashOnDelivery",
    estimatedPrice: 60,
    status: "Delivered",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now(),
  },
  "3": {
    id: 3,
    userId: 1,
    pickupAddress: "مدينة نصر، شارع عباس العقاد",
    dropoffAddress: "وسط البلد، ميدان رمسيس",
    itemDescription: "ملابس",
    paymentMethod: "InstaPay",
    estimatedPrice: 80,
    status: "Pending",
    createdAt: Date.now() - 7200000,
    updatedAt: Date.now(),
  },
};

// ---------- constants ----------
const STATUS_STEPS: OrderStatus[] = [
  "Pending",
  "Accepted",
  "InTransit",
  "Delivered",
];

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Pending: <Clock className="w-4 h-4" />,
  Accepted: <CheckCircle2 className="w-4 h-4" />,
  PickedUp: <Package className="w-4 h-4" />,
  InTransit: <Truck className="w-4 h-4" />,
  Delivered: <CheckCircle2 className="w-4 h-4" />,
  Cancelled: <XCircle className="w-4 h-4" />,
};

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Accepted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  PickedUp: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  InTransit: "bg-primary/15 text-primary border-primary/30",
  Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

function getProgress(status: OrderStatus): number {
  const idx = STATUS_STEPS.indexOf(status);
  if (idx === -1) return 0;
  return Math.round(((idx + 1) / STATUS_STEPS.length) * 100);
}

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { color: string; bg: string; border: string; icon: React.ReactNode }
> = {
  Pending: {
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  Processing: {
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: <RefreshCw className="w-3.5 h-3.5 animate-spin" />,
  },
  Success: {
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  Failed: {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  },
  Refunded: {
    color: "text-muted-foreground",
    bg: "bg-muted/20",
    border: "border-border",
    icon: <RefreshCw className="w-3.5 h-3.5" />,
  },
};

const PAYMENT_METHOD_ICON: Record<PaymentMethod, React.ReactNode> = {
  VodafoneCash: <Smartphone className="w-3.5 h-3.5 text-red-400" />,
  InstaPay: <Wallet className="w-3.5 h-3.5 text-blue-400" />,
  BankVisa: <CreditCard className="w-3.5 h-3.5 text-indigo-400" />,
  CashOnDelivery: <Banknote className="w-3.5 h-3.5 text-green-400" />,
};

// ---------- courier location query ----------
interface CourierLocation {
  courierId: bigint;
  orderId: bigint;
  lat: number;
  lng: number;
  timestamp: bigint;
}

function useCourierLocation(orderId: string, enabled: boolean) {
  return useQuery<CourierLocation | null>({
    queryKey: ["courierLocation", orderId],
    queryFn: async (): Promise<CourierLocation | null> => {
      // In a real deployment this would call actor.getCourierLocation(BigInt(orderId))
      // For demo: simulate a moving courier near the pickup address when InTransit
      const order = MOCK_ORDERS[orderId];
      if (!order || order.status !== "InTransit") return null;
      const [pLat, pLng] = addressToLatLng(order.pickupAddress);
      const [dLat, dLng] = addressToLatLng(order.dropoffAddress);
      const progress = (Date.now() % 60000) / 60000; // 0-1 over 60s cycle
      return {
        courierId: BigInt(99),
        orderId: BigInt(orderId),
        lat: pLat + (dLat - pLat) * progress,
        lng: pLng + (dLng - pLng) * progress,
        timestamp: BigInt(Date.now()),
      };
    },
    refetchInterval: enabled ? 15000 : false,
    enabled,
  });
}

// ---------- component ----------
export default function OrderDetailPage() {
  const { lang } = useLangStore();
  const isOnline = useOnlineStatus();
  const { orderId } = useParams({ from: "/orders/$orderId" });
  const order = MOCK_ORDERS[orderId];
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [currentPaymentStatus, setCurrentPaymentStatus] =
    useState<PaymentStatus | null>(null);

  const isActiveOrder =
    order?.status === "InTransit" || order?.status === "Accepted";
  const { data: courierLocation, isLoading: courierLoading } =
    useCourierLocation(orderId, isActiveOrder);

  if (!order) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="text-center py-20 text-muted-foreground">
            {t("misc.error", lang)}
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  const progress = getProgress(order.status);
  const [pickupLat, pickupLng] = addressToLatLng(order.pickupAddress);
  const [dropoffLat, dropoffLng] = addressToLatLng(order.dropoffAddress);

  const distanceToDropoff =
    courierLocation != null
      ? haversineDistance(
          courierLocation.lat,
          courierLocation.lng,
          dropoffLat,
          dropoffLng,
        )
      : haversineDistance(pickupLat, pickupLng, dropoffLat, dropoffLng);

  const eta = estimateETA(distanceToDropoff);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                {t("page.orderDetail", lang)} #{order.id}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {order.itemDescription}
              </p>
            </div>
            <Badge
              className={`text-sm px-3 py-1 border ${STATUS_COLORS[order.status]}`}
            >
              <span className="flex items-center gap-1.5">
                {STATUS_ICONS[order.status]}
                {t(`status.${order.status}`, lang)}
              </span>
            </Badge>
          </div>

          {/* Progress */}
          {order.status !== "Cancelled" && (
            <Card
              className="card-elevated"
              data-ocid="order_detail.progress.card"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {lang === "ar" ? "حالة التوصيل" : "Delivery Progress"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="h-2" />
                <div className="grid grid-cols-4 gap-1">
                  {STATUS_STEPS.map((step) => {
                    const stepIdx = STATUS_STEPS.indexOf(step);
                    const currentIdx = STATUS_STEPS.indexOf(
                      order.status === "Cancelled" ? "Pending" : order.status,
                    );
                    const isDone = stepIdx <= currentIdx;
                    return (
                      <div
                        key={step}
                        className={`flex flex-col items-center gap-1 text-center ${isDone ? "text-primary" : "text-muted-foreground/40"}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] transition-smooth ${isDone ? "bg-primary/20 text-primary pulse-ring" : "bg-muted/30"}`}
                        >
                          {STATUS_ICONS[step]}
                        </div>
                        <span className="text-[10px]">
                          {t(`status.${step}`, lang)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Live Map */}
          <Card
            className="card-elevated overflow-hidden"
            data-ocid="order_detail.map.card"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  {t("map.liveTracking", lang)}
                </CardTitle>
                {isActiveOrder && isOnline && (
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-400 bg-green-500/10 border border-green-500/25 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                    {t("map.liveLabel", lang)}
                  </span>
                )}
              </div>

              {/* ETA bar — shown when in transit and online */}
              {isActiveOrder && isOnline && !courierLoading && (
                <div
                  className="flex items-center gap-2 mt-2 text-sm text-muted-foreground"
                  data-ocid="order_detail.eta.section"
                >
                  <Navigation className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>
                    {t("map.estimatedArrival", lang)}:{" "}
                    <span className="text-foreground font-medium">
                      {eta} {t("map.etaMinutes", lang)}
                    </span>
                  </span>
                  {courierLocation && (
                    <span className="text-[11px] text-muted-foreground/60 ms-auto">
                      {t("map.courierLocation", lang)}:{" "}
                      {courierLocation.lat.toFixed(4)},{" "}
                      {courierLocation.lng.toFixed(4)}
                    </span>
                  )}
                </div>
              )}

              {isActiveOrder && isOnline && courierLoading && (
                <Skeleton className="h-5 w-48 mt-2" />
              )}

              {!isActiveOrder && order.status !== "Pending" && isOnline && (
                <p className="text-[11px] text-muted-foreground mt-1">
                  {order.status === "Delivered"
                    ? lang === "ar"
                      ? "تم التوصيل بنجاح"
                      : "Successfully delivered"
                    : t("map.gpsNotAvailable", lang)}
                </p>
              )}
            </CardHeader>

            <CardContent className="p-0" data-ocid="order_detail.map.container">
              {isOnline ? (
                <LiveMap
                  pickupLat={pickupLat}
                  pickupLng={pickupLng}
                  dropoffLat={dropoffLat}
                  dropoffLng={dropoffLng}
                  courierLat={courierLocation?.lat}
                  courierLng={courierLocation?.lng}
                  height={320}
                  pickupLabel={t("map.pickupPoint", lang)}
                  dropoffLabel={t("map.dropoffPoint", lang)}
                />
              ) : (
                <div
                  className="flex flex-col items-center justify-center gap-3 p-8 text-center"
                  style={{ height: 320 }}
                  data-ocid="order_detail.map.offline_state"
                >
                  <WifiOff
                    className="w-8 h-8"
                    style={{ color: "oklch(0.6 0.15 30)" }}
                  />
                  <p className="text-sm font-medium text-muted-foreground">
                    {lang === "ar"
                      ? "التتبع المباشر يتطلب اتصالاً بالإنترنت"
                      : "Live tracking requires an internet connection"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="card-elevated">
            <CardContent className="p-4 space-y-3">
              {[
                {
                  label: t("order.pickup", lang),
                  value: order.pickupAddress,
                  icon: <MapPin className="w-3.5 h-3.5 text-primary" />,
                },
                {
                  label: t("order.dropoff", lang),
                  value: order.dropoffAddress,
                  icon: <MapPin className="w-3.5 h-3.5 text-accent" />,
                },
                {
                  label: t("order.payment", lang),
                  value: t(`payment.${order.paymentMethod}`, lang),
                  icon: (
                    <Package className="w-3.5 h-3.5 text-muted-foreground" />
                  ),
                },
                {
                  label: t("order.price", lang),
                  value: `${order.estimatedPrice} ${t("misc.egp", lang)}`,
                  icon: (
                    <Package className="w-3.5 h-3.5 text-muted-foreground" />
                  ),
                },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex-shrink-0">{row.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">
                      {row.label}
                    </p>
                    <p className="text-sm text-foreground">{row.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Section */}
          {(() => {
            const paymentStatus =
              currentPaymentStatus ?? MOCK_PAYMENT_STATUS[orderId] ?? "Pending";
            const paymentConfig = PAYMENT_STATUS_CONFIG[paymentStatus];
            return (
              <Card
                className={`card-elevated border ${paymentConfig.border}`}
                data-ocid="order_detail.payment.card"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    {PAYMENT_METHOD_ICON[order.paymentMethod]}
                    {t("payment.section", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${paymentConfig.bg} ${paymentConfig.color} border ${paymentConfig.border}`}
                    >
                      {paymentConfig.icon}
                      {t(`paymentStatus.${paymentStatus}`, lang)}
                    </span>
                    <div className="text-sm font-medium text-foreground">
                      {order.estimatedPrice} {t("misc.egp", lang)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {PAYMENT_METHOD_ICON[order.paymentMethod]}
                    {t(`payment.${order.paymentMethod}`, lang)}
                  </div>
                  {paymentStatus === "Failed" &&
                    order.paymentMethod !== "CashOnDelivery" && (
                      <Button
                        size="sm"
                        className="w-full gradient-primary text-primary-foreground font-medium"
                        onClick={() => setPaymentModalOpen(true)}
                        disabled={!isOnline}
                        data-ocid="order_detail.payment.retry_button"
                      >
                        <RefreshCw className="w-4 h-4 me-2" />
                        {!isOnline
                          ? lang === "ar"
                            ? "يتطلب الاتصال بالإنترنت"
                            : "Requires internet"
                          : t("payment.retryPayment", lang)}
                      </Button>
                    )}
                </CardContent>
              </Card>
            );
          })()}
        </div>

        {/* Retry payment modal */}
        {(() => {
          const paymentStatus =
            currentPaymentStatus ?? MOCK_PAYMENT_STATUS[orderId] ?? "Pending";
          if (
            paymentStatus !== "Failed" ||
            order.paymentMethod === "CashOnDelivery"
          )
            return null;
          return (
            <PaymentModal
              open={paymentModalOpen}
              onClose={() => setPaymentModalOpen(false)}
              method={order.paymentMethod}
              amount={order.estimatedPrice}
              orderId={BigInt(order.id)}
              onInitiatePayment={async (method, phoneNumber) => {
                await new Promise((r) => setTimeout(r, 1800));
                if (Math.random() > 0.2) {
                  setCurrentPaymentStatus("Success");
                  return {
                    ok: {
                      id: BigInt(Math.floor(Math.random() * 10000)),
                      orderId: BigInt(order.id),
                      method,
                      status: "Success" as const,
                      amount: order.estimatedPrice,
                      transactionId: `TXN${Date.now()}`,
                      phoneNumber: phoneNumber ?? undefined,
                      timestamp: BigInt(Date.now()),
                    } satisfies PaymentPublic,
                  };
                }
                return {
                  err: lang === "ar" ? "فشلت عملية الدفع" : "Payment failed",
                };
              }}
            />
          );
        })()}
      </Layout>
    </ProtectedRoute>
  );
}
