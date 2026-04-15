import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  CreditCard,
  Save,
  Settings2,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { AdminProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";

interface PaymentMethodConfig {
  key: string;
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
  icon: React.ReactNode;
  iconBg: string;
  enabled: boolean;
}

const METHOD_META = [
  {
    key: "VodafoneCash",
    labelEn: "Vodafone Cash",
    labelAr: "فودافون كاش",
    descEn: "Mobile wallet payment via Vodafone Egypt",
    descAr: "الدفع عبر المحفظة الإلكترونية لفودافون مصر",
    icon: <Smartphone className="w-5 h-5" />,
    iconBg: "linear-gradient(135deg, oklch(0.6 0.22 25), oklch(0.65 0.18 30))",
  },
  {
    key: "InstaPay",
    labelEn: "InstaPay",
    labelAr: "إنستاباي",
    descEn: "Instant bank transfer via InstaPay",
    descAr: "تحويل بنكي فوري عبر إنستاباي",
    icon: <Wallet className="w-5 h-5" />,
    iconBg: "linear-gradient(135deg, oklch(0.55 0.22 250), oklch(0.6 0.2 255))",
  },
  {
    key: "BankVisa",
    labelEn: "Bank Visa",
    labelAr: "فيزا البنك",
    descEn: "Credit / debit card payment",
    descAr: "الدفع ببطاقة الائتمان أو الخصم المباشر",
    icon: <CreditCard className="w-5 h-5" />,
    iconBg: "linear-gradient(135deg, oklch(0.5 0.2 220), oklch(0.55 0.18 230))",
  },
  {
    key: "CashOnDelivery",
    labelEn: "Cash on Delivery",
    labelAr: "الدفع عند الاستلام",
    descEn: "Pay cash when your order arrives",
    descAr: "ادفع نقداً عند وصول طلبك",
    icon: <Wallet className="w-5 h-5" />,
    iconBg: "linear-gradient(135deg, oklch(0.6 0.2 140), oklch(0.65 0.18 145))",
  },
];

export default function AdminPaymentSettingsPage() {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [methods, setMethods] = useState<PaymentMethodConfig[]>(
    METHOD_META.map((m) => ({ ...m, enabled: true })),
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleMethod(key: string) {
    setMethods((prev) =>
      prev.map((m) => (m.key === key ? { ...m, enabled: !m.enabled } : m)),
    );
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setSaved(true);
      toast.success(
        lang === "ar" ? "تم حفظ إعدادات الدفع" : "Payment settings saved",
      );
    } catch {
      toast.error(
        lang === "ar" ? "فشل حفظ الإعدادات" : "Failed to save settings",
      );
    }
    setSaving(false);
  }

  const enabledCount = methods.filter((m) => m.enabled).length;

  return (
    <AdminProtectedRoute>
      <Layout variant="admin">
        <div className="space-y-6 max-w-2xl" dir={dir}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-warm)" }}
              >
                <Settings2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">
                  {t("page.adminPaymentSettings", lang)}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {lang === "ar"
                    ? "تفعيل أو إيقاف طرق الدفع للمستخدمين"
                    : "Enable or disable payment methods for users"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/admin" })}
              data-ocid="payment_settings.back.button"
            >
              {lang === "ar" ? "← رجوع" : "← Back"}
            </Button>
          </div>

          {/* Status summary */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 border border-border/40">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {lang === "ar" ? "الطرق المفعّلة:" : "Active methods:"}
              </span>
              <span className="text-sm font-bold text-foreground">
                {enabledCount}
              </span>
              <span className="text-sm text-muted-foreground">
                / {methods.length}
              </span>
            </div>
            {saved && (
              <div className="ms-auto flex items-center gap-1 text-green-400 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {lang === "ar" ? "تم الحفظ" : "Saved"}
              </div>
            )}
          </div>

          {/* Payment methods cards */}
          <Card className="card-elevated border border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display">
                {lang === "ar"
                  ? "طرق الدفع المتاحة"
                  : "Available Payment Methods"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-border/30">
              {methods.map((method, i) => (
                <div
                  key={method.key}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  data-ocid={`payment_settings.method.item.${i + 1}`}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary-foreground"
                    style={{ background: method.iconBg }}
                  >
                    {method.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {lang === "ar" ? method.labelAr : method.labelEn}
                      </p>
                      <Badge
                        variant={method.enabled ? "default" : "secondary"}
                        className={`text-[10px] px-1.5 py-0 ${method.enabled ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20" : "opacity-60"}`}
                      >
                        {method.enabled
                          ? lang === "ar"
                            ? "مفعّل"
                            : "Active"
                          : lang === "ar"
                            ? "موقوف"
                            : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {lang === "ar" ? method.descAr : method.descEn}
                    </p>
                  </div>

                  {/* Toggle */}
                  <Switch
                    checked={method.enabled}
                    onCheckedChange={() => toggleMethod(method.key)}
                    data-ocid={`payment_settings.${method.key.toLowerCase()}.switch`}
                    aria-label={
                      lang === "ar"
                        ? `تفعيل ${method.labelAr}`
                        : `Toggle ${method.labelEn}`
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Separator />

          {/* Warning for no methods */}
          {enabledCount === 0 && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
              {lang === "ar"
                ? "⚠️ تحذير: لا توجد طرق دفع مفعّلة. لن يستطيع المستخدمون إتمام الطلبات."
                : "⚠️ Warning: No payment methods are active. Users won't be able to complete orders."}
            </div>
          )}

          {/* Save button */}
          <Button
            className="w-full btn-primary gap-2"
            onClick={handleSave}
            disabled={saving}
            data-ocid="payment_settings.save_button"
          >
            {saving ? (
              lang === "ar" ? (
                "جار الحفظ..."
              ) : (
                "Saving..."
              )
            ) : (
              <>
                <Save className="w-4 h-4" />
                {lang === "ar" ? "حفظ الإعدادات" : "Save Settings"}
              </>
            )}
          </Button>
        </div>
      </Layout>
    </AdminProtectedRoute>
  );
}
