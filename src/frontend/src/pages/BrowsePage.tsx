import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  Package,
  Search,
  ShoppingCart,
  Star,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { CompanyPublic, OfferPublic, ProductPublic } from "../backend";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { mockBackend } from "../mocks/backend";
import { useLangStore } from "../store/lang";

// ─── React Query hooks ────────────────────────────
function useActiveCompanies() {
  return useQuery<CompanyPublic[]>({
    queryKey: ["activeCompanies"],
    queryFn: () => mockBackend.getActiveCompanies(),
    staleTime: 1000 * 60 * 5,
  });
}

function useActiveOffers() {
  return useQuery<OfferPublic[]>({
    queryKey: ["activeOffers"],
    queryFn: () => mockBackend.getActiveOffers(),
    staleTime: 1000 * 60 * 5,
  });
}

function useActiveProducts() {
  return useQuery<ProductPublic[]>({
    queryKey: ["activeProducts"],
    queryFn: () => mockBackend.getActiveProducts(),
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Small helper ─────────────────────────────────
function CompanyLogo({
  company,
  size = "sm",
}: {
  company: CompanyPublic;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "w-8 h-8 text-[11px]" : "w-12 h-12 text-sm";
  if (company.logoUrl) {
    return (
      <img
        src={company.logoUrl}
        alt={company.name}
        className={`${dim} rounded-xl object-cover flex-shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-xl flex items-center justify-center font-bold flex-shrink-0`}
      style={{ background: "var(--gradient-warm)", color: "oklch(0.11 0 0)" }}
    >
      {company.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function ProductImage({ product }: { product: ProductPublic }) {
  if (product.imageUrl) {
    return (
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-36 object-cover rounded-t-xl"
      />
    );
  }
  return (
    <div
      className="w-full h-36 rounded-t-xl flex items-center justify-center"
      style={{ background: "var(--gradient-subtle)" }}
    >
      <Package className="w-10 h-10 text-muted-foreground opacity-50" />
    </div>
  );
}

// ─── Skeleton loaders ─────────────────────────────
function CompanyCardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-3">
      <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
}

function OfferCardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-border bg-card space-y-2">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────
export default function BrowsePage() {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [search, setSearch] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState<bigint | null>(
    null,
  );

  const { data: companies = [], isLoading: loadingCompanies } =
    useActiveCompanies();
  const { data: offers = [], isLoading: loadingOffers } = useActiveOffers();
  const { data: products = [], isLoading: loadingProducts } =
    useActiveProducts();

  // Build a companyId → company map
  const companyMap = useMemo(() => {
    const m = new Map<string, CompanyPublic>();
    for (const c of companies) m.set(String(c.id), c);
    return m;
  }, [companies]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.nameAr.includes(search) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesCompany =
        !selectedCompanyId || String(p.companyId) === String(selectedCompanyId);
      return matchesSearch && matchesCompany;
    });
  }, [products, search, selectedCompanyId]);

  // Group filtered products by company
  const groupedProducts = useMemo(() => {
    const groups = new Map<string, ProductPublic[]>();
    for (const p of filteredProducts) {
      const key = String(p.companyId);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(p);
    }
    return groups;
  }, [filteredProducts]);

  const hasFilters = !!search || !!selectedCompanyId;

  return (
    <ProtectedRoute>
      <Layout variant="user">
        <div className="max-w-5xl mx-auto space-y-8" dir={dir}>
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-display font-bold text-2xl text-foreground">
              {lang === "ar"
                ? "تصفح الشركات والعروض"
                : "Browse Companies & Offers"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {lang === "ar"
                ? "اكتشف أفضل الشركات والعروض واطلب مباشرة"
                : "Discover the best companies, offers, and order directly"}
            </p>
          </motion.div>

          {/* Search + Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${dir === "rtl" ? "right-3" : "left-3"}`}
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  lang === "ar" ? "ابحث عن منتج..." : "Search products..."
                }
                className={`${dir === "rtl" ? "pr-9" : "pl-9"} bg-card border-border`}
                data-ocid="browse.search_input"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className={`absolute top-1/2 -translate-y-1/2 ${dir === "rtl" ? "left-3" : "right-3"} text-muted-foreground hover:text-foreground`}
                  aria-label={lang === "ar" ? "مسح البحث" : "Clear search"}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedCompanyId(null);
                }}
                data-ocid="browse.clear_filters.button"
                className="whitespace-nowrap"
              >
                <X className="w-3.5 h-3.5 me-1.5" />
                {lang === "ar" ? "مسح الفلاتر" : "Clear filters"}
              </Button>
            )}
          </motion.div>

          {/* Companies Section */}
          <section data-ocid="browse.companies.section">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-lg text-foreground">
                {lang === "ar" ? "الشركات المتاحة" : "Available Companies"}
              </h2>
              {!loadingCompanies && (
                <Badge variant="secondary" className="text-xs">
                  {companies.length}
                </Badge>
              )}
            </div>

            {loadingCompanies ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <CompanyCardSkeleton key={i} />
                ))}
              </div>
            ) : companies.length === 0 ? (
              <div
                className="py-10 text-center rounded-xl border border-dashed border-border bg-muted/20"
                data-ocid="browse.companies.empty_state"
              >
                <Building2 className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground text-sm">
                  {lang === "ar"
                    ? "لا توجد شركات متاحة"
                    : "No companies available"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <AnimatePresence>
                  {companies.map((company, idx) => {
                    const isSelected =
                      selectedCompanyId !== null &&
                      String(selectedCompanyId) === String(company.id);
                    return (
                      <motion.button
                        key={String(company.id)}
                        type="button"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() =>
                          setSelectedCompanyId(isSelected ? null : company.id)
                        }
                        data-ocid={`browse.company.item.${idx + 1}`}
                        className={[
                          "text-start w-full p-4 rounded-xl border transition-smooth flex items-center gap-3",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border bg-card hover:border-primary/40 hover:bg-muted/20",
                        ].join(" ")}
                      >
                        <CompanyLogo company={company} size="md" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {lang === "ar" ? company.nameAr : company.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                            {lang === "ar"
                              ? company.descriptionAr
                              : company.description}
                          </p>
                        </div>
                        {isSelected && (
                          <X className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </section>

          {/* Offers Section */}
          <section data-ocid="browse.offers.section">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-lg text-foreground">
                {lang === "ar" ? "العروض الحالية" : "Current Offers"}
              </h2>
              {!loadingOffers && (
                <Badge variant="secondary" className="text-xs">
                  {offers.length}
                </Badge>
              )}
            </div>

            {loadingOffers ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <OfferCardSkeleton key={i} />
                ))}
              </div>
            ) : offers.length === 0 ? (
              <div
                className="py-10 text-center rounded-xl border border-dashed border-border bg-muted/20"
                data-ocid="browse.offers.empty_state"
              >
                <Tag className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground text-sm">
                  {lang === "ar" ? "لا توجد عروض حالياً" : "No offers available"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <AnimatePresence>
                  {offers.map((offer, idx) => {
                    const expiry = new Date(
                      Number(offer.validUntil) / 1_000_000,
                    );
                    const isExpired = expiry < new Date();
                    return (
                      <motion.div
                        key={String(offer.id)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        data-ocid={`browse.offer.item.${idx + 1}`}
                      >
                        <Card className="border-border bg-card overflow-hidden hover:border-primary/30 transition-smooth">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                                style={{
                                  background: "var(--gradient-warm)",
                                  color: "oklch(0.11 0 0)",
                                }}
                              >
                                <Star className="w-3 h-3" />
                                {offer.discount}%{" "}
                                {lang === "ar" ? "خصم" : "OFF"}
                              </span>
                              {isExpired && (
                                <Badge
                                  variant="outline"
                                  className="text-[10px] text-muted-foreground"
                                >
                                  {lang === "ar" ? "منتهي" : "Expired"}
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-foreground text-sm leading-snug">
                              {lang === "ar" ? offer.titleAr : offer.title}
                            </h3>
                            <p className="text-[12px] text-muted-foreground mt-1 line-clamp-2">
                              {lang === "ar"
                                ? offer.descriptionAr
                                : offer.description}
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-2">
                              {lang === "ar" ? "صالح حتى:" : "Valid until:"}{" "}
                              {expiry.toLocaleDateString(
                                lang === "ar" ? "ar-EG" : "en-EG",
                              )}
                            </p>
                            <Button
                              size="sm"
                              className="w-full mt-3"
                              onClick={() => navigate({ to: "/orders/new" })}
                              disabled={isExpired}
                              data-ocid={`browse.offer.request.${idx + 1}`}
                            >
                              <ShoppingCart className="w-3.5 h-3.5 me-1.5" />
                              {lang === "ar" ? "اطلب الآن" : "Request Now"}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </section>

          {/* Products Section */}
          <section data-ocid="browse.products.section">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="font-display font-semibold text-lg text-foreground">
                {lang === "ar" ? "جميع المنتجات" : "All Products"}
              </h2>
              {!loadingProducts && (
                <Badge variant="secondary" className="text-xs">
                  {filteredProducts.length}
                </Badge>
              )}
            </div>

            {loadingProducts ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div
                className="py-12 text-center rounded-xl border border-dashed border-border bg-muted/20"
                data-ocid="browse.products.empty_state"
              >
                <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-40" />
                <p className="font-medium text-foreground text-sm">
                  {lang === "ar" ? "لا توجد منتجات" : "No products found"}
                </p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  {lang === "ar"
                    ? "جرّب تغيير البحث أو الفلتر"
                    : "Try changing your search or filter"}
                </p>
                {hasFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => {
                      setSearch("");
                      setSelectedCompanyId(null);
                    }}
                    data-ocid="browse.products.clear_filters.button"
                  >
                    {lang === "ar" ? "مسح الفلاتر" : "Clear filters"}
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {[...groupedProducts.entries()].map(([companyId, prods]) => {
                  const company = companyMap.get(companyId);
                  return (
                    <div key={companyId}>
                      {company && (
                        <div className="flex items-center gap-2 mb-3">
                          <CompanyLogo company={company} size="sm" />
                          <span className="font-medium text-sm text-foreground">
                            {lang === "ar" ? company.nameAr : company.name}
                          </span>
                          <div className="flex-1 h-px bg-border" />
                        </div>
                      )}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        <AnimatePresence>
                          {prods.map((product, pidx) => (
                            <motion.div
                              key={String(product.id)}
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: pidx * 0.05 }}
                              data-ocid={`browse.product.item.${pidx + 1}`}
                            >
                              <Card className="border-border bg-card overflow-hidden group hover:border-primary/40 hover:shadow-md transition-smooth h-full flex flex-col">
                                <ProductImage product={product} />
                                <CardContent className="p-3 flex flex-col flex-1">
                                  <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-1">
                                    {lang === "ar"
                                      ? product.nameAr
                                      : product.name}
                                  </h3>
                                  <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 flex-1">
                                    {lang === "ar"
                                      ? product.descriptionAr
                                      : product.description}
                                  </p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span
                                      className="text-sm font-bold"
                                      style={{
                                        background: "var(--gradient-warm)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                      }}
                                    >
                                      {product.price} {t("misc.egp", lang)}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="text-[9px] px-1.5 py-0 border-border"
                                    >
                                      {product.category}
                                    </Badge>
                                  </div>
                                  <Button
                                    size="sm"
                                    className="w-full mt-2.5"
                                    onClick={() =>
                                      navigate({ to: "/orders/new" })
                                    }
                                    data-ocid={`browse.product.request.${pidx + 1}`}
                                  >
                                    <ShoppingCart className="w-3 h-3 me-1.5" />
                                    {lang === "ar"
                                      ? "اطلب الآن"
                                      : "Request Now"}
                                  </Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
