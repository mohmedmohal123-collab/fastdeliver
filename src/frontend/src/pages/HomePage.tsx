import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Package, PlusCircle, TrendingUp } from "lucide-react";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import type { Order } from "../types";

const RECENT_ORDERS: Order[] = [
  {
    id: 1,
    userId: 1,
    pickupAddress: "15 شارع التحرير، القاهرة",
    dropoffAddress: "22 شارع النيل، الجيزة",
    itemDescription: "مستندات رسمية",
    paymentMethod: "VodafoneCash",
    estimatedPrice: 45,
    status: "InTransit",
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 1800000,
  },
  {
    id: 2,
    userId: 1,
    pickupAddress: "مول العرب، 6 أكتوبر",
    dropoffAddress: "5 شارع الجامعة، المهندسين",
    itemDescription: "طرد صغير",
    paymentMethod: "CashOnDelivery",
    estimatedPrice: 60,
    status: "Delivered",
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 72000000,
  },
  {
    id: 3,
    userId: 1,
    pickupAddress: "مدينة نصر، شارع عباس العقاد",
    dropoffAddress: "وسط البلد، ميدان رمسيس",
    itemDescription: "ملابس",
    paymentMethod: "InstaPay",
    estimatedPrice: 80,
    status: "Pending",
    createdAt: Date.now() - 7200000,
    updatedAt: Date.now() - 7200000,
  },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Accepted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  InTransit: "bg-primary/15 text-primary border-primary/30",
  Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

export default function HomePage() {
  const { user } = useAuthStore();
  const { lang } = useLangStore();

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                {t("misc.greeting", lang)}، {user?.name ?? "User"} 👋
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {t("app.tagline", lang)}
              </p>
            </div>
            <Link to="/orders/new" data-ocid="home.new_order.primary_button">
              <Button className="gradient-primary text-primary-foreground gap-2">
                <PlusCircle className="w-4 h-4" />
                {t("btn.newOrder", lang)}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: <Package className="w-5 h-5" />,
                label: lang === "ar" ? "إجمالي الطلبات" : "Total Orders",
                value: "3",
                color: "text-primary",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                label: lang === "ar" ? "قيد التنفيذ" : "In Progress",
                value: "1",
                color: "text-accent",
              },
              {
                icon: <TrendingUp className="w-5 h-5" />,
                label: lang === "ar" ? "تم التوصيل" : "Delivered",
                value: "1",
                color: "text-green-400",
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: lang === "ar" ? "في الطريق" : "In Transit",
                value: "1",
                color: "text-yellow-400",
              },
            ].map((stat, i) => (
              <Card
                key={stat.label}
                className="card-elevated"
                data-ocid={`home.stat.item.${i + 1}`}
              >
                <CardContent className="p-4">
                  <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent orders */}
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="font-display text-base">
                {lang === "ar" ? "أحدث الطلبات" : "Recent Orders"}
              </CardTitle>
              <Link to="/orders" data-ocid="home.view_all_orders.link">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary text-xs"
                >
                  {t("btn.viewAll", lang)}
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {RECENT_ORDERS.map((order, i) => (
                <Link
                  key={order.id}
                  to="/orders/$orderId"
                  params={{ orderId: String(order.id) }}
                  data-ocid={`home.order.item.${i + 1}`}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-smooth"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        #{order.id} — {order.itemDescription}
                      </p>
                      <Badge
                        className={`text-[11px] px-2 py-0.5 border ${STATUS_COLORS[order.status]} flex-shrink-0`}
                      >
                        {t(`status.${order.status}`, lang)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {order.dropoffAddress}
                    </p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
