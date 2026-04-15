import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Package,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { OrderPublic } from "../backend";
import { CourierLayout } from "../components/CourierLayout";
import { t } from "../i18n";
import { mockBackend } from "../mocks/backend";
import { useCourierAuthStore } from "../store/courierAuth";
import { useLangStore } from "../store/lang";
import type { OrderStatus } from "../types";

const STATUS_STEPS: OrderStatus[] = [
  "Pending",
  "Accepted",
  "PickedUp",
  "InTransit",
  "Delivered",
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Accepted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  PickedUp: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  InTransit: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Delivered: "bg-green-500/20 text-green-300 border-green-500/30",
  Cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

const PAYMENT_COLORS: Record<string, string> = {
  VodafoneCash: "bg-red-500/20 text-red-300 border-red-500/30",
  CashOnDelivery: "bg-green-500/20 text-green-300 border-green-500/30",
  InstaPay: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  BankVisa: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

function getLocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 15000 },
    );
  });
}

export default function CourierOrderDetailPage() {
  const { orderId } = useParams({ from: "/courier/orders/$orderId" });
  const { token } = useCourierAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [actionLoading, setActionLoading] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<"idle" | "getting" | "error">(
    "idle",
  );
  const dir = lang === "ar" ? "rtl" : "ltr";

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["courierMyOrders", token],
    queryFn: async () => {
      if (!token) return [];
      return mockBackend.getMyCourierOrders(token);
    },
    enabled: !!token,
  });

  const order = orders.find((o) => String(o.id) === String(orderId));

  async function handleAction(action: "pickup" | "delivery") {
    if (!token || !order) return;
    setGpsStatus("getting");
    setActionLoading(true);
    try {
      const coords = await getLocation();
      setGpsStatus("idle");
      const lat = coords.latitude;
      const lng = coords.longitude;
      const result =
        action === "pickup"
          ? await mockBackend.confirmPickup(token, order.id, lat, lng)
          : await mockBackend.confirmDelivery(token, order.id, lat, lng);

      if (result.__kind__ === "ok") {
        toast.success(
          action === "pickup"
            ? t("courier.pickupConfirmed", lang)
            : t("courier.deliveryConfirmed", lang),
        );
        qc.invalidateQueries({ queryKey: ["courierMyOrders"] });
        qc.invalidateQueries({ queryKey: ["courierStats"] });
        if (action === "delivery") {
          navigate({ to: "/courier" });
        }
      } else if (result.__kind__ === "err") {
        toast.error(result.err);
      }
    } catch (err) {
      setGpsStatus("error");
      const msg =
        err instanceof GeolocationPositionError && err.code === 1
          ? t("gps.denied", lang)
          : t("gps.error", lang);
      toast.error(msg);
    }
    setActionLoading(false);
  }

  const statusIndex = order
    ? STATUS_STEPS.indexOf(order.status as OrderStatus)
    : -1;

  return (
    <CourierLayout>
      <div className="p-4 space-y-4 max-w-lg mx-auto" dir={dir}>
        {/* Back button */}
        <Button
          variant="ghost"
          className="gap-2 text-amber-400 hover:text-amber-200 hover:bg-amber-900/40 -ml-2"
          onClick={() => navigate({ to: "/courier" })}
          data-ocid="courier_order_detail.back.button"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("btn.back", lang)}
        </Button>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 rounded-2xl bg-amber-900/40" />
            <Skeleton className="h-32 rounded-2xl bg-amber-900/40" />
            <Skeleton className="h-48 rounded-2xl bg-amber-900/40" />
          </div>
        ) : !order ? (
          <div
            className="text-center py-16"
            data-ocid="courier_order_detail.not_found"
          >
            <AlertTriangle className="w-12 h-12 text-amber-700 mx-auto mb-3" />
            <p className="text-amber-500">
              {lang === "ar" ? "الطلب غير موجود" : "Order not found"}
            </p>
          </div>
        ) : (
          <>
            {/* Header card */}
            <div className="bg-gradient-to-br from-amber-600/20 to-amber-800/10 border border-amber-600/25 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-amber-500">
                    {t("order.id", lang)}
                  </p>
                  <p className="font-mono font-bold text-amber-100 text-lg">
                    #{order.id}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge
                    className={`text-xs border ${STATUS_COLORS[order.status] ?? "bg-muted"}`}
                  >
                    {t(`status.${order.status}`, lang)}
                  </Badge>
                  <Badge
                    className={`text-[10px] border ${PAYMENT_COLORS[order.paymentMethod] ?? "bg-muted"}`}
                  >
                    {t(`payment.${order.paymentMethod}`, lang)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Clock className="w-3 h-3 text-amber-600" />
                <span className="text-xs text-amber-600">
                  {new Date(Number(order.createdAt) / 1_000_000).toLocaleString(
                    lang === "ar" ? "ar-EG" : "en-US",
                  )}
                </span>
              </div>
            </div>

            {/* Status progress */}
            {order.status !== "Cancelled" && (
              <div className="bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4">
                <h3 className="text-xs font-semibold text-amber-400 mb-3">
                  {lang === "ar" ? "حالة الطلب" : "Order Progress"}
                </h3>
                <div className="flex items-center gap-1">
                  {STATUS_STEPS.map((step, i) => {
                    const done = i <= statusIndex;
                    const current = i === statusIndex;
                    return (
                      <div
                        key={step}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <div
                          className={[
                            "w-full h-1 rounded-full",
                            done ? "bg-amber-400" : "bg-amber-800/60",
                          ].join(" ")}
                        />
                        <div
                          className={[
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            done
                              ? "border-amber-400 bg-amber-400"
                              : "border-amber-700 bg-amber-900",
                            current
                              ? "ring-2 ring-amber-400/40 ring-offset-1 ring-offset-amber-950"
                              : "",
                          ].join(" ")}
                        >
                          {done && (
                            <CheckCircle2 className="w-3 h-3 text-amber-950" />
                          )}
                        </div>
                        <span
                          className={[
                            "text-[8px] text-center leading-tight",
                            done ? "text-amber-300" : "text-amber-700",
                          ].join(" ")}
                        >
                          {t(`progress.${step}`, lang)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Address card */}
            <div className="bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs font-semibold text-amber-400">
                {lang === "ar" ? "العناوين" : "Addresses"}
              </h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
                    <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-green-300" />
                    <div className="w-0.5 h-6 bg-amber-700/50" />
                    <MapPin className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div>
                      <p className="text-[10px] text-amber-600">
                        {t("order.pickup", lang)}
                      </p>
                      <p className="text-sm text-amber-100 font-medium">
                        {order.pickupAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-amber-600">
                        {t("order.dropoff", lang)}
                      </p>
                      <p className="text-sm text-amber-100 font-medium">
                        {order.dropoffAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item description */}
            <div className="bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-semibold text-amber-400">
                  {t("order.item", lang)}
                </h3>
              </div>
              <p className="text-sm text-amber-200">{order.itemDescription}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-amber-500">
                  {t("order.price", lang)}:
                </span>
                <span className="text-sm font-semibold text-amber-300">
                  {order.estimatedPrice} {t("misc.egp", lang)}
                </span>
              </div>
            </div>

            {/* Customer info */}
            <div className="bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4">
              <h3 className="text-xs font-semibold text-amber-400 mb-3">
                {t("order.customer", lang)}
              </h3>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-amber-400">
                  {lang === "ar"
                    ? `رقم العميل: ${String(order.userId)}`
                    : `Customer ID: ${String(order.userId)}`}
                </span>
              </div>
            </div>

            {/* GPS status message */}
            {gpsStatus === "getting" && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-900/30 border border-blue-700/30">
                <Navigation className="w-4 h-4 text-blue-400 animate-pulse" />
                <p className="text-xs text-blue-300">
                  {t("gps.getting", lang)}
                </p>
              </div>
            )}
            {gpsStatus === "error" && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/30 border border-red-700/30"
                data-ocid="courier_order_detail.gps_error_state"
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-xs text-red-300">{t("gps.denied", lang)}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-3 pt-2 pb-6">
              {order.status === "Accepted" && (
                <Button
                  className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-base rounded-xl gap-2"
                  onClick={() => handleAction("pickup")}
                  disabled={actionLoading}
                  data-ocid="courier_order_detail.confirm_pickup.button"
                >
                  <Navigation className="w-4 h-4" />
                  {actionLoading
                    ? t("courier.confirming", lang)
                    : t("courier.confirmPickup", lang)}
                </Button>
              )}
              {(order.status === "PickedUp" ||
                order.status === "InTransit") && (
                <Button
                  className="w-full h-12 bg-green-600 hover:bg-green-500 text-white font-bold text-base rounded-xl gap-2"
                  onClick={() => handleAction("delivery")}
                  disabled={actionLoading}
                  data-ocid="courier_order_detail.confirm_delivery.button"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {actionLoading
                    ? t("courier.confirming", lang)
                    : t("courier.confirmDelivery", lang)}
                </Button>
              )}
              {order.status === "Delivered" && (
                <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-900/20 border border-green-700/30">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-semibold">
                    {t("courier.deliveryConfirmed", lang)}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </CourierLayout>
  );
}
