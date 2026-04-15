import { a as useLangStore, j as jsxRuntimeExports } from "./index-DzhgL1zh.js";
import { A as Avatar, a as AvatarFallback, B as Badge } from "./avatar-C9xmNwsB.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C3YREQ6T.js";
import { S as Separator, a as Star } from "./separator-DPQRXxU6.js";
import { C as CourierLayout } from "./CourierLayout-BQ01px7D.js";
import { t } from "./index-Kcs4saGQ.js";
import { u as useCourierAuthStore } from "./courierAuth-PLNNCW7D.js";
import { C as CircleCheck } from "./circle-check-NZHUw46K.js";
import { T as Truck } from "./truck-Ce5uK_7r.js";
import { P as Phone } from "./phone-7h-f-uO2.js";
import "./index-BjaMAYyY.js";
import "./user-BS97zUFp.js";
const VEHICLE_ICONS = {
  Motorcycle: "🏍️",
  Car: "🚗",
  Bicycle: "🚲",
  Truck: "🚚"
};
function CourierProfilePage() {
  const { courier } = useCourierAuthStore();
  const { lang } = useLangStore();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const initials = ((courier == null ? void 0 : courier.name) ?? "C").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const vehicleIcon = VEHICLE_ICONS[(courier == null ? void 0 : courier.vehicleType) ?? "Motorcycle"] ?? "🏍️";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CourierLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-5", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-amber-600/30 to-amber-800/20 border border-amber-600/30 rounded-2xl p-5 flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-20 h-20 ring-4 ring-amber-500/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-2xl font-bold bg-amber-500 text-amber-950", children: initials }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-amber-100", children: (courier == null ? void 0 : courier.name) ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: vehicleIcon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-amber-400", children: t(`vehicle.${(courier == null ? void 0 : courier.vehicleType) ?? "Motorcycle"}`, lang) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/20 text-amber-300 border-amber-500/40", children: (courier == null ? void 0 : courier.isAvailable) ? lang === "ar" ? "متاح" : "Available" : lang === "ar" ? "غير متاح" : "Unavailable" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-amber-900/30 border border-amber-700/25 rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm text-amber-400", children: lang === "ar" ? "الإحصائيات" : "Statistics" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: t("courier.totalDeliveries", lang) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-100", children: Number((courier == null ? void 0 : courier.totalDeliveries) ?? 0) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-amber-800/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: lang === "ar" ? "التقييم" : "Rating" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-amber-100", children: [
            ((courier == null ? void 0 : courier.rating) ?? 0).toFixed(1),
            " ⭐"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-amber-800/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: lang === "ar" ? "نوع المركبة" : "Vehicle" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-amber-100", children: [
            vehicleIcon,
            " ",
            t(`vehicle.${(courier == null ? void 0 : courier.vehicleType) ?? "Motorcycle"}`, lang)
          ] })
        ] }),
        (courier == null ? void 0 : courier.phone) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-amber-800/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-amber-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: lang === "ar" ? "الهاتف" : "Phone" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber-100 font-mono text-sm", children: courier.phone })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  CourierProfilePage as default
};
