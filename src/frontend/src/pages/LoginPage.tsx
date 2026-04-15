import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, Truck, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import type { User } from "../types";

export default function LoginPage() {
  const { login } = useAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Demo auth — replace with real backend call
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: User = {
      id: 1,
      email,
      name: email.split("@")[0],
      phone: "",
      isActive: true,
      createdAt: Date.now(),
    };
    login(mockUser, "demo-token");
    toast.success(
      lang === "ar"
        ? "أهلاً وسهلاً! تم تسجيل الدخول"
        : "Welcome back! Login successful",
    );
    navigate({ to: "/home" });
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative"
      style={{ background: "var(--gradient-splash)" }}
      dir={dir}
    >
      {/* Background glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.28 35 / 0.12), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.2 200 / 0.1), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.95 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0 0) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="w-full max-w-sm space-y-6 relative z-10">
        {/* Brand section */}
        <div
          className="text-center space-y-4"
          style={{ animation: "fade-in-up 0.6s ease-out both" }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mx-auto relative">
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "var(--gradient-warm)",
                boxShadow:
                  "0 0 40px oklch(0.7 0.28 35 / 0.5), 0 16px 32px oklch(0 0 0 / 0.3)",
              }}
            />
            <Truck className="w-9 h-9 text-primary-foreground relative z-10 float-subtle" />
            {/* Badge */}
            <div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.78 0.2 200)",
                boxShadow: "0 0 10px oklch(0.78 0.2 200 / 0.7)",
              }}
            >
              <Zap className="w-2.5 h-2.5 text-accent-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">
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
              {t("app.tagline", lang)}
            </p>
          </div>
        </div>

        {/* Login card */}
        <div
          className="rounded-2xl border border-border p-6 space-y-5"
          style={{
            background: "oklch(var(--card) / 0.95)",
            boxShadow:
              "0 24px 48px oklch(0 0 0 / 0.4), 0 0 0 1px oklch(var(--border))",
            backdropFilter: "blur(20px)",
            animation: "fade-in-up 0.6s ease-out 0.15s both",
          }}
          data-ocid="login.card"
        >
          <div className="space-y-1">
            <h2 className="font-display font-semibold text-xl text-foreground">
              {t("auth.login", lang)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {lang === "ar"
                ? "أدخل بياناتك للمتابعة"
                : "Enter your credentials to continue"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                {t("auth.email", lang)}
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "oklch(var(--accent))" }}
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-muted/20 border-border focus:border-primary/50 transition-smooth h-11"
                  placeholder={
                    lang === "ar" ? "example@email.com" : "your@email.com"
                  }
                  required
                  data-ocid="login.email.input"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                {t("auth.password", lang)}
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "oklch(var(--accent))" }}
                />
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 bg-muted/20 border-border focus:border-primary/50 transition-smooth h-11"
                  placeholder="••••••••"
                  required
                  data-ocid="login.password.input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs transition-smooth"
                style={{ color: "oklch(var(--accent))" }}
              >
                {t("auth.forgotPassword", lang)}
              </button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 font-semibold text-base transition-smooth"
              style={
                loading
                  ? { opacity: 0.7, cursor: "not-allowed" }
                  : {
                      background: "var(--gradient-warm)",
                      color: "oklch(0.11 0 0)",
                      boxShadow: "var(--shadow-elevated)",
                    }
              }
              disabled={loading}
              data-ocid="login.submit_button"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "oklch(0.11 0 0 / 0.3)",
                      borderTopColor: "oklch(0.11 0 0)",
                    }}
                  />
                  {t("misc.loading", lang)}
                </span>
              ) : (
                t("auth.login", lang)
              )}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.noAccount", lang)}{" "}
            <Link
              to="/signup"
              className="font-semibold transition-smooth hover:underline"
              style={{ color: "oklch(var(--accent))" }}
              data-ocid="login.signup.link"
            >
              {t("auth.signup", lang)}
            </Link>
          </p>
        </div>

        {/* Courier & Admin links */}
        <div
          className="flex items-center justify-center gap-4 text-xs text-muted-foreground"
          style={{ animation: "fade-in-up 0.6s ease-out 0.3s both" }}
        >
          <Link
            to="/courier/login"
            className="hover:text-foreground transition-smooth"
            data-ocid="login.courier_login.link"
          >
            {t("auth.courierLogin", lang)}
          </Link>
          <span className="w-px h-3 bg-border" />
          <Link
            to="/admin/login"
            className="hover:text-foreground transition-smooth"
            data-ocid="login.admin_login.link"
          >
            {t("auth.adminLogin", lang)}
          </Link>
        </div>

        {/* Branding */}
        <p
          className="text-center text-[11px] text-muted-foreground"
          style={{ animation: "fade-in-up 0.6s ease-out 0.45s both" }}
        >
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
