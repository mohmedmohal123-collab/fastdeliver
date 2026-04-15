import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, LogOut, Truck, User } from "lucide-react";
import type { ReactNode } from "react";
import { t } from "../i18n";
import { useCourierAuthStore } from "../store/courierAuth";
import { useLangStore } from "../store/lang";

const VEHICLE_ICONS: Record<string, string> = {
  Motorcycle: "🏍️",
  Car: "🚗",
  Bicycle: "🚲",
  Truck: "🚚",
};

interface CourierLayoutProps {
  children: ReactNode;
}

export function CourierLayout({ children }: CourierLayoutProps) {
  const { courier, logout } = useCourierAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const initials = (courier?.name ?? "C")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function handleLogout() {
    logout();
    navigate({ to: "/courier/login" });
  }

  const vehicleIcon =
    VEHICLE_ICONS[courier?.vehicleType ?? "Motorcycle"] ?? "🏍️";

  const tabs = [
    {
      path: "/courier",
      icon: <Home className="w-5 h-5" />,
      label: t("nav.home", lang),
      ocid: "courier_nav.home.link",
    },
    {
      path: "/courier/profile",
      icon: <User className="w-5 h-5" />,
      label: t("courier.profile", lang),
      ocid: "courier_nav.profile.link",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={dir}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-amber-950/90 backdrop-blur border-b border-amber-800/40 shadow-lg">
        <div className="flex items-center gap-3 px-4 h-14">
          {/* Brand */}
          <div className="flex items-center gap-2.5 flex-1">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-md flex-shrink-0">
              <Truck className="w-4 h-4 text-amber-950" />
            </div>
            <div className="min-w-0">
              <span className="font-display font-bold text-amber-100 text-sm tracking-tight leading-none">
                FastDeliver
              </span>
              <Badge className="ml-2 text-[9px] px-1 py-0 h-4 bg-amber-500/30 text-amber-300 border-amber-500/40 hover:bg-amber-500/30">
                {t("courier.title", lang)}
              </Badge>
            </div>
          </div>

          {/* Courier info */}
          {courier && (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden sm:block text-amber-200 font-medium">
                {vehicleIcon} {courier.name}
              </span>
              <Avatar className="w-8 h-8 ring-2 ring-amber-500/40">
                <AvatarFallback className="text-[10px] font-bold bg-amber-500 text-amber-950">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-amber-300 hover:text-amber-100 hover:bg-amber-800/40"
                onClick={handleLogout}
                data-ocid="courier_header.logout.button"
                aria-label={t("nav.logout", lang)}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-amber-950/95 backdrop-blur border-t border-amber-800/40 safe-area-bottom">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
          {tabs.map((tab) => {
            const isActive =
              currentPath === tab.path ||
              (tab.path !== "/courier" && currentPath.startsWith(tab.path));
            return (
              <Link
                key={tab.path}
                to={tab.path}
                data-ocid={tab.ocid}
                className={[
                  "flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-amber-400"
                    : "text-amber-600 hover:text-amber-300",
                ].join(" ")}
              >
                <span className={isActive ? "scale-110" : "scale-100"}>
                  {tab.icon}
                </span>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
