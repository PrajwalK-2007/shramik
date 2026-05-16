import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNearbyWorkers } from "@/hooks/useWorker";
import type { Profession, WorkerPublic } from "@/types";
import { PROFESSIONS } from "@/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BadgeCheck, Clock, MapPin, Navigation, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

// Fix Leaflet default icon
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

const CONSTRUCTION_PROFESSIONS = new Set([
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
]);

const PROFESSION_ICONS: Record<string, string> = {
  Mason: "🧱",
  Carpenter: "🪚",
  Electrician: "⚡",
  Plumber: "🔧",
  Painter: "🎨",
  Welder: "🔥",
  Cook: "🍳",
  Cleaner: "🧹",
  Driver: "🚗",
  Gardner: "🌱",
  Mechanic: "🔩",
  Helper: "🤝",
  SecurityGuard: "🛡️",
  Tailor: "🧵",
  Barber: "✂️",
};

function getPinColor(profession: string): string {
  if (CONSTRUCTION_PROFESSIONS.has(profession)) return "#f97316"; // orange
  if (
    ["Cook", "Cleaner", "Caretaker", "Gardner", "Washer"].includes(profession)
  )
    return "#22c55e"; // green
  return "#3b82f6"; // blue
}

function createWorkerIcon(profession: string, isAvailable: boolean): L.DivIcon {
  const color = getPinColor(profession);
  const opacity = isAvailable ? 1 : 0.5;
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
    html: `<div style="width:22px;height:22px;border-radius:50%;background:#6366f1;border:3px solid white;box-shadow:0 0 0 4px rgba(99,102,241,0.3)"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
  });
}

function getProfessionLabel(profession: string): string {
  return PROFESSIONS.find((p) => p.value === profession)?.label ?? profession;
}

// ─── Worker profile slide-in panel ───────────────────────────────────────────
function WorkerDetailPanel({
  worker,
  onClose,
}: { worker: WorkerPublic; onClose: () => void }) {
  const professionLabel =
    worker.profession === "Other" && worker.profession_custom
      ? worker.profession_custom
      : getProfessionLabel(worker.profession);
  const icon = PROFESSION_ICONS[worker.profession] ?? "🔨";

  return (
    <AnimatePresence>
      <motion.div
        key="panel"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        className="absolute top-0 right-0 h-full w-72 bg-card border-l border-border shadow-2xl z-[1000] overflow-y-auto flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card">
          <h3 className="font-semibold text-foreground text-sm">
            Worker Profile
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted transition-smooth"
            aria-label="Close"
            data-ocid="home.map_panel_close_button"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4">
          {/* Avatar + name */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              {worker.profile_photo ? (
                <img
                  src={worker.profile_photo}
                  alt={worker.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-base">
                    {worker.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {worker.is_available && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-card" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="font-semibold text-foreground text-sm truncate">
                  {worker.name}
                </h4>
                {worker.verification_status === "Verified" && (
                  <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {icon} {professionLabel}
              </p>
            </div>
          </div>

          {/* Rate & availability */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-foreground">
                ₹{worker.hourly_rate}
              </p>
              <p className="text-xs text-muted-foreground">per hour</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <Badge
                className={`text-xs ${
                  worker.is_available
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {worker.is_available ? "✓ Available" : "Unavailable"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Status</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
            <span>{worker.location_address || "Location available"}</span>
          </div>

          {/* Distance */}
          {worker.distance_km != null && (
            <p className="text-xs text-primary font-medium">
              📍 {worker.distance_km.toFixed(1)} km from you
            </p>
          )}

          {/* Availability time range */}
          {worker.availability.startTime && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Availability
              </p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {worker.availability.startTime} –{" "}
                  {worker.availability.endTime}
                </Badge>
              </div>
            </div>
          )}

          {/* Skills */}
          {worker.skills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {worker.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-4 border-t border-border sticky bottom-0 bg-card">
          <a href={`tel:${worker.phone}`} className="block">
            <Button
              type="button"
              className="w-full gap-2 bg-accent text-accent-foreground hover:opacity-90"
              data-ocid="home.map_panel_call_button"
            >
              <Phone className="w-4 h-4" />
              Call {worker.name.split(" ")[0]}
            </Button>
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Popup content (rendered into Leaflet popup) ──────────────────────────────
function WorkerPopupContent({
  worker,
  onViewProfile,
}: { worker: WorkerPublic; onViewProfile: () => void }) {
  const professionLabel =
    worker.profession === "Other" && worker.profession_custom
      ? worker.profession_custom
      : getProfessionLabel(worker.profession);
  return (
    <div style={{ fontFamily: "inherit", minWidth: 180, padding: 2 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#e0e7ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            color: "#4f46e5",
            flexShrink: 0,
          }}
        >
          {worker.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <strong style={{ fontSize: 13, color: "#111" }}>{worker.name}</strong>
          <div style={{ fontSize: 11, color: "#666" }}>{professionLabel}</div>
        </div>
      </div>
      <div
        style={{ display: "flex", gap: 5, marginBottom: 8, flexWrap: "wrap" }}
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
          ₹{worker.hourly_rate}/hr
        </span>
        {worker.distance_km != null && (
          <span
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              border: "1px solid #bfdbfe",
              borderRadius: 999,
              padding: "2px 8px",
              fontSize: 11,
            }}
          >
            {worker.distance_km.toFixed(1)} km
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onViewProfile}
        style={{
          width: "100%",
          padding: "7px 12px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        View Profile
      </button>
    </div>
  );
}

// ─── Map component (internal) ─────────────────────────────────────────────────
interface MapCanvasProps {
  workers: WorkerPublic[];
  userLat: number;
  userLng: number;
  onWorkerSelect: (w: WorkerPublic) => void;
}

function MapCanvas({
  workers,
  userLat,
  userLng,
  onWorkerSelect,
}: MapCanvasProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [userLat, userLng],
      zoom: 13,
      zoomControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    L.marker([userLat, userLng], { icon: createUserIcon() })
      .addTo(map)
      .bindPopup("<strong>📍 Your Location</strong>");
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [userLat, userLng]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const m of markersRef.current) m.remove();
    markersRef.current = [];
    for (const worker of workers) {
      if (!worker.location_lat || !worker.location_lng) continue;
      const node = document.createElement("div");
      const root = createRoot(node);
      root.render(
        <WorkerPopupContent
          worker={worker}
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
          L.popup({ maxWidth: 240, className: "worker-map-popup" }).setContent(
            node,
          ),
        )
        .addTo(map);
      markersRef.current.push(marker);
    }
  }, [workers, onWorkerSelect]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      data-ocid="home.map_canvas"
    />
  );
}

// ─── Main HomeWorkerMap component ─────────────────────────────────────────────
const RADIUS_OPTIONS = [5, 10, 25] as const;
type RadiusKm = (typeof RADIUS_OPTIONS)[number];

export function HomeWorkerMap() {
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [geoError, setGeoError] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [radius, setRadius] = useState<RadiusKm>(10);
  const [professionFilter, setProfessionFilter] = useState<Profession | null>(
    null,
  );
  const [selectedWorker, setSelectedWorker] = useState<WorkerPublic | null>(
    null,
  );

  const { data: workers = [], isLoading: workersLoading } = useNearbyWorkers(
    userLat ?? undefined,
    userLng ?? undefined,
    radius,
    professionFilter,
  );

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError(true);
      return;
    }
    setGeoLoading(true);
    setGeoError(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setGeoLoading(false);
      },
      () => {
        setGeoError(true);
        setGeoLoading(false);
      },
      { timeout: 12000, maximumAge: 60000 },
    );
  }, []);

  // Auto-request on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const handleWorkerSelect = useCallback((w: WorkerPublic) => {
    setSelectedWorker(w);
  }, []);

  // ─── States: loading geo, geo error, ready ──────────────────────────────
  if (geoLoading) {
    return (
      <div
        className="w-full rounded-2xl border border-border bg-muted/30 flex flex-col items-center justify-center gap-4 text-center p-10"
        style={{ minHeight: 420 }}
        data-ocid="home.map_loading_state"
      >
        <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground font-medium">
          Getting your location…
        </p>
      </div>
    );
  }

  if (geoError || (!userLat && !geoLoading)) {
    return (
      <div
        className="w-full rounded-2xl border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center gap-4 text-center p-12"
        style={{ minHeight: 420 }}
        data-ocid="home.map_error_state"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Navigation className="w-8 h-8 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground mb-1">
            Enable location to see workers near you
          </p>
          <p className="text-sm text-muted-foreground max-w-xs">
            We need your location to show nearby verified workers on the map.
          </p>
        </div>
        <Button
          type="button"
          onClick={requestLocation}
          className="gap-2"
          data-ocid="home.map_retry_button"
        >
          <Navigation className="w-4 h-4" />
          Share Location
        </Button>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl border border-border overflow-hidden shadow-card relative"
      style={{ minHeight: 440 }}
      data-ocid="home.map_section"
    >
      {/* Controls bar */}
      <div className="absolute top-3 left-3 right-3 z-[500] flex items-start gap-2 flex-wrap">
        {/* Radius selector */}
        <div className="flex gap-1 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-1 shadow-md">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRadius(r)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-smooth ${
                radius === r
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              data-ocid={`home.map_radius_${r}km`}
            >
              {r} km
            </button>
          ))}
        </div>

        {/* Profession filter */}
        <div className="relative">
          <select
            value={professionFilter ?? ""}
            onChange={(e) =>
              setProfessionFilter((e.target.value as Profession) || null)
            }
            className="appearance-none bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 py-1.5 text-xs font-medium shadow-md pr-7 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            data-ocid="home.map_profession_filter"
          >
            <option value="">All Professions</option>
            {PROFESSIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
            ▾
          </span>
        </div>

        {/* Worker count badge */}
        {!workersLoading && (
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 py-1.5 shadow-md">
            <span className="text-xs font-semibold text-foreground">
              {workers.length} worker{workers.length !== 1 ? "s" : ""} found
            </span>
          </div>
        )}
      </div>

      {/* Map canvas */}
      <div style={{ height: 440 }}>
        {userLat && userLng && (
          <MapCanvas
            workers={workers}
            userLat={userLat}
            userLng={userLng}
            onWorkerSelect={handleWorkerSelect}
          />
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[500] flex items-center gap-3 bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 py-1.5 shadow-md">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#f97316" }}
          />
          Construction
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#22c55e" }}
          />
          Household
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#3b82f6" }}
          />
          Services
        </div>
      </div>

      {/* Worker detail panel */}
      {selectedWorker && (
        <WorkerDetailPanel
          worker={selectedWorker}
          onClose={() => setSelectedWorker(null)}
        />
      )}
    </div>
  );
}
