import { a as useLangStore, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { t, B as Button } from "./index-Kcs4saGQ.js";
import { C as Card } from "./card-C3YREQ6T.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BSQ8EAJO.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { L as Label } from "./label-D9eDfi64.js";
import { S as Switch } from "./switch-DnHGPG3L.js";
import { I as ImageUploader } from "./ImageUploader-Cb_EtT6O.js";
import { L as Layout, b as ShoppingBag, S as Search } from "./Layout-Dntny8Ic.js";
import { A as AdminProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
import { P as Plus, S as SquarePen, T as Trash2 } from "./trash-2-kdVhAALa.js";
import { A as AnimatePresence, m as motion } from "./proxy-Bl2j701Z.js";
import { P as Package } from "./package-eTRPZvLD.js";
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
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
const CATEGORIES = [
  "Electronics",
  "Food & Beverage",
  "Clothing",
  "Documents",
  "Furniture",
  "Pharmacy",
  "Other"
];
const SAMPLE_COMPANIES = [
  {
    id: 1,
    name: "TechEgypt",
    nameAr: "تك مصر",
    description: "",
    descriptionAr: "",
    logoUrl: "",
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: "FreshMart",
    nameAr: "فريش مارت",
    description: "",
    descriptionAr: "",
    logoUrl: "",
    isActive: true,
    createdAt: Date.now()
  }
];
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Laptop Delivery Package",
    nameAr: "طرد لابتوب",
    description: "Secure laptop delivery in padded box",
    descriptionAr: "توصيل لابتوب في صندوق محمي",
    price: 150,
    category: "Electronics",
    imageUrl: "",
    companyId: 1,
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: 2,
    name: "Fresh Groceries Box",
    nameAr: "صندوق بقالة طازجة",
    description: "Daily fresh grocery delivery",
    descriptionAr: "توصيل بقالة طازجة يومي",
    price: 75,
    category: "Food & Beverage",
    imageUrl: "",
    companyId: 2,
    isActive: true,
    createdAt: Date.now()
  },
  {
    id: 3,
    name: "Medical Documents",
    nameAr: "وثائق طبية",
    description: "Urgent medical document courier",
    descriptionAr: "بريد وثائق طبية عاجل",
    price: 50,
    category: "Documents",
    imageUrl: "",
    isActive: false,
    createdAt: Date.now()
  }
];
const emptyForm = () => ({
  name: "",
  nameAr: "",
  description: "",
  descriptionAr: "",
  price: 0,
  category: CATEGORIES[0],
  imageUrl: "",
  companyId: void 0,
  isActive: true
});
function AdminProductsPage() {
  const { lang } = useLangStore();
  const { adminToken } = useAuthStore();
  const [products, setProducts] = reactExports.useState(INITIAL_PRODUCTS);
  const [search, setSearch] = reactExports.useState("");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm());
  const [saving, setSaving] = reactExports.useState(false);
  if (!adminToken) return null;
  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.nameAr.includes(q) || p.category.toLowerCase().includes(q);
  });
  function openAdd() {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  }
  function openEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      nameAr: p.nameAr,
      description: p.description,
      descriptionAr: p.descriptionAr,
      price: p.price,
      category: p.category,
      imageUrl: p.imageUrl,
      companyId: p.companyId,
      isActive: p.isActive
    });
    setDialogOpen(true);
  }
  async function handleSave() {
    if (!form.name || !form.nameAr || form.price <= 0) {
      ue.error(
        lang === "ar" ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields"
      );
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    if (editingId !== null) {
      setProducts(
        (prev) => prev.map((p) => p.id === editingId ? { ...p, ...form } : p)
      );
      ue.success(lang === "ar" ? "تم تحديث المنتج" : "Product updated");
    } else {
      const newProduct = {
        ...form,
        id: Date.now(),
        createdAt: Date.now()
      };
      setProducts((prev) => [newProduct, ...prev]);
      ue.success(lang === "ar" ? "تم إضافة المنتج" : "Product added");
    }
    setSaving(false);
    setDialogOpen(false);
  }
  function handleDelete(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
    ue.success(lang === "ar" ? "تم حذف المنتج" : "Product deleted");
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
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-primary-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: t("page.adminProducts", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              products.length,
              " ",
              lang === "ar" ? "منتج" : "products"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "btn-primary gap-2",
            onClick: openAdd,
            "data-ocid": "admin.products.add_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              t("product.addNew", lang)
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
            "data-ocid": "admin.products.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/20", children: [
          "#",
          lang === "ar" ? "الاسم" : "Name",
          lang === "ar" ? "التصنيف" : "Category",
          lang === "ar" ? "السعر" : "Price",
          lang === "ar" ? "الحالة" : "Status",
          ""
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "td",
          {
            colSpan: 6,
            className: "py-12 text-center",
            "data-ocid": "admin.products.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground/40 mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("product.empty", lang) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "mt-3",
                  onClick: openAdd,
                  children: t("product.addNew", lang)
                }
              )
            ]
          }
        ) }) : filtered.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { delay: idx * 0.04 },
            className: "border-b border-border/50 hover:bg-muted/10 transition-colors",
            "data-ocid": `admin.products.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs", children: p.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                p.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: p.imageUrl,
                    alt: p.name,
                    className: "w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-border",
                    onError: (e) => {
                      e.target.style.display = "none";
                    }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-muted/30 flex items-center justify-center flex-shrink-0 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-muted-foreground/40" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: lang === "ar" ? p.nameAr : p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lang === "ar" ? p.name : p.nameAr })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs border-border text-muted-foreground",
                  children: p.category
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-foreground", children: [
                p.price,
                " ",
                t("misc.egp", lang)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: p.isActive ? "default" : "secondary",
                  className: p.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : "",
                  children: p.isActive ? lang === "ar" ? "نشط" : "Active" : lang === "ar" ? "غير نشط" : "Inactive"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "w-7 h-7 text-muted-foreground hover:text-foreground",
                    onClick: () => openEdit(p),
                    "data-ocid": `admin.products.edit_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "w-7 h-7 text-muted-foreground hover:text-destructive",
                    onClick: () => setDeleteId(p.id),
                    "data-ocid": `admin.products.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) })
            ]
          },
          p.id
        )) }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin.products.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: editingId ? t("product.edit", lang) : t("product.addNew", lang) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
              t("product.name", lang),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.name,
                onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                className: "h-9 bg-muted/20",
                "data-ocid": "admin.products.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs", children: [
              t("product.nameAr", lang),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: form.nameAr,
                onChange: (e) => setForm((f) => ({ ...f, nameAr: e.target.value })),
                className: "h-9 bg-muted/20",
                dir: "rtl",
                "data-ocid": "admin.products.name_ar_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("product.description", lang) }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("product.descriptionAr", lang) }),
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
              t("product.price", lang),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                value: form.price,
                onChange: (e) => setForm((f) => ({ ...f, price: Number(e.target.value) })),
                className: "h-9 bg-muted/20",
                min: 0,
                "data-ocid": "admin.products.price_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("product.category", lang) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: form.category,
                onChange: (e) => setForm((f) => ({ ...f, category: e.target.value })),
                className: "w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-sm text-foreground",
                "data-ocid": "admin.products.category_select",
                children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("upload.image", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ImageUploader,
            {
              value: form.imageUrl,
              onChange: (url) => setForm((f) => ({ ...f, imageUrl: url })),
              lang,
              label: "",
              ocidPrefix: "admin.products"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: t("product.company", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.companyId ?? "",
              onChange: (e) => setForm((f) => ({
                ...f,
                companyId: e.target.value ? Number(e.target.value) : void 0
              })),
              className: "w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: lang === "ar" ? "بدون شركة" : "No company" }),
                SAMPLE_COMPANIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: lang === "ar" ? c.nameAr : c.name }, c.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: form.isActive,
              onCheckedChange: (v) => setForm((f) => ({ ...f, isActive: v })),
              "data-ocid": "admin.products.active_switch"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: t("product.active", lang) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: () => setDialogOpen(false),
            "data-ocid": "admin.products.cancel_button",
            children: t("btn.cancel", lang)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "btn-primary flex-1",
            onClick: handleSave,
            disabled: saving,
            "data-ocid": "admin.products.save_button",
            children: saving ? lang === "ar" ? "جار الحفظ..." : "Saving..." : t("btn.save", lang)
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: deleteId !== null, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-sm",
        "data-ocid": "admin.products.delete.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-destructive flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
            t("btn.delete", lang)
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-2", children: t("product.deleteConfirm", lang) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteId(null),
                "data-ocid": "admin.products.delete.cancel_button",
                children: t("btn.cancel", lang)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: () => deleteId && handleDelete(deleteId),
                "data-ocid": "admin.products.delete.confirm_button",
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
  AdminProductsPage as default
};
