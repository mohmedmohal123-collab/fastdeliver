import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useLangStore } from "../store/lang";

/**
 * App-wide offline banner. Shown below the header when the device loses connectivity.
 * Bilingual (Arabic/English). Disappears automatically when back online.
 */
export function OfflineWarning() {
  const isOnline = useOnlineStatus();
  const { lang } = useLangStore();

  if (isOnline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      data-ocid="offline.warning_banner"
      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium"
      style={{
        background: "oklch(0.4 0.18 30 / 0.15)",
        borderBottom: "1px solid oklch(0.55 0.2 30 / 0.35)",
        color: "oklch(0.8 0.15 30)",
      }}
    >
      <WifiOff className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span>
        {lang === "ar"
          ? "أنت غير متصل بالإنترنت — يمكنك تصفح الكتالوج وعرض المنتجات والعروض"
          : "You are offline — you can browse the catalog, products, and offers"}
      </span>
    </div>
  );
}
