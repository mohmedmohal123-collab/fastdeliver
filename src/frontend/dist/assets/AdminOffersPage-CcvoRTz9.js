import { a as useLangStore, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { c as createLucideIcon, t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card, a as CardContent } from "./card-C3YREQ6T.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BSQ8EAJO.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { S as Switch } from "./switch-DnHGPG3L.js";
import { T as Textarea } from "./textarea-QnTMgleQ.js";
import { L as Layout, B as Bell, S as Search } from "./Layout-Dntny8Ic.js";
import { A as AdminProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { P as Plus, S as SquarePen, T as Trash2 } from "./trash-2-kdVhAALa.js";
import { A as AnimatePresence, m as motion } from "./proxy-Bl2j701Z.js";
import "./index-BjaMAYyY.js";
import "./index-Bf0p7smS.js";
import "./index-YEkxhdur.js";
import "./separator-DPQRXxU6.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
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
const __iconNode$1 = [
  ["line", { x1: "19", x2: "5", y1: "5", y2: "19", key: "1x9vlm" }],
  ["circle", { cx: "6.5", cy: "6.5", r: "2.5", key: "4mh3h7" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "2.5", key: "1mdrzq" }]
];
const Percent = createLucideIcon("percent", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const INITIAL_OFFERS = [
  {
    id: 1,
    title: "Weekend Express Deal",
    titleAr: "عرض نهاية الأسبوع",
    description: "20% off all weekend deliveries",
    descriptionAr: "خصم 20% على جميع توصيلات نهاية الأسبوع",
    discountPercent: 20,
    validUntil: "2026-05-31",
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: 2,
    title: "First Order Free",
    titleAr: "أول طلب مجاني",
    description: "Free delivery on your first order",
    descriptionAr: "توصيل مجاني على أول طلب لك",
    discountPercent: 100,
    validUntil: "2026-12-31",
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: 3,
    title: "Summer Flash Sale",
    titleAr: "تخفيضات الصيف",
    description: "Flash sale - 35% off for 48 hours",
    descriptionAr: "تخفيضات مؤقتة 35% لمدة 48 ساعة",
    discountPercent: 35,
    validUntil: "2026-04-20",
    isActive: false,
    createdAt: Date.now()
  }
];
const emptyOffer = () => ({
  title: "",
  titleAr: "",
  description: "",
  descriptionAr: "",
  discountPercent: 10,
  validUntil: "",
  isActive: true
});
function AdminOffersPage() {
  const { lang } = useLangStore();
  const { adminToken } = useAuthStore();
  const [offers, setOffers] = reactExports.useState(INITIAL_OFFERS);
  const [search, setSearch] = reactExports.useState("");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyOffer());
  const [saving, setSaving] = reactExports.useState(false);
  const [notifDialog, setNotifDialog] = reactExports.useState(false);
  const [notifForm, setNotifForm] = reactExports.useState({
    message: "",
    messageAr: ""
  });
  const [sendingNotif, setSendingNotif] = reactExports.useState(false);
  if (!adminToken) return null;
  const filtered = offers.filter((o) => {
    const q = search.toLowerCase();
    return o.title.toLowerCase().includes(q) || o.titleAr.includes(q);
  });
  function openAdd() {
    setEditingId(null);
    setForm(emptyOffer());
    setDialogOpen(true);
  }
  function openEdit(o) {
    setEditingId(o.id);
    setForm({
      title: o.title,
      titleAr: o.titleAr,
      description: o.description,
      descriptionAr: o.descriptionAr,
      discountPercent: o.discountPercent,
      validUntil: o.validUntil,
      isActive: o.isActive
    });
    setDialogOpen(true);
  }
  async function handleSave() {
    if (!form.title || !form.titleAr || !form.validUntil) {
      ue.error(
        lang === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields"
      );
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    if (editingId !== null) {
      setOffers(
        (prev) => prev.map((o) => o.id === editingId ? { ...o, ...form } : o)
      );
      ue.success(lang === "ar" ? "تم تحديث العرض" : "Offer updated");
    } else {
      setOffers((prev) => [
        { ...form, id: Date.now(), createdAt: Date.now() },
        ...prev
      ]);
      ue.success(lang === "ar" ? "تم إضافة العرض" : "Offer added");
    }
    setSaving(false);
    setDialogOpen(false);
  }
  function handleDelete(id) {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    setDeleteId(null);
    ue.success(lang === "ar" ? "تم حذف العرض" : "Offer deleted");
  }
  async function sendNotification() {
    if (!notifForm.message || !notifForm.messageAr) {
      ue.error(
        lang === "ar" ? "يرجى ملء نص الإشعار" : "Please fill the notification message"
      );
      return;
    }
    setSendingNotif(true);
    await new Promise((r) => setTimeout(r, 800));
    ue.success(t("admin.notifSent", lang));
    setSendingNotif(false);
    setNotifDialog(false);
    setNotifForm({ message: "", messageAr: "" });
  }
  function isExpired(validUntil) {
    return new Date(validUntil) < /* @__PURE__ */ new Date();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { variant: "admin", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 page-transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-2 rounded-xl",
              style: { background: "var(--gradient-warm)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.adminOffers", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              offers.filter((o) => o.isActive).length,
              " ",
              lang === "ar" ? "عرض نشط" : "active offers"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "gap-2",
              onClick: () => setNotifDialog(true),
              "data-ocid": "admin.offers.send_notif_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4" }),
                t("admin.sendNotif", lang)
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "btn-primary gap-2",
              onClick: openAdd,
              "data-ocid": "admin.offers.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                t("offer.addNew", lang)
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9 h-9 bg-muted/20 border-border text-sm",
            placeholder: t("nav.search", lang),
            value: search,
            onChange: (e) => setSearch(e.target.value),
            "data-ocid": "admin.offers.search_input"
          }
        )
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "admin.offers.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Percent, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("offer.empty", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "mt-4",
                onClick: openAdd,
                children: t("offer.addNew", lang)
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtered.map((o, idx) => {
        const expired = isExpired(o.validUntil);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, scale: 0.9 },
            transition: { delay: idx * 0.06 },
            "data-ocid": `admin.offers.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated overflow-hidden group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "h-20 flex items-center justify-center relative overflow-hidden",
                  style: {
                    background: o.isActive && !expired ? "var(--gradient-warm)" : "var(--muted)",
                    opacity: o.isActive && !expired ? 1 : 0.6
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "font-display font-black text-4xl",
                        style: { color: "oklch(0.11 0 0)" },
                        children: [
                          o.discountPercent,
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Percent,
                      {
                        className: "absolute right-3 bottom-2 w-8 h-8 opacity-20",
                        style: { color: "oklch(0.11 0 0)" }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: lang === "ar" ? o.titleAr : o.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lang === "ar" ? o.title : o.titleAr })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1 items-end flex-shrink-0", children: o.isActive && !expired ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-green-500/20 text-green-400 border-green-500/30", children: lang === "ar" ? "نشط" : "Active" }) : expired ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs text-destructive border-destructive/30",
                      children: lang === "ar" ? "منتهي" : "Expired"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: lang === "ar" ? "معطل" : "Inactive" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: lang === "ar" ? o.descriptionAr : o.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  lang === "ar" ? "صالح حتى:" : "Valid until:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-medium ${expired ? "text-destructive" : "text-foreground"}`,
                      children: o.validUntil
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "flex-1 gap-1.5 h-8",
                      onClick: () => openEdit(o),
                      "data-ocid": `admin.offers.edit_button.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3" }),
                        t("btn.edit", lang)
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: "w-8 h-8 p-0 text-destructive hover:bg-destructive/10 border-destructive/30",
                      onClick: () => setDeleteId(o.id),
                      "data-ocid": `admin.offers.delete_button.${idx + 1}`,
                      "aria-label": lang === "ar" ? "حذف العرض" : "Delete offer",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                    }
                  )
                ] })
              ] })
            ] })
          },
          o.id
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin.offers.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editingId ? t("offer.edit", lang) : t("offer.addNew", lang) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
              t("offer.title", lang),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.title,
                onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                className: "h-9 bg-muted/20",
                "data-ocid": "admin.offers.title_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
              t("offer.titleAr", lang),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.titleAr,
                onChange: (e) => setForm((f) => ({ ...f, titleAr: e.target.value })),
                className: "h-9 bg-muted/20",
                dir: "rtl",
                "data-ocid": "admin.offers.title_ar_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("offer.description", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.description,
                onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                className: "h-9 bg-muted/20"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("offer.descriptionAr", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.descriptionAr,
                onChange: (e) => setForm((f) => ({ ...f, descriptionAr: e.target.value })),
                className: "h-9 bg-muted/20",
                dir: "rtl"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
              t("offer.discount", lang),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: 1,
                max: 100,
                value: form.discountPercent,
                onChange: (e) => setForm((f) => ({
                  ...f,
                  discountPercent: Math.min(
                    100,
                    Math.max(1, Number(e.target.value))
                  )
                })),
                className: "h-9 bg-muted/20",
                "data-ocid": "admin.offers.discount_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
              t("offer.validUntil", lang),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: form.validUntil,
                onChange: (e) => setForm((f) => ({ ...f, validUntil: e.target.value })),
                className: "h-9 bg-muted/20",
                "data-ocid": "admin.offers.valid_until_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: form.isActive,
              onCheckedChange: (v) => setForm((f) => ({ ...f, isActive: v })),
              "data-ocid": "admin.offers.active_switch"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: t("offer.active", lang) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setDialogOpen(false),
            "data-ocid": "admin.offers.cancel_button",
            children: t("btn.cancel", lang)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "btn-primary flex-1",
            onClick: handleSave,
            disabled: saving,
            "data-ocid": "admin.offers.save_button",
            children: saving ? lang === "ar" ? "جار الحفظ..." : "Saving..." : t("btn.save", lang)
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: deleteId !== null, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-sm",
        "data-ocid": "admin.offers.delete.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-destructive flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
            t("btn.delete", lang)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-2", children: t("offer.deleteConfirm", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteId(null),
                "data-ocid": "admin.offers.delete.cancel_button",
                children: t("btn.cancel", lang)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: () => deleteId && handleDelete(deleteId),
                "data-ocid": "admin.offers.delete.confirm_button",
                children: t("btn.delete", lang)
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: notifDialog, onOpenChange: setNotifDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-md",
        "data-ocid": "admin.offers.notif.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 text-primary" }),
            t("admin.sendNotif", lang)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary", children: lang === "ar" ? "سيتم إرسال هذا الإشعار لجميع المستخدمين النشطين في التطبيق" : "This notification will be sent to all active app users" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
                t("admin.notifMessage", lang),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: notifForm.message,
                  onChange: (e) => setNotifForm((f) => ({ ...f, message: e.target.value })),
                  className: "bg-muted/20 resize-none h-20",
                  placeholder: "e.g. Exclusive summer discount — 30% off all deliveries!",
                  "data-ocid": "admin.offers.notif.message_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
                t("admin.notifMessageAr", lang),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: notifForm.messageAr,
                  onChange: (e) => setNotifForm((f) => ({ ...f, messageAr: e.target.value })),
                  className: "bg-muted/20 resize-none h-20",
                  dir: "rtl",
                  placeholder: "مثال: عرض صيف حصري — خصم 30% على جميع التوصيلات!",
                  "data-ocid": "admin.offers.notif.message_ar_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setNotifDialog(false),
                "data-ocid": "admin.offers.notif.cancel_button",
                children: t("btn.cancel", lang)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "btn-primary flex-1 gap-2",
                onClick: sendNotification,
                disabled: sendingNotif,
                "data-ocid": "admin.offers.notif.submit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-3.5 h-3.5" }),
                  sendingNotif ? lang === "ar" ? "جار الإرسال..." : "Sending..." : t("admin.sendNotif", lang)
                ]
              }
            )
          ] })
        ]
      }
    ) })
  ] }) });
}
export {
  AdminOffersPage as default
};
