import { a as useLangStore, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C3YREQ6T.js";
import { L as Label } from "./label-D9eDfi64.js";
import { S as Separator } from "./separator-DPQRXxU6.js";
import { S as Switch } from "./switch-DnHGPG3L.js";
import { L as Layout, B as Bell } from "./Layout-Dntny8Ic.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import "./index-Bf0p7smS.js";
import "./index-BjaMAYyY.js";
import "./index-YEkxhdur.js";
import "./avatar-C9xmNwsB.js";
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
const __iconNode$2 = [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
];
const Languages = createLucideIcon("languages", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function SettingsPage() {
  const { lang, setLang } = useLangStore();
  function toggleLang() {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    ue.success(
      next === "ar" ? "تم تغيير اللغة إلى العربية" : "Language changed to English"
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.settings", lang) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-4 h-4 text-primary" }),
        t("settings.language", lang)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: lang === "ar" ? "العربية / English" : "Arabic / English" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "ar" ? "اللغة الحالية: العربية" : "Current: English" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: toggleLang,
            "data-ocid": "settings.language.toggle",
            children: lang === "ar" ? "English" : "عربي"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
        t("settings.notifications", lang)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: [
        {
          id: "push",
          label: lang === "ar" ? "إشعارات الطلبات" : "Order Notifications",
          checked: true
        },
        {
          id: "status",
          label: lang === "ar" ? "تحديثات الحالة" : "Status Updates",
          checked: true
        },
        {
          id: "promo",
          label: lang === "ar" ? "العروض والخصومات" : "Promotions & Offers",
          checked: false
        }
      ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: item.id, className: "text-sm cursor-pointer", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: item.id,
              defaultChecked: item.checked,
              "data-ocid": `settings.notifications.${item.id}.switch`
            }
          )
        ] })
      ] }, item.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4 text-primary" }),
        t("settings.theme", lang)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: lang === "ar" ? "الوضع المظلم" : "Dark Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "ar" ? "مفعّل بشكل افتراضي" : "Enabled by default" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            defaultChecked: true,
            "data-ocid": "settings.theme.dark_mode.switch"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
        lang === "ar" ? "الأمان والخصوصية" : "Security & Privacy"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full justify-start gap-2 text-sm",
            "data-ocid": "settings.change_password.button",
            children: lang === "ar" ? "تغيير كلمة المرور" : "Change Password"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full justify-start gap-2 text-sm text-destructive border-destructive/30 hover:bg-destructive/10",
            "data-ocid": "settings.delete_account.button",
            children: lang === "ar" ? "حذف الحساب" : "Delete Account"
          }
        )
      ] })
    ] })
  ] }) }) });
}
export {
  SettingsPage as default
};
