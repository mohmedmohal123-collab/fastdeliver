import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useLangStore } from "../store/lang";

// Fix Leaflet's broken default icon images issue
const iconProto = L.Icon.Default.prototype as L.Icon.Default & {
  _getIconUrl?: unknown;
};
iconProto._getIconUrl = undefined;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom icons
function makeIcon(color: string, emoji: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:32px;height:32px;border-radius:50% 50% 50% 0;
      background:${color};border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
    ">
      <span style="transform:rotate(45deg);font-size:14px;">${emoji}</span>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -36],
  });
}

const pickupIcon = makeIcon("#3b82f6", "📦");
const dropoffIcon = makeIcon("#22c55e", "🏁");
const courierIcon = makeIcon("#f97316", "🚚");

export interface LiveMapProps {
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  courierLat?: number;
  courierLng?: number;
  height?: number;
  pickupLabel?: string;
  dropoffLabel?: string;
}

export function LiveMap({
  pickupLat,
  pickupLng,
  dropoffLat,
  dropoffLng,
  courierLat,
  courierLng,
  height = 350,
  pickupLabel = "Pickup",
  dropoffLabel = "Dropoff",
}: LiveMapProps) {
  const isOnline = useOnlineStatus();
  const { lang } = useLangStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const courierMarkerRef = useRef<L.Marker | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  // Mount map once — coords are captured via refs to avoid re-mounting
  const pickupLatRef = useRef(pickupLat);
  const pickupLngRef = useRef(pickupLng);
  const dropoffLatRef = useRef(dropoffLat);
  const dropoffLngRef = useRef(dropoffLng);
  const courierLatRef = useRef(courierLat);
  const courierLngRef = useRef(courierLng);
  const pickupLabelRef = useRef(pickupLabel);
  const dropoffLabelRef = useRef(dropoffLabel);

  // Keep refs in sync
  pickupLatRef.current = pickupLat;
  pickupLngRef.current = pickupLng;
  dropoffLatRef.current = dropoffLat;
  dropoffLngRef.current = dropoffLng;
  courierLatRef.current = courierLat;
  courierLngRef.current = courierLng;
  pickupLabelRef.current = pickupLabel;
  dropoffLabelRef.current = dropoffLabel;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const pLat = pickupLatRef.current;
    const pLng = pickupLngRef.current;
    const dLat = dropoffLatRef.current;
    const dLng = dropoffLngRef.current;
    const cLat = courierLatRef.current;
    const cLng = courierLngRef.current;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    }).addTo(map);

    // Pickup marker
    L.marker([pLat, pLng], { icon: pickupIcon })
      .addTo(map)
      .bindPopup(`<b>${pickupLabelRef.current}</b>`);

    // Dropoff marker
    L.marker([dLat, dLng], { icon: dropoffIcon })
      .addTo(map)
      .bindPopup(`<b>${dropoffLabelRef.current}</b>`);

    // Route line
    const routePoints: L.LatLngTuple[] = [[pLat, pLng]];
    if (cLat !== undefined && cLng !== undefined) {
      routePoints.push([cLat, cLng]);
    }
    routePoints.push([dLat, dLng]);

    const line = L.polyline(routePoints, {
      color: "#f97316",
      weight: 3,
      dashArray: "8 6",
      opacity: 0.85,
    }).addTo(map);
    routeLineRef.current = line;

    // Courier marker
    if (cLat !== undefined && cLng !== undefined) {
      const marker = L.marker([cLat, cLng], { icon: courierIcon })
        .addTo(map)
        .bindPopup("<b>Courier Location</b>");
      courierMarkerRef.current = marker;
    }

    // Fit bounds
    const allPoints: L.LatLngTuple[] = [
      [pLat, pLng],
      [dLat, dLng],
    ];
    if (cLat !== undefined && cLng !== undefined) {
      allPoints.push([cLat, cLng]);
    }
    map.fitBounds(L.latLngBounds(allPoints), { padding: [40, 40] });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      courierMarkerRef.current = null;
      routeLineRef.current = null;
    };
  }, []);

  // Update courier position when it changes
  useEffect(() => {
    if (!mapRef.current) return;
    if (courierLat === undefined || courierLng === undefined) return;

    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLatLng([courierLat, courierLng]);
    } else {
      const marker = L.marker([courierLat, courierLng], { icon: courierIcon })
        .addTo(mapRef.current)
        .bindPopup("<b>Courier Location</b>");
      courierMarkerRef.current = marker;
    }

    if (routeLineRef.current) {
      const newPoints: L.LatLngTuple[] = [
        [pickupLat, pickupLng],
        [courierLat, courierLng],
        [dropoffLat, dropoffLng],
      ];
      routeLineRef.current.setLatLngs(newPoints);
    }
  }, [courierLat, courierLng, pickupLat, pickupLng, dropoffLat, dropoffLng]);

  if (!isOnline) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 text-center bg-muted/20"
        style={{ height: `${height}px`, width: "100%" }}
        aria-label={
          lang === "ar"
            ? "الخريطة غير متاحة في وضع عدم الاتصال"
            : "Map unavailable offline"
        }
      >
        <svg
          className="w-8 h-8 text-muted-foreground/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3l18 18M8.56 2.75c4.37-1.63 9.42-.28 12.12 3.32a9 9 0 010 11.86M10 21a7.003 7.003 0 01-5-2.16"
          />
        </svg>
        <p className="text-xs text-muted-foreground">
          {lang === "ar"
            ? "التتبع المباشر يتطلب اتصالاً بالإنترنت"
            : "Live tracking requires internet"}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ height: `${height}px`, width: "100%" }}
      className="rounded-b-xl overflow-hidden"
      aria-label="Live delivery tracking map"
      role="application"
    />
  );
}
