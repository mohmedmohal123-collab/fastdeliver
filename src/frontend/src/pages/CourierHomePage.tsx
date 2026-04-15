import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  MapPin,
  Package,
  RefreshCw,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CourierStats, OrderPublic } from "../backend";
import { CourierLayout } from "../components/CourierLayout";
import { t } from "../i18n";
import { mockBackend } from "../mocks/backend";
import { useCourierAuthStore } from "../store/courierAuth";
import { useLangStore } from "../store/lang";

const PAYMENT_COLORS: Record<string, string> = {
  VodafoneCash: "bg-red-500/20 text-red-300 border-red-500/30",
  CashOnDelivery: "bg-green-500/20 text-green-300 border-green-500/30",
  InstaPay: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  BankVisa: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub?: string;
}) {
  return (
    <div className="bg-amber-900/40 border border-amber-700/30 rounded-2xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-amber-500 truncate">{label}</p>
        <p className="text-xl font-bold text-amber-100 leading-tight">
          {value}
        </p>
        {sub && <p className="text-[10px] text-amber-600">{sub}</p>}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  actionLabel,
  actionOcid,
  onAction,
  loading,
  lang,
}: {
  order: OrderPublic;
  actionLabel: string;
  actionOcid: string;
  onAction: () => void;
  loading: boolean;
  lang: "ar" | "en";
}) {
  const navigate = useNavigate();
  const paymentColor =
    PAYMENT_COLORS[order.paymentMethod] ??
    "bg-muted text-muted-foreground border-border";
  const date = new Date(Number(order.createdAt) / 1_000_000);
  const timeAgo = date.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4 space-y-3 hover:border-amber-600/40 transition-all duration-200"
      data-ocid={`courier_orders.item.${order.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
            <Package className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-xs font-mono text-amber-500">#{order.id}</span>
        </div>
        <Badge className={`text-[10px] border ${paymentColor}`}>
          {t(`payment.${order.paymentMethod}`, lang)}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
          <p className="text-xs text-amber-200 leading-relaxed line-clamp-1">
            {order.pickupAddress}
          </p>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
          <p className="text-xs text-amber-200 leading-relaxed line-clamp-1">
            {order.dropoffAddress}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        <span className="text-[10px] text-amber-600">{timeAgo}</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2.5 text-xs text-amber-400 hover:text-amber-200 hover:bg-amber-800/40"
            onClick={() => navigate({ to: `/courier/orders/${order.id}` })}
            data-ocid={`courier_orders.view.${order.id}`}
          >
            {t("courier.viewOrder", lang)}
          </Button>
          <Button
            size="sm"
            className="h-7 px-3 text-xs bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold"
            onClick={onAction}
            disabled={loading}
            data-ocid={actionOcid}
          >
            {loading ? "..." : actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CourierHomePage() {
  const { courier, token } = useCourierAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["courierStats", token],
    queryFn: async () => {
      if (!token) return null;
      return mockBackend.getCourierStats(token);
    },
    enabled: !!token,
    refetchInterval: 30_000,
  });

  const { data: pendingOrders = [], isLoading: pendingLoading } = useQuery({
    queryKey: ["courierPendingOrders", token],
    queryFn: async () => {
      if (!token) return [];
      return mockBackend.getPendingOrdersForCourier(token);
    },
    enabled: !!token,
    refetchInterval: 20_000,
  });

  const { data: myOrders = [], isLoading: myLoading } = useQuery({
    queryKey: ["courierMyOrders", token],
    queryFn: async () => {
      if (!token) return [];
      return mockBackend.getMyCourierOrders(token);
    },
    enabled: !!token,
    refetchInterval: 20_000,
  });

  const acceptMutation = useMutation({
    mutationFn: async (orderId: bigint) => {
      if (!token) throw new Error("No token");
      return mockBackend.acceptOrder(token, orderId);
    },
    onSuccess: (result) => {
      if (result.__kind__ === "ok") {
        toast.success(t("courier.orderAccepted", lang));
        qc.invalidateQueries({ queryKey: ["courierPendingOrders"] });
        qc.invalidateQueries({ queryKey: ["courierMyOrders"] });
        qc.invalidateQueries({ queryKey: ["courierStats"] });
      } else if (result.__kind__ === "alreadyAssigned") {
        toast.error(
          lang === "ar" ? "الطلب محجوز بالفعل" : "Order already assigned",
        );
        qc.invalidateQueries({ queryKey: ["courierPendingOrders"] });
      } else {
        toast.error(lang === "ar" ? "حدث خطأ" : "Something went wrong");
      }
    },
    onError: () => toast.error(t("misc.error", lang)),
  });

  async function handleRefresh() {
    setRefreshing(true);
    await qc.invalidateQueries({ queryKey: ["courierPendingOrders"] });
    await qc.invalidateQueries({ queryKey: ["courierMyOrders"] });
    await qc.invalidateQueries({ queryKey: ["courierStats"] });
    setTimeout(() => setRefreshing(false), 800);
  }

  const vehicleEmoji: Record<string, string> = {
    Motorcycle: "🏍️",
    Car: "🚗",
    Bicycle: "🚲",
    Truck: "🚚",
  };

  return (
    <CourierLayout>
      <div className="p-4 space-y-5">
        {/* Courier greeting */}
        <div className="bg-gradient-to-br from-amber-600/30 to-amber-800/20 border border-amber-600/30 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-400">
                {t("misc.greeting", lang)}
              </p>
              <h1 className="font-display font-bold text-xl text-amber-100">
                {courier?.name ?? ""}
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-base">
                  {vehicleEmoji[courier?.vehicleType ?? "Motorcycle"]}
                </span>
                <span className="text-xs text-amber-400">
                  {t(`vehicle.${courier?.vehicleType ?? "Motorcycle"}`, lang)}
                </span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
              <Truck className="w-7 h-7 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Stats */}
        {statsLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl bg-amber-900/40" />
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<CheckCircle2 className="w-5 h-5" />}
              label={t("courier.totalDeliveries", lang)}
              value={Number(stats.totalDeliveries)}
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label={t("courier.thisMonth", lang)}
              value={Number(stats.completedThisMonth)}
            />
            <StatCard
              icon={<MapPin className="w-5 h-5" />}
              label={lang === "ar" ? "أجور الشهر" : "Month Earnings"}
              value={`${stats.earningsThisMonth} ${t("misc.egp", lang)}`}
            />
            <StatCard
              icon={<Zap className="w-5 h-5" />}
              label={lang === "ar" ? "التقييم" : "Rating"}
              value={`${stats.averageRating.toFixed(1)} ⭐`}
            />
          </div>
        ) : null}

        {/* Orders tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-amber-100">
              {t("page.courierOrders", lang)}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-amber-500 hover:text-amber-300 hover:bg-amber-800/30"
              onClick={handleRefresh}
              data-ocid="courier_home.refresh.button"
              aria-label={lang === "ar" ? "تحديث" : "Refresh"}
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </Button>
          </div>

          <Tabs defaultValue="new" dir={lang === "ar" ? "rtl" : "ltr"}>
            <TabsList className="w-full bg-amber-900/50 border border-amber-700/30">
              <TabsTrigger
                value="new"
                className="flex-1 text-amber-300 data-[state=active]:bg-amber-500 data-[state=active]:text-amber-950 data-[state=active]:font-semibold"
                data-ocid="courier_home.new_orders.tab"
              >
                {t("courier.newOrders", lang)}
                {pendingOrders.length > 0 && (
                  <span className="ml-1.5 bg-amber-400 text-amber-950 text-[10px] font-bold rounded-full px-1.5 py-0.5">
                    {pendingOrders.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="mine"
                className="flex-1 text-amber-300 data-[state=active]:bg-amber-500 data-[state=active]:text-amber-950 data-[state=active]:font-semibold"
                data-ocid="courier_home.my_orders.tab"
              >
                {t("courier.myOrders", lang)}
                {myOrders.length > 0 && (
                  <span className="ml-1.5 bg-amber-400 text-amber-950 text-[10px] font-bold rounded-full px-1.5 py-0.5">
                    {myOrders.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="mt-3 space-y-3">
              {pendingLoading ? (
                [0, 1].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-32 rounded-2xl bg-amber-900/40"
                  />
                ))
              ) : pendingOrders.length === 0 ? (
                <div
                  className="text-center py-10"
                  data-ocid="courier_orders.new.empty_state"
                >
                  <Package className="w-10 h-10 text-amber-700 mx-auto mb-3" />
                  <p className="text-amber-500 text-sm">
                    {t("courier.noNewOrders", lang)}
                  </p>
                </div>
              ) : (
                pendingOrders.map((order) => (
                  <OrderCard
                    key={String(order.id)}
                    order={order}
                    actionLabel={t("courier.acceptOrder", lang)}
                    actionOcid={`courier_orders.accept.${order.id}`}
                    onAction={() => acceptMutation.mutate(order.id)}
                    loading={
                      acceptMutation.isPending &&
                      acceptMutation.variables === order.id
                    }
                    lang={lang}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="mine" className="mt-3 space-y-3">
              {myLoading ? (
                [0, 1].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-32 rounded-2xl bg-amber-900/40"
                  />
                ))
              ) : myOrders.length === 0 ? (
                <div
                  className="text-center py-10"
                  data-ocid="courier_orders.mine.empty_state"
                >
                  <Truck className="w-10 h-10 text-amber-700 mx-auto mb-3" />
                  <p className="text-amber-500 text-sm">
                    {t("courier.noMyOrders", lang)}
                  </p>
                </div>
              ) : (
                myOrders.map((order) => (
                  <OrderCard
                    key={String(order.id)}
                    order={order}
                    actionLabel={t("courier.viewOrder", lang)}
                    actionOcid={`courier_orders.view_mine.${order.id}`}
                    onAction={() =>
                      navigate({ to: `/courier/orders/${order.id}` })
                    }
                    loading={false}
                    lang={lang}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CourierLayout>
  );
}
