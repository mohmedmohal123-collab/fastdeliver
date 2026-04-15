import { u as useNavigate, a as useLangStore, r as reactExports, j as jsxRuntimeExports } from "./index-DzhgL1zh.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
const SPLASH_DURATION = 3200;
function SplashPage() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();
  const { lang } = useLangStore();
  const [phase, setPhase] = reactExports.useState("enter");
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    timerRef.current = setTimeout(() => setPhase("hold"), 800);
    const exitTimer = setTimeout(() => setPhase("exit"), SPLASH_DURATION - 600);
    const navTimer = setTimeout(() => {
      if (isAdmin) navigate({ to: "/admin" });
      else if (user) navigate({ to: "/home" });
      else navigate({ to: "/login" });
    }, SPLASH_DURATION);
    return () => {
      clearTimeout(timerRef.current ?? void 0);
      clearTimeout(exitTimer);
      clearTimeout(navTimer);
    };
  }, [navigate, user, isAdmin]);
  const dir = lang === "ar" ? "rtl" : "ltr";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 gradient-splash flex flex-col items-center justify-center overflow-hidden select-none",
      "data-ocid": "splash.page",
      dir,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.7 0.28 35 / 0.15), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 50% 40% at 50% 80%, oklch(0.78 0.2 200 / 0.08), transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none opacity-[0.04]",
            style: {
              backgroundImage: "linear-gradient(oklch(0.95 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0 0) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative z-10 flex flex-col items-center gap-8",
            style: {
              animation: phase === "exit" ? "splash-exit 0.6s cubic-bezier(0.4,0,1,1) forwards" : "splash-enter 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 rounded-full",
                    style: {
                      animation: "ring-pulse 2s ease-out infinite",
                      background: "radial-gradient(circle, oklch(0.7 0.28 35 / 0.3), transparent 70%)",
                      transform: "scale(1.8)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 rounded-full",
                    style: {
                      animation: "ring-pulse 2s ease-out 0.5s infinite",
                      background: "radial-gradient(circle, oklch(0.78 0.2 200 / 0.2), transparent 70%)",
                      transform: "scale(2.4)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "relative w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.7 0.28 35), oklch(0.74 0.25 85))",
                      boxShadow: "0 0 60px oklch(0.7 0.28 35 / 0.5), 0 20px 40px oklch(0 0 0 / 0.4)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        viewBox: "0 0 64 64",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "w-16 h-16",
                        style: { animation: "truck-drive 1.5s ease-in-out infinite" },
                        "aria-label": "FastDeliver delivery truck",
                        role: "img",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "rect",
                            {
                              x: "4",
                              y: "20",
                              width: "36",
                              height: "22",
                              rx: "3",
                              fill: "oklch(0.98 0 0 / 0.95)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M40 24 L54 24 L58 32 L58 42 L40 42 Z",
                              fill: "oklch(0.95 0 0 / 0.9)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M42 26 L52 26 L55 31 L42 31 Z",
                              fill: "oklch(0.78 0.2 200 / 0.9)"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "circle",
                            {
                              cx: "14",
                              cy: "43",
                              r: "5",
                              fill: "oklch(0.25 0 0)",
                              stroke: "oklch(0.7 0.28 35)",
                              strokeWidth: "1.5"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "14", cy: "43", r: "2", fill: "oklch(0.7 0.28 35)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "circle",
                            {
                              cx: "48",
                              cy: "43",
                              r: "5",
                              fill: "oklch(0.25 0 0)",
                              stroke: "oklch(0.7 0.28 35)",
                              strokeWidth: "1.5"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "43", r: "2", fill: "oklch(0.7 0.28 35)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "line",
                            {
                              x1: "2",
                              y1: "30",
                              x2: "10",
                              y2: "30",
                              stroke: "oklch(0.74 0.25 85)",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              style: { animation: "speed-line 0.8s ease-out infinite" }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "line",
                            {
                              x1: "0",
                              y1: "35",
                              x2: "6",
                              y2: "35",
                              stroke: "oklch(0.74 0.25 85 / 0.6)",
                              strokeWidth: "1.5",
                              strokeLinecap: "round",
                              style: { animation: "speed-line 0.8s ease-out 0.15s infinite" }
                            }
                          )
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
                    style: {
                      background: "oklch(0.78 0.2 200)",
                      boxShadow: "0 0 12px oklch(0.78 0.2 200 / 0.8)",
                      animation: "badge-pulse 1.5s ease-in-out infinite"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block w-2 h-2 rounded-full bg-primary-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h1",
                  {
                    className: "font-display font-bold text-foreground leading-none",
                    style: {
                      fontSize: "clamp(2.5rem, 8vw, 4rem)",
                      textShadow: "0 2px 20px oklch(0 0 0 / 0.5)",
                      animation: "text-reveal 0.7s ease-out 0.2s both"
                    },
                    children: [
                      "Fast",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            background: "linear-gradient(90deg, oklch(0.7 0.28 35), oklch(0.74 0.25 85))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                          },
                          children: "Deliver"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-muted-foreground font-body text-base tracking-widest uppercase",
                    style: { animation: "text-reveal 0.7s ease-out 0.45s both" },
                    children: lang === "ar" ? "خدمة توصيل سريع" : "Express Delivery"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-center space-y-1",
                  style: { animation: "text-reveal 0.7s ease-out 0.65s both" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-2xl font-display font-semibold",
                        style: { color: "oklch(0.74 0.25 85)" },
                        children: "أهلاً وسهلاً"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-body text-muted-foreground", children: "Welcome Back" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-0.5 rounded-full overflow-hidden",
            style: { background: "oklch(0.95 0 0 / 0.1)" },
            "data-ocid": "splash.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full",
                style: {
                  background: "linear-gradient(90deg, oklch(0.7 0.28 35), oklch(0.78 0.2 200))",
                  animation: `load-bar ${SPLASH_DURATION}ms linear forwards`
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest uppercase whitespace-nowrap",
            style: { animation: "text-reveal 0.7s ease-out 0.9s both" },
            children: "Egypt's Premier Courier Service"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes splash-enter {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splash-exit {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to   { opacity: 0; transform: scale(1.05) translateY(-20px); }
        }
        @keyframes ring-pulse {
          0%   { opacity: 0.8; transform: scale(1.8); }
          100% { opacity: 0; transform: scale(3); }
        }
        @keyframes truck-drive {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%       { transform: translateX(2px) rotate(1deg); }
          75%       { transform: translateX(-2px) rotate(-1deg); }
        }
        @keyframes speed-line {
          0%   { opacity: 0; transform: translateX(4px); }
          50%  { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-4px); }
        }
        @keyframes text-reveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes load-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.2); }
        }
      ` })
      ]
    }
  );
}
export {
  SplashPage as default
};
