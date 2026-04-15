import { a as useLangStore, u as useNavigate, k as useQueryClient, j as jsxRuntimeExports, L as Link, b as ue, S as Skeleton } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { B as Button, t } from "./index-Kcs4saGQ.js";
import { u as useQuery } from "./package-eTRPZvLD.js";
import { u as useMutation } from "./index-Ce_J6Hsd.js";
import { e as useNotificationsStore, L as Layout, f as CheckCheck, g as BellOff, B as Bell } from "./Layout-Dntny8Ic.js";
import { m as mockBackend } from "./backend-0agJt8Zn.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { A as ArrowLeft } from "./arrow-left-BNXvM9NM.js";
import "./index-BjaMAYyY.js";
import "./input-vd5b6MI6.js";
import "./separator-DPQRXxU6.js";
import "./index-Bf0p7smS.js";
import "./index-DOJhPgOq.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
const NOTIF_ICONS = {
  OrderCreated: "📦",
  OrderAccepted: "✅",
  OrderInTransit: "🚚",
  CourierArrived: "📍",
  OrderDelivered: "🎉",
  OrderCancelled: "❌",
  PaymentProcessed: "💳",
  PaymentFailed: "⚠️"
};
function formatFullDate(timestamp, lang) {
  const date = new Date(Number(timestamp / 1000000n));
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
function NotifSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4 border border-border rounded-xl bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
    ] })
  ] });
}
function NotificationsPage() {
  const { token } = useAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    notifications,
    setNotifications,
    markRead,
    markAllRead,
    unreadCount
  } = useNotificationsStore();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const { isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!token) return [];
      const data = await mockBackend.getMyNotifications(token);
      setNotifications(data);
      return data;
    },
    enabled: !!token,
    refetchInterval: 3e4,
    staleTime: 2e4
  });
  const markAllMutation = useMutation({
    mutationFn: async () => {
      if (!token) return;
      await mockBackend.markAllNotificationsRead(token);
    },
    onSuccess: () => {
      markAllRead();
      qc.invalidateQueries({ queryKey: ["notifications"] });
      ue.success(
        lang === "ar" ? "تم تحديد الكل كمقروء" : "All marked as read"
      );
    }
  });
  const markOneMutation = useMutation({
    mutationFn: async (id) => {
      if (!token) return;
      await mockBackend.markNotificationRead(token, id);
    },
    onSuccess: (_data, id) => {
      markRead(id);
      qc.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
  if (!token) {
    navigate({ to: "/login" });
    return null;
  }
  const displayed = notifications.slice(0, 20);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { variant: "user", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "w-8 h-8",
            onClick: () => navigate({ to: "/home" }),
            "data-ocid": "notifications.back.button",
            "aria-label": t("btn.back", lang),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ArrowLeft,
              {
                className: ["w-4 h-4", lang === "ar" ? "rotate-180" : ""].join(
                  " "
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: t("page.notifications", lang) }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: lang === "ar" ? `${unreadCount} إشعار غير مقروء` : `${unreadCount} unread` })
        ] })
      ] }),
      unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-2 text-xs",
          onClick: () => markAllMutation.mutate(),
          disabled: markAllMutation.isPending,
          "data-ocid": "notifications.mark_all_read.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5" }),
            t("notif.markAllRead", lang)
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotifSkeleton, {}, k)) }) : displayed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "notifications.empty_state",
        className: "flex flex-col items-center py-20 gap-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-9 h-9 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: t("notif.noNotifications", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("notif.noNotificationsHint", lang) })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: displayed.map((notif, idx) => {
      const message = lang === "ar" ? notif.messageAr : notif.message;
      const icon = NOTIF_ICONS[notif.notifType] ?? "🔔";
      const typeLabel = t(`notifType.${notif.notifType}`, lang) || notif.notifType;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `notifications.item.${idx + 1}`,
          className: [
            "w-full flex gap-4 p-4 rounded-xl border transition-colors hover:bg-muted/20 cursor-pointer text-left group",
            !notif.isRead ? "bg-primary/5 border-primary/20" : "bg-card border-border"
          ].join(" "),
          onClick: () => {
            if (!notif.isRead) markOneMutation.mutate(notif.id);
          },
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              if (!notif.isRead) markOneMutation.mutate(notif.id);
            }
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: [
                  "w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0",
                  !notif.isRead ? "bg-primary/10" : "bg-muted/40"
                ].join(" "),
                children: icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: [
                        "text-[10px] px-2 py-0 font-medium",
                        !notif.isRead ? "border-primary/40 text-primary" : "border-border text-muted-foreground"
                      ].join(" "),
                      children: typeLabel
                    }
                  ),
                  !notif.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground/60 flex-shrink-0 mt-0.5", children: formatFullDate(notif.timestamp, lang) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: [
                    "text-sm mt-1.5 leading-relaxed break-words",
                    !notif.isRead ? "text-foreground" : "text-muted-foreground"
                  ].join(" "),
                  children: message
                }
              ),
              notif.orderId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/orders/$orderId",
                  params: { orderId: String(notif.orderId) },
                  "data-ocid": `notifications.item.${idx + 1}.order_link`,
                  onClick: (e) => e.stopPropagation(),
                  className: "inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium mt-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3 h-3" }),
                    t("notif.viewOrder", lang),
                    " #",
                    String(notif.orderId)
                  ]
                }
              )
            ] })
          ]
        },
        String(notif.id)
      );
    }) })
  ] }) });
}
export {
  NotificationsPage as default
};
