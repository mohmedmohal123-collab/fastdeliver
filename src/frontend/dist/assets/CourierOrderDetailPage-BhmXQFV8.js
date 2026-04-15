import { d as useParams, a as useLangStore, u as useNavigate, k as useQueryClient, r as reactExports, j as jsxRuntimeExports, S as Skeleton, b as ue } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { c as createLucideIcon, B as Button, t } from "./index-Kcs4saGQ.js";
import { u as useQuery, P as Package } from "./package-eTRPZvLD.js";
import { C as CourierLayout } from "./CourierLayout-BQ01px7D.js";
import { m as mockBackend } from "./backend-0agJt8Zn.js";
import { u as useCourierAuthStore } from "./courierAuth-PLNNCW7D.js";
import { A as ArrowLeft } from "./arrow-left-BNXvM9NM.js";
import { C as Clock } from "./clock-CCu_JZ74.js";
import { C as CircleCheck } from "./circle-check-NZHUw46K.js";
import { M as MapPin } from "./map-pin-B9CCvjPC.js";
import { U as User } from "./user-BS97zUFp.js";
import { N as Navigation } from "./navigation-C01LH9bd.js";
import "./index-BjaMAYyY.js";
import "./truck-Ce5uK_7r.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const STATUS_STEPS = [
  "Pending",
  "Accepted",
  "PickedUp",
  "InTransit",
  "Delivered"
];
const STATUS_COLORS = {
  Pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Accepted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  PickedUp: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  InTransit: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Delivered: "bg-green-500/20 text-green-300 border-green-500/30",
  Cancelled: "bg-red-500/20 text-red-300 border-red-500/30"
};
const PAYMENT_COLORS = {
  VodafoneCash: "bg-red-500/20 text-red-300 border-red-500/30",
  CashOnDelivery: "bg-green-500/20 text-green-300 border-green-500/30",
  InstaPay: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  BankVisa: "bg-purple-500/20 text-purple-300 border-purple-500/30"
};
function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 15e3 }
    );
  });
}
function CourierOrderDetailPage() {
  const { orderId } = useParams({ from: "/courier/orders/$orderId" });
  const { token } = useCourierAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [actionLoading, setActionLoading] = reactExports.useState(false);
  const [gpsStatus, setGpsStatus] = reactExports.useState(
    "idle"
  );
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["courierMyOrders", token],
    queryFn: async () => {
      if (!token) return [];
      return mockBackend.getMyCourierOrders(token);
    },
    enabled: !!token
  });
  const order = orders.find((o) => String(o.id) === String(orderId));
  async function handleAction(action) {
    if (!token || !order) return;
    setGpsStatus("getting");
    setActionLoading(true);
    try {
      const coords = await getLocation();
      setGpsStatus("idle");
      const lat = coords.latitude;
      const lng = coords.longitude;
      const result = action === "pickup" ? await mockBackend.confirmPickup(token, order.id, lat, lng) : await mockBackend.confirmDelivery(token, order.id, lat, lng);
      if (result.__kind__ === "ok") {
        ue.success(
          action === "pickup" ? t("courier.pickupConfirmed", lang) : t("courier.deliveryConfirmed", lang)
        );
        qc.invalidateQueries({ queryKey: ["courierMyOrders"] });
        qc.invalidateQueries({ queryKey: ["courierStats"] });
        if (action === "delivery") {
          navigate({ to: "/courier" });
        }
      } else if (result.__kind__ === "err") {
        ue.error(result.err);
      }
    } catch (err) {
      setGpsStatus("error");
      const msg = err instanceof GeolocationPositionError && err.code === 1 ? t("gps.denied", lang) : t("gps.error", lang);
      ue.error(msg);
    }
    setActionLoading(false);
  }
  const statusIndex = order ? STATUS_STEPS.indexOf(order.status) : -1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CourierLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-lg mx-auto", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        className: "gap-2 text-amber-400 hover:text-amber-200 hover:bg-amber-900/40 -ml-2",
        onClick: () => navigate({ to: "/courier" }),
        "data-ocid": "courier_order_detail.back.button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          t("btn.back", lang)
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl bg-amber-900/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-2xl bg-amber-900/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-2xl bg-amber-900/40" })
    ] }) : !order ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16",
        "data-ocid": "courier_order_detail.not_found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-12 h-12 text-amber-700 mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-amber-500", children: lang === "ar" ? "الطلب غير موجود" : "Order not found" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-amber-600/20 to-amber-800/10 border border-amber-600/25 rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-500", children: t("order.id", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-amber-100 text-lg", children: [
              "#",
              order.id
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-xs border ${STATUS_COLORS[order.status] ?? "bg-muted"}`,
                children: t(`status.${order.status}`, lang)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: `text-[10px] border ${PAYMENT_COLORS[order.paymentMethod] ?? "bg-muted"}`,
                children: t(`payment.${order.paymentMethod}`, lang)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-amber-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-600", children: new Date(Number(order.createdAt) / 1e6).toLocaleString(
            lang === "ar" ? "ar-EG" : "en-US"
          ) })
        ] })
      ] }),
      order.status !== "Cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-amber-400 mb-3", children: lang === "ar" ? "حالة الطلب" : "Order Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: STATUS_STEPS.map((step, i) => {
          const done = i <= statusIndex;
          const current = i === statusIndex;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: [
                      "w-full h-1 rounded-full",
                      done ? "bg-amber-400" : "bg-amber-800/60"
                    ].join(" ")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: [
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      done ? "border-amber-400 bg-amber-400" : "border-amber-700 bg-amber-900",
                      current ? "ring-2 ring-amber-400/40 ring-offset-1 ring-offset-amber-950" : ""
                    ].join(" "),
                    children: done && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-amber-950" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: [
                      "text-[8px] text-center leading-tight",
                      done ? "text-amber-300" : "text-amber-700"
                    ].join(" "),
                    children: t(`progress.${step}`, lang)
                  }
                )
              ]
            },
            step
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-amber-400", children: lang === "ar" ? "العناوين" : "Addresses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 flex-shrink-0 pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-green-400 border-2 border-green-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0.5 h-6 bg-amber-700/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-amber-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-amber-600", children: t("order.pickup", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-100 font-medium", children: order.pickupAddress })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-amber-600", children: t("order.dropoff", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-100 font-medium", children: order.dropoffAddress })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-amber-400", children: t("order.item", lang) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-200", children: order.itemDescription }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-500", children: [
            t("order.price", lang),
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-amber-300", children: [
            order.estimatedPrice,
            " ",
            t("misc.egp", lang)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/30 border border-amber-700/25 rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-amber-400 mb-3", children: t("order.customer", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-amber-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-amber-400", children: lang === "ar" ? `رقم العميل: ${String(order.userId)}` : `Customer ID: ${String(order.userId)}` })
        ] })
      ] }),
      gpsStatus === "getting" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-900/30 border border-blue-700/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-4 h-4 text-blue-400 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-300", children: t("gps.getting", lang) })
      ] }),
      gpsStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/30 border border-red-700/30",
          "data-ocid": "courier_order_detail.gps_error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-300", children: t("gps.denied", lang) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2 pb-6", children: [
        order.status === "Accepted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "w-full h-12 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-base rounded-xl gap-2",
            onClick: () => handleAction("pickup"),
            disabled: actionLoading,
            "data-ocid": "courier_order_detail.confirm_pickup.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-4 h-4" }),
              actionLoading ? t("courier.confirming", lang) : t("courier.confirmPickup", lang)
            ]
          }
        ),
        (order.status === "PickedUp" || order.status === "InTransit") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "w-full h-12 bg-green-600 hover:bg-green-500 text-white font-bold text-base rounded-xl gap-2",
            onClick: () => handleAction("delivery"),
            disabled: actionLoading,
            "data-ocid": "courier_order_detail.confirm_delivery.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
              actionLoading ? t("courier.confirming", lang) : t("courier.confirmDelivery", lang)
            ]
          }
        ),
        order.status === "Delivered" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-3 rounded-xl bg-green-900/20 border border-green-700/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-300 font-semibold", children: t("courier.deliveryConfirmed", lang) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  CourierOrderDetailPage as default
};
