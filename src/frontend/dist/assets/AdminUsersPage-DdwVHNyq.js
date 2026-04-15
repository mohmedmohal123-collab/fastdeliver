import { a as useLangStore, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { B as Badge, A as Avatar, a as AvatarFallback } from "./avatar-C9xmNwsB.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, a as CardContent } from "./card-C3YREQ6T.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Layout, U as Users, S as Search } from "./Layout-Dntny8Ic.js";
import { A as AdminProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { M as Mail } from "./mail-OlPCTjPD.js";
import { P as Phone } from "./phone-7h-f-uO2.js";
import "./index-BjaMAYyY.js";
import "./separator-DPQRXxU6.js";
import "./index-Bf0p7smS.js";
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
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
const USERS = [
  {
    id: 1,
    email: "ahmed.hassan@gmail.com",
    name: "أحمد حسن",
    phone: "01012345678",
    isActive: true,
    createdAt: Date.now() - 864e5 * 30
  },
  {
    id: 2,
    email: "sara.ali@hotmail.com",
    name: "سارة علي",
    phone: "01123456789",
    isActive: true,
    createdAt: Date.now() - 864e5 * 15
  },
  {
    id: 3,
    email: "omar.ibrahim@yahoo.com",
    name: "عمر إبراهيم",
    phone: "01234567890",
    isActive: false,
    createdAt: Date.now() - 864e5 * 7
  },
  {
    id: 4,
    email: "nour.khaled@gmail.com",
    name: "نور خالد",
    phone: "01512345678",
    isActive: true,
    createdAt: Date.now() - 864e5 * 3
  },
  {
    id: 5,
    email: "hassan.mostafa@gmail.com",
    name: "حسن مصطفى",
    phone: "01612345678",
    isActive: true,
    createdAt: Date.now() - 864e5
  }
];
function AdminUsersPage() {
  const { lang } = useLangStore();
  const [search, setSearch] = reactExports.useState("");
  const [users, setUsers] = reactExports.useState(USERS);
  const filtered = users.filter(
    (u) => !search || u.name.includes(search) || u.email.includes(search) || u.phone.includes(search)
  );
  function toggleActive(id) {
    setUsers(
      (prev) => prev.map((u) => u.id === id ? { ...u, isActive: !u.isActive } : u)
    );
    ue.success(
      lang === "ar" ? "تم تحديث حالة المستخدم" : "User status updated"
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { variant: "admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.adminUsers", lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/15 text-primary border-primary/30 border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 mr-1" }),
        users.length,
        " ",
        lang === "ar" ? "مستخدم" : "users"
      ] })
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
          "data-ocid": "admin_users.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((user, i) => {
      const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "card-elevated",
          "data-ocid": `admin_users.user.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-10 h-10 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-xs font-bold bg-secondary/30 text-secondary-foreground", children: initials }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: user.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-[10px] px-1.5 py-0 border ${user.isActive ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-muted/30 text-muted-foreground border-border"}`,
                    children: user.isActive ? lang === "ar" ? "نشط" : "Active" : lang === "ar" ? "موقوف" : "Inactive"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
                  user.email
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                  user.phone
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => toggleActive(user.id),
                className: user.isActive ? "text-destructive hover:bg-destructive/10" : "text-green-400 hover:bg-green-400/10",
                "data-ocid": `admin_users.toggle_active.button.${i + 1}`,
                children: user.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5 mr-1" }),
                  lang === "ar" ? "إيقاف" : "Deactivate"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5 mr-1" }),
                  lang === "ar" ? "تفعيل" : "Activate"
                ] })
              }
            )
          ] }) })
        },
        user.id
      );
    }) })
  ] }) }) });
}
export {
  AdminUsersPage as default
};
