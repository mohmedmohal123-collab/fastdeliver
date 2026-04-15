import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Building2,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Package,
  ShoppingBag,
  Star,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Layout } from "../components/Layout";
import { AdminProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";
import type { DashboardStats } from "../types";

const MOCK_STATS: DashboardStats = {
  totalOrders: 128,
  totalUsers: 47,
  ordersByStatus: [
    { status: "Pending", count: 12 },
    { status: "Accepted", count: 8 },
    { status: "InTransit", count: 23 },
    { status: "Delivered", count: 78 },
    { status: "Cancelled", count: 7 },
  ],
  ordersByPaymentMethod: [
    { method: "VodafoneCash", count: 45 },
    { method: "CashOnDelivery", count: 38 },
    { method: "InstaPay", count: 29 },
    { method: "BankVisa", count: 16 },
  ],
  ordersLast7Days: [
    { date: "Mon", count: 14 },
    { date: "Tue", count: 18 },
    { date: "Wed", count: 12 },
    { date: "Thu", count: 22 },
    { date: "Fri", count: 19 },
    { date: "Sat", count: 27 },
    { date: "Sun", count: 16 },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  Pending: "text-gold",
  Accepted: "text-accent",
  InTransit: "text-primary",
  Delivered: "text-accent",
  Cancelled: "text-destructive",
};

export default function AdminDashboardPage() {
  const { lang } = useLangStore();

  return (
    <AdminProtectedRoute>
      <Layout variant="admin">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <h1 className="font-display font-bold text-xl text-foreground">
              {t("page.adminDashboard", lang)}
            </h1>
            <div className="flex gap-2 flex-wrap justify-end">
              <Link to="/admin/orders" data-ocid="admin.dashboard.orders.link">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Package className="w-3.5 h-3.5" />
                  {t("nav.orders", lang)}
                </Button>
              </Link>
              <Link to="/admin/users" data-ocid="admin.dashboard.users.link">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {t("nav.users", lang)}
                </Button>
              </Link>
              <Link
                to="/admin/products"
                data-ocid="admin.dashboard.products.link"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {t("nav.products", lang)}
                </Button>
              </Link>
              <Link
                to="/admin/companies"
                data-ocid="admin.dashboard.companies.link"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {t("nav.companies", lang)}
                </Button>
              </Link>
              <Link to="/admin/offers" data-ocid="admin.dashboard.offers.link">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Star className="w-3.5 h-3.5" />
                  {t("nav.offers", lang)}
                </Button>
              </Link>
              <Link
                to="/admin/broadcast"
                data-ocid="admin.dashboard.broadcast.link"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Bell className="w-3.5 h-3.5" />
                  {lang === "ar" ? "إشعارات" : "Broadcast"}
                </Button>
              </Link>
              <Link
                to="/admin/payment-settings"
                data-ocid="admin.dashboard.payment_settings.link"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  {lang === "ar" ? "إعدادات الدفع" : "Payments"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Management Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              {
                icon: <ShoppingBag className="w-5 h-5" />,
                label: lang === "ar" ? "إدارة المنتجات" : "Manage Products",
                sub:
                  lang === "ar"
                    ? "إضافة وتعديل وحذف المنتجات"
                    : "Add, edit and delete products",
                to: "/admin/products",
                ocid: "admin.manage.products.card",
                color: "text-primary",
              },
              {
                icon: <Building2 className="w-5 h-5" />,
                label: lang === "ar" ? "إدارة الشركات" : "Manage Companies",
                sub:
                  lang === "ar"
                    ? "قائمة الشركاء والمزودين"
                    : "Partner & supplier companies",
                to: "/admin/companies",
                ocid: "admin.manage.companies.card",
                color: "text-accent",
              },
              {
                icon: <Star className="w-5 h-5" />,
                label: lang === "ar" ? "إدارة العروض" : "Manage Offers",
                sub:
                  lang === "ar"
                    ? "عروض وخصومات للمستخدمين"
                    : "Discounts & promo offers",
                to: "/admin/offers",
                ocid: "admin.manage.offers.card",
                color: "text-yellow-400",
              },
              {
                icon: <Bell className="w-5 h-5" />,
                label:
                  lang === "ar" ? "إرسال إشعارات" : "Broadcast Notifications",
                sub:
                  lang === "ar"
                    ? "أرسل رسائل لمجموعات المستخدمين"
                    : "Send messages to user segments",
                to: "/admin/broadcast",
                ocid: "admin.manage.broadcast.card",
                color: "text-green-400",
              },
              {
                icon: <CreditCard className="w-5 h-5" />,
                label: lang === "ar" ? "إعدادات الدفع" : "Payment Settings",
                sub:
                  lang === "ar"
                    ? "تفعيل وإيقاف طرق الدفع"
                    : "Enable / disable payment methods",
                to: "/admin/payment-settings",
                ocid: "admin.manage.payment_settings.card",
                color: "text-blue-400",
              },
            ].map((card) => (
              <Link key={card.to} to={card.to} data-ocid={card.ocid}>
                <Card className="card-elevated hover:border-primary/50 transition-smooth cursor-pointer group h-full">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div
                      className={`${card.color} p-2.5 rounded-lg bg-muted/30 group-hover:bg-primary/10 transition-smooth`}
                    >
                      {card.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-foreground text-sm">
                        {card.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {card.sub}
                      </p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-smooth" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: <Package className="w-5 h-5" />,
                label: lang === "ar" ? "إجمالي الطلبات" : "Total Orders",
                value: MOCK_STATS.totalOrders,
                color: "text-primary",
                ocid: "admin.kpi.total_orders.card",
              },
              {
                icon: <Users className="w-5 h-5" />,
                label: lang === "ar" ? "المستخدمون" : "Users",
                value: MOCK_STATS.totalUsers,
                color: "text-accent",
                ocid: "admin.kpi.users.card",
              },
              {
                icon: <Truck className="w-5 h-5" />,
                label: lang === "ar" ? "في الطريق" : "In Transit",
                value:
                  MOCK_STATS.ordersByStatus.find(
                    (s) => s.status === "InTransit",
                  )?.count ?? 0,
                color: "text-yellow-400",
                ocid: "admin.kpi.in_transit.card",
              },
              {
                icon: <CheckCircle className="w-5 h-5" />,
                label: lang === "ar" ? "تم التوصيل" : "Delivered",
                value:
                  MOCK_STATS.ordersByStatus.find(
                    (s) => s.status === "Delivered",
                  )?.count ?? 0,
                color: "text-green-400",
                ocid: "admin.kpi.delivered.card",
              },
            ].map((kpi) => (
              <Card
                key={kpi.label}
                className="card-elevated"
                data-ocid={kpi.ocid}
              >
                <CardContent className="p-4">
                  <div className={`${kpi.color} mb-2`}>{kpi.icon}</div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {kpi.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Chart */}
            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  {lang === "ar" ? "الطلبات آخر 7 أيام" : "Orders Last 7 Days"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={MOCK_STATS.ordersLast7Days} barSize={20}>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="var(--primary)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status breakdown */}
            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  {lang === "ar" ? "توزيع الطلبات" : "Orders by Status"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {MOCK_STATS.ordersByStatus.map((s) => (
                  <div
                    key={s.status}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${STATUS_COLORS[s.status].replace("text-", "bg-")}`}
                      />
                      <span className={`text-sm ${STATUS_COLORS[s.status]}`}>
                        {t(`status.${s.status}`, lang)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/60 rounded-full"
                          style={{
                            width: `${(s.count / MOCK_STATS.totalOrders) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-foreground w-6 text-right">
                        {s.count}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment methods */}
          <Card className="card-elevated">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display">
                {lang === "ar" ? "طرق الدفع" : "Payment Methods"}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MOCK_STATS.ordersByPaymentMethod.map((pm) => (
                <div
                  key={pm.method}
                  className="p-3 rounded-lg bg-muted/20 text-center"
                >
                  <p className="text-lg font-bold text-foreground">
                    {pm.count}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t(`payment.${pm.method}`, lang)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </AdminProtectedRoute>
  );
}
