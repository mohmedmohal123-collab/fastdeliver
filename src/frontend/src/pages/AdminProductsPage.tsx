import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Edit, Package, Plus, Search, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "../components/ImageUploader";
import { Layout } from "../components/Layout";
import { AdminProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import type { CompanyPublic, ProductPublic } from "../types";

const CATEGORIES = [
  "Electronics",
  "Food & Beverage",
  "Clothing",
  "Documents",
  "Furniture",
  "Pharmacy",
  "Other",
];

const SAMPLE_COMPANIES: CompanyPublic[] = [
  {
    id: 1,
    name: "TechEgypt",
    nameAr: "تك مصر",
    description: "",
    descriptionAr: "",
    logoUrl: "",
    isActive: true,
    createdAt: Date.now(),
  },
  {
    id: 2,
    name: "FreshMart",
    nameAr: "فريش مارت",
    description: "",
    descriptionAr: "",
    logoUrl: "",
    isActive: true,
    createdAt: Date.now(),
  },
];

const INITIAL_PRODUCTS: ProductPublic[] = [
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
    createdAt: Date.now(),
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
    createdAt: Date.now(),
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
    createdAt: Date.now(),
  },
];

type FormData = Omit<ProductPublic, "id" | "createdAt">;
const emptyForm = (): FormData => ({
  name: "",
  nameAr: "",
  description: "",
  descriptionAr: "",
  price: 0,
  category: CATEGORIES[0],
  imageUrl: "",
  companyId: undefined,
  isActive: true,
});

export default function AdminProductsPage() {
  const { lang } = useLangStore();
  const { adminToken } = useAuthStore();
  const [products, setProducts] = useState<ProductPublic[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm());
  const [saving, setSaving] = useState(false);

  if (!adminToken) return null;

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.nameAr.includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  }

  function openEdit(p: ProductPublic) {
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
      isActive: p.isActive,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.name || !form.nameAr || form.price <= 0) {
      toast.error(
        lang === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill all required fields",
      );
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)),
      );
      toast.success(lang === "ar" ? "تم تحديث المنتج" : "Product updated");
    } else {
      const newProduct: ProductPublic = {
        ...form,
        id: Date.now(),
        createdAt: Date.now(),
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success(lang === "ar" ? "تم إضافة المنتج" : "Product added");
    }
    setSaving(false);
    setDialogOpen(false);
  }

  function handleDelete(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
    toast.success(lang === "ar" ? "تم حذف المنتج" : "Product deleted");
  }

  return (
    <AdminProtectedRoute>
      <Layout variant="admin">
        <div className="space-y-5 page-transition">
          {/* Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ background: "var(--gradient-warm)" }}
              >
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">
                  {t("page.adminProducts", lang)}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {products.length} {lang === "ar" ? "منتج" : "products"}
                </p>
              </div>
            </div>
            <Button
              className="btn-primary gap-2"
              onClick={openAdd}
              data-ocid="admin.products.add_button"
            >
              <Plus className="w-4 h-4" />
              {t("product.addNew", lang)}
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              className="pl-9 h-9 bg-muted/20 border-border text-sm"
              placeholder={t("nav.search", lang)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="admin.products.search_input"
            />
          </div>

          {/* Table */}
          <Card className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    {[
                      "#",
                      lang === "ar" ? "الاسم" : "Name",
                      lang === "ar" ? "التصنيف" : "Category",
                      lang === "ar" ? "السعر" : "Price",
                      lang === "ar" ? "الحالة" : "Status",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-12 text-center"
                          data-ocid="admin.products.empty_state"
                        >
                          <Package className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                          <p className="text-muted-foreground text-sm">
                            {t("product.empty", lang)}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={openAdd}
                          >
                            {t("product.addNew", lang)}
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((p, idx) => (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: idx * 0.04 }}
                          className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                          data-ocid={`admin.products.item.${idx + 1}`}
                        >
                          <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                            {p.id}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {p.imageUrl ? (
                                <img
                                  src={p.imageUrl}
                                  alt={p.name}
                                  className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-border"
                                  onError={(e) => {
                                    (
                                      e.target as HTMLImageElement
                                    ).style.display = "none";
                                  }}
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-lg bg-muted/30 flex items-center justify-center flex-shrink-0 border border-border">
                                  <Package className="w-4 h-4 text-muted-foreground/40" />
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">
                                  {lang === "ar" ? p.nameAr : p.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {lang === "ar" ? p.name : p.nameAr}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className="text-xs border-border text-muted-foreground"
                            >
                              {p.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 font-semibold text-foreground">
                            {p.price} {t("misc.egp", lang)}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={p.isActive ? "default" : "secondary"}
                              className={
                                p.isActive
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : ""
                              }
                            >
                              {p.isActive
                                ? lang === "ar"
                                  ? "نشط"
                                  : "Active"
                                : lang === "ar"
                                  ? "غير نشط"
                                  : "Inactive"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-7 h-7 text-muted-foreground hover:text-foreground"
                                onClick={() => openEdit(p)}
                                data-ocid={`admin.products.edit_button.${idx + 1}`}
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-7 h-7 text-muted-foreground hover:text-destructive"
                                onClick={() => setDeleteId(p.id)}
                                data-ocid={`admin.products.delete_button.${idx + 1}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg" data-ocid="admin.products.dialog">
            <DialogHeader>
              <DialogTitle className="font-display">
                {editingId
                  ? t("product.edit", lang)
                  : t("product.addNew", lang)}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">{t("product.name", lang)} *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                    data-ocid="admin.products.name_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("product.nameAr", lang)} *
                  </Label>
                  <Input
                    value={form.nameAr}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, nameAr: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                    dir="rtl"
                    data-ocid="admin.products.name_ar_input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("product.description", lang)}
                  </Label>
                  <Input
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("product.descriptionAr", lang)}
                  </Label>
                  <Input
                    value={form.descriptionAr}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, descriptionAr: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                    dir="rtl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("product.price", lang)} *
                  </Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: Number(e.target.value) }))
                    }
                    className="h-9 bg-muted/20"
                    min={0}
                    data-ocid="admin.products.price_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("product.category", lang)}
                  </Label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-sm text-foreground"
                    data-ocid="admin.products.category_select"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">{t("upload.image", lang)}</Label>
                <ImageUploader
                  value={form.imageUrl}
                  onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
                  lang={lang}
                  label=""
                  ocidPrefix="admin.products"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">{t("product.company", lang)}</Label>
                <select
                  value={form.companyId ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      companyId: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    }))
                  }
                  className="w-full h-9 rounded-md border border-input bg-muted/20 px-3 text-sm text-foreground"
                >
                  <option value="">
                    {lang === "ar" ? "بدون شركة" : "No company"}
                  </option>
                  {SAMPLE_COMPANIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {lang === "ar" ? c.nameAr : c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isActive: v }))
                  }
                  data-ocid="admin.products.active_switch"
                />
                <Label className="text-sm">{t("product.active", lang)}</Label>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin.products.cancel_button"
              >
                {t("btn.cancel", lang)}
              </Button>
              <Button
                className="btn-primary flex-1"
                onClick={handleSave}
                disabled={saving}
                data-ocid="admin.products.save_button"
              >
                {saving
                  ? lang === "ar"
                    ? "جار الحفظ..."
                    : "Saving..."
                  : t("btn.save", lang)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirm Dialog */}
        <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <DialogContent
            className="max-w-sm"
            data-ocid="admin.products.delete.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display text-destructive flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                {t("btn.delete", lang)}
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground py-2">
              {t("product.deleteConfirm", lang)}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteId(null)}
                data-ocid="admin.products.delete.cancel_button"
              >
                {t("btn.cancel", lang)}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => deleteId && handleDelete(deleteId)}
                data-ocid="admin.products.delete.confirm_button"
              >
                {t("btn.delete", lang)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Layout>
    </AdminProtectedRoute>
  );
}
