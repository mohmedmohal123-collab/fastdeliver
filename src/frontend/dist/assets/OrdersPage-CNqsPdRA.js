import { a as useLangStore, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, a as CardContent } from "./card-C3YREQ6T.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Layout, C as CirclePlus, S as Search } from "./Layout-Dntny8Ic.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { P as Package } from "./package-eTRPZvLD.js";
import "./index-BjaMAYyY.js";
import "./separator-DPQRXxU6.js";
import "./index-Bf0p7smS.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
import "./auth-DkBYC2_v.js";
import "./backend-0agJt8Zn.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
const ALL_ORDERS = [
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
    userId: 1,
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
    userId: 1,
    pickupAddress: "الزمالك، شارع 26 يوليو",
    dropoffAddress: "مصر الجديدة، ميدان الجيش",
    itemDescription: "كتب",
    paymentMethod: "BankVisa",
    estimatedPrice: 35,
    status: "Accepted",
    createdAt: Date.now() - 108e5,
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
function OrdersPage() {
  const { lang } = useLangStore();
  const [search, setSearch] = reactExports.useState("");
  const filtered = ALL_ORDERS.filter(
    (o) => o.itemDescription.includes(search) || o.dropoffAddress.includes(search) || String(o.id).includes(search)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-3xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.orders", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/new", "data-ocid": "orders.new_order.primary_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "gradient-primary text-primary-foreground gap-1.5",
          size: "sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
            t("btn.newOrder", lang)
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: t("nav.search", lang),
          className: "pl-9",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          "data-ocid": "orders.search_input"
        }
      )
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 space-y-3",
        "data-ocid": "orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 mx-auto text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("order.empty", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders/new", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "gradient-primary text-primary-foreground",
              children: t("btn.newOrder", lang)
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/orders/$orderId",
        params: { orderId: String(order.id) },
        "data-ocid": `orders.order.item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated hover:border-primary/30 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-foreground", children: [
                "#",
                order.id,
                " — ",
                order.itemDescription
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: [
                order.pickupAddress,
                " → ",
                order.dropoffAddress
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                t(`payment.${order.paymentMethod}`, lang),
                " ·",
                " ",
                order.estimatedPrice,
                " ",
                t("misc.egp", lang)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-[11px] px-2 py-0.5 border flex-shrink-0 ${STATUS_COLORS[order.status]}`,
              children: t(`status.${order.status}`, lang)
            }
          )
        ] }) }) })
      },
      order.id
    )) })
  ] }) }) });
}
export {
  OrdersPage as default
};
