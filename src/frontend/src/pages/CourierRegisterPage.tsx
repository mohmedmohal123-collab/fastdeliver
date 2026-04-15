import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, Phone, Truck, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { t } from "../i18n";
import { mockBackend } from "../mocks/backend";
import { useLangStore } from "../store/lang";
import type { VehicleType } from "../types";

const VEHICLE_TYPES: {
  value: VehicleType;
  labelAr: string;
  labelEn: string;
}[] = [
  { value: "Motorcycle", labelAr: "دراجة نارية", labelEn: "Motorcycle" },
  { value: "Car", labelAr: "سيارة", labelEn: "Car" },
  { value: "Bicycle", labelAr: "دراجة", labelEn: "Bicycle" },
  { value: "Truck", labelAr: "شاحنة", labelEn: "Truck" },
];

export default function CourierRegisterPage() {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicleType: "" as VehicleType | "",
  });
  const dir = lang === "ar" ? "rtl" : "ltr";

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.vehicleType) {
      setError(
        lang === "ar"
          ? "يرجى اختيار نوع المركبة"
          : "Please select vehicle type",
      );
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await mockBackend.registerCourier(
        form.name,
        form.phone,
        form.email,
        form.password,
        form.vehicleType,
      );
      if (result.__kind__ === "ok") {
        toast.success(
          lang === "ar"
            ? "تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن."
            : "Registration successful! You can now login.",
        );
        navigate({ to: "/courier/login" });
      } else if (result.__kind__ === "err") {
        setError(result.err);
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
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
              {t("auth.courierRegister", lang)}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-amber-900/50 border border-amber-700/40 rounded-2xl p-6 shadow-xl backdrop-blur space-y-5">
          <h2 className="font-display font-semibold text-lg text-amber-100">
            {t("auth.courierRegister", lang)}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="c-name" className="text-amber-200">
                {t("auth.name", lang)}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <Input
                  id="c-name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500"
                  required
                  data-ocid="courier_register.name.input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="c-email" className="text-amber-200">
                {t("auth.email", lang)}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <Input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500"
                  required
                  data-ocid="courier_register.email.input"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="c-phone" className="text-amber-200">
                {t("auth.phone", lang)}
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <Input
                  id="c-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500"
                  required
                  data-ocid="courier_register.phone.input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="c-password" className="text-amber-200">
                {t("auth.password", lang)}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                <Input
                  id="c-password"
                  type="password"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  className="pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500"
                  required
                  minLength={6}
                  data-ocid="courier_register.password.input"
                />
              </div>
            </div>

            {/* Vehicle type */}
            <div className="space-y-1.5">
              <Label className="text-amber-200">
                {t("auth.vehicleType", lang)}
              </Label>
              <Select
                value={form.vehicleType}
                onValueChange={(v) => set("vehicleType", v)}
              >
                <SelectTrigger
                  className="bg-amber-950/60 border-amber-700/50 text-amber-100 focus:border-amber-500"
                  data-ocid="courier_register.vehicle.select"
                >
                  <SelectValue
                    placeholder={
                      lang === "ar" ? "اختر نوع المركبة" : "Select vehicle type"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-amber-950 border-amber-700/50">
                  {VEHICLE_TYPES.map((vt) => (
                    <SelectItem
                      key={vt.value}
                      value={vt.value}
                      className="text-amber-100 focus:bg-amber-800/60 focus:text-amber-100"
                      data-ocid={`courier_register.vehicle.${vt.value.toLowerCase()}`}
                    >
                      {lang === "ar" ? vt.labelAr : vt.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p
                className="text-sm text-red-400 bg-red-950/30 border border-red-800/40 rounded-lg px-3 py-2"
                data-ocid="courier_register.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold transition-all duration-200"
              disabled={loading}
              data-ocid="courier_register.submit_button"
            >
              {loading
                ? t("misc.loading", lang)
                : t("auth.courierRegister", lang)}
            </Button>
          </form>

          <p className="text-center text-sm text-amber-400">
            {t("auth.hasCourierAccount", lang)}{" "}
            <Link
              to="/courier/login"
              className="text-amber-300 hover:text-amber-100 font-medium underline underline-offset-2"
              data-ocid="courier_register.login.link"
            >
              {t("auth.login", lang)}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
