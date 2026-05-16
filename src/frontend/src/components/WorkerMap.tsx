import type { WorkerPublic } from "@/types";
import { PROFESSIONS } from "@/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BadgeCheck, MapPin, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

// Fix Leaflet default icon path issues with bundlers
(L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl =
  undefined;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const CONSTRUCTION_PROFESSIONS: string[] = [
  "Mason",
  "Carpenter",
  "Electrician",
  "Plumber",
  "Painter",
  "Welder",
  "SteelFixer",
  "TileLayer",
  "RoofWorker",
  "GlassFitter",
  "ACTechnician",
  "Scaffolding",
  "HeavyEquipmentOperator",
  "RoadWorker",
  "DemolitionWorker",
];

function getPinColor(profession: string): string {
  if (CONSTRUCTION_PROFESSIONS.includes(profession)) return "#f97316"; // orange
  if (
    ["Cook", "Cleaner", "Caretaker", "Gardner", "Washer"].includes(profession)
  )
    return "#22c55e"; // green
  return "#3b82f6"; // blue
}

function createWorkerIcon(profession: string, isAvailable: boolean): L.DivIcon {
  const color = getPinColor(profession);
  const opacity = isAvailable ? 1 : 0.55;
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:32px;height:40px;opacity:${opacity}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="32" height="40">
        <path d="M16 0C9.373 0 4 5.373 4 12c0 8 12 28 12 28s12-20 12-28C28 5.373 22.627 0 16 0z" fill="${color}" />
        <circle cx="16" cy="12" r="6" fill="white"/>
      </svg>
    </div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
  });
}

function createUserIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div style="width:20px;height:20px;border-radius:50%;background:#6366f1;border:3px solid white;box-shadow:0 0 0 3px rgba(99,102,241,0.35)"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -14],
  });
}

function getProfessionLabel(profession: string): string {
  return PROFESSIONS.find((p) => p.value === profession)?.label ?? profession;
}

interface WorkerMapProps {
  workers: WorkerPublic[];
  userLat: number;
  userLng: number;
  onWorkerSelect: (worker: WorkerPublic) => void;
}

export function WorkerMap({
  workers,
  userLat,
  userLng,
  onWorkerSelect,
}: WorkerMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [userLat, userLng],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // User location marker
    L.marker([userLat, userLng], { icon: createUserIcon() })
      .addTo(map)
      .bindPopup("<strong>Your Location</strong>");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [userLat, userLng]);

  // Update worker markers when workers change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    for (const m of markersRef.current) {
      m.remove();
    }
    markersRef.current = [];

    // Add new markers
    for (const worker of workers) {
      if (!worker.location_lat || !worker.location_lng) continue;

      const professionLabel = getProfessionLabel(worker.profession);
      const distText =
        worker.distance_km != null
          ? `${worker.distance_km.toFixed(1)} km away`
          : "";

      // Build popup container
      const popupNode = document.createElement("div");
      const root = createRoot(popupNode);
      root.render(
        <WorkerPopupContent
          worker={worker}
          professionLabel={professionLabel}
          distText={distText}
          onViewProfile={() => {
            onWorkerSelect(worker);
            map.closePopup();
          }}
        />,
      );

      const marker = L.marker([worker.location_lat, worker.location_lng], {
        icon: createWorkerIcon(worker.profession, worker.is_available),
      })
        .bindPopup(
          L.popup({ maxWidth: 260, className: "worker-map-popup" }).setContent(
            popupNode,
          ),
        )
        .addTo(map);

      markersRef.current.push(marker);
    }
  }, [workers, onWorkerSelect]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full rounded-xl overflow-hidden border border-border shadow-sm"
      style={{ height: 400 }}
      data-ocid="discover.map_container"
    />
  );
}

// ─── Popup content (rendered into Leaflet popup) ──────────────────────────────
function WorkerPopupContent({
  worker,
  professionLabel,
  distText,
  onViewProfile,
}: {
  worker: WorkerPublic;
  professionLabel: string;
  distText: string;
  onViewProfile: () => void;
}) {
  return (
    <div style={{ fontFamily: "inherit", minWidth: 200 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#e0e7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: "#4f46e5",
            flexShrink: 0,
          }}
        >
          {worker.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <strong style={{ fontSize: 13, color: "#111" }}>
              {worker.name}
            </strong>
            {worker.verification_status === "Verified" && (
              <BadgeCheck style={{ width: 14, height: 14, color: "#4f46e5" }} />
            )}
          </div>
          <div style={{ fontSize: 11, color: "#666" }}>{professionLabel}</div>
        </div>
      </div>

      <div
        style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}
      >
        <span
          style={{
            background: "#f0fdf4",
            color: "#16a34a",
            border: "1px solid #bbf7d0",
            borderRadius: 999,
            padding: "2px 8px",
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          ₹{Number(worker.hourly_rate)}/hr
        </span>
        {distText && (
          <span
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              border: "1px solid #bfdbfe",
              borderRadius: 999,
              padding: "2px 8px",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <MapPin style={{ width: 10, height: 10 }} />
            {distText}
          </span>
        )}
        <span
          style={{
            background: worker.is_available ? "#f0fdf4" : "#f9fafb",
            color: worker.is_available ? "#16a34a" : "#9ca3af",
            border: `1px solid ${worker.is_available ? "#bbf7d0" : "#e5e7eb"}`,
            borderRadius: 999,
            padding: "2px 8px",
            fontSize: 11,
          }}
        >
          {worker.is_available ? "✓ Available" : "Unavailable"}
        </span>
      </div>

      {worker.skills.slice(0, 3).length > 0 && (
        <div
          style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}
        >
          {worker.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              style={{
                background: "#f5f3ff",
                color: "#7c3aed",
                borderRadius: 4,
                padding: "1px 6px",
                fontSize: 10,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 6 }}>
        <button
          type="button"
          onClick={onViewProfile}
          style={{
            flex: 1,
            padding: "6px 10px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          View Profile
        </button>
        <a
          href={`tel:${worker.phone}`}
          style={{
            padding: "6px 10px",
            background: "#f0fdf4",
            color: "#16a34a",
            border: "1px solid #bbf7d0",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Phone style={{ width: 12, height: 12 }} /> Call
        </a>
      </div>
    </div>
  );
}
