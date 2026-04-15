import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C3YREQ6T.js";
import { L as Label } from "./label-D9eDfi64.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DBijvAFf.js";
import { S as Separator } from "./separator-DPQRXxU6.js";
import { T as Textarea } from "./textarea-QnTMgleQ.js";
import { L as Layout, B as Bell, U as Users } from "./Layout-Dntny8Ic.js";
import { A as AdminProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { C as CircleCheck } from "./circle-check-NZHUw46K.js";
import { C as Clock } from "./clock-CCu_JZ74.js";
import "./index-BjaMAYyY.js";
import "./index-DOJhPgOq.js";
import "./index-Bf0p7smS.js";
import "./index-B1RiBmbl.js";
import "./index-YEkxhdur.js";
import "./input-vd5b6MI6.js";
import "./index-Ce_J6Hsd.js";
import "./auth-DkBYC2_v.js";
import "./package-eTRPZvLD.js";
import "./backend-0agJt8Zn.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const MOCK_HISTORY = [
  {
    id: 1,
    messageEn: "Service maintenance tonight from 2–4 AM. Orders may be delayed.",
    messageAr: "صيانة الخدمة الليلة من 2 إلى 4 صباحاً. قد تتأخر الطلبات.",
    segment: "all",
    sentAt: "2026-04-14 22:00",
    status: "sent"
  },
  {
    id: 2,
    messageEn: "New delivery zones added in Cairo! Check your area.",
    messageAr: "تمت إضافة مناطق توصيل جديدة في القاهرة! تحقق من منطقتك.",
    segment: "active",
    sentAt: "2026-04-12 10:30",
    status: "sent"
  },
  {
    id: 3,
    messageEn: "Please complete your pending payment to proceed.",
    messageAr: "يرجى إتمام الدفع المعلق للمتابعة.",
    segment: "pending",
    sentAt: "2026-04-10 15:45",
    status: "sent"
  }
];
const SEGMENT_ESTIMATES = {
  all: { en: "All Users", ar: "جميع المستخدمين", count: 47 },
  pending: {
    en: "Users with Pending Orders",
    ar: "مستخدمو الطلبات المعلقة",
    count: 12
  },
  active: { en: "Active Users", ar: "المستخدمون النشطون", count: 31 }
};
function AdminBroadcastPage() {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [messageEn, setMessageEn] = reactExports.useState("");
  const [messageAr, setMessageAr] = reactExports.useState("");
  const [segment, setSegment] = reactExports.useState("all");
  const [confirming, setConfirming] = reactExports.useState(false);
  const [sending, setSending] = reactExports.useState(false);
  const [history, setHistory] = reactExports.useState(MOCK_HISTORY);
  const selectedSegment = SEGMENT_ESTIMATES[segment];
  const canSend = messageEn.trim().length > 0 && messageAr.trim().length > 0;
  async function handleSend() {
    if (!canSend) return;
    setSending(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const newRecord = {
        id: Date.now(),
        messageEn: messageEn.trim(),
        messageAr: messageAr.trim(),
        segment,
        sentAt: (/* @__PURE__ */ new Date()).toLocaleString(),
        status: "sent"
      };
      setHistory([newRecord, ...history]);
      setMessageEn("");
      setMessageAr("");
      setConfirming(false);
      ue.success(
        lang === "ar" ? "تم إرسال الإشعار بنجاح" : "Notification sent successfully"
      );
    } catch {
      ue.error(
        lang === "ar" ? "فشل إرسال الإشعار" : "Failed to send notification"
      );
    }
    setSending(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { variant: "admin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-xl flex items-center justify-center",
            style: { background: "var(--gradient-warm)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-primary-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.adminBroadcast", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lang === "ar" ? "أرسل إشعاراً لمجموعة من المستخدمين" : "Send a notification to a group of users" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => navigate({ to: "/admin" }),
          "data-ocid": "broadcast.back.button",
          children: lang === "ar" ? "← رجوع" : "← Back"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated border border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 text-primary" }),
        lang === "ar" ? "إنشاء إشعار جديد" : "Compose Notification"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: lang === "ar" ? "استهداف المستخدمين" : "Target Segment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: segment,
              onValueChange: (v) => setSegment(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "broadcast.segment.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: lang === "ar" ? "جميع المستخدمين" : "All Users" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: lang === "ar" ? "مستخدمو الطلبات المعلقة" : "Users with Pending Orders" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: lang === "ar" ? "المستخدمون النشطون" : "Active Users" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20 border border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-accent flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: lang === "ar" ? "الجمهور المستهدف:" : "Target audience:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: lang === "ar" ? selectedSegment.ar : selectedSegment.en }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ms-auto text-[10px]", children: [
              "~",
              selectedSegment.count,
              " ",
              lang === "ar" ? "مستخدم" : "users"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "msg-en", children: lang === "ar" ? "الرسالة (إنجليزي)" : "Message (English)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "msg-en",
              value: messageEn,
              onChange: (e) => setMessageEn(e.target.value),
              placeholder: "Enter notification message in English...",
              rows: 3,
              className: "resize-none",
              "data-ocid": "broadcast.message_en.textarea"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground text-right", children: [
            messageEn.length,
            "/200"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", dir: "rtl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "msg-ar", children: lang === "ar" ? "الرسالة (عربي)" : "Message (Arabic)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "msg-ar",
              value: messageAr,
              onChange: (e) => setMessageAr(e.target.value),
              placeholder: "أدخل نص الإشعار بالعربية...",
              rows: 3,
              className: "resize-none text-right",
              dir: "rtl",
              "data-ocid": "broadcast.message_ar.textarea"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground text-left", children: [
            messageAr.length,
            "/200"
          ] })
        ] }),
        (messageEn || messageAr) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-primary uppercase tracking-wide", children: lang === "ar" ? "معاينة" : "Preview" }),
          messageEn && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: messageEn }),
          messageAr && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground text-right", dir: "rtl", children: messageAr })
        ] }),
        !confirming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "w-full btn-primary gap-2",
            disabled: !canSend,
            onClick: () => setConfirming(true),
            "data-ocid": "broadcast.send.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
              lang === "ar" ? "إرسال الإشعار" : "Send Notification"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-yellow-500/10 border border-yellow-500/30 px-4 py-3 text-sm text-yellow-400", children: lang === "ar" ? `سيتم إرسال إشعار لـ ~${selectedSegment.count} مستخدم. هل أنت متأكد؟` : `This will send to ~${selectedSegment.count} users. Are you sure?` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 btn-primary gap-2",
                disabled: sending,
                onClick: handleSend,
                "data-ocid": "broadcast.confirm_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  sending ? lang === "ar" ? "جار الإرسال..." : "Sending..." : lang === "ar" ? "تأكيد الإرسال" : "Confirm Send"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setConfirming(false),
                disabled: sending,
                "data-ocid": "broadcast.cancel_button",
                children: lang === "ar" ? "إلغاء" : "Cancel"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated border border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-display flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-accent" }),
        lang === "ar" ? "الإشعارات الأخيرة" : "Recent Broadcasts"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm text-muted-foreground text-center py-4",
          "data-ocid": "broadcast.history.empty_state",
          children: lang === "ar" ? "لا توجد إشعارات مرسلة بعد" : "No broadcasts sent yet"
        }
      ) : history.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 rounded-xl bg-muted/20 border border-border/40 space-y-1.5",
          "data-ocid": `broadcast.history.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] border-primary/40 text-primary",
                  children: lang === "ar" ? SEGMENT_ESTIMATES[rec.segment].ar : SEGMENT_ESTIMATES[rec.segment].en
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: rec.sentAt })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground line-clamp-1", children: lang === "ar" ? rec.messageAr : rec.messageEn }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-green-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-green-400", children: lang === "ar" ? "تم الإرسال" : "Sent" })
            ] })
          ]
        },
        rec.id
      )) })
    ] })
  ] }) }) });
}
export {
  AdminBroadcastPage as default
};
