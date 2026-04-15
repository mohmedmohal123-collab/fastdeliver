import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C3YREQ6T.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { T as Textarea } from "./textarea-QnTMgleQ.js";
import { u as useOnlineStatus, L as Layout, W as WifiOff, a as CreditCard } from "./Layout-Dntny8Ic.js";
import { P as PaymentModal, B as Banknote } from "./PaymentModal-BIwO2vOh.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { M as MapPin } from "./map-pin-B9CCvjPC.js";
import { P as Package } from "./package-eTRPZvLD.js";
import { S as Smartphone, W as Wallet } from "./wallet-zZ8gU4M2.js";
import "./avatar-C9xmNwsB.js";
import "./index-BjaMAYyY.js";
import "./separator-DPQRXxU6.js";
import "./index-Bf0p7smS.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
import "./backend-0agJt8Zn.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
import "./dialog-BSQ8EAJO.js";
import "./loader-circle-CIOMiYQL.js";
import "./circle-check-NZHUw46K.js";
import "./refresh-cw-BTXLgn8v.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
const PAYMENT_OPTIONS = [
  {
    method: "VodafoneCash",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" }),
    color: "text-red-400",
    bgActive: "bg-red-500/10",
    borderActive: "border-red-500/60"
  },
  {
    method: "CashOnDelivery",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5" }),
    color: "text-green-400",
    bgActive: "bg-green-500/10",
    borderActive: "border-green-500/60"
  },
  {
    method: "InstaPay",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" }),
    color: "text-blue-400",
    bgActive: "bg-blue-500/10",
    borderActive: "border-blue-500/60"
  },
  {
    method: "BankVisa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
    color: "text-indigo-400",
    bgActive: "bg-indigo-500/10",
    borderActive: "border-indigo-500/60"
  }
];
const ESTIMATED_PRICE = 45;
function NewOrderPage() {
  const { lang } = useLangStore();
  useAuthStore();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const [form, setForm] = reactExports.useState({
    pickup: "",
    dropoff: "",
    item: "",
    payment: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [createdOrderId, setCreatedOrderId] = reactExports.useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = reactExports.useState(false);
  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.payment) {
      ue.error(
        lang === "ar" ? "يرجى اختيار طريقة الدفع" : "Please select payment method"
      );
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      const mockOrderId = BigInt(Math.floor(Math.random() * 1e3) + 1);
      setCreatedOrderId(mockOrderId);
      ue.success(
        lang === "ar" ? "تم إنشاء الطلب بنجاح" : "Order created successfully"
      );
      if (form.payment !== "CashOnDelivery") {
        setPaymentModalOpen(true);
      } else {
        navigate({ to: "/orders" });
      }
    } finally {
      setLoading(false);
    }
  }
  async function handleInitiatePayment(method, phoneNumber) {
    await new Promise((r) => setTimeout(r, 1800));
    if (Math.random() > 0.1) {
      return {
        ok: {
          id: BigInt(Math.floor(Math.random() * 1e4)),
          orderId: createdOrderId ?? BigInt(1),
          method,
          status: "Success",
          amount: ESTIMATED_PRICE,
          transactionId: `TXN${Date.now()}`,
          phoneNumber: phoneNumber ?? void 0,
          timestamp: BigInt(Date.now())
        }
      };
    }
    return {
      err: lang === "ar" ? "فشلت عملية الدفع، يرجى المحاولة مجدداً" : "Payment failed, please try again"
    };
  }
  const selectedOption = PAYMENT_OPTIONS.find((o) => o.method === form.payment);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.newOrder", lang) }),
      !isOnline && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-3 rounded-2xl border p-8 text-center",
          "data-ocid": "new_order.offline_state",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lang === "ar" ? "إنشاء الطلبات يتطلب الاتصال بالإنترنت. يرجى التحقق من اتصالك والمحاولة مجدداً." : "Creating orders requires an active internet connection. Please check your connection and try again." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: [
            "space-y-5",
            !isOnline ? "opacity-40 pointer-events-none select-none" : ""
          ].join(" "),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-accent" }),
                lang === "ar" ? "عناوين الاستلام والتوصيل" : "Pickup & Dropoff Addresses"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary inline-block" }),
                    t("order.pickup", lang)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.pickup,
                      onChange: (e) => setField("pickup", e.target.value),
                      placeholder: lang === "ar" ? "أدخل عنوان الاستلام" : "Enter pickup address",
                      required: true,
                      "data-ocid": "new_order.pickup.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground rotate-90" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-1.5 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent inline-block" }),
                    t("order.dropoff", lang)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.dropoff,
                      onChange: (e) => setField("dropoff", e.target.value),
                      placeholder: lang === "ar" ? "أدخل عنوان التوصيل" : "Enter dropoff address",
                      required: true,
                      "data-ocid": "new_order.dropoff.input"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-primary" }),
                t("order.item", lang)
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: form.item,
                  onChange: (e) => setField("item", e.target.value),
                  placeholder: lang === "ar" ? "صف ما تريد إرساله..." : "Describe what you want to send...",
                  className: "resize-none",
                  rows: 3,
                  required: true,
                  "data-ocid": "new_order.item.textarea"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display", children: t("order.payment", lang) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid grid-cols-2 gap-3", children: PAYMENT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setField("payment", opt.method),
                  "data-ocid": `new_order.payment.${opt.method.toLowerCase()}`,
                  className: [
                    "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-smooth text-center",
                    form.payment === opt.method ? `${opt.bgActive} ${opt.borderActive} ${opt.color}` : "border-border bg-muted/20 text-muted-foreground hover:border-primary/30"
                  ].join(" "),
                  children: [
                    opt.icon,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: t(`payment.${opt.method}`, lang) })
                  ]
                },
                opt.method
              )) })
            ] }),
            form.payment && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: `card-elevated border ${(selectedOption == null ? void 0 : selectedOption.borderActive) ?? "border-border"} ${(selectedOption == null ? void 0 : selectedOption.bgActive) ?? ""}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("payment.payNow", lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-foreground", children: [
                      ESTIMATED_PRICE,
                      " ",
                      t("misc.egp", lang)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-1.5 text-sm font-medium ${(selectedOption == null ? void 0 : selectedOption.color) ?? ""}`,
                      children: [
                        selectedOption == null ? void 0 : selectedOption.icon,
                        t(`payment.${form.payment}`, lang)
                      ]
                    }
                  )
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full gradient-primary text-primary-foreground font-medium",
                disabled: loading || !isOnline,
                "data-ocid": "new_order.submit_button",
                children: loading ? t("misc.loading", lang) : lang === "ar" ? "تأكيد الطلب" : "Confirm Order"
              }
            )
          ]
        }
      ) })
    ] }),
    form.payment && form.payment !== "CashOnDelivery" && createdOrderId && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaymentModal,
      {
        open: paymentModalOpen,
        onClose: () => {
          setPaymentModalOpen(false);
          navigate({ to: "/orders" });
        },
        method: form.payment,
        amount: ESTIMATED_PRICE,
        orderId: createdOrderId,
        onInitiatePayment: handleInitiatePayment
      }
    )
  ] }) });
}
export {
  NewOrderPage as default
};
