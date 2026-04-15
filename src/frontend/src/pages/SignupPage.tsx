import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Mail, Phone, Truck, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import type { User as UserType } from "../types";

export default function SignupPage() {
  const { login } = useAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: UserType = {
      id: Date.now(),
      email: form.email,
      name: form.name,
      phone: form.phone,
      isActive: true,
      createdAt: Date.now(),
    };
    login(mockUser, "demo-token");
    toast.success(
      lang === "ar" ? "تم إنشاء الحساب بنجاح" : "Account created successfully",
    );
    navigate({ to: "/home" });
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      dir={dir}
    >
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary shadow-elevated mx-auto">
            <Truck className="w-7 h-7 text-primary-foreground float-subtle" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              FastDeliver
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {t("app.tagline", lang)}
            </p>
          </div>
        </div>

        <div className="card-elevated p-6 space-y-5">
          <h2 className="font-display font-semibold text-lg text-foreground">
            {t("auth.signup", lang)}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm">
                {t("auth.name", lang)}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="pl-9"
                  required
                  data-ocid="signup.name.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">
                {t("auth.email", lang)}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="pl-9"
                  required
                  data-ocid="signup.email.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm">
                {t("auth.phone", lang)}
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="pl-9"
                  required
                  data-ocid="signup.phone.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">
                {t("auth.password", lang)}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pl-9"
                  required
                  data-ocid="signup.password.input"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full gradient-primary text-primary-foreground font-medium"
              disabled={loading}
              data-ocid="signup.submit_button"
            >
              {loading ? t("misc.loading", lang) : t("auth.signup", lang)}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.hasAccount", lang)}{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
              data-ocid="signup.login.link"
            >
              {t("auth.login", lang)}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
