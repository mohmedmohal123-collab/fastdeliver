import { a as useLangStore, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-C9xmNwsB.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C3YREQ6T.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { L as Layout } from "./Layout-Dntny8Ic.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { U as User } from "./user-BS97zUFp.js";
import { M as Mail } from "./mail-OlPCTjPD.js";
import { P as Phone } from "./phone-7h-f-uO2.js";
import { S as Save } from "./save-BIQxLGdN.js";
import "./index-BjaMAYyY.js";
import "./separator-DPQRXxU6.js";
import "./index-Bf0p7smS.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
import "./package-eTRPZvLD.js";
import "./backend-0agJt8Zn.js";
import "./truck-Ce5uK_7r.js";
function ProfilePage() {
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  const [form, setForm] = reactExports.useState({
    name: (user == null ? void 0 : user.name) ?? "",
    email: (user == null ? void 0 : user.email) ?? "",
    phone: (user == null ? void 0 : user.phone) ?? ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const initials = form.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";
  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    ue.success(lang === "ar" ? "تم حفظ التغييرات" : "Changes saved");
    setLoading(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.profile", lang) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 card-elevated rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-16 h-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-lg font-bold bg-primary/20 text-primary", children: initials }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: form.name || "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: form.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
        lang === "ar" ? "معلوماتي الشخصية" : "Personal Information"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("auth.name", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.name,
                onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                className: "pl-9",
                "data-ocid": "profile.name.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("auth.email", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "email",
                value: form.email,
                onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                className: "pl-9",
                "data-ocid": "profile.email.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: t("auth.phone", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "tel",
                value: form.phone,
                onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                className: "pl-9",
                "data-ocid": "profile.phone.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            className: "w-full gradient-primary text-primary-foreground gap-2",
            disabled: loading,
            "data-ocid": "profile.save.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              loading ? t("misc.loading", lang) : t("btn.save", lang)
            ]
          }
        )
      ] }) })
    ] })
  ] }) }) });
}
export {
  ProfilePage as default
};
