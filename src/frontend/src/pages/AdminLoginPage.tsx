import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { t } from "../i18n";
import { mockBackend } from "../mocks/backend";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";

export default function AdminLoginPage() {
  const { adminLogin } = useAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dir = lang === "ar" ? "rtl" : "ltr";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await mockBackend.adminLoginCall(email, password);
      if (result.__kind__ === "ok") {
        adminLogin(result.ok);
        toast.success(
          lang === "ar"
            ? "مرحباً بك في لوحة التحكم"
            : "Welcome to Admin Dashboard",
        );
        navigate({ to: "/admin" });
      } else {
        setError(
          lang === "ar" ? "بيانات الدخول غير صحيحة" : "Invalid credentials",
        );
      }
    } catch {
      setError(lang === "ar" ? "حدث خطأ في الاتصال" : "Connection error");
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      dir={dir}
    >
      <div className="w-full max-w-sm space-y-6">
        {/* Logo + header */}
        <div className="text-center space-y-3">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto shadow-elevated"
            style={{ background: "var(--gradient-warm)" }}
          >
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Fast
              <span
                style={{
                  background: "var(--gradient-warm)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Deliver
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {lang === "ar" ? "لوحة تحكم المدير" : "Admin Control Panel"}
            </p>
          </div>
        </div>

        {/* Login card */}
        <div className="card-elevated p-6 space-y-5 rounded-2xl border border-border/60">
          <h2 className="font-display font-semibold text-lg text-foreground">
            {t("auth.adminLogin", lang)}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">{t("auth.email", lang)}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  placeholder={
                    lang === "ar" ? "البريد الإلكتروني" : "Email address"
                  }
                  required
                  autoComplete="email"
                  data-ocid="admin_login.email.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">{t("auth.password", lang)}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  placeholder={lang === "ar" ? "كلمة المرور" : "Password"}
                  required
                  autoComplete="current-password"
                  data-ocid="admin_login.password.input"
                />
              </div>
            </div>
            {error && (
              <p
                className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2"
                data-ocid="admin_login.error_state"
              >
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full btn-primary font-medium"
              disabled={loading}
              data-ocid="admin_login.submit_button"
            >
              {loading ? t("misc.loading", lang) : t("auth.login", lang)}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            <Link
              to="/login"
              className="text-primary hover:underline"
              data-ocid="admin_login.user_login.link"
            >
              {lang === "ar"
                ? "← العودة لتسجيل دخول المستخدم"
                : "← Back to User Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
