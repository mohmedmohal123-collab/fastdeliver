import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { Bell, CheckCircle2, Clock, Send, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { AdminProtectedRoute } from "../components/ProtectedRoute";
import { t } from "../i18n";
import { useLangStore } from "../store/lang";

type Segment = "all" | "pending" | "active";

interface BroadcastRecord {
  id: number;
  messageEn: string;
  messageAr: string;
  segment: Segment;
  sentAt: string;
  status: "sent" | "failed";
}

const MOCK_HISTORY: BroadcastRecord[] = [
  {
    id: 1,
    messageEn:
      "Service maintenance tonight from 2–4 AM. Orders may be delayed.",
    messageAr: "صيانة الخدمة الليلة من 2 إلى 4 صباحاً. قد تتأخر الطلبات.",
    segment: "all",
    sentAt: "2026-04-14 22:00",
    status: "sent",
  },
  {
    id: 2,
    messageEn: "New delivery zones added in Cairo! Check your area.",
    messageAr: "تمت إضافة مناطق توصيل جديدة في القاهرة! تحقق من منطقتك.",
    segment: "active",
    sentAt: "2026-04-12 10:30",
    status: "sent",
  },
  {
    id: 3,
    messageEn: "Please complete your pending payment to proceed.",
    messageAr: "يرجى إتمام الدفع المعلق للمتابعة.",
    segment: "pending",
    sentAt: "2026-04-10 15:45",
    status: "sent",
  },
];

const SEGMENT_ESTIMATES: Record<
  Segment,
  { en: string; ar: string; count: number }
> = {
  all: { en: "All Users", ar: "جميع المستخدمين", count: 47 },
  pending: {
    en: "Users with Pending Orders",
    ar: "مستخدمو الطلبات المعلقة",
    count: 12,
  },
  active: { en: "Active Users", ar: "المستخدمون النشطون", count: 31 },
};

export default function AdminBroadcastPage() {
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [messageEn, setMessageEn] = useState("");
  const [messageAr, setMessageAr] = useState("");
  const [segment, setSegment] = useState<Segment>("all");
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<BroadcastRecord[]>(MOCK_HISTORY);

  const selectedSegment = SEGMENT_ESTIMATES[segment];
  const canSend = messageEn.trim().length > 0 && messageAr.trim().length > 0;

  async function handleSend() {
    if (!canSend) return;
    setSending(true);
    try {
      // Simulate API call — backend broadcast endpoint wired when available
      await new Promise((r) => setTimeout(r, 800));
      const newRecord: BroadcastRecord = {
        id: Date.now(),
        messageEn: messageEn.trim(),
        messageAr: messageAr.trim(),
        segment,
        sentAt: new Date().toLocaleString(),
        status: "sent",
      };
      setHistory([newRecord, ...history]);
      setMessageEn("");
      setMessageAr("");
      setConfirming(false);
      toast.success(
        lang === "ar"
          ? "تم إرسال الإشعار بنجاح"
          : "Notification sent successfully",
      );
    } catch {
      toast.error(
        lang === "ar" ? "فشل إرسال الإشعار" : "Failed to send notification",
      );
    }
    setSending(false);
  }

  return (
    <AdminProtectedRoute>
      <Layout variant="admin">
        <div className="space-y-6 max-w-3xl" dir={dir}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-warm)" }}
              >
                <Bell className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">
                  {t("page.adminBroadcast", lang)}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {lang === "ar"
                    ? "أرسل إشعاراً لمجموعة من المستخدمين"
                    : "Send a notification to a group of users"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/admin" })}
              data-ocid="broadcast.back.button"
            >
              {lang === "ar" ? "← رجوع" : "← Back"}
            </Button>
          </div>

          {/* Compose form */}
          <Card className="card-elevated border border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Send className="w-4 h-4 text-primary" />
                {lang === "ar" ? "إنشاء إشعار جديد" : "Compose Notification"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Segment selector */}
              <div className="space-y-2">
                <Label>
                  {lang === "ar" ? "استهداف المستخدمين" : "Target Segment"}
                </Label>
                <Select
                  value={segment}
                  onValueChange={(v) => setSegment(v as Segment)}
                >
                  <SelectTrigger data-ocid="broadcast.segment.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {lang === "ar" ? "جميع المستخدمين" : "All Users"}
                    </SelectItem>
                    <SelectItem value="pending">
                      {lang === "ar"
                        ? "مستخدمو الطلبات المعلقة"
                        : "Users with Pending Orders"}
                    </SelectItem>
                    <SelectItem value="active">
                      {lang === "ar" ? "المستخدمون النشطون" : "Active Users"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* Audience preview */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20 border border-border/40">
                  <Users className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    {lang === "ar" ? "الجمهور المستهدف:" : "Target audience:"}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {lang === "ar" ? selectedSegment.ar : selectedSegment.en}
                  </span>
                  <Badge variant="secondary" className="ms-auto text-[10px]">
                    ~{selectedSegment.count}{" "}
                    {lang === "ar" ? "مستخدم" : "users"}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* English message */}
              <div className="space-y-2">
                <Label htmlFor="msg-en">
                  {lang === "ar" ? "الرسالة (إنجليزي)" : "Message (English)"}
                </Label>
                <Textarea
                  id="msg-en"
                  value={messageEn}
                  onChange={(e) => setMessageEn(e.target.value)}
                  placeholder="Enter notification message in English..."
                  rows={3}
                  className="resize-none"
                  data-ocid="broadcast.message_en.textarea"
                />
                <p className="text-[11px] text-muted-foreground text-right">
                  {messageEn.length}/200
                </p>
              </div>

              {/* Arabic message */}
              <div className="space-y-2" dir="rtl">
                <Label htmlFor="msg-ar">
                  {lang === "ar" ? "الرسالة (عربي)" : "Message (Arabic)"}
                </Label>
                <Textarea
                  id="msg-ar"
                  value={messageAr}
                  onChange={(e) => setMessageAr(e.target.value)}
                  placeholder="أدخل نص الإشعار بالعربية..."
                  rows={3}
                  className="resize-none text-right"
                  dir="rtl"
                  data-ocid="broadcast.message_ar.textarea"
                />
                <p className="text-[11px] text-muted-foreground text-left">
                  {messageAr.length}/200
                </p>
              </div>

              {/* Preview */}
              {(messageEn || messageAr) && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                  <p className="text-[11px] font-medium text-primary uppercase tracking-wide">
                    {lang === "ar" ? "معاينة" : "Preview"}
                  </p>
                  {messageEn && (
                    <p className="text-sm text-foreground">{messageEn}</p>
                  )}
                  {messageAr && (
                    <p className="text-sm text-foreground text-right" dir="rtl">
                      {messageAr}
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              {!confirming ? (
                <Button
                  className="w-full btn-primary gap-2"
                  disabled={!canSend}
                  onClick={() => setConfirming(true)}
                  data-ocid="broadcast.send.button"
                >
                  <Send className="w-4 h-4" />
                  {lang === "ar" ? "إرسال الإشعار" : "Send Notification"}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/30 px-4 py-3 text-sm text-yellow-400">
                    {lang === "ar"
                      ? `سيتم إرسال إشعار لـ ~${selectedSegment.count} مستخدم. هل أنت متأكد؟`
                      : `This will send to ~${selectedSegment.count} users. Are you sure?`}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 btn-primary gap-2"
                      disabled={sending}
                      onClick={handleSend}
                      data-ocid="broadcast.confirm_button"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {sending
                        ? lang === "ar"
                          ? "جار الإرسال..."
                          : "Sending..."
                        : lang === "ar"
                          ? "تأكيد الإرسال"
                          : "Confirm Send"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setConfirming(false)}
                      disabled={sending}
                      data-ocid="broadcast.cancel_button"
                    >
                      {lang === "ar" ? "إلغاء" : "Cancel"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent broadcasts */}
          <Card className="card-elevated border border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                {lang === "ar" ? "الإشعارات الأخيرة" : "Recent Broadcasts"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.length === 0 ? (
                <p
                  className="text-sm text-muted-foreground text-center py-4"
                  data-ocid="broadcast.history.empty_state"
                >
                  {lang === "ar"
                    ? "لا توجد إشعارات مرسلة بعد"
                    : "No broadcasts sent yet"}
                </p>
              ) : (
                history.map((rec, i) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-muted/20 border border-border/40 space-y-1.5"
                    data-ocid={`broadcast.history.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className="text-[10px] border-primary/40 text-primary"
                      >
                        {lang === "ar"
                          ? SEGMENT_ESTIMATES[rec.segment].ar
                          : SEGMENT_ESTIMATES[rec.segment].en}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {rec.sentAt}
                      </span>
                    </div>
                    <p className="text-xs text-foreground line-clamp-1">
                      {lang === "ar" ? rec.messageAr : rec.messageEn}
                    </p>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span className="text-[11px] text-green-400">
                        {lang === "ar" ? "تم الإرسال" : "Sent"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </AdminProtectedRoute>
  );
}
