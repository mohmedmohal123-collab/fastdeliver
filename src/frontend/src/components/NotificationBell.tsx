import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { NotificationPublic } from "../backend";
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

function formatRelativeTime(timestamp: bigint, lang: "ar" | "en"): string {
  const now = Date.now();
  const diffMs = now - Number(timestamp / 1_000_000n);
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHr = Math.floor(diffMs / 3_600_000);
  const diffDay = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return t("notif.justNow", lang);
  if (diffMin < 60) return `${diffMin} ${t("notif.minutesAgo", lang)}`;
  if (diffHr < 24) return `${diffHr} ${t("notif.hoursAgo", lang)}`;
  return `${diffDay} ${t("notif.daysAgo", lang)}`;
}

export function NotificationBell() {
  const { token } = useAuthStore();
  const { lang } = useLangStore();
  const qc = useQueryClient();
  const { notifications, unreadCount, setNotifications, markAllRead } =
    useNotificationsStore();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDialogElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Poll notifications every 30s
  useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!token) return [];
      const data = await mockBackend.getMyNotifications(token);
      setNotifications(data);
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
    },
  });

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const recent = notifications.slice(0, 10);

  return (
    <div className="relative">
      <Button
        ref={btnRef}
        variant="ghost"
        size="icon"
        className="relative w-8 h-8"
        data-ocid="header.notifications.button"
        aria-label={lang === "ar" ? "إشعارات" : "Notifications"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <Badge
            className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 text-[9px] font-bold leading-none flex items-center justify-center rounded-full bg-primary text-primary-foreground border-0"
            data-ocid="header.notifications.badge"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {open && (
        <dialog
          ref={panelRef}
          open
          data-ocid="notifications.popover"
          className="absolute top-10 right-0 z-50 w-80 bg-card border border-border rounded-xl shadow-elevated overflow-hidden p-0 m-0"
          aria-label={t("notif.title", lang)}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="font-semibold text-sm text-foreground">
              {t("notif.title", lang)}
            </span>
            {unreadCount > 0 && (
              <button
                type="button"
                data-ocid="notifications.mark_all_read.button"
                onClick={() => markAllMutation.mutate()}
                disabled={markAllMutation.isPending}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                {t("notif.markAllRead", lang)}
              </button>
            )}
          </div>

          {/* List */}
          {recent.length === 0 ? (
            <div
              className="flex flex-col items-center py-10 px-4 gap-3"
              data-ocid="notifications.empty_state"
            >
              <BellOff className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground text-center">
                {t("notif.noNotifications", lang)}
              </p>
              <p className="text-xs text-muted-foreground/60 text-center">
                {t("notif.noNotificationsHint", lang)}
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-80">
              <div className="divide-y divide-border/50">
                {recent.map((notif, idx) => (
                  <NotifItem
                    key={String(notif.id)}
                    notif={notif}
                    lang={lang}
                    token={token}
                    idx={idx + 1}
                    onClose={() => setOpen(false)}
                  />
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Footer */}
          {recent.length > 0 && (
            <>
              <Separator />
              <div className="px-4 py-2.5">
                <Link
                  to="/notifications"
                  data-ocid="notifications.view_all.link"
                  onClick={() => setOpen(false)}
                  className="block text-center text-xs text-primary hover:text-primary/80 transition-colors font-medium py-1"
                >
                  {t("notif.viewAll", lang)}
                </Link>
              </div>
            </>
          )}
        </dialog>
      )}
    </div>
  );
}

function NotifItem({
  notif,
  lang,
  token,
  idx,
  onClose,
}: {
  notif: NotificationPublic;
  lang: "ar" | "en";
  token: string | null;
  idx: number;
  onClose: () => void;
}) {
  const { markRead } = useNotificationsStore();
  const qc = useQueryClient();

  async function handleRead() {
    if (!notif.isRead && token) {
      try {
        await mockBackend.markNotificationRead(token, notif.id);
        markRead(notif.id);
        qc.invalidateQueries({ queryKey: ["notifications"] });
      } catch {
        // silent
      }
    }
  }

  const message = lang === "ar" ? notif.messageAr : notif.message;
  const icon = NOTIF_ICONS[notif.notifType] ?? "🔔";
  const timeStr = formatRelativeTime(notif.timestamp, lang);

  return (
    <button
      type="button"
      data-ocid={`notifications.item.${idx}`}
      onClick={handleRead}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleRead();
      }}
      className={[
        "w-full flex gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors cursor-pointer",
        !notif.isRead ? "bg-primary/5" : "",
      ].join(" ")}
    >
      <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p
          className={[
            "text-xs leading-snug break-words",
            !notif.isRead
              ? "text-foreground font-medium"
              : "text-muted-foreground",
          ].join(" ")}
        >
          {message}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-muted-foreground/60">
            {timeStr}
          </span>
          {!notif.isRead && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          )}
          {notif.orderId && (
            <Link
              to="/orders/$orderId"
              params={{ orderId: String(notif.orderId) }}
              data-ocid={`notifications.item.${idx}.order_link`}
              onClick={(e) => {
                e.stopPropagation();
                handleRead();
                onClose();
              }}
              className="text-[10px] text-primary hover:underline font-medium"
            >
              {t("notif.viewOrder", lang)} #{String(notif.orderId)}
            </Link>
          )}
        </div>
      </div>
    </button>
  );
}
