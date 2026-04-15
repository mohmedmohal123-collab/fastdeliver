import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Save, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";

export default function ProfilePage() {
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  const [loading, setLoading] = useState(false);

  const initials =
    form.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    toast.success(lang === "ar" ? "تم حفظ التغييرات" : "Changes saved");
    setLoading(false);
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-lg mx-auto space-y-5">
          <h1 className="font-display font-bold text-xl text-foreground">
            {t("page.profile", lang)}
          </h1>

          <div className="flex items-center gap-4 p-4 card-elevated rounded-xl">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-lg font-bold bg-primary/20 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">
                {form.name || "User"}
              </p>
              <p className="text-sm text-muted-foreground">{form.email}</p>
            </div>
          </div>

          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {lang === "ar" ? "معلوماتي الشخصية" : "Personal Information"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <Label>{t("auth.name", lang)}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="pl-9"
                      data-ocid="profile.name.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>{t("auth.email", lang)}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="pl-9"
                      data-ocid="profile.email.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>{t("auth.phone", lang)}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="pl-9"
                      data-ocid="profile.phone.input"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full gradient-primary text-primary-foreground gap-2"
                  disabled={loading}
                  data-ocid="profile.save.submit_button"
                >
                  <Save className="w-4 h-4" />
                  {loading ? t("misc.loading", lang) : t("btn.save", lang)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
