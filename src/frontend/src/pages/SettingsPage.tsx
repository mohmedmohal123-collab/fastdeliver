import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Bell, Languages, Moon, Shield } from "lucide-react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";

export default function SettingsPage() {
  const { lang, setLang } = useLangStore();

  function toggleLang() {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    toast.success(
      next === "ar"
        ? "تم تغيير اللغة إلى العربية"
        : "Language changed to English",
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-lg mx-auto space-y-5">
          <h1 className="font-display font-bold text-xl text-foreground">
            {t("page.settings", lang)}
          </h1>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" />
                {t("settings.language", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {lang === "ar" ? "العربية / English" : "Arabic / English"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lang === "ar"
                      ? "اللغة الحالية: العربية"
                      : "Current: English"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLang}
                  data-ocid="settings.language.toggle"
                >
                  {lang === "ar" ? "English" : "عربي"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                {t("settings.notifications", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "push",
                  label:
                    lang === "ar" ? "إشعارات الطلبات" : "Order Notifications",
                  checked: true,
                },
                {
                  id: "status",
                  label: lang === "ar" ? "تحديثات الحالة" : "Status Updates",
                  checked: true,
                },
                {
                  id: "promo",
                  label:
                    lang === "ar" ? "العروض والخصومات" : "Promotions & Offers",
                  checked: false,
                },
              ].map((item, i) => (
                <div key={item.id}>
                  {i > 0 && <Separator className="mb-4" />}
                  <div className="flex items-center justify-between">
                    <Label htmlFor={item.id} className="text-sm cursor-pointer">
                      {item.label}
                    </Label>
                    <Switch
                      id={item.id}
                      defaultChecked={item.checked}
                      data-ocid={`settings.notifications.${item.id}.switch`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Moon className="w-4 h-4 text-primary" />
                {t("settings.theme", lang)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {lang === "ar" ? "الوضع المظلم" : "Dark Mode"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lang === "ar" ? "مفعّل بشكل افتراضي" : "Enabled by default"}
                  </p>
                </div>
                <Switch
                  defaultChecked
                  data-ocid="settings.theme.dark_mode.switch"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                {lang === "ar" ? "الأمان والخصوصية" : "Security & Privacy"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-sm"
                data-ocid="settings.change_password.button"
              >
                {lang === "ar" ? "تغيير كلمة المرور" : "Change Password"}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-sm text-destructive border-destructive/30 hover:bg-destructive/10"
                data-ocid="settings.delete_account.button"
              >
                {lang === "ar" ? "حذف الحساب" : "Delete Account"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
