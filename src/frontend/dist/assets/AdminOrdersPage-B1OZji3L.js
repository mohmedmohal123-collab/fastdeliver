import { a as useLangStore, r as reactExports, j as jsxRuntimeExports, L as Link, b as ue } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, a as CardContent } from "./card-C3YREQ6T.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DBijvAFf.js";
import { L as Layout, S as Search } from "./Layout-Dntny8Ic.js";
import { A as AdminProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { P as Package } from "./package-eTRPZvLD.js";
import { C as CircleCheckBig } from "./circle-check-big-CNW-IDjh.js";
import { T as Truck } from "./truck-Ce5uK_7r.js";
import { C as CircleX } from "./circle-x-BIhXIxVm.js";
import { E as Eye } from "./eye-0bgos5Ci.js";
import "./index-BjaMAYyY.js";
import "./index-DOJhPgOq.js";
import "./index-Bf0p7smS.js";
import "./index-B1RiBmbl.js";
import "./index-YEkxhdur.js";
import "./separator-DPQRXxU6.js";
import "./index-Ce_J6Hsd.js";
import "./auth-DkBYC2_v.js";
import "./backend-0agJt8Zn.js";
import "./user-BS97zUFp.js";
const ORDERS = [
  {
    id: 1,
    userId: 1,
    pickupAddress: "15 شارع التحرير، القاهرة",
    dropoffAddress: "22 شارع النيل، الجيزة",
    itemDescription: "مستندات رسمية",
    paymentMethod: "VodafoneCash",
    estimatedPrice: 45,
    status: "InTransit",
    createdAt: Date.now() - 36e5,
    updatedAt: Date.now()
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
    createdAt: Date.now() - 864e5,
    updatedAt: Date.now()
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
    createdAt: Date.now() - 72e5,
    updatedAt: Date.now()
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
    createdAt: Date.now() - 108e5,
    updatedAt: Date.now()
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
    createdAt: Date.now() - 18e5,
    updatedAt: Date.now()
  }
];
const STATUS_COLORS = {
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Accepted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  InTransit: "bg-primary/15 text-primary border-primary/30",
  Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30"
};
function AdminOrdersPage() {
  const { lang } = useLangStore();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [orders, setOrders] = reactExports.useState(ORDERS);
  const filtered = orders.filter((o) => {
    const matchSearch = !search || o.itemDescription.includes(search) || String(o.id).includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });
  function updateStatus(id, status) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    ue.success(
      lang === "ar" ? "تم تحديث حالة الطلب" : "Order status updated"
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { variant: "admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.adminOrders", lang) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: t("nav.search", lang),
            className: "pl-9",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            "data-ocid": "admin_orders.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-40",
            "data-ocid": "admin_orders.status.select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectValue,
              {
                placeholder: lang === "ar" ? "الحالة" : "Status"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: lang === "ar" ? "الكل" : "All" }),
          [
            "Pending",
            "Accepted",
            "InTransit",
            "Delivered",
            "Cancelled"
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: t(`status.${s}`, lang) }, s))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "card-elevated",
        "data-ocid": `admin_orders.order.item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-foreground", children: [
                "#",
                order.id,
                " — ",
                order.itemDescription
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                order.pickupAddress,
                " → ",
                order.dropoffAddress
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                t(`payment.${order.paymentMethod}`, lang),
                " ·",
                " ",
                order.estimatedPrice,
                " ",
                t("misc.egp", lang)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-[11px] px-2 py-0.5 border ${STATUS_COLORS[order.status]}`,
                children: t(`status.${order.status}`, lang)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              order.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "w-7 h-7 text-blue-400 hover:bg-blue-400/10",
                  onClick: () => updateStatus(order.id, "Accepted"),
                  "data-ocid": `admin_orders.accept.button.${i + 1}`,
                  "aria-label": lang === "ar" ? `قبول الطلب #${order.id}` : `Accept order #${order.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" })
                }
              ),
              order.status === "Accepted" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "w-7 h-7 text-primary hover:bg-primary/10",
                  onClick: () => updateStatus(order.id, "InTransit"),
                  "data-ocid": `admin_orders.transit.button.${i + 1}`,
                  "aria-label": lang === "ar" ? `بدء توصيل الطلب #${order.id}` : `Mark order #${order.id} in transit`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3.5 h-3.5" })
                }
              ),
              order.status === "InTransit" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "w-7 h-7 text-green-400 hover:bg-green-400/10",
                  onClick: () => updateStatus(order.id, "Delivered"),
                  "data-ocid": `admin_orders.deliver.button.${i + 1}`,
                  "aria-label": lang === "ar" ? `تأكيد تسليم الطلب #${order.id}` : `Mark order #${order.id} as delivered`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" })
                }
              ),
              (order.status === "Pending" || order.status === "Accepted") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "icon",
                  variant: "ghost",
                  className: "w-7 h-7 text-destructive hover:bg-destructive/10",
                  onClick: () => updateStatus(order.id, "Cancelled"),
                  "data-ocid": `admin_orders.cancel.button.${i + 1}`,
                  "aria-label": lang === "ar" ? `إلغاء الطلب #${order.id}` : `Cancel order #${order.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/orders/$orderId",
                  params: { orderId: String(order.id) },
                  "data-ocid": `admin_orders.view.button.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "w-7 h-7",
                      "aria-label": lang === "ar" ? `عرض تفاصيل الطلب #${order.id}` : `View order #${order.id} details`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                    }
                  )
                }
              )
            ] })
          ] })
        ] }) })
      },
      order.id
    )) })
  ] }) }) });
}
export {
  AdminOrdersPage as default
};
