import { a as useLangStore, d as useParams, r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C3YREQ6T.js";
import { u as useQuery, P as Package } from "./package-eTRPZvLD.js";
import { u as useOnlineStatus, L as Layout, W as WifiOff, a as CreditCard } from "./Layout-Dntny8Ic.js";
import { P as PaymentModal, B as Banknote } from "./PaymentModal-BIwO2vOh.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { t } from "./index-Kcs4saGQ.js";
import { m as mockBackend } from "./backend-0agJt8Zn.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { M as MapPin } from "./map-pin-B9CCvjPC.js";
import { S as Smartphone, W as Wallet } from "./wallet-zZ8gU4M2.js";
import "./index-BjaMAYyY.js";
import "./input-vd5b6MI6.js";
import "./separator-DPQRXxU6.js";
import "./index-Bf0p7smS.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
import "./dialog-BSQ8EAJO.js";
import "./label-D9eDfi64.js";
import "./loader-circle-CIOMiYQL.js";
import "./circle-check-NZHUw46K.js";
import "./refresh-cw-BTXLgn8v.js";
const PAYMENT_OPTIONS = [
  {
    method: "VodafoneCash",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" }),
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/40"
  },
  {
    method: "InstaPay",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" }),
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/40"
  },
  {
    method: "BankVisa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/40"
  },
  {
    method: "CashOnDelivery",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5" }),
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/40"
  }
];
function PaymentPage() {
  const { lang } = useLangStore();
  const { token } = useAuthStore();
  const { orderId } = useParams({ from: "/orders/$orderId/payment" });
  const isOnline = useOnlineStatus();
  const [selectedMethod, setSelectedMethod] = reactExports.useState(
    null
  );
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [paidSuccess, setPaidSuccess] = reactExports.useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { data: order, isLoading: orderLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!token) return null;
      return mockBackend.getOrder(token, BigInt(orderId));
    },
    enabled: !!token && !!orderId
  });
  async function handleInitiatePayment(method, phoneNumber) {
    if (!token)
      return { err: lang === "ar" ? "يرجى تسجيل الدخول" : "Please login" };
    try {
      await new Promise((r) => setTimeout(r, 1800));
      if (Math.random() > 0.1) {
        setPaidSuccess(true);
        return {
          ok: {
            id: BigInt(Math.floor(Math.random() * 1e4)),
            orderId: BigInt(orderId),
            method,
            status: "Success",
            amount: (order == null ? void 0 : order.estimatedPrice) ?? 0,
            transactionId: `TXN${Date.now()}`,
            phoneNumber: phoneNumber ?? void 0,
            timestamp: BigInt(Date.now())
          }
        };
      }
      return {
        err: lang === "ar" ? "فشلت عملية الدفع، يرجى المحاولة مجدداً" : "Payment failed, please try again"
      };
    } catch {
      return { err: lang === "ar" ? "خطأ في الاتصال" : "Connection error" };
    }
  }
  function handleMethodSelect(method) {
    setSelectedMethod(method);
    setModalOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto space-y-5", dir, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.payment", lang) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: lang === "ar" ? `طلب #${orderId}` : `Order #${orderId}` })
      ] }),
      !isOnline && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-3 rounded-2xl border p-8 text-center",
          "data-ocid": "payment.offline_state",
          style: {
            background: "oklch(0.4 0.18 30 / 0.08)",
            borderColor: "oklch(0.55 0.2 30 / 0.35)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WifiOff,
              {
                className: "w-10 h-10",
                style: { color: "oklch(0.7 0.2 30)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: lang === "ar" ? "تتطلب هذه الصفحة اتصالاً بالإنترنت" : "Internet connection required" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lang === "ar" ? "عمليات الدفع تتطلب الاتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مجدداً." : "Payment operations require an active internet connection. Please check your connection and try again." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: !isOnline ? "opacity-40 pointer-events-none select-none space-y-5" : "space-y-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "card-elevated",
                "data-ocid": "payment.order-summary.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                    t("payment.orderSummary", lang)
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2.5", children: orderLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "space-y-2",
                      "data-ocid": "payment.order.loading_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 mt-2" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: t("order.pickup", lang) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: (order == null ? void 0 : order.pickupAddress) ?? "—" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: t("order.dropoff", lang) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: (order == null ? void 0 : order.dropoffAddress) ?? "—" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("order.price", lang) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg text-primary", children: [
                        (order == null ? void 0 : order.estimatedPrice) ?? 0,
                        " ",
                        t("misc.egp", lang)
                      ] })
                    ] })
                  ] }) })
                ]
              }
            ),
            paidSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "card-elevated border-green-500/30 bg-green-500/5",
                "data-ocid": "payment.paid.success_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col items-center gap-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      className: "w-8 h-8 text-green-400",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      "aria-label": lang === "ar" ? "نجاح" : "Success",
                      role: "img",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: lang === "ar" ? "نجاح" : "Success" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M5 13l4 4L19 7"
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: t("payment.success", lang) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-500/15 text-green-400 border-green-500/30", children: [
                    (order == null ? void 0 : order.estimatedPrice) ?? 0,
                    " ",
                    t("misc.egp", lang)
                  ] })
                ] })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "card-elevated",
                "data-ocid": "payment.method-selector.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: t("payment.selectMethod", lang) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-2 gap-3", children: PAYMENT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleMethodSelect(opt.method),
                      "data-ocid": `payment.method.${opt.method.toLowerCase()}`,
                      className: [
                        "flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-smooth text-center hover:scale-[1.02] active:scale-[0.98]",
                        `${opt.bgColor} ${opt.borderColor} ${opt.color}`
                      ].join(" "),
                      children: [
                        opt.icon,
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium leading-tight", children: t(`payment.${opt.method}`, lang) })
                      ]
                    },
                    opt.method
                  )) })
                ]
              }
            )
          ]
        }
      )
    ] }),
    selectedMethod && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaymentModal,
      {
        open: modalOpen,
        onClose: () => {
          setModalOpen(false);
          setSelectedMethod(null);
        },
        method: selectedMethod,
        amount: (order == null ? void 0 : order.estimatedPrice) ?? 0,
        orderId: BigInt(orderId),
        onInitiatePayment: handleInitiatePayment
      }
    )
  ] }) });
}
export {
  PaymentPage as default
};
