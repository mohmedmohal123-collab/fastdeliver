import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Bell, BellOff, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import type { NotificationPublic } from "../backend";
import { Layout } from "../components/Layout";
import { t } from "../i18n";
import { mockBackend } from "../mocks/backend";
import { useAuthStore } from "../store/auth";
import { useLangStore } from "../store/lang";
import { useNotificationsStore } from "../store/notifications";

const NOTIF_ICONS: Record<string, string> = {
  OrderCreated: "📦",
  OrderAccepted: "✅",
  OrderInTransit: "🚚",
  CourierArrived: "📍",
  OrderDelivered: "🎉",
  OrderCancelled: "❌",
  PaymentProcessed: "💳",
  PaymentFailed: "⚠️",
};

function formatFullDate(timestamp: bigint, lang: "ar" | "en"): string {
  const date = new Date(Number(timestamp / 1_000_000n));
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function NotifSkeleton() {
  return (
    <div className="flex gap-4 p-4 border border-border rounded-xl bg-card">
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const { token } = useAuthStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    notifications,
    setNotifications,
    markRead,
    markAllRead,
    unreadCount,
  } = useNotificationsStore();

  const dir = lang === "ar" ? "rtl" : "ltr";

  const { isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!token) return [];
      const data = await mockBackend.getMyNotifications(token);
      setNotifications(data as NotificationPublic[]);
      return data;
    },
    enabled: !!token,
    refetchInterval: 30_000,
    staleTime: 20_000,
  });

  const markAllMutation = useMutation({
    mutationFn: async () => {
      if (!token) return;
      await mockBackend.markAllNotificationsRead(token);
    },
    onSuccess: () => {
      markAllRead();
      qc.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(
        lang === "ar" ? "تم تحديد الكل كمقروء" : "All marked as read",
      );
    },
  });

  const markOneMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!token) return;
      await mockBackend.markNotificationRead(token, id);
    },
    onSuccess: (_data, id) => {
      markRead(id);
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  // Redirect if not logged in — after all hooks
  if (!token) {
    navigate({ to: "/login" });
    return null;
  }

  const displayed = notifications.slice(0, 20);

  return (
    <Layout variant="user">
      <div className="max-w-2xl mx-auto space-y-6" dir={dir}>
        {/* Page header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => navigate({ to: "/home" })}
              data-ocid="notifications.back.button"
              aria-label={t("btn.back", lang)}
            >
              <ArrowLeft
                className={["w-4 h-4", lang === "ar" ? "rotate-180" : ""].join(
                  " ",
                )}
              />
            </Button>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">
                {t("page.notifications", lang)}
              </h1>
              {unreadCount > 0 && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {lang === "ar"
                    ? `${unreadCount} إشعار غير مقروء`
                    : `${unreadCount} unread`}
                </p>
              )}
            </div>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs"
              onClick={() => markAllMutation.mutate()}
              disabled={markAllMutation.isPending}
              data-ocid="notifications.mark_all_read.button"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              {t("notif.markAllRead", lang)}
            </Button>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3">
            {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
              <NotifSkeleton key={k} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div
            data-ocid="notifications.empty_state"
            className="flex flex-col items-center py-20 gap-4 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center">
              <BellOff className="w-9 h-9 text-muted-foreground/40" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {t("notif.noNotifications", lang)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t("notif.noNotificationsHint", lang)}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {displayed.map((notif, idx) => {
              const message = lang === "ar" ? notif.messageAr : notif.message;
              const icon = NOTIF_ICONS[notif.notifType] ?? "🔔";
              const typeLabel =
                t(`notifType.${notif.notifType}`, lang) || notif.notifType;

              return (
                <button
                  type="button"
                  key={String(notif.id)}
                  data-ocid={`notifications.item.${idx + 1}`}
                  className={[
                    "w-full flex gap-4 p-4 rounded-xl border transition-colors hover:bg-muted/20 cursor-pointer text-left group",
                    !notif.isRead
                      ? "bg-primary/5 border-primary/20"
                      : "bg-card border-border",
                  ].join(" ")}
                  onClick={() => {
                    if (!notif.isRead) markOneMutation.mutate(notif.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      if (!notif.isRead) markOneMutation.mutate(notif.id);
                    }
                  }}
                >
                  <div
                    className={[
                      "w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0",
                      !notif.isRead ? "bg-primary/10" : "bg-muted/40",
                    ].join(" ")}
                  >
                    {icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={[
                            "text-[10px] px-2 py-0 font-medium",
                            !notif.isRead
                              ? "border-primary/40 text-primary"
                              : "border-border text-muted-foreground",
                          ].join(" ")}
                        >
                          {typeLabel}
                        </Badge>
                        {!notif.isRead && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground/60 flex-shrink-0 mt-0.5">
                        {formatFullDate(notif.timestamp, lang)}
                      </span>
                    </div>

                    <p
                      className={[
                        "text-sm mt-1.5 leading-relaxed break-words",
                        !notif.isRead
                          ? "text-foreground"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {message}
                    </p>

                    {notif.orderId && (
                      <Link
                        to="/orders/$orderId"
                        params={{ orderId: String(notif.orderId) }}
                        data-ocid={`notifications.item.${idx + 1}.order_link`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium mt-2"
                      >
                        <Bell className="w-3 h-3" />
                        {t("notif.viewOrder", lang)} #{String(notif.orderId)}
                      </Link>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
