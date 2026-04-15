import { a as useLangStore, u as useNavigate, m as useRouterState, j as jsxRuntimeExports, L as Link } from "./index-DzhgL1zh.js";
import { H as House, B as Badge, A as Avatar, a as AvatarFallback, L as LogOut } from "./avatar-C9xmNwsB.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { u as useCourierAuthStore } from "./courierAuth-PLNNCW7D.js";
import { U as User } from "./user-BS97zUFp.js";
import { T as Truck } from "./truck-Ce5uK_7r.js";
const VEHICLE_ICONS = {
  Motorcycle: "🏍️",
  Car: "🚗",
  Bicycle: "🚲",
  Truck: "🚚"
};
function CourierLayout({ children }) {
  const { courier, logout } = useCourierAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const initials = ((courier == null ? void 0 : courier.name) ?? "C").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  function handleLogout() {
    logout();
    navigate({ to: "/courier/login" });
  }
  const vehicleIcon = VEHICLE_ICONS[(courier == null ? void 0 : courier.vehicleType) ?? "Motorcycle"] ?? "🏍️";
  const tabs = [
    {
      path: "/courier",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
      label: t("nav.home", lang),
      ocid: "courier_nav.home.link"
    },
    {
      path: "/courier/profile",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }),
      label: t("courier.profile", lang),
      ocid: "courier_nav.profile.link"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-amber-950/90 backdrop-blur border-b border-amber-800/40 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 h-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-md flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-amber-950" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-amber-100 text-sm tracking-tight leading-none", children: "FastDeliver" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-2 text-[9px] px-1 py-0 h-4 bg-amber-500/30 text-amber-300 border-amber-500/40 hover:bg-amber-500/30", children: t("courier.title", lang) })
        ] })
      ] }),
      courier && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm hidden sm:block text-amber-200 font-medium", children: [
          vehicleIcon,
          " ",
          courier.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-8 h-8 ring-2 ring-amber-500/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-[10px] font-bold bg-amber-500 text-amber-950", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-8 h-8 text-amber-300 hover:text-amber-100 hover:bg-amber-800/40",
            onClick: handleLogout,
            "data-ocid": "courier_header.logout.button",
            "aria-label": t("nav.logout", lang),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto pb-20", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed bottom-0 left-0 right-0 z-40 bg-amber-950/95 backdrop-blur border-t border-amber-800/40 safe-area-bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-around h-16 max-w-lg mx-auto px-4", children: tabs.map((tab) => {
      const isActive = currentPath === tab.path || tab.path !== "/courier" && currentPath.startsWith(tab.path);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: tab.path,
          "data-ocid": tab.ocid,
          className: [
            "flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all duration-200",
            isActive ? "text-amber-400" : "text-amber-600 hover:text-amber-300"
          ].join(" "),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isActive ? "scale-110" : "scale-100", children: tab.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", children: tab.label })
          ]
        },
        tab.path
      );
    }) }) })
  ] });
}
export {
  CourierLayout as C
};
