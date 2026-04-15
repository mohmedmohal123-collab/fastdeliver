import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C3YREQ6T.js";
import { S as Separator } from "./separator-DPQRXxU6.js";
import { S as Switch } from "./switch-DnHGPG3L.js";
import { L as Layout, a as CreditCard } from "./Layout-Dntny8Ic.js";
import { A as AdminProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { C as CircleCheck } from "./circle-check-NZHUw46K.js";
import { S as Save } from "./save-BIQxLGdN.js";
import { S as Smartphone, W as Wallet } from "./wallet-zZ8gU4M2.js";
import "./index-BjaMAYyY.js";
import "./index-Bf0p7smS.js";
import "./index-YEkxhdur.js";
import "./input-vd5b6MI6.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
import "./auth-DkBYC2_v.js";
import "./package-eTRPZvLD.js";
import "./backend-0agJt8Zn.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
const METHOD_META = [
  {
    key: "VodafoneCash",
    labelEn: "Vodafone Cash",
    labelAr: "فودافون كاش",
    descEn: "Mobile wallet payment via Vodafone Egypt",
    descAr: "الدفع عبر المحفظة الإلكترونية لفودافون مصر",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5" }),
    iconBg: "linear-gradient(135deg, oklch(0.6 0.22 25), oklch(0.65 0.18 30))"
  },
  {
    key: "InstaPay",
    labelEn: "InstaPay",
    labelAr: "إنستاباي",
    descEn: "Instant bank transfer via InstaPay",
    descAr: "تحويل بنكي فوري عبر إنستاباي",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" }),
    iconBg: "linear-gradient(135deg, oklch(0.55 0.22 250), oklch(0.6 0.2 255))"
  },
  {
    key: "BankVisa",
    labelEn: "Bank Visa",
    labelAr: "فيزا البنك",
    descEn: "Credit / debit card payment",
    descAr: "الدفع ببطاقة الائتمان أو الخصم المباشر",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5" }),
    iconBg: "linear-gradient(135deg, oklch(0.5 0.2 220), oklch(0.55 0.18 230))"
  },
  {
    key: "CashOnDelivery",
    labelEn: "Cash on Delivery",
    labelAr: "الدفع عند الاستلام",
    descEn: "Pay cash when your order arrives",
    descAr: "ادفع نقداً عند وصول طلبك",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5" }),
    iconBg: "linear-gradient(135deg, oklch(0.6 0.2 140), oklch(0.65 0.18 145))"
  }
];
function AdminPaymentSettingsPage() {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [methods, setMethods] = reactExports.useState(
    METHOD_META.map((m) => ({ ...m, enabled: true }))
  );
  const [saving, setSaving] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  function toggleMethod(key) {
    setMethods(
      (prev) => prev.map((m) => m.key === key ? { ...m, enabled: !m.enabled } : m)
    );
    setSaved(false);
  }
  async function handleSave() {
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setSaved(true);
      ue.success(
        lang === "ar" ? "تم حفظ إعدادات الدفع" : "Payment settings saved"
      );
    } catch {
      ue.error(
        lang === "ar" ? "فشل حفظ الإعدادات" : "Failed to save settings"
      );
    }
    setSaving(false);
  }
  const enabledCount = methods.filter((m) => m.enabled).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { variant: "admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-xl flex items-center justify-center",
            style: { background: "var(--gradient-warm)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "w-5 h-5 text-primary-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.adminPaymentSettings", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "ar" ? "تفعيل أو إيقاف طرق الدفع للمستخدمين" : "Enable or disable payment methods for users" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => navigate({ to: "/admin" }),
          "data-ocid": "payment_settings.back.button",
          children: lang === "ar" ? "← رجوع" : "← Back"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 border border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: lang === "ar" ? "الطرق المفعّلة:" : "Active methods:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: enabledCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "/ ",
          methods.length
        ] })
      ] }),
      saved && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ms-auto flex items-center gap-1 text-green-400 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
        lang === "ar" ? "تم الحفظ" : "Saved"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated border border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-display", children: lang === "ar" ? "طرق الدفع المتاحة" : "Available Payment Methods" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-0 divide-y divide-border/30", children: methods.map((method, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-4 py-4 first:pt-0 last:pb-0",
          "data-ocid": `payment_settings.method.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary-foreground",
                style: { background: method.iconBg },
                children: method.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: lang === "ar" ? method.labelAr : method.labelEn }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: method.enabled ? "default" : "secondary",
                    className: `text-[10px] px-1.5 py-0 ${method.enabled ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20" : "opacity-60"}`,
                    children: method.enabled ? lang === "ar" ? "مفعّل" : "Active" : lang === "ar" ? "موقوف" : "Disabled"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: lang === "ar" ? method.descAr : method.descEn })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: method.enabled,
                onCheckedChange: () => toggleMethod(method.key),
                "data-ocid": `payment_settings.${method.key.toLowerCase()}.switch`,
                "aria-label": lang === "ar" ? `تفعيل ${method.labelAr}` : `Toggle ${method.labelEn}`
              }
            )
          ]
        },
        method.key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    enabledCount === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive", children: lang === "ar" ? "⚠️ تحذير: لا توجد طرق دفع مفعّلة. لن يستطيع المستخدمون إتمام الطلبات." : "⚠️ Warning: No payment methods are active. Users won't be able to complete orders." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "w-full btn-primary gap-2",
        onClick: handleSave,
        disabled: saving,
        "data-ocid": "payment_settings.save_button",
        children: saving ? lang === "ar" ? "جار الحفظ..." : "Saving..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
          lang === "ar" ? "حفظ الإعدادات" : "Save Settings"
        ] })
      }
    )
  ] }) }) });
}
export {
  AdminPaymentSettingsPage as default
};
