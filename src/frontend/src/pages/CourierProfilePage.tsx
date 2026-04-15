import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Phone, Star, Truck } from "lucide-react";
import { CourierLayout } from "../components/CourierLayout";
import { t } from "../i18n";
import { useCourierAuthStore } from "../store/courierAuth";
import { useLangStore } from "../store/lang";

const VEHICLE_ICONS: Record<string, string> = {
  Motorcycle: "🏍️",
  Car: "🚗",
  Bicycle: "🚲",
  Truck: "🚚",
};

export default function CourierProfilePage() {
  const { courier } = useCourierAuthStore();
  const { lang } = useLangStore();
  const dir = lang === "ar" ? "rtl" : "ltr";

  const initials = (courier?.name ?? "C")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const vehicleIcon =
    VEHICLE_ICONS[courier?.vehicleType ?? "Motorcycle"] ?? "🏍️";

  return (
    <CourierLayout>
      <div className="p-4 space-y-5" dir={dir}>
        {/* Profile header */}
        <div className="bg-gradient-to-br from-amber-600/30 to-amber-800/20 border border-amber-600/30 rounded-2xl p-5 flex flex-col items-center gap-3 text-center">
          <Avatar className="w-20 h-20 ring-4 ring-amber-500/40">
            <AvatarFallback className="text-2xl font-bold bg-amber-500 text-amber-950">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-display font-bold text-xl text-amber-100">
              {courier?.name ?? "—"}
            </h1>
            <div className="flex items-center justify-center gap-1.5 mt-1">
              <span className="text-base">{vehicleIcon}</span>
              <span className="text-sm text-amber-400">
                {t(`vehicle.${courier?.vehicleType ?? "Motorcycle"}`, lang)}
              </span>
            </div>
          </div>
          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40">
            {courier?.isAvailable
              ? lang === "ar"
                ? "متاح"
                : "Available"
              : lang === "ar"
                ? "غير متاح"
                : "Unavailable"}
          </Badge>
        </div>

        {/* Stats */}
        <Card className="bg-amber-900/30 border border-amber-700/25 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-400">
              {lang === "ar" ? "الإحصائيات" : "Statistics"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">
                  {t("courier.totalDeliveries", lang)}
                </span>
              </div>
              <span className="font-bold text-amber-100">
                {Number(courier?.totalDeliveries ?? 0)}
              </span>
            </div>
            <Separator className="bg-amber-800/40" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300">
                <Star className="w-4 h-4" />
                <span className="text-sm">
                  {lang === "ar" ? "التقييم" : "Rating"}
                </span>
              </div>
              <span className="font-bold text-amber-100">
                {(courier?.rating ?? 0).toFixed(1)} ⭐
              </span>
            </div>
            <Separator className="bg-amber-800/40" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300">
                <Truck className="w-4 h-4" />
                <span className="text-sm">
                  {lang === "ar" ? "نوع المركبة" : "Vehicle"}
                </span>
              </div>
              <span className="font-bold text-amber-100">
                {vehicleIcon}{" "}
                {t(`vehicle.${courier?.vehicleType ?? "Motorcycle"}`, lang)}
              </span>
            </div>
            {courier?.phone && (
              <>
                <Separator className="bg-amber-800/40" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">
                      {lang === "ar" ? "الهاتف" : "Phone"}
                    </span>
                  </div>
                  <span className="font-bold text-amber-100 font-mono text-sm">
                    {courier.phone}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </CourierLayout>
  );
}
