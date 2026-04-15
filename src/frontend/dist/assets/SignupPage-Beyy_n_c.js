import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as ue } from "./index-DzhgL1zh.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { T as Truck } from "./truck-Ce5uK_7r.js";
import { U as User } from "./user-BS97zUFp.js";
import { M as Mail } from "./mail-OlPCTjPD.js";
import { P as Phone } from "./phone-7h-f-uO2.js";
import { L as Lock } from "./lock-l60IZ15y.js";
function SignupPage() {
  const { login } = useAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const mockUser = {
      id: Date.now(),
      email: form.email,
      name: form.name,
      phone: form.phone,
      isActive: true,
      createdAt: Date.now()
    };
    login(mockUser, "demo-token");
    ue.success(
      lang === "ar" ? "تم إنشاء الحساب بنجاح" : "Account created successfully"
    );
    navigate({ to: "/home" });
    setLoading(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex items-center justify-center p-4",
      dir,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary shadow-elevated mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-7 h-7 text-primary-foreground float-subtle" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "FastDeliver" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("app.tagline", lang) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: t("auth.signup", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-sm", children: t("auth.name", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "name",
                    value: form.name,
                    onChange: (e) => handleChange("name", e.target.value),
                    className: "pl-9",
                    required: true,
                    "data-ocid": "signup.name.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm", children: t("auth.email", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    value: form.email,
                    onChange: (e) => handleChange("email", e.target.value),
                    className: "pl-9",
                    required: true,
                    "data-ocid": "signup.email.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", className: "text-sm", children: t("auth.phone", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "phone",
                    type: "tel",
                    value: form.phone,
                    onChange: (e) => handleChange("phone", e.target.value),
                    className: "pl-9",
                    required: true,
                    "data-ocid": "signup.phone.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm", children: t("auth.password", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "password",
                    type: "password",
                    value: form.password,
                    onChange: (e) => handleChange("password", e.target.value),
                    className: "pl-9",
                    required: true,
                    "data-ocid": "signup.password.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full gradient-primary text-primary-foreground font-medium",
                disabled: loading,
                "data-ocid": "signup.submit_button",
                children: loading ? t("misc.loading", lang) : t("auth.signup", lang)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
            t("auth.hasAccount", lang),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                className: "text-primary hover:underline font-medium",
                "data-ocid": "signup.login.link",
                children: t("auth.login", lang)
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  SignupPage as default
};
