import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Building2,
  ChevronRight,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PlusCircle,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Store,
  Truck,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import { NotificationBell } from "./NotificationBell";
import { OfflineWarning } from "./OfflineWarning";

interface NavItem {
  icon: ReactNode;
  label: string;
  to: string;
  ocid: string;
}

interface LayoutProps {
  children: ReactNode;
  variant?: "user" | "admin";
  searchable?: boolean;
  onSearch?: (val: string) => void;
}

function NavLink({
  item,
  active,
  collapsed,
}: { item: NavItem; active: boolean; collapsed: boolean }) {
  return (
    <Link
      to={item.to}
      data-ocid={item.ocid}
      className={[
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth group relative",
        active
          ? "text-primary-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
      ].join(" ")}
      style={
        active
          ? {
              background: "var(--gradient-warm)",
              boxShadow: "0 4px 12px oklch(var(--primary) / 0.3)",
            }
          : {}
      }
    >
      <span className="flex-shrink-0">{item.icon}</span>
      {!collapsed && <span className="text-sm truncate">{item.label}</span>}
      {active && !collapsed && (
        <ChevronRight className="ml-auto w-3.5 h-3.5 opacity-70" />
      )}
    </Link>
  );
}

export function Layout({
  children,
  variant = "user",
  searchable,
  onSearch,
}: LayoutProps) {
  const { user, logout, adminLogout } = useAuthStore();
  const { lang } = useLangStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const userNavItems: NavItem[] = [
    {
      icon: <Home className="w-4 h-4" />,
      label: t("nav.home", lang),
      to: "/home",
      ocid: "nav.home.link",
    },
    {
      icon: <Store className="w-4 h-4" />,
      label: t("nav.browse", lang),
      to: "/browse",
      ocid: "nav.browse.link",
    },
    {
      icon: <Package className="w-4 h-4" />,
      label: t("nav.orders", lang),
      to: "/orders",
      ocid: "nav.orders.link",
    },
    {
      icon: <PlusCircle className="w-4 h-4" />,
      label: t("nav.newOrder", lang),
      to: "/orders/new",
      ocid: "nav.new_order.link",
    },
    {
      icon: <User className="w-4 h-4" />,
      label: t("nav.profile", lang),
      to: "/profile",
      ocid: "nav.profile.link",
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: t("nav.settings", lang),
      to: "/settings",
      ocid: "nav.settings.link",
    },
  ];

  const adminNavItems: NavItem[] = [
    {
      icon: <LayoutDashboard className="w-4 h-4" />,
      label: t("nav.dashboard", lang),
      to: "/admin",
      ocid: "admin.nav.dashboard.link",
    },
    {
      icon: <Package className="w-4 h-4" />,
      label: t("nav.orders", lang),
      to: "/admin/orders",
      ocid: "admin.nav.orders.link",
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: t("nav.users", lang),
      to: "/admin/users",
      ocid: "admin.nav.users.link",
    },
    {
      icon: <ShoppingBag className="w-4 h-4" />,
      label: t("nav.products", lang),
      to: "/admin/products",
      ocid: "admin.nav.products.link",
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      label: t("nav.companies", lang),
      to: "/admin/companies",
      ocid: "admin.nav.companies.link",
    },
    {
      icon: <Star className="w-4 h-4" />,
      label: t("nav.offers", lang),
      to: "/admin/offers",
      ocid: "admin.nav.offers.link",
    },
    {
      icon: <Bell className="w-4 h-4" />,
      label: t("nav.broadcastNotifications", lang),
      to: "/admin/broadcast",
      ocid: "admin.nav.broadcast.link",
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      label: t("nav.paymentSettings", lang),
      to: "/admin/payment-settings",
      ocid: "admin.nav.payment_settings.link",
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: t("nav.settings", lang),
      to: "/settings",
      ocid: "admin.nav.settings.link",
    },
  ];

  const navItems = variant === "admin" ? adminNavItems : userNavItems;

  function handleLogout() {
    if (variant === "admin") {
      adminLogout();
    } else {
      logout();
    }
  }

  const displayName = variant === "admin" ? "Admin" : (user?.name ?? "User");
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div
      className="flex flex-col h-full border-border"
      style={{ background: "oklch(var(--sidebar))" }}
      dir={dir}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="relative flex-shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-elevated)",
            }}
          >
            <Truck className="w-5 h-5 text-primary-foreground float-subtle" />
          </div>
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full pulse-ring"
            style={{ background: "oklch(var(--accent))" }}
          />
        </div>
        {(!collapsed || isMobile) && (
          <div className="min-w-0">
            <span className="font-display font-bold text-foreground text-base tracking-tight">
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
            </span>
            {variant === "admin" && (
              <Badge
                variant="outline"
                className="ml-2 text-[10px] px-1.5 py-0 border-primary/40 text-primary"
              >
                Admin
              </Badge>
            )}
          </div>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto w-6 h-6"
            onClick={() => setCollapsed(!collapsed)}
            data-ocid="sidebar.collapse.toggle"
            aria-label={
              collapsed
                ? lang === "ar"
                  ? "توسيع الشريط الجانبي"
                  : "Expand sidebar"
                : lang === "ar"
                  ? "طي الشريط الجانبي"
                  : "Collapse sidebar"
            }
          >
            <Menu className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {/* Search */}
      {searchable && (!collapsed || isMobile) && (
        <div className="px-3 py-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder={t("nav.search", lang)}
              className="pl-8 h-8 text-sm bg-muted/30 border-border"
              onChange={(e) => onSearch?.(e.target.value)}
              data-ocid="layout.search_input"
            />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            item={item}
            active={
              currentPath === item.to ||
              (item.to !== "/home" &&
                item.to !== "/admin" &&
                currentPath.startsWith(item.to))
            }
            collapsed={collapsed && !isMobile}
          />
        ))}
      </nav>

      {/* User / Logout */}
      <div className="px-3 py-3 border-t border-border space-y-2">
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/20 border border-border/50">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback
                className="text-[11px] font-bold"
                style={{
                  background: "var(--gradient-warm)",
                  color: "oklch(0.11 0 0)",
                }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate text-foreground">
                {displayName}
              </p>
              {user?.email && (
                <p className="text-[11px] text-muted-foreground truncate">
                  {user.email}
                </p>
              )}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={handleLogout}
          data-ocid="sidebar.logout.button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-smooth text-sm font-medium"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {(!collapsed || isMobile) && <span>{t("nav.logout", lang)}</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex" dir={dir}>
      {/* Desktop Sidebar */}
      <aside
        className={[
          "hidden lg:flex flex-col border-r border-border transition-smooth flex-shrink-0",
          collapsed ? "w-16" : "w-64",
        ].join(" ")}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className="sticky top-0 z-40 border-b border-border"
          style={{
            background: "oklch(var(--card))",
            boxShadow: "var(--shadow-subtle)",
          }}
        >
          <div className="flex items-center gap-3 px-4 h-14">
            {/* Mobile menu */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden w-8 h-8"
                  data-ocid="header.mobile_menu.button"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={lang === "ar" ? "right" : "left"}
                className="p-0 w-72"
                style={{ background: "oklch(var(--sidebar))" }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 w-7 h-7"
                  onClick={() => setSidebarOpen(false)}
                  data-ocid="sidebar.close.button"
                >
                  <X className="w-4 h-4" />
                </Button>
                <SidebarContent isMobile />
              </SheetContent>
            </Sheet>

            {/* Mobile brand */}
            <div className="flex lg:hidden items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "var(--gradient-warm)" }}
              >
                <Truck className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-sm text-foreground">
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
              </span>
            </div>

            <div className="flex-1" />

            {/* Header right */}
            <div className="flex items-center gap-2">
              <NotificationBell />
              <Separator orientation="vertical" className="h-6" />
              <Avatar className="w-7 h-7 cursor-pointer">
                <AvatarFallback
                  className="text-[10px] font-bold"
                  style={{
                    background: "var(--gradient-warm)",
                    color: "oklch(0.11 0 0)",
                  }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Offline warning */}
        <OfflineWarning />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>

        {/* Footer */}
        <footer
          className="border-t border-border px-6 py-3 text-center"
          style={{ background: "oklch(var(--card))" }}
        >
          <p className="text-[11px] text-muted-foreground">
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
        </footer>
      </div>
    </div>
  );
}
