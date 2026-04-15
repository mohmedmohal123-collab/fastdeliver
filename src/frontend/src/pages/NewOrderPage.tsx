import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  CreditCard,
  MapPin,
  Package,
  Smartphone,
  Wallet,
  WifiOff,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { PaymentModal } from "../components/PaymentModal";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import type { PaymentMethod, PaymentPublic } from "../types";

const PAYMENT_OPTIONS: {
  method: PaymentMethod;
  icon: React.ReactNode;
  color: string;
  bgActive: string;
  borderActive: string;
}[] = [
  {
    method: "VodafoneCash",
    icon: <Smartphone className="w-5 h-5" />,
    color: "text-red-400",
    bgActive: "bg-red-500/10",
    borderActive: "border-red-500/60",
  },
  {
    method: "CashOnDelivery",
    icon: <Banknote className="w-5 h-5" />,
    color: "text-green-400",
    bgActive: "bg-green-500/10",
    borderActive: "border-green-500/60",
  },
  {
    method: "InstaPay",
    icon: <Wallet className="w-5 h-5" />,
    color: "text-blue-400",
    bgActive: "bg-blue-500/10",
    borderActive: "border-blue-500/60",
  },
  {
    method: "BankVisa",
    icon: <CreditCard className="w-5 h-5" />,
    color: "text-indigo-400",
    bgActive: "bg-indigo-500/10",
    borderActive: "border-indigo-500/60",
  },
];

const ESTIMATED_PRICE = 45;

export default function NewOrderPage() {
  const { lang } = useLangStore();
  useAuthStore(); // kept for future backend integration
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    item: "",
    payment: "" as PaymentMethod | "",
  });
  const [loading, setLoading] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<bigint | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  function setField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.payment) {
      toast.error(
        lang === "ar"
          ? "يرجى اختيار طريقة الدفع"
          : "Please select payment method",
      );
      return;
    }
    setLoading(true);
    try {
      // Simulate order creation
      await new Promise((r) => setTimeout(r, 900));
      const mockOrderId = BigInt(Math.floor(Math.random() * 1000) + 1);
      setCreatedOrderId(mockOrderId);

      toast.success(
        lang === "ar" ? "تم إنشاء الطلب بنجاح" : "Order created successfully",
      );

      // If not cash on delivery, open payment modal
      if (form.payment !== "CashOnDelivery") {
        setPaymentModalOpen(true);
      } else {
        navigate({ to: "/orders" });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleInitiatePayment(
    method: PaymentMethod,
    phoneNumber: string | null,
  ): Promise<{ ok?: PaymentPublic; err?: string }> {
    await new Promise((r) => setTimeout(r, 1800));
    if (Math.random() > 0.1) {
      return {
        ok: {
          id: BigInt(Math.floor(Math.random() * 10000)),
          orderId: createdOrderId ?? BigInt(1),
          method,
          status: "Success",
          amount: ESTIMATED_PRICE,
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
  }

  const selectedOption = PAYMENT_OPTIONS.find((o) => o.method === form.payment);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-xl mx-auto space-y-5">
          <h1 className="font-display font-bold text-xl text-foreground">
            {t("page.newOrder", lang)}
          </h1>

          {/* Offline blocker */}
          {!isOnline && (
            <div
              className="flex flex-col items-center gap-3 rounded-2xl border p-8 text-center"
              data-ocid="new_order.offline_state"
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
                  ? "إنشاء الطلبات يتطلب الاتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مجدداً."
                  : "Creating orders requires an active internet connection. Please check your connection and try again."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-0">
            {/* hide form visually when offline but keep it in DOM for accessibility */}
            <div
              className={[
                "space-y-5",
                !isOnline ? "opacity-40 pointer-events-none select-none" : "",
              ].join(" ")}
            >
              {/* Addresses */}
              <Card className="card-elevated">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    {lang === "ar"
                      ? "عناوين الاستلام والتوصيل"
                      : "Pickup & Dropoff Addresses"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5 text-sm">
                      <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                      {t("order.pickup", lang)}
                    </Label>
                    <Input
                      value={form.pickup}
                      onChange={(e) => setField("pickup", e.target.value)}
                      placeholder={
                        lang === "ar"
                          ? "أدخل عنوان الاستلام"
                          : "Enter pickup address"
                      }
                      required
                      data-ocid="new_order.pickup.input"
                    />
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-1.5 text-sm">
                      <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                      {t("order.dropoff", lang)}
                    </Label>
                    <Input
                      value={form.dropoff}
                      onChange={(e) => setField("dropoff", e.target.value)}
                      placeholder={
                        lang === "ar"
                          ? "أدخل عنوان التوصيل"
                          : "Enter dropoff address"
                      }
                      required
                      data-ocid="new_order.dropoff.input"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Item */}
              <Card className="card-elevated">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    {t("order.item", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={form.item}
                    onChange={(e) => setField("item", e.target.value)}
                    placeholder={
                      lang === "ar"
                        ? "صف ما تريد إرساله..."
                        : "Describe what you want to send..."
                    }
                    className="resize-none"
                    rows={3}
                    required
                    data-ocid="new_order.item.textarea"
                  />
                </CardContent>
              </Card>

              {/* Payment */}
              <Card className="card-elevated">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">
                    {t("order.payment", lang)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.method}
                      type="button"
                      onClick={() => setField("payment", opt.method)}
                      data-ocid={`new_order.payment.${opt.method.toLowerCase()}`}
                      className={[
                        "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-smooth text-center",
                        form.payment === opt.method
                          ? `${opt.bgActive} ${opt.borderActive} ${opt.color}`
                          : "border-border bg-muted/20 text-muted-foreground hover:border-primary/30",
                      ].join(" ")}
                    >
                      {opt.icon}
                      <span className="text-xs font-medium">
                        {t(`payment.${opt.method}`, lang)}
                      </span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Pay Now summary */}
              {form.payment && (
                <Card
                  className={`card-elevated border ${selectedOption?.borderActive ?? "border-border"} ${selectedOption?.bgActive ?? ""}`}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        {t("payment.payNow", lang)}
                      </p>
                      <p className="font-display font-bold text-lg text-foreground">
                        {ESTIMATED_PRICE} {t("misc.egp", lang)}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 text-sm font-medium ${selectedOption?.color ?? ""}`}
                    >
                      {selectedOption?.icon}
                      {t(`payment.${form.payment}`, lang)}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button
                type="submit"
                className="w-full gradient-primary text-primary-foreground font-medium"
                disabled={loading || !isOnline}
                data-ocid="new_order.submit_button"
              >
                {loading
                  ? t("misc.loading", lang)
                  : lang === "ar"
                    ? "تأكيد الطلب"
                    : "Confirm Order"}
              </Button>
            </div>
            {/* end offline-dimmer */}
          </form>
        </div>

        {/* Payment modal after order creation */}
        {form.payment &&
          form.payment !== "CashOnDelivery" &&
          createdOrderId && (
            <PaymentModal
              open={paymentModalOpen}
              onClose={() => {
                setPaymentModalOpen(false);
                navigate({ to: "/orders" });
              }}
              method={form.payment}
              amount={ESTIMATED_PRICE}
              orderId={createdOrderId}
              onInitiatePayment={handleInitiatePayment}
            />
          )}
      </Layout>
    </ProtectedRoute>
  );
}
