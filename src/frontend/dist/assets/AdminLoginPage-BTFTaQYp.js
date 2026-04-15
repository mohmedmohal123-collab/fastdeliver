import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as ue } from "./index-DzhgL1zh.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { m as mockBackend } from "./backend-0agJt8Zn.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { M as Mail } from "./mail-OlPCTjPD.js";
import { L as Lock } from "./lock-l60IZ15y.js";
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
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function AdminLoginPage() {
  const { adminLogin } = useAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const dir = lang === "ar" ? "rtl" : "ltr";
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await mockBackend.adminLoginCall(email, password);
      if (result.__kind__ === "ok") {
        adminLogin(result.ok);
        ue.success(
          lang === "ar" ? "مرحباً بك في لوحة التحكم" : "Welcome to Admin Dashboard"
        );
        navigate({ to: "/admin" });
      } else {
        setError(
          lang === "ar" ? "بيانات الدخول غير صحيحة" : "Invalid credentials"
        );
      }
    } catch {
      setError(lang === "ar" ? "حدث خطأ في الاتصال" : "Connection error");
    }
    setLoading(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center p-4",
      dir,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto shadow-elevated",
              style: { background: "var(--gradient-warm)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-primary-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground", children: [
              "Fast",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    background: "var(--gradient-warm)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  },
                  children: "Deliver"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: lang === "ar" ? "لوحة تحكم المدير" : "Admin Control Panel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-6 space-y-5 rounded-2xl border border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: t("auth.adminLogin", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "admin-email", children: t("auth.email", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "admin-email",
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    className: "pl-9",
                    placeholder: lang === "ar" ? "البريد الإلكتروني" : "Email address",
                    required: true,
                    autoComplete: "email",
                    "data-ocid": "admin_login.email.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "admin-password", children: t("auth.password", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "admin-password",
                    type: "password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: "pl-9",
                    placeholder: lang === "ar" ? "كلمة المرور" : "Password",
                    required: true,
                    autoComplete: "current-password",
                    "data-ocid": "admin_login.password.input"
                  }
                )
              ] })
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2",
                "data-ocid": "admin_login.error_state",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full btn-primary font-medium",
                disabled: loading,
                "data-ocid": "admin_login.submit_button",
                children: loading ? t("misc.loading", lang) : t("auth.login", lang)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "text-primary hover:underline",
              "data-ocid": "admin_login.user_login.link",
              children: lang === "ar" ? "← العودة لتسجيل دخول المستخدم" : "← Back to User Login"
            }
          ) })
        ] })
      ] })
    }
  );
}
export {
  AdminLoginPage as default
};
