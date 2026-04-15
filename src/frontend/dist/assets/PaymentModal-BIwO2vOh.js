import { a as useLangStore, r as reactExports, j as jsxRuntimeExports } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BSQ8EAJO.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { S as Smartphone, W as Wallet } from "./wallet-zZ8gU4M2.js";
import { a as CreditCard, X } from "./Layout-Dntny8Ic.js";
import { L as LoaderCircle } from "./loader-circle-CIOMiYQL.js";
import { C as CircleCheck } from "./circle-check-NZHUw46K.js";
import { R as RefreshCw } from "./refresh-cw-BTXLgn8v.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
const METHOD_CONFIG = {
  VodafoneCash: {
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" })
  },
  InstaPay: {
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" })
  },
  BankVisa: {
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" })
  },
  CashOnDelivery: {
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-5 h-5" })
  }
};
function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}
function PaymentModal({
  open,
  onClose,
  method,
  amount,
  onInitiatePayment
}) {
  const { lang } = useLangStore();
  const [state, setState] = reactExports.useState("idle");
  const [phone, setPhone] = reactExports.useState("");
  const [cardNumber, setCardNumber] = reactExports.useState("");
  const [expiry, setExpiry] = reactExports.useState("");
  const [cvv, setCvv] = reactExports.useState("");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [payment, setPayment] = reactExports.useState(null);
  const config = METHOD_CONFIG[method];
  const dir = lang === "ar" ? "rtl" : "ltr";
  function resetForm() {
    setState("idle");
    setPhone("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setErrorMsg("");
    setPayment(null);
  }
  function handleClose() {
    resetForm();
    onClose();
  }
  async function handleSubmit() {
    setState("loading");
    setErrorMsg("");
    const phoneArg = method === "VodafoneCash" || method === "InstaPay" ? phone || null : null;
    const cardData = method === "BankVisa" ? { number: cardNumber, expiry, cvv } : void 0;
    try {
      const result = await onInitiatePayment(method, phoneArg, cardData);
      if (result.ok) {
        setPayment(result.ok);
        setState("success");
      } else {
        setErrorMsg(
          result.err ?? (lang === "ar" ? "حدث خطأ غير متوقع" : "An unexpected error occurred")
        );
        setState("failed");
      }
    } catch {
      setErrorMsg(
        lang === "ar" ? "فشل الاتصال بالخادم" : "Connection to server failed"
      );
      setState("failed");
    }
  }
  const canSubmit = state === "idle" && (method === "CashOnDelivery" || method === "BankVisa" && cardNumber.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvv.length >= 3 || (method === "VodafoneCash" || method === "InstaPay") && phone.length >= 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (v) => {
        if (!v) handleClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "max-w-sm border border-border bg-card",
          dir,
          "data-ocid": "payment.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${config.color}`, children: config.icon }),
              t(`payment.${method}`, lang)
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor} border ${config.borderColor}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("payment.amount", lang) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-display font-bold text-lg ms-auto ${config.color}`,
                      children: [
                        amount,
                        " ",
                        t("misc.egp", lang)
                      ]
                    }
                  )
                ]
              }
            ),
            state === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              method === "VodafoneCash" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("payment.vodafoneInstructions", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: t("payment.phoneNumber", lang) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: phone,
                        onChange: (e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11)),
                        placeholder: "01xxxxxxxxx",
                        className: "ps-9 border-red-500/30 focus:border-red-500/60",
                        "data-ocid": "payment.phone.input"
                      }
                    )
                  ] })
                ] })
              ] }),
              method === "InstaPay" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("payment.instaPayInstructions", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-xl bg-muted/30 border border-blue-500/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1 p-2 opacity-50", children: [
                  "tl",
                  "tm",
                  "tr",
                  "ml",
                  "mm",
                  "mr",
                  "bl",
                  "bm",
                  "br"
                ].map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-5 h-5 rounded-sm ${["tl", "tr", "mm", "bl", "br"].includes(cell) ? "bg-blue-400" : "bg-muted"}`
                  },
                  cell
                )) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: t("payment.phoneNumber", lang) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: phone,
                        onChange: (e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11)),
                        placeholder: "01xxxxxxxxx",
                        className: "ps-9 border-blue-500/30 focus:border-blue-500/60",
                        "data-ocid": "payment.instapay-phone.input"
                      }
                    )
                  ] })
                ] })
              ] }),
              method === "BankVisa" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("payment.cardInstructions", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-36 rounded-2xl bg-gradient-to-br from-indigo-900/80 via-indigo-800/60 to-indigo-700/40 border border-indigo-500/30 p-4 overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 end-4 opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-5 rounded-full bg-amber-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-5 rounded-full bg-red-500 -ms-3 opacity-80" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 start-4 end-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-indigo-200/90 text-base tracking-widest", children: cardNumber || "•••• •••• •••• ••••" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-indigo-300/60", children: expiry || "MM/YY" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-indigo-300/60", children: cvv ? "•••" : "CVV" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: t("payment.cardNumber", lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: cardNumber,
                          onChange: (e) => setCardNumber(formatCardNumber(e.target.value)),
                          placeholder: "1234 5678 9012 3456",
                          className: "ps-9 font-mono border-indigo-500/30 focus:border-indigo-500/60",
                          "data-ocid": "payment.card-number.input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: t("payment.expiry", lang) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: expiry,
                          onChange: (e) => setExpiry(formatExpiry(e.target.value)),
                          placeholder: "MM/YY",
                          className: "font-mono border-indigo-500/30 focus:border-indigo-500/60",
                          "data-ocid": "payment.expiry.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: t("payment.cvv", lang) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          value: cvv,
                          onChange: (e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4)),
                          placeholder: "•••",
                          type: "password",
                          className: "font-mono border-indigo-500/30 focus:border-indigo-500/60",
                          "data-ocid": "payment.cvv.input"
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }),
              method === "CashOnDelivery" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-8 h-8 text-green-400" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: t("payment.cashInstructions", lang) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "flex-1",
                    onClick: handleClose,
                    "data-ocid": "payment.cancel_button",
                    children: t("btn.cancel", lang)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "flex-1 gradient-primary text-primary-foreground font-medium",
                    onClick: handleSubmit,
                    disabled: !canSubmit,
                    "data-ocid": "payment.confirm_button",
                    children: t("payment.confirmPayment", lang)
                  }
                )
              ] })
            ] }),
            state === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 text-primary animate-spin" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("payment.processing", lang) })
            ] }),
            state === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-4 py-4",
                "data-ocid": "payment.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center animate-in zoom-in duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-green-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: t("payment.success", lang) }),
                    (payment == null ? void 0 : payment.transactionId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      t("payment.transactionId", lang),
                      ": ",
                      payment.transactionId
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-500/15 text-green-400 border-green-500/30", children: [
                    amount,
                    " ",
                    t("misc.egp", lang)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "w-full",
                      onClick: handleClose,
                      "data-ocid": "payment.close_button",
                      children: t("payment.close", lang)
                    }
                  )
                ]
              }
            ),
            state === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-4 py-4",
                "data-ocid": "payment.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center animate-in zoom-in duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-9 h-9 text-destructive" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: t("payment.failed", lang) }),
                    errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: errorMsg })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        className: "flex-1",
                        onClick: handleClose,
                        "data-ocid": "payment.close_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 me-1" }),
                          t("payment.close", lang)
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        className: "flex-1 gradient-primary text-primary-foreground",
                        onClick: () => setState("idle"),
                        "data-ocid": "payment.retry_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 me-1" }),
                          t("payment.retry", lang)
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
export {
  Banknote as B,
  CircleAlert as C,
  PaymentModal as P
};
