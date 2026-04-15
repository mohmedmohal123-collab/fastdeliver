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
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Edit,
  Percent,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { AdminProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import type { OfferPublic } from "../types";

const INITIAL_OFFERS: OfferPublic[] = [
  {
    id: 1,
    title: "Weekend Express Deal",
    titleAr: "عرض نهاية الأسبوع",
    description: "20% off all weekend deliveries",
    descriptionAr: "خصم 20% على جميع توصيلات نهاية الأسبوع",
    discountPercent: 20,
    validUntil: "2026-05-31",
    isActive: true,
    createdAt: Date.now(),
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
    createdAt: Date.now(),
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
    createdAt: Date.now(),
  },
];

type OfferForm = Omit<OfferPublic, "id" | "createdAt">;
const emptyOffer = (): OfferForm => ({
  title: "",
  titleAr: "",
  description: "",
  descriptionAr: "",
  discountPercent: 10,
  validUntil: "",
  isActive: true,
});

interface NotifForm {
  message: string;
  messageAr: string;
}

export default function AdminOffersPage() {
  const { lang } = useLangStore();
  const { adminToken } = useAuthStore();
  const [offers, setOffers] = useState<OfferPublic[]>(INITIAL_OFFERS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<OfferForm>(emptyOffer());
  const [saving, setSaving] = useState(false);
  const [notifDialog, setNotifDialog] = useState(false);
  const [notifForm, setNotifForm] = useState<NotifForm>({
    message: "",
    messageAr: "",
  });
  const [sendingNotif, setSendingNotif] = useState(false);

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

  function openEdit(o: OfferPublic) {
    setEditingId(o.id);
    setForm({
      title: o.title,
      titleAr: o.titleAr,
      description: o.description,
      descriptionAr: o.descriptionAr,
      discountPercent: o.discountPercent,
      validUntil: o.validUntil,
      isActive: o.isActive,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!form.title || !form.titleAr || !form.validUntil) {
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
      setOffers((prev) =>
        prev.map((o) => (o.id === editingId ? { ...o, ...form } : o)),
      );
      toast.success(lang === "ar" ? "تم تحديث العرض" : "Offer updated");
    } else {
      setOffers((prev) => [
        { ...form, id: Date.now(), createdAt: Date.now() },
        ...prev,
      ]);
      toast.success(lang === "ar" ? "تم إضافة العرض" : "Offer added");
    }
    setSaving(false);
    setDialogOpen(false);
  }

  function handleDelete(id: number) {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    setDeleteId(null);
    toast.success(lang === "ar" ? "تم حذف العرض" : "Offer deleted");
  }

  async function sendNotification() {
    if (!notifForm.message || !notifForm.messageAr) {
      toast.error(
        lang === "ar"
          ? "يرجى ملء نص الإشعار"
          : "Please fill the notification message",
      );
      return;
    }
    setSendingNotif(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success(t("admin.notifSent", lang));
    setSendingNotif(false);
    setNotifDialog(false);
    setNotifForm({ message: "", messageAr: "" });
  }

  function isExpired(validUntil: string) {
    return new Date(validUntil) < new Date();
  }

  return (
    <AdminProtectedRoute>
      <Layout variant="admin">
        <div className="space-y-5 page-transition">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{ background: "var(--gradient-warm)" }}
              >
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">
                  {t("page.adminOffers", lang)}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {offers.filter((o) => o.isActive).length}{" "}
                  {lang === "ar" ? "عرض نشط" : "active offers"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setNotifDialog(true)}
                data-ocid="admin.offers.send_notif_button"
              >
                <Bell className="w-4 h-4" />
                {t("admin.sendNotif", lang)}
              </Button>
              <Button
                className="btn-primary gap-2"
                onClick={openAdd}
                data-ocid="admin.offers.add_button"
              >
                <Plus className="w-4 h-4" />
                {t("offer.addNew", lang)}
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              className="pl-9 h-9 bg-muted/20 border-border text-sm"
              placeholder={t("nav.search", lang)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="admin.offers.search_input"
            />
          </div>

          {/* Offers grid */}
          {filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 text-center"
              data-ocid="admin.offers.empty_state"
            >
              <Percent className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">{t("offer.empty", lang)}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={openAdd}
              >
                {t("offer.addNew", lang)}
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((o, idx) => {
                  const expired = isExpired(o.validUntil);
                  return (
                    <motion.div
                      key={o.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.06 }}
                      data-ocid={`admin.offers.item.${idx + 1}`}
                    >
                      <Card className="card-elevated overflow-hidden group">
                        {/* Discount badge banner */}
                        <div
                          className="h-20 flex items-center justify-center relative overflow-hidden"
                          style={{
                            background:
                              o.isActive && !expired
                                ? "var(--gradient-warm)"
                                : "var(--muted)",
                            opacity: o.isActive && !expired ? 1 : 0.6,
                          }}
                        >
                          <span
                            className="font-display font-black text-4xl"
                            style={{ color: "oklch(0.11 0 0)" }}
                          >
                            {o.discountPercent}%
                          </span>
                          <Percent
                            className="absolute right-3 bottom-2 w-8 h-8 opacity-20"
                            style={{ color: "oklch(0.11 0 0)" }}
                          />
                        </div>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-display font-semibold text-foreground truncate">
                                {lang === "ar" ? o.titleAr : o.title}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {lang === "ar" ? o.title : o.titleAr}
                              </p>
                            </div>
                            <div className="flex flex-col gap-1 items-end flex-shrink-0">
                              {o.isActive && !expired ? (
                                <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                                  {lang === "ar" ? "نشط" : "Active"}
                                </Badge>
                              ) : expired ? (
                                <Badge
                                  variant="secondary"
                                  className="text-xs text-destructive border-destructive/30"
                                >
                                  {lang === "ar" ? "منتهي" : "Expired"}
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  {lang === "ar" ? "معطل" : "Inactive"}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {lang === "ar" ? o.descriptionAr : o.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lang === "ar" ? "صالح حتى:" : "Valid until:"}{" "}
                            <span
                              className={`font-medium ${expired ? "text-destructive" : "text-foreground"}`}
                            >
                              {o.validUntil}
                            </span>
                          </p>
                          <div className="flex gap-2 pt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 gap-1.5 h-8"
                              onClick={() => openEdit(o)}
                              data-ocid={`admin.offers.edit_button.${idx + 1}`}
                            >
                              <Edit className="w-3 h-3" />
                              {t("btn.edit", lang)}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 text-destructive hover:bg-destructive/10 border-destructive/30"
                              onClick={() => setDeleteId(o.id)}
                              data-ocid={`admin.offers.delete_button.${idx + 1}`}
                              aria-label={
                                lang === "ar" ? "حذف العرض" : "Delete offer"
                              }
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg" data-ocid="admin.offers.dialog">
            <DialogHeader>
              <DialogTitle className="font-display">
                {editingId ? t("offer.edit", lang) : t("offer.addNew", lang)}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">{t("offer.title", lang)} *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                    data-ocid="admin.offers.title_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("offer.titleAr", lang)} *
                  </Label>
                  <Input
                    value={form.titleAr}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, titleAr: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                    dir="rtl"
                    data-ocid="admin.offers.title_ar_input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("offer.description", lang)}
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
                    {t("offer.descriptionAr", lang)}
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
                    {t("offer.discount", lang)} *
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={form.discountPercent}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        discountPercent: Math.min(
                          100,
                          Math.max(1, Number(e.target.value)),
                        ),
                      }))
                    }
                    className="h-9 bg-muted/20"
                    data-ocid="admin.offers.discount_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {t("offer.validUntil", lang)} *
                  </Label>
                  <Input
                    type="date"
                    value={form.validUntil}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, validUntil: e.target.value }))
                    }
                    className="h-9 bg-muted/20"
                    data-ocid="admin.offers.valid_until_input"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isActive: v }))
                  }
                  data-ocid="admin.offers.active_switch"
                />
                <Label className="text-sm">{t("offer.active", lang)}</Label>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDialogOpen(false)}
                data-ocid="admin.offers.cancel_button"
              >
                {t("btn.cancel", lang)}
              </Button>
              <Button
                className="btn-primary flex-1"
                onClick={handleSave}
                disabled={saving}
                data-ocid="admin.offers.save_button"
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
            data-ocid="admin.offers.delete.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display text-destructive flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                {t("btn.delete", lang)}
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground py-2">
              {t("offer.deleteConfirm", lang)}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteId(null)}
                data-ocid="admin.offers.delete.cancel_button"
              >
                {t("btn.cancel", lang)}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => deleteId && handleDelete(deleteId)}
                data-ocid="admin.offers.delete.confirm_button"
              >
                {t("btn.delete", lang)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Send Notification Dialog */}
        <Dialog open={notifDialog} onOpenChange={setNotifDialog}>
          <DialogContent
            className="max-w-md"
            data-ocid="admin.offers.notif.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                {t("admin.sendNotif", lang)}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary">
                {lang === "ar"
                  ? "سيتم إرسال هذا الإشعار لجميع المستخدمين النشطين في التطبيق"
                  : "This notification will be sent to all active app users"}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">
                  {t("admin.notifMessage", lang)} *
                </Label>
                <Textarea
                  value={notifForm.message}
                  onChange={(e) =>
                    setNotifForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="bg-muted/20 resize-none h-20"
                  placeholder="e.g. Exclusive summer discount — 30% off all deliveries!"
                  data-ocid="admin.offers.notif.message_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">
                  {t("admin.notifMessageAr", lang)} *
                </Label>
                <Textarea
                  value={notifForm.messageAr}
                  onChange={(e) =>
                    setNotifForm((f) => ({ ...f, messageAr: e.target.value }))
                  }
                  className="bg-muted/20 resize-none h-20"
                  dir="rtl"
                  placeholder="مثال: عرض صيف حصري — خصم 30% على جميع التوصيلات!"
                  data-ocid="admin.offers.notif.message_ar_input"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setNotifDialog(false)}
                data-ocid="admin.offers.notif.cancel_button"
              >
                {t("btn.cancel", lang)}
              </Button>
              <Button
                className="btn-primary flex-1 gap-2"
                onClick={sendNotification}
                disabled={sendingNotif}
                data-ocid="admin.offers.notif.submit_button"
              >
                <Bell className="w-3.5 h-3.5" />
                {sendingNotif
                  ? lang === "ar"
                    ? "جار الإرسال..."
                    : "Sending..."
                  : t("admin.sendNotif", lang)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Layout>
    </AdminProtectedRoute>
  );
}
