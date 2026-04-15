import { a as useLangStore, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card } from "./card-C3YREQ6T.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BSQ8EAJO.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { S as Switch } from "./switch-DnHGPG3L.js";
import { I as ImageUploader } from "./ImageUploader-Cb_EtT6O.js";
import { L as Layout, c as Building2, S as Search } from "./Layout-Dntny8Ic.js";
import { A as AdminProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { P as Plus, S as SquarePen, T as Trash2 } from "./trash-2-kdVhAALa.js";
import { A as AnimatePresence, m as motion } from "./proxy-Bl2j701Z.js";
import "./index-BjaMAYyY.js";
import "./index-Bf0p7smS.js";
import "./index-YEkxhdur.js";
import "./progress-BVDvPjEH.js";
import "./backend-0agJt8Zn.js";
import "./loader-circle-CIOMiYQL.js";
import "./circle-check-NZHUw46K.js";
import "./separator-DPQRXxU6.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
import "./package-eTRPZvLD.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
const INITIAL_COMPANIES = [
  {
    id: 1,
    name: "TechEgypt",
    nameAr: "تك مصر",
    description: "Egypt's leading electronics delivery partner",
    descriptionAr: "شريك التوصيل الإلكتروني الأول في مصر",
    logoUrl: "",
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: "FreshMart",
    nameAr: "فريش مارت",
    description: "Premium fresh grocery delivery service",
    descriptionAr: "خدمة توصيل بقالة طازجة مميزة",
    logoUrl: "",
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: 3,
    name: "PharmaExpress",
    nameAr: "فارما إكسبريس",
    description: "Urgent pharmacy and medical supplies",
    descriptionAr: "صيدلية وإمدادات طبية عاجلة",
    logoUrl: "",
    isActive: false,
    createdAt: Date.now()
  }
];
const emptyForm = () => ({
  name: "",
  nameAr: "",
  description: "",
  descriptionAr: "",
  logoUrl: "",
  isActive: true
});
function AdminCompaniesPage() {
  const { lang } = useLangStore();
  const { adminToken } = useAuthStore();
  const [companies, setCompanies] = reactExports.useState(INITIAL_COMPANIES);
  const [search, setSearch] = reactExports.useState("");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm());
  const [saving, setSaving] = reactExports.useState(false);
  if (!adminToken) return null;
  const filtered = companies.filter((c) => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.nameAr.includes(q);
  });
  function openAdd() {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  }
  function openEdit(c) {
    setEditingId(c.id);
    setForm({
      name: c.name,
      nameAr: c.nameAr,
      description: c.description,
      descriptionAr: c.descriptionAr,
      logoUrl: c.logoUrl,
      isActive: c.isActive
    });
    setDialogOpen(true);
  }
  async function handleSave() {
    if (!form.name || !form.nameAr) {
      ue.error(
        lang === "ar" ? "يرجى إدخال اسم الشركة" : "Please enter company name"
      );
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    if (editingId !== null) {
      setCompanies(
        (prev) => prev.map((c) => c.id === editingId ? { ...c, ...form } : c)
      );
      ue.success(lang === "ar" ? "تم تحديث الشركة" : "Company updated");
    } else {
      setCompanies((prev) => [
        { ...form, id: Date.now(), createdAt: Date.now() },
        ...prev
      ]);
      ue.success(lang === "ar" ? "تم إضافة الشركة" : "Company added");
    }
    setSaving(false);
    setDialogOpen(false);
  }
  function handleDelete(id) {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    setDeleteId(null);
    ue.success(lang === "ar" ? "تم حذف الشركة" : "Company deleted");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { variant: "admin", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 page-transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-2 rounded-xl",
              style: { background: "var(--gradient-warm)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.adminCompanies", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              companies.length,
              " ",
              lang === "ar" ? "شركة" : "companies"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "btn-primary gap-2",
            onClick: openAdd,
            "data-ocid": "admin.companies.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              t("company.addNew", lang)
            ]
          }
        )
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
            "data-ocid": "admin.companies.search_input"
          }
        )
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "admin.companies.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: t("company.empty", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "mt-4",
                onClick: openAdd,
                children: t("company.addNew", lang)
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtered.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          transition: { delay: idx * 0.06 },
          "data-ocid": `admin.companies.item.${idx + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated overflow-hidden group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-16 flex items-center justify-center overflow-hidden",
                style: {
                  background: c.logoUrl ? void 0 : "var(--gradient-warm)",
                  opacity: c.isActive ? 1 : 0.5
                },
                children: c.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: c.logoUrl,
                    alt: c.name,
                    className: "w-full h-full object-cover",
                    onError: (e) => {
                      const target = e.target;
                      target.style.display = "none";
                      target.parentElement.style.background = "var(--gradient-warm)";
                    }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-7 h-7 text-primary-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: lang === "ar" ? c.nameAr : c.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lang === "ar" ? c.name : c.nameAr })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: c.isActive ? "default" : "secondary",
                    className: `ml-2 flex-shrink-0 text-xs ${c.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}`,
                    children: c.isActive ? lang === "ar" ? "نشطة" : "Active" : lang === "ar" ? "غير نشطة" : "Inactive"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: lang === "ar" ? c.descriptionAr : c.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "flex-1 gap-1.5 h-8",
                    onClick: () => openEdit(c),
                    "data-ocid": `admin.companies.edit_button.${idx + 1}`,
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
                    onClick: () => setDeleteId(c.id),
                    "data-ocid": `admin.companies.delete_button.${idx + 1}`,
                    "aria-label": lang === "ar" ? "حذف الشركة" : "Delete company",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                  }
                )
              ] })
            ] })
          ] })
        },
        c.id
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-lg",
        "data-ocid": "admin.companies.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editingId ? t("company.edit", lang) : t("company.addNew", lang) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
                  t("company.name", lang),
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.name,
                    onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                    className: "h-9 bg-muted/20",
                    "data-ocid": "admin.companies.name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
                  t("company.nameAr", lang),
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: form.nameAr,
                    onChange: (e) => setForm((f) => ({ ...f, nameAr: e.target.value })),
                    className: "h-9 bg-muted/20",
                    dir: "rtl",
                    "data-ocid": "admin.companies.name_ar_input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("company.description", lang) }),
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("company.descriptionAr", lang) }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("upload.logo", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ImageUploader,
                {
                  value: form.logoUrl,
                  onChange: (url) => setForm((f) => ({ ...f, logoUrl: url })),
                  lang,
                  label: "",
                  ocidPrefix: "admin.companies"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: form.isActive,
                  onCheckedChange: (v) => setForm((f) => ({ ...f, isActive: v })),
                  "data-ocid": "admin.companies.active_switch"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: t("company.active", lang) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setDialogOpen(false),
                "data-ocid": "admin.companies.cancel_button",
                children: t("btn.cancel", lang)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "btn-primary flex-1",
                onClick: handleSave,
                disabled: saving,
                "data-ocid": "admin.companies.save_button",
                children: saving ? lang === "ar" ? "جار الحفظ..." : "Saving..." : t("btn.save", lang)
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: deleteId !== null, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-sm",
        "data-ocid": "admin.companies.delete.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-destructive flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
            t("btn.delete", lang)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-2", children: t("company.deleteConfirm", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteId(null),
                "data-ocid": "admin.companies.delete.cancel_button",
                children: t("btn.cancel", lang)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: () => deleteId && handleDelete(deleteId),
                "data-ocid": "admin.companies.delete.confirm_button",
                children: t("btn.delete", lang)
              }
            )
          ] })
        ]
      }
    ) })
  ] }) });
}
export {
  AdminCompaniesPage as default
};
