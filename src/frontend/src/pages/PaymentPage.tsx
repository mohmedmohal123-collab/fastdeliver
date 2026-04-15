import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  Banknote,
  CreditCard,
  MapPin,
  Package,
  Smartphone,
  Wallet,
  WifiOff,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { PaymentModal } from "../components/PaymentModal";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { t } from "../i18n";
import { mockBackend } from "../mocks/backend";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import type { PaymentMethod, PaymentPublic } from "../types";

type PaymentMethodOption = {
  method: PaymentMethod;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
};

const PAYMENT_OPTIONS: PaymentMethodOption[] = [
  {
    method: "VodafoneCash",
    icon: <Smartphone className="w-5 h-5" />,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/40",
  },
  {
    method: "InstaPay",
    icon: <Wallet className="w-5 h-5" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/40",
  },
  {
    method: "BankVisa",
    icon: <CreditCard className="w-5 h-5" />,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/40",
  },
  {
    method: "CashOnDelivery",
    icon: <Banknote className="w-5 h-5" />,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/40",
  },
];

export default function PaymentPage() {
  const { lang } = useLangStore();
  const { token } = useAuthStore();
  const { orderId } = useParams({ from: "/orders/$orderId/payment" });
  const isOnline = useOnlineStatus();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const { data: order, isLoading: orderLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!token) return null;
      return mockBackend.getOrder(token, BigInt(orderId));
    },
    enabled: !!token && !!orderId,
  });

  async function handleInitiatePayment(
    method: PaymentMethod,
    phoneNumber: string | null,
  ): Promise<{ ok?: PaymentPublic; err?: string }> {
    if (!token)
      return { err: lang === "ar" ? "يرجى تسجيل الدخول" : "Please login" };
    try {
      await new Promise((r) => setTimeout(r, 1800));
      if (Math.random() > 0.1) {
        setPaidSuccess(true);
        return {
          ok: {
            id: BigInt(Math.floor(Math.random() * 10000)),
            orderId: BigInt(orderId),
            method,
            status: "Success",
            amount: order?.estimatedPrice ?? 0,
            transactionId: `TXN${Date.now()}`,
            phoneNumber: phoneNumber ?? undefined,
            timestamp: BigInt(Date.now()),
          },
        };
      }
      return {
        err:
          lang === "ar"
            ? "فشلت عملية الدفع، يرجى المحاولة مجدداً"
            : "Payment failed, please try again",
      };
    } catch {
      return { err: lang === "ar" ? "خطأ في الاتصال" : "Connection error" };
    }
  }

  function handleMethodSelect(method: PaymentMethod) {
    setSelectedMethod(method);
    setModalOpen(true);
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-lg mx-auto space-y-5" dir={dir}>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              {t("page.payment", lang)}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {lang === "ar" ? `طلب #${orderId}` : `Order #${orderId}`}
            </p>
          </div>

          {/* Offline blocker */}
          {!isOnline && (
            <div
              className="flex flex-col items-center gap-3 rounded-2xl border p-8 text-center"
              data-ocid="payment.offline_state"
              style={{
                background: "oklch(0.4 0.18 30 / 0.08)",
                borderColor: "oklch(0.55 0.2 30 / 0.35)",
              }}
            >
              <WifiOff
                className="w-10 h-10"
                style={{ color: "oklch(0.7 0.2 30)" }}
              />
              <p className="font-display font-semibold text-foreground">
                {lang === "ar"
                  ? "تتطلب هذه الصفحة اتصالاً بالإنترنت"
                  : "Internet connection required"}
              </p>
              <p className="text-sm text-muted-foreground">
                {lang === "ar"
                  ? "عمليات الدفع تتطلب الاتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مجدداً."
                  : "Payment operations require an active internet connection. Please check your connection and try again."}
              </p>
            </div>
          )}

          {/* Content dimmed when offline */}
          <div
            className={
              !isOnline
                ? "opacity-40 pointer-events-none select-none space-y-5"
                : "space-y-5"
            }
          >
            {/* Order Summary */}
            <Card
              className="card-elevated"
              data-ocid="payment.order-summary.card"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  {t("payment.orderSummary", lang)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {orderLoading ? (
                  <div
                    className="space-y-2"
                    data-ocid="payment.order.loading_state"
                  >
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-6 w-24 mt-2" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] text-muted-foreground">
                          {t("order.pickup", lang)}
                        </p>
                        <p className="text-sm text-foreground">
                          {order?.pickupAddress ?? "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] text-muted-foreground">
                          {t("order.dropoff", lang)}
                        </p>
                        <p className="text-sm text-foreground">
                          {order?.dropoffAddress ?? "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        {t("order.price", lang)}
                      </span>
                      <span className="font-display font-bold text-lg text-primary">
                        {order?.estimatedPrice ?? 0} {t("misc.egp", lang)}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Payment success state */}
            {paidSuccess ? (
              <Card
                className="card-elevated border-green-500/30 bg-green-500/5"
                data-ocid="payment.paid.success_state"
              >
                <CardContent className="p-5 flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-label={lang === "ar" ? "نجاح" : "Success"}
                      role="img"
                    >
                      <title>{lang === "ar" ? "نجاح" : "Success"}</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold text-foreground">
                    {t("payment.success", lang)}
                  </p>
                  <Badge className="bg-green-500/15 text-green-400 border-green-500/30">
                    {order?.estimatedPrice ?? 0} {t("misc.egp", lang)}
                  </Badge>
                </CardContent>
              </Card>
            ) : (
              <Card
                className="card-elevated"
                data-ocid="payment.method-selector.card"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t("payment.selectMethod", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.method}
                      type="button"
                      onClick={() => handleMethodSelect(opt.method)}
                      data-ocid={`payment.method.${opt.method.toLowerCase()}`}
                      className={[
                        "flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-smooth text-center hover:scale-[1.02] active:scale-[0.98]",
                        `${opt.bgColor} ${opt.borderColor} ${opt.color}`,
                      ].join(" ")}
                    >
                      {opt.icon}
                      <span className="text-xs font-medium leading-tight">
                        {t(`payment.${opt.method}`, lang)}
                      </span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
          {/* end offline-dimmer */}
        </div>

        {selectedMethod && (
          <PaymentModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedMethod(null);
            }}
            method={selectedMethod}
            amount={order?.estimatedPrice ?? 0}
            orderId={BigInt(orderId)}
            onInitiatePayment={handleInitiatePayment}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
}
