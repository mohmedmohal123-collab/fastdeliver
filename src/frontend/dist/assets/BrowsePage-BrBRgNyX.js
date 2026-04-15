import { a as useLangStore, u as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index-DzhgL1zh.js";
import { B as Badge } from "./avatar-C9xmNwsB.js";
import { c as createLucideIcon, B as Button, t } from "./index-Kcs4saGQ.js";
import { C as Card, a as CardContent } from "./card-C3YREQ6T.js";
import { I as Input } from "./input-vd5b6MI6.js";
import { P as Package, u as useQuery } from "./package-eTRPZvLD.js";
import { L as Layout, S as Search, X, c as Building2 } from "./Layout-Dntny8Ic.js";
import { P as ProtectedRoute } from "./ProtectedRoute-BfydybqL.js";
import { m as mockBackend } from "./backend-0agJt8Zn.js";
import { m as motion, A as AnimatePresence } from "./proxy-Bl2j701Z.js";
import { a as Star } from "./separator-DPQRXxU6.js";
import "./index-BjaMAYyY.js";
import "./index-Bf0p7smS.js";
import "./index-DOJhPgOq.js";
import "./index-Ce_J6Hsd.js";
import "./auth-DkBYC2_v.js";
import "./user-BS97zUFp.js";
import "./truck-Ce5uK_7r.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function useActiveCompanies() {
  return useQuery({
    queryKey: ["activeCompanies"],
    queryFn: () => mockBackend.getActiveCompanies(),
    staleTime: 1e3 * 60 * 5
  });
}
function useActiveOffers() {
  return useQuery({
    queryKey: ["activeOffers"],
    queryFn: () => mockBackend.getActiveOffers(),
    staleTime: 1e3 * 60 * 5
  });
}
function useActiveProducts() {
  return useQuery({
    queryKey: ["activeProducts"],
    queryFn: () => mockBackend.getActiveProducts(),
    staleTime: 1e3 * 60 * 5
  });
}
function CompanyLogo({
  company,
  size = "sm"
}) {
  const dim = size === "sm" ? "w-8 h-8 text-[11px]" : "w-12 h-12 text-sm";
  if (company.logoUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: company.logoUrl,
        alt: company.name,
        className: `${dim} rounded-xl object-cover flex-shrink-0`
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `${dim} rounded-xl flex items-center justify-center font-bold flex-shrink-0`,
      style: { background: "var(--gradient-warm)", color: "oklch(0.11 0 0)" },
      children: company.name.slice(0, 2).toUpperCase()
    }
  );
}
function ProductImage({ product }) {
  if (product.imageUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: product.imageUrl,
        alt: product.name,
        className: "w-full h-36 object-cover rounded-t-xl"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "w-full h-36 rounded-t-xl flex items-center justify-center",
      style: { background: "var(--gradient-subtle)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground opacity-50" })
    }
  );
}
function CompanyCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border bg-card flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-xl flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
    ] })
  ] });
}
function OfferCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border bg-card space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
  ] });
}
function ProductCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-36" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full mt-2" })
    ] })
  ] });
}
function BrowsePage() {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const dir = lang === "ar" ? "rtl" : "ltr";
  const [search, setSearch] = reactExports.useState("");
  const [selectedCompanyId, setSelectedCompanyId] = reactExports.useState(
    null
  );
  const { data: companies = [], isLoading: loadingCompanies } = useActiveCompanies();
  const { data: offers = [], isLoading: loadingOffers } = useActiveOffers();
  const { data: products = [], isLoading: loadingProducts } = useActiveProducts();
  const companyMap = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const c of companies) m.set(String(c.id), c);
    return m;
  }, [companies]);
  const filteredProducts = reactExports.useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.nameAr.includes(search) || p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCompany = !selectedCompanyId || String(p.companyId) === String(selectedCompanyId);
      return matchesSearch && matchesCompany;
    });
  }, [products, search, selectedCompanyId]);
  const groupedProducts = reactExports.useMemo(() => {
    const groups = /* @__PURE__ */ new Map();
    for (const p of filteredProducts) {
      const key = String(p.companyId);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    }
    return groups;
  }, [filteredProducts]);
  const hasFilters = !!search || !!selectedCompanyId;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { variant: "user", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto space-y-8", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: lang === "ar" ? "تصفح الشركات والعروض" : "Browse Companies & Offers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: lang === "ar" ? "اكتشف أفضل الشركات والعروض واطلب مباشرة" : "Discover the best companies, offers, and order directly" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.1 },
        className: "flex flex-col sm:flex-row gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                className: `absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${dir === "rtl" ? "right-3" : "left-3"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: lang === "ar" ? "ابحث عن منتج..." : "Search products...",
                className: `${dir === "rtl" ? "pr-9" : "pl-9"} bg-card border-border`,
                "data-ocid": "browse.search_input"
              }
            ),
            search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSearch(""),
                className: `absolute top-1/2 -translate-y-1/2 ${dir === "rtl" ? "left-3" : "right-3"} text-muted-foreground hover:text-foreground`,
                "aria-label": lang === "ar" ? "مسح البحث" : "Clear search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                setSearch("");
                setSelectedCompanyId(null);
              },
              "data-ocid": "browse.clear_filters.button",
              className: "whitespace-nowrap",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 me-1.5" }),
                lang === "ar" ? "مسح الفلاتر" : "Clear filters"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "browse.companies.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "ar" ? "الشركات المتاحة" : "Available Companies" }),
        !loadingCompanies && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: companies.length })
      ] }),
      loadingCompanies ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyCardSkeleton, {}, i)) }) : companies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-10 text-center rounded-xl border border-dashed border-border bg-muted/20",
          "data-ocid": "browse.companies.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "ar" ? "لا توجد شركات متاحة" : "No companies available" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: companies.map((company, idx) => {
        const isSelected = selectedCompanyId !== null && String(selectedCompanyId) === String(company.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.05 },
            onClick: () => setSelectedCompanyId(isSelected ? null : company.id),
            "data-ocid": `browse.company.item.${idx + 1}`,
            className: [
              "text-start w-full p-4 rounded-xl border transition-smooth flex items-center gap-3",
              isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/40 hover:bg-muted/20"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyLogo, { company, size: "md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: lang === "ar" ? company.nameAr : company.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate mt-0.5", children: lang === "ar" ? company.descriptionAr : company.description })
              ] }),
              isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-primary flex-shrink-0" })
            ]
          },
          String(company.id)
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "browse.offers.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "ar" ? "العروض الحالية" : "Current Offers" }),
        !loadingOffers && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: offers.length })
      ] }),
      loadingOffers ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OfferCardSkeleton, {}, i)) }) : offers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-10 text-center rounded-xl border border-dashed border-border bg-muted/20",
          "data-ocid": "browse.offers.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: lang === "ar" ? "لا توجد عروض حالياً" : "No offers available" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: offers.map((offer, idx) => {
        const expiry = new Date(
          Number(offer.validUntil) / 1e6
        );
        const isExpired = expiry < /* @__PURE__ */ new Date();
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.06 },
            "data-ocid": `browse.offer.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card overflow-hidden hover:border-primary/30 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
                    style: {
                      background: "var(--gradient-warm)",
                      color: "oklch(0.11 0 0)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
                      offer.discount,
                      "%",
                      " ",
                      lang === "ar" ? "خصم" : "OFF"
                    ]
                  }
                ),
                isExpired && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] text-muted-foreground",
                    children: lang === "ar" ? "منتهي" : "Expired"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-snug", children: lang === "ar" ? offer.titleAr : offer.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground mt-1 line-clamp-2", children: lang === "ar" ? offer.descriptionAr : offer.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-2", children: [
                lang === "ar" ? "صالح حتى:" : "Valid until:",
                " ",
                expiry.toLocaleDateString(
                  lang === "ar" ? "ar-EG" : "en-EG"
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "w-full mt-3",
                  onClick: () => navigate({ to: "/orders/new" }),
                  disabled: isExpired,
                  "data-ocid": `browse.offer.request.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5 me-1.5" }),
                    lang === "ar" ? "اطلب الآن" : "Request Now"
                  ]
                }
              )
            ] }) })
          },
          String(offer.id)
        );
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "browse.products.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: lang === "ar" ? "جميع المنتجات" : "All Products" }),
        !loadingProducts && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: filteredProducts.length })
      ] }),
      loadingProducts ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, i)) }) : filteredProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-12 text-center rounded-xl border border-dashed border-border bg-muted/20",
          "data-ocid": "browse.products.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: lang === "ar" ? "لا توجد منتجات" : "No products found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground mt-1", children: lang === "ar" ? "جرّب تغيير البحث أو الفلتر" : "Try changing your search or filter" }),
            hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "mt-4",
                onClick: () => {
                  setSearch("");
                  setSelectedCompanyId(null);
                },
                "data-ocid": "browse.products.clear_filters.button",
                children: lang === "ar" ? "مسح الفلاتر" : "Clear filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: [...groupedProducts.entries()].map(([companyId, prods]) => {
        const company = companyMap.get(companyId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          company && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyLogo, { company, size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground", children: lang === "ar" ? company.nameAr : company.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: prods.map((product, pidx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: pidx * 0.05 },
              "data-ocid": `browse.product.item.${pidx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card overflow-hidden group hover:border-primary/40 hover:shadow-md transition-smooth h-full flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProductImage, { product }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3 flex flex-col flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-snug line-clamp-1", children: lang === "ar" ? product.nameAr : product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 line-clamp-2 flex-1", children: lang === "ar" ? product.descriptionAr : product.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-sm font-bold",
                        style: {
                          background: "var(--gradient-warm)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        },
                        children: [
                          product.price,
                          " ",
                          t("misc.egp", lang)
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[9px] px-1.5 py-0 border-border",
                        children: product.category
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      className: "w-full mt-2.5",
                      onClick: () => navigate({ to: "/orders/new" }),
                      "data-ocid": `browse.product.request.${pidx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3 h-3 me-1.5" }),
                        lang === "ar" ? "اطلب الآن" : "Request Now"
                      ]
                    }
                  )
                ] })
              ] })
            },
            String(product.id)
          )) }) })
        ] }, companyId);
      }) })
    ] })
  ] }) }) });
}
export {
  BrowsePage as default
};
