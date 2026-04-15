import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building2, Edit, Plus, Search, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "../components/ImageUploader";
import { Layout } from "../components/Layout";
import { AdminProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import type { CompanyPublic } from "../types";

const INITIAL_COMPANIES: CompanyPublic[] = [
  {
    id: 1,
    name: "TechEgypt",
    nameAr: "تك مصر",
    description: "Egypt's leading electronics delivery partner",
    descriptionAr: "شريك التوصيل الإلكتروني الأول في مصر",
    logoUrl: "",
    isActive: true,
    createdAt: Date.now(),
  },
  {
    id: 2,
    name: "FreshMart",
    nameAr: "فريش مارت",
    description: "Premium fresh grocery delivery service",
    descriptionAr: "خدمة توصيل بقالة طازجة مميزة",
    logoUrl: "",
    isActive: true,
    createdAt: Date.now(),
  },
  {
    id: 3,
    name: "PharmaExpress",
    nameAr: "فارما إكسبريس",
    description: "Urgent pharmacy and medical supplies",
    descriptionAr: "صيدلية وإمدادات طبية عاجلة",
    logoUrl: "",
    isActive: false,
    createdAt: Date.now(),
  },
];

type FormData = Omit<CompanyPublic, "id" | "createdAt">;
const emptyForm = (): FormData => ({
  name: "",
  nameAr: "",
  description: "",
  descriptionAr: "",
  logoUrl: "",
  isActive: true,
});

export default function AdminCompaniesPage() {
  const { lang } = useLangStore();
  const { adminToken } = useAuthStore();
  const [companies, setCompanies] =
    useState<CompanyPublic[]>(INITIAL_COMPANIES);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm());
  const [saving, setSaving] = useState(false);

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

  function openEdit(c: CompanyPublic) {
    setEditingId(c.id);
    setForm({
      name: c.name,
      nameAr: c.nameAr,
      description: c.description,
      descriptionAr: c.descriptionAr,
      logoUrl: c.logoUrl,
      isActive: c.isActive,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.name || !form.nameAr) {
      toast.error(
        lang === "ar" ? "يرجى إدخال اسم الشركة" : "Please enter company name",
      );
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    if (editingId !== null) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...form } : c)),
      );
      toast.success(lang === "ar" ? "تم تحديث الشركة" : "Company updated");
    } else {
      setCompanies((prev) => [
        { ...form, id: Date.now(), createdAt: Date.now() },
        ...prev,
      ]);
      toast.success(lang === "ar" ? "تم إضافة الشركة" : "Company added");
    }
    setSaving(false);
    setDialogOpen(false);
  }

  function handleDelete(id: number) {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    setDeleteId(null);
    toast.success(lang === "ar" ? "تم حذف الشركة" : "Company deleted");
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
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">
                  {t("page.adminCompanies", lang)}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {companies.length} {lang === "ar" ? "شركة" : "companies"}
                </p>
              </div>
            </div>
            <Button
              className="btn-primary gap-2"
              onClick={openAdd}
              data-ocid="admin.companies.add_button"
            >
              <Plus className="w-4 h-4" />
              {t("company.addNew", lang)}
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
              data-ocid="admin.companies.search_input"
            />
          </div>

          {/* Cards Grid */}
          {filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="admin.companies.empty_state"
            >
              <Building2 className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">
                {t("company.empty", lang)}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={openAdd}
              >
                {t("company.addNew", lang)}
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((c, idx) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.06 }}
                    data-ocid={`admin.companies.item.${idx + 1}`}
                  >
                    <Card className="card-elevated overflow-hidden group">
                      {/* Logo banner */}
                      <div
                        className="h-16 flex items-center justify-center overflow-hidden"
                        style={{
                          background: c.logoUrl
                            ? undefined
                            : "var(--gradient-warm)",
                          opacity: c.isActive ? 1 : 0.5,
                        }}
                      >
                        {c.logoUrl ? (
                          <img
                            src={c.logoUrl}
                            alt={c.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.parentElement!.style.background =
                                "var(--gradient-warm)";
                            }}
                          />
                        ) : (
                          <Building2 className="w-7 h-7 text-primary-foreground" />
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0">
                            <p className="font-display font-semibold text-foreground truncate">
                              {lang === "ar" ? c.nameAr : c.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {lang === "ar" ? c.name : c.nameAr}
                            </p>
                          </div>
                          <Badge
                            variant={c.isActive ? "default" : "secondary"}
                            className={`ml-2 flex-shrink-0 text-xs ${c.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}`}
                          >
                            {c.isActive
                              ? lang === "ar"
                                ? "نشطة"
                                : "Active"
                              : lang === "ar"
                                ? "غير نشطة"
                                : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {lang === "ar" ? c.descriptionAr : c.description}
                        </p>
                        <div className="flex gap-2 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1.5 h-8"
                            onClick={() => openEdit(c)}
                            data-ocid={`admin.companies.edit_button.${idx + 1}`}
                          >
                            <Edit className="w-3 h-3" />
                            {t("btn.edit", lang)}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 text-destructive hover:bg-destructive/10 border-destructive/30"
                            onClick={() => setDeleteId(c.id)}
                            data-ocid={`admin.companies.delete_button.${idx + 1}`}
                            aria-label={
                              lang === "ar" ? "حذف الشركة" : "Delete company"
                            }
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent
            className="max-w-lg"
            data-ocid="admin.companies.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display">
                {editingId
                  ? t("company.edit", lang)
                  : t("company.addNew", lang)}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">{t("company.name", lang)} *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                    data-ocid="admin.companies.name_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("company.nameAr", lang)} *
                  </Label>
                  <Input
                    value={form.nameAr}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, nameAr: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                    dir="rtl"
                    data-ocid="admin.companies.name_ar_input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("company.description", lang)}
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
                    {t("company.descriptionAr", lang)}
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
              <div className="space-y-1.5">
                <Label className="text-xs">{t("upload.logo", lang)}</Label>
                <ImageUploader
                  value={form.logoUrl}
                  onChange={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
                  lang={lang}
                  label=""
                  ocidPrefix="admin.companies"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isActive: v }))
                  }
                  data-ocid="admin.companies.active_switch"
                />
                <Label className="text-sm">{t("company.active", lang)}</Label>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin.companies.cancel_button"
              >
                {t("btn.cancel", lang)}
              </Button>
              <Button
                className="btn-primary flex-1"
                onClick={handleSave}
                disabled={saving}
                data-ocid="admin.companies.save_button"
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

        {/* Delete Confirm */}
        <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <DialogContent
            className="max-w-sm"
            data-ocid="admin.companies.delete.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display text-destructive flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                {t("btn.delete", lang)}
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground py-2">
              {t("company.deleteConfirm", lang)}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteId(null)}
                data-ocid="admin.companies.delete.cancel_button"
              >
                {t("btn.cancel", lang)}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => deleteId && handleDelete(deleteId)}
                data-ocid="admin.companies.delete.confirm_button"
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
