import { a as useLangStore, j as jsxRuntimeExports, L as Link } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-C3YREQ6T.js";
import { L as Layout, C as CirclePlus } from "./Layout-Dntny8Ic.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { P as Package } from "./package-eTRPZvLD.js";
import { C as Clock } from "./clock-CCu_JZ74.js";
import { T as TrendingUp } from "./trending-up-C5fTQ5kO.js";
import { M as MapPin } from "./map-pin-B9CCvjPC.js";
import "./index-BjaMAYyY.js";
import "./input-vd5b6MI6.js";
import "./separator-DPQRXxU6.js";
import "./index-Bf0p7smS.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
import "./backend-0agJt8Zn.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
const RECENT_ORDERS = [
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
    updatedAt: Date.now() - 18e5
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
    createdAt: Date.now() - 864e5,
    updatedAt: Date.now() - 72e6
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
    updatedAt: Date.now() - 72e5
  }
];
const STATUS_COLORS = {
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Accepted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  InTransit: "bg-primary/15 text-primary border-primary/30",
  Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
  Cancelled: "bg-destructive/15 text-destructive border-destructive/30"
};
function HomePage() {
  const { user } = useAuthStore();
  const { lang } = useLangStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground", children: [
          t("misc.greeting", lang),
          "، ",
          (user == null ? void 0 : user.name) ?? "User",
          " 👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: t("app.tagline", lang) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/new", "data-ocid": "home.new_order.primary_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gradient-primary text-primary-foreground gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
        t("btn.newOrder", lang)
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5" }),
        label: lang === "ar" ? "إجمالي الطلبات" : "Total Orders",
        value: "3",
        color: "text-primary"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
        label: lang === "ar" ? "قيد التنفيذ" : "In Progress",
        value: "1",
        color: "text-accent"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
        label: lang === "ar" ? "تم التوصيل" : "Delivered",
        value: "1",
        color: "text-green-400"
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }),
        label: lang === "ar" ? "في الطريق" : "In Transit",
        value: "1",
        color: "text-yellow-400"
      }
    ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "card-elevated",
        "data-ocid": `home.stat.item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${stat.color} mb-2`, children: stat.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: stat.label })
        ] })
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: lang === "ar" ? "أحدث الطلبات" : "Recent Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", "data-ocid": "home.view_all_orders.link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-primary text-xs",
            children: t("btn.viewAll", lang)
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: RECENT_ORDERS.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/orders/$orderId",
          params: { orderId: String(order.id) },
          "data-ocid": `home.order.item.${i + 1}`,
          className: "flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground truncate", children: [
                  "#",
                  order.id,
                  " — ",
                  order.itemDescription
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-[11px] px-2 py-0.5 border ${STATUS_COLORS[order.status]} flex-shrink-0`,
                    children: t(`status.${order.status}`, lang)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: order.dropoffAddress })
            ] })
          ]
        },
        order.id
      )) })
    ] })
  ] }) }) });
}
export {
  HomePage as default
};
