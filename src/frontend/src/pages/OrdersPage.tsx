import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Package, PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";
import type { Order } from "../types";

const ALL_ORDERS: Order[] = [
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
    updatedAt: Date.now(),
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
    updatedAt: Date.now(),
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
    updatedAt: Date.now(),
  },
  {
    id: 4,
    userId: 1,
    pickupAddress: "الزمالك، شارع 26 يوليو",
    dropoffAddress: "مصر الجديدة، ميدان الجيش",
    itemDescription: "كتب",
    paymentMethod: "BankVisa",
    estimatedPrice: 35,
    status: "Accepted",
    createdAt: Date.now() - 10800000,
    updatedAt: Date.now(),
  },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Accepted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  InTransit: "bg-primary/15 text-primary border-primary/30",
  Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30",
};

export default function OrdersPage() {
  const { lang } = useLangStore();
  const [search, setSearch] = useState("");

  const filtered = ALL_ORDERS.filter(
    (o) =>
      o.itemDescription.includes(search) ||
      o.dropoffAddress.includes(search) ||
      String(o.id).includes(search),
  );

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-5 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="font-display font-bold text-xl text-foreground">
              {t("page.orders", lang)}
            </h1>
            <Link to="/orders/new" data-ocid="orders.new_order.primary_button">
              <Button
                className="gradient-primary text-primary-foreground gap-1.5"
                size="sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                {t("btn.newOrder", lang)}
              </Button>
            </Link>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("nav.search", lang)}
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="orders.search_input"
            />
          </div>

          {filtered.length === 0 ? (
            <div
              className="text-center py-16 space-y-3"
              data-ocid="orders.empty_state"
            >
              <Package className="w-12 h-12 mx-auto text-muted-foreground/40" />
              <p className="text-muted-foreground">{t("order.empty", lang)}</p>
              <Link to="/orders/new">
                <Button
                  size="sm"
                  className="gradient-primary text-primary-foreground"
                >
                  {t("btn.newOrder", lang)}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((order, i) => (
                <Link
                  key={order.id}
                  to="/orders/$orderId"
                  params={{ orderId: String(order.id) }}
                  data-ocid={`orders.order.item.${i + 1}`}
                >
                  <Card className="card-elevated hover:border-primary/30 transition-smooth">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-foreground">
                              #{order.id} — {order.itemDescription}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {order.pickupAddress} → {order.dropoffAddress}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {t(`payment.${order.paymentMethod}`, lang)} ·{" "}
                              {order.estimatedPrice} {t("misc.egp", lang)}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`text-[11px] px-2 py-0.5 border flex-shrink-0 ${STATUS_COLORS[order.status]}`}
                        >
                          {t(`status.${order.status}`, lang)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
