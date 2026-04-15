import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as ue } from "./index-DzhgL1zh.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { T as Truck } from "./truck-Ce5uK_7r.js";
import { Z as Zap } from "./zap-DPIJRGNU.js";
import { M as Mail } from "./mail-OlPCTjPD.js";
import { L as Lock } from "./lock-l60IZ15y.js";
import { E as Eye } from "./eye-0bgos5Ci.js";
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
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function LoginPage() {
  const { login } = useAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPass, setShowPass] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const mockUser = {
      id: 1,
      email,
      name: email.split("@")[0],
      phone: "",
      isActive: true,
      createdAt: Date.now()
    };
    login(mockUser, "demo-token");
    ue.success(
      lang === "ar" ? "أهلاً وسهلاً! تم تسجيل الدخول" : "Welcome back! Login successful"
    );
    navigate({ to: "/home" });
    setLoading(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center p-4 overflow-hidden relative",
      style: { background: "var(--gradient-splash)" },
      dir,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, oklch(0.7 0.28 35 / 0.12), transparent 70%)",
              filter: "blur(60px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, oklch(0.78 0.2 200 / 0.1), transparent 70%)",
              filter: "blur(60px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none opacity-[0.03]",
            style: {
              backgroundImage: "linear-gradient(oklch(0.95 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0 0) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm space-y-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center space-y-4",
              style: { animation: "fade-in-up 0.6s ease-out both" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center justify-center w-20 h-20 rounded-3xl mx-auto relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-3xl",
                      style: {
                        background: "var(--gradient-warm)",
                        boxShadow: "0 0 40px oklch(0.7 0.28 35 / 0.5), 0 16px 32px oklch(0 0 0 / 0.3)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-9 h-9 text-primary-foreground relative z-10 float-subtle" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                      style: {
                        background: "oklch(0.78 0.2 200)",
                        boxShadow: "0 0 10px oklch(0.78 0.2 200 / 0.7)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-2.5 h-2.5 text-accent-foreground" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl text-foreground", children: [
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("app.tagline", lang) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border p-6 space-y-5",
              style: {
                background: "oklch(var(--card) / 0.95)",
                boxShadow: "0 24px 48px oklch(0 0 0 / 0.4), 0 0 0 1px oklch(var(--border))",
                backdropFilter: "blur(20px)",
                animation: "fade-in-up 0.6s ease-out 0.15s both"
              },
              "data-ocid": "login.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground", children: t("auth.login", lang) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: lang === "ar" ? "أدخل بياناتك للمتابعة" : "Enter your credentials to continue" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: t("auth.email", lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Mail,
                        {
                          className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                          style: { color: "oklch(var(--accent))" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "email",
                          type: "email",
                          value: email,
                          onChange: (e) => setEmail(e.target.value),
                          className: "pl-9 bg-muted/20 border-border focus:border-primary/50 transition-smooth h-11",
                          placeholder: lang === "ar" ? "example@email.com" : "your@email.com",
                          required: true,
                          "data-ocid": "login.email.input",
                          autoComplete: "email"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: t("auth.password", lang) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Lock,
                        {
                          className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
                          style: { color: "oklch(var(--accent))" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "password",
                          type: showPass ? "text" : "password",
                          value: password,
                          onChange: (e) => setPassword(e.target.value),
                          className: "pl-9 pr-10 bg-muted/20 border-border focus:border-primary/50 transition-smooth h-11",
                          placeholder: "••••••••",
                          required: true,
                          "data-ocid": "login.password.input",
                          autoComplete: "current-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPass(!showPass),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                          "aria-label": showPass ? "Hide password" : "Show password",
                          children: showPass ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-xs transition-smooth",
                      style: { color: "oklch(var(--accent))" },
                      children: t("auth.forgotPassword", lang)
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full h-11 font-semibold text-base transition-smooth",
                      style: loading ? { opacity: 0.7, cursor: "not-allowed" } : {
                        background: "var(--gradient-warm)",
                        color: "oklch(0.11 0 0)",
                        boxShadow: "var(--shadow-elevated)"
                      },
                      disabled: loading,
                      "data-ocid": "login.submit_button",
                      children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-4 h-4 border-2 rounded-full animate-spin",
                            style: {
                              borderColor: "oklch(0.11 0 0 / 0.3)",
                              borderTopColor: "oklch(0.11 0 0)"
                            }
                          }
                        ),
                        t("misc.loading", lang)
                      ] }) : t("auth.login", lang)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
                  t("auth.noAccount", lang),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/signup",
                      className: "font-semibold transition-smooth hover:underline",
                      style: { color: "oklch(var(--accent))" },
                      "data-ocid": "login.signup.link",
                      children: t("auth.signup", lang)
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-center gap-4 text-xs text-muted-foreground",
              style: { animation: "fade-in-up 0.6s ease-out 0.3s both" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/courier/login",
                    className: "hover:text-foreground transition-smooth",
                    "data-ocid": "login.courier_login.link",
                    children: t("auth.courierLogin", lang)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-3 bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/admin/login",
                    className: "hover:text-foreground transition-smooth",
                    "data-ocid": "login.admin_login.link",
                    children: t("auth.adminLogin", lang)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-center text-[11px] text-muted-foreground",
              style: { animation: "fade-in-up 0.6s ease-out 0.45s both" },
              children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                ".",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hover:text-foreground transition-colors",
                    children: "Built with love using caffeine.ai"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  LoginPage as default
};
