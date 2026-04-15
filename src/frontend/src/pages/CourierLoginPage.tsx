import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { t } from "../i18n";
import { mockBackend } from "../mocks/backend";
import { useCourierAuthStore } from "../store/courierAuth";
import { useLangStore } from "../store/lang";

export default function CourierLoginPage() {
  const { setCourier } = useCourierAuthStore();
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
      const result = await mockBackend.courierLogin(email, password);
      if (result.__kind__ === "ok") {
        setCourier(result.ok.courier, result.ok.token);
        toast.success(
          lang === "ar"
            ? `مرحباً ${result.ok.courier.name}!`
            : `Welcome, ${result.ok.courier.name}!`,
        );
        navigate({ to: "/courier" });
      } else if (result.__kind__ === "wrongCredentials") {
        setError(
          lang === "ar" ? "بيانات الدخول غير صحيحة" : "Invalid credentials",
        );
      } else if (result.__kind__ === "inactive") {
        setError(
          lang === "ar"
            ? "حسابك غير مفعّل. تواصل مع الإدارة."
            : "Your account is inactive. Contact admin.",
        );
      }
    } catch {
      setError(lang === "ar" ? "حدث خطأ في الاتصال" : "Connection error");
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen bg-amber-950 flex items-center justify-center p-4"
      dir={dir}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm space-y-6 relative z-10">
        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 shadow-xl mx-auto">
            <Truck className="w-8 h-8 text-amber-950" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-amber-100">
              FastDeliver
            </h1>
            <p className="text-sm text-amber-400 mt-1">
              {t("auth.courierLogin", lang)}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-amber-900/50 border border-amber-700/40 rounded-2xl p-6 shadow-xl backdrop-blur space-y-5">
          <h2 className="font-display font-semibold text-lg text-amber-100">
            {t("auth.courierLogin", lang)}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="courier-email" className="text-amber-200">
                {t("auth.email", lang)}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <Input
                  id="courier-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500"
                  placeholder="courier@example.com"
                  required
                  data-ocid="courier_login.email.input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="courier-password" className="text-amber-200">
                {t("auth.password", lang)}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <Input
                  id="courier-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500"
                  required
                  data-ocid="courier_login.password.input"
                />
              </div>
            </div>

            {error && (
              <p
                className="text-sm text-red-400 bg-red-950/30 border border-red-800/40 rounded-lg px-3 py-2"
                data-ocid="courier_login.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold transition-all duration-200"
              disabled={loading}
              data-ocid="courier_login.submit_button"
            >
              {loading ? t("misc.loading", lang) : t("auth.login", lang)}
            </Button>
          </form>

          <p className="text-xs text-amber-700 text-center">
            courier@fastdeliver.com / anypassword
          </p>

          <p className="text-center text-sm text-amber-400">
            {t("auth.noCourierAccount", lang)}{" "}
            <Link
              to="/courier/register"
              className="text-amber-300 hover:text-amber-100 font-medium underline underline-offset-2"
              data-ocid="courier_login.register.link"
            >
              {t("auth.courierRegister", lang)}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
