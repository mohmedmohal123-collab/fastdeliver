import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Eye,
  Package,
  Search,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { AdminProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";
import type { Order, OrderStatus } from "../types";

const ORDERS: Order[] = [
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
    userId: 2,
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
    userId: 3,
    pickupAddress: "الزمالك، شارع 26 يوليو",
    dropoffAddress: "مصر الجديدة، ميدان الجيش",
    itemDescription: "كتب",
    paymentMethod: "BankVisa",
    estimatedPrice: 35,
    status: "Accepted",
    createdAt: Date.now() - 10800000,
    updatedAt: Date.now(),
  },
  {
    id: 5,
    userId: 4,
    pickupAddress: "المعادي، شارع 9",
    dropoffAddress: "حلوان، الطريق الدائري",
    itemDescription: "أجهزة إلكترونية",
    paymentMethod: "VodafoneCash",
    estimatedPrice: 120,
    status: "Pending",
    createdAt: Date.now() - 1800000,
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

export default function AdminOrdersPage() {
  const { lang } = useLangStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orders, setOrders] = useState(ORDERS);

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.itemDescription.includes(search) ||
      String(o.id).includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function updateStatus(id: number, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success(
      lang === "ar" ? "تم تحديث حالة الطلب" : "Order status updated",
    );
  }

  return (
    <AdminProtectedRoute>
      <Layout variant="admin">
        <div className="space-y-5">
          <h1 className="font-display font-bold text-xl text-foreground">
            {t("page.adminOrders", lang)}
          </h1>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("nav.search", lang)}
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="admin_orders.search_input"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="w-40"
                data-ocid="admin_orders.status.select"
              >
                <SelectValue
                  placeholder={lang === "ar" ? "الحالة" : "Status"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {lang === "ar" ? "الكل" : "All"}
                </SelectItem>
                {(
                  [
                    "Pending",
                    "Accepted",
                    "InTransit",
                    "Delivered",
                    "Cancelled",
                  ] as OrderStatus[]
                ).map((s) => (
                  <SelectItem key={s} value={s}>
                    {t(`status.${s}`, lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filtered.map((order, i) => (
              <Card
                key={order.id}
                className="card-elevated"
                data-ocid={`admin_orders.order.item.${i + 1}`}
              >
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
                        <p className="text-xs text-muted-foreground truncate">
                          {order.pickupAddress} → {order.dropoffAddress}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t(`payment.${order.paymentMethod}`, lang)} ·{" "}
                          {order.estimatedPrice} {t("misc.egp", lang)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <Badge
                        className={`text-[11px] px-2 py-0.5 border ${STATUS_COLORS[order.status]}`}
                      >
                        {t(`status.${order.status}`, lang)}
                      </Badge>
                      <div className="flex gap-1">
                        {order.status === "Pending" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-7 h-7 text-blue-400 hover:bg-blue-400/10"
                            onClick={() => updateStatus(order.id, "Accepted")}
                            data-ocid={`admin_orders.accept.button.${i + 1}`}
                            aria-label={
                              lang === "ar"
                                ? `قبول الطلب #${order.id}`
                                : `Accept order #${order.id}`
                            }
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        {order.status === "Accepted" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-7 h-7 text-primary hover:bg-primary/10"
                            onClick={() => updateStatus(order.id, "InTransit")}
                            data-ocid={`admin_orders.transit.button.${i + 1}`}
                            aria-label={
                              lang === "ar"
                                ? `بدء توصيل الطلب #${order.id}`
                                : `Mark order #${order.id} in transit`
                            }
                          >
                            <Truck className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        {order.status === "InTransit" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-7 h-7 text-green-400 hover:bg-green-400/10"
                            onClick={() => updateStatus(order.id, "Delivered")}
                            data-ocid={`admin_orders.deliver.button.${i + 1}`}
                            aria-label={
                              lang === "ar"
                                ? `تأكيد تسليم الطلب #${order.id}`
                                : `Mark order #${order.id} as delivered`
                            }
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        {(order.status === "Pending" ||
                          order.status === "Accepted") && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-7 h-7 text-destructive hover:bg-destructive/10"
                            onClick={() => updateStatus(order.id, "Cancelled")}
                            data-ocid={`admin_orders.cancel.button.${i + 1}`}
                            aria-label={
                              lang === "ar"
                                ? `إلغاء الطلب #${order.id}`
                                : `Cancel order #${order.id}`
                            }
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <Link
                          to="/orders/$orderId"
                          params={{ orderId: String(order.id) }}
                          data-ocid={`admin_orders.view.button.${i + 1}`}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-7 h-7"
                            aria-label={
                              lang === "ar"
                                ? `عرض تفاصيل الطلب #${order.id}`
                                : `View order #${order.id} details`
                            }
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </AdminProtectedRoute>
  );
}
