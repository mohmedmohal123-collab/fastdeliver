import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as ue } from "./index-DzhgL1zh.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { m as mockBackend } from "./backend-0agJt8Zn.js";
import { u as useCourierAuthStore } from "./courierAuth-PLNNCW7D.js";
import { T as Truck } from "./truck-Ce5uK_7r.js";
import { M as Mail } from "./mail-OlPCTjPD.js";
import { L as Lock } from "./lock-l60IZ15y.js";
function CourierLoginPage() {
  const { setCourier } = useCourierAuthStore();
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
      const result = await mockBackend.courierLogin(email, password);
      if (result.__kind__ === "ok") {
        setCourier(result.ok.courier, result.ok.token);
        ue.success(
          lang === "ar" ? `مرحباً ${result.ok.courier.name}!` : `Welcome, ${result.ok.courier.name}!`
        );
        navigate({ to: "/courier" });
      } else if (result.__kind__ === "wrongCredentials") {
        setError(
          lang === "ar" ? "بيانات الدخول غير صحيحة" : "Invalid credentials"
        );
      } else if (result.__kind__ === "inactive") {
        setError(
          lang === "ar" ? "حسابك غير مفعّل. تواصل مع الإدارة." : "Your account is inactive. Contact admin."
        );
      }
    } catch {
      setError(lang === "ar" ? "حدث خطأ في الاتصال" : "Connection error");
    }
    setLoading(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-amber-950 flex items-center justify-center p-4",
      dir,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 shadow-xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-8 h-8 text-amber-950" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-amber-100", children: "FastDeliver" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-400 mt-1", children: t("auth.courierLogin", lang) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/50 border border-amber-700/40 rounded-2xl p-6 shadow-xl backdrop-blur space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-amber-100", children: t("auth.courierLogin", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "courier-email", className: "text-amber-200", children: t("auth.email", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "courier-email",
                      type: "email",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      className: "pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500",
                      placeholder: "courier@example.com",
                      required: true,
                      "data-ocid": "courier_login.email.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "courier-password", className: "text-amber-200", children: t("auth.password", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "courier-password",
                      type: "password",
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      className: "pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500",
                      required: true,
                      "data-ocid": "courier_login.password.input"
                    }
                  )
                ] })
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-red-400 bg-red-950/30 border border-red-800/40 rounded-lg px-3 py-2",
                  "data-ocid": "courier_login.error_state",
                  children: error
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold transition-all duration-200",
                  disabled: loading,
                  "data-ocid": "courier_login.submit_button",
                  children: loading ? t("misc.loading", lang) : t("auth.login", lang)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 text-center", children: "courier@fastdeliver.com / anypassword" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-amber-400", children: [
              t("auth.noCourierAccount", lang),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/courier/register",
                  className: "text-amber-300 hover:text-amber-100 font-medium underline underline-offset-2",
                  "data-ocid": "courier_login.register.link",
                  children: t("auth.courierRegister", lang)
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  CourierLoginPage as default
};
