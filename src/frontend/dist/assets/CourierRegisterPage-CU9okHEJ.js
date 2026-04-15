import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as ue } from "./index-DzhgL1zh.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DBijvAFf.js";
import { m as mockBackend } from "./backend-0agJt8Zn.js";
import { T as Truck } from "./truck-Ce5uK_7r.js";
import { U as User } from "./user-BS97zUFp.js";
import { M as Mail } from "./mail-OlPCTjPD.js";
import { P as Phone } from "./phone-7h-f-uO2.js";
import { L as Lock } from "./lock-l60IZ15y.js";
import "./index-DOJhPgOq.js";
import "./index-Bf0p7smS.js";
import "./index-BjaMAYyY.js";
import "./index-B1RiBmbl.js";
import "./index-YEkxhdur.js";
const VEHICLE_TYPES = [
  { value: "Motorcycle", labelAr: "دراجة نارية", labelEn: "Motorcycle" },
  { value: "Car", labelAr: "سيارة", labelEn: "Car" },
  { value: "Bicycle", labelAr: "دراجة", labelEn: "Bicycle" },
  { value: "Truck", labelAr: "شاحنة", labelEn: "Truck" }
];
function CourierRegisterPage() {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicleType: ""
  });
  const dir = lang === "ar" ? "rtl" : "ltr";
  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.vehicleType) {
      setError(
        lang === "ar" ? "يرجى اختيار نوع المركبة" : "Please select vehicle type"
      );
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await mockBackend.registerCourier(
        form.name,
        form.phone,
        form.email,
        form.password,
        form.vehicleType
      );
      if (result.__kind__ === "ok") {
        ue.success(
          lang === "ar" ? "تم التسجيل بنجاح! يمكنك تسجيل الدخول الآن." : "Registration successful! You can now login."
        );
        navigate({ to: "/courier/login" });
      } else if (result.__kind__ === "err") {
        setError(result.err);
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500 shadow-xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-8 h-8 text-amber-950" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-amber-100", children: "FastDeliver" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-amber-400 mt-1", children: t("auth.courierRegister", lang) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/50 border border-amber-700/40 rounded-2xl p-6 shadow-xl backdrop-blur space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-amber-100", children: t("auth.courierRegister", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-name", className: "text-amber-200", children: t("auth.name", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "c-name",
                      value: form.name,
                      onChange: (e) => set("name", e.target.value),
                      className: "pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500",
                      required: true,
                      "data-ocid": "courier_register.name.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-email", className: "text-amber-200", children: t("auth.email", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "c-email",
                      type: "email",
                      value: form.email,
                      onChange: (e) => set("email", e.target.value),
                      className: "pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500",
                      required: true,
                      "data-ocid": "courier_register.email.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-phone", className: "text-amber-200", children: t("auth.phone", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "c-phone",
                      type: "tel",
                      value: form.phone,
                      onChange: (e) => set("phone", e.target.value),
                      className: "pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500",
                      required: true,
                      "data-ocid": "courier_register.phone.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "c-password", className: "text-amber-200", children: t("auth.password", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "c-password",
                      type: "password",
                      value: form.password,
                      onChange: (e) => set("password", e.target.value),
                      className: "pl-9 bg-amber-950/60 border-amber-700/50 text-amber-100 placeholder:text-amber-600 focus:border-amber-500",
                      required: true,
                      minLength: 6,
                      "data-ocid": "courier_register.password.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-amber-200", children: t("auth.vehicleType", lang) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.vehicleType,
                    onValueChange: (v) => set("vehicleType", v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "bg-amber-950/60 border-amber-700/50 text-amber-100 focus:border-amber-500",
                          "data-ocid": "courier_register.vehicle.select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            SelectValue,
                            {
                              placeholder: lang === "ar" ? "اختر نوع المركبة" : "Select vehicle type"
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-amber-950 border-amber-700/50", children: VEHICLE_TYPES.map((vt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectItem,
                        {
                          value: vt.value,
                          className: "text-amber-100 focus:bg-amber-800/60 focus:text-amber-100",
                          "data-ocid": `courier_register.vehicle.${vt.value.toLowerCase()}`,
                          children: lang === "ar" ? vt.labelAr : vt.labelEn
                        },
                        vt.value
                      )) })
                    ]
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-red-400 bg-red-950/30 border border-red-800/40 rounded-lg px-3 py-2",
                  "data-ocid": "courier_register.error_state",
                  children: error
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold transition-all duration-200",
                  disabled: loading,
                  "data-ocid": "courier_register.submit_button",
                  children: loading ? t("misc.loading", lang) : t("auth.courierRegister", lang)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-amber-400", children: [
              t("auth.hasCourierAccount", lang),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/courier/login",
                  className: "text-amber-300 hover:text-amber-100 font-medium underline underline-offset-2",
                  "data-ocid": "courier_register.login.link",
                  children: t("auth.login", lang)
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
  CourierRegisterPage as default
};
