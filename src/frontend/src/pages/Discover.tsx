import { WorkerCard } from "@/components/WorkerCard";
import { WorkerMap } from "@/components/WorkerMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { useNearbyWorkers } from "@/hooks/useWorker";
import { PROFESSIONS } from "@/types";
import type { Profession, WorkerPublic } from "@/types";
import {
  BadgeCheck,
  ChevronDown,
  Eye,
  EyeOff,
  Filter,
  LayoutList,
  LocateFixed,
  Map as MapIcon,
  MapPin,
  Navigation,
  Phone,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
const RADIUS_OPTIONS = [5, 10, 25, 50] as const;
type RadiusKm = (typeof RADIUS_OPTIONS)[number];

const PROFESSION_ICONS: Record<string, string> = {
  Mason: "🧱",
  Carpenter: "🪚",
  Electrician: "⚡",
  Plumber: "🔧",
  Painter: "🎨",
  Welder: "🔥",
  SteelFixer: "⚙️",
  TileLayer: "⬜",
  RoofWorker: "🏠",
  GlassFitter: "🪟",
  ACTechnician: "❄️",
  Scaffolding: "🏗️",
  HeavyEquipmentOperator: "🚜",
  RoadWorker: "🛣️",
  DemolitionWorker: "⛏️",
  Cook: "🍳",
  Cleaner: "🧹",
  Gardner: "🌱",
  Driver: "🚗",
  SecurityGuard: "🛡️",
  Mechanic: "🔩",
  Helper: "🤝",
  DeliveryWorker: "📦",
  Tailor: "🧵",
  Barber: "✂️",
  Washer: "🫧",
  Caretaker: "💛",
  Peon: "📋",
  Watchman: "👁️",
  Loader: "💪",
  Sweeper: "🧺",
  PestControl: "🐛",
  EventHelper: "🎪",
  Mover: "📦",
  Other: "🔨",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Location Permission Screen ─────────────────────────────────────────────
function LocationPermissionScreen({
  onGrant,
  onSkip,
  loading,
  t,
}: {
  onGrant: () => void;
  onSkip: () => void;
  loading: boolean;
  t: (k: string, f?: string) => string;
}) {
  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4"
      data-ocid="discover.location_permission_screen"
    >
      <div className="max-w-md w-full text-center">
        {/* Animated map pin illustration */}
        <div className="relative mx-auto mb-8 w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-40" />
          <div
            className="absolute inset-4 rounded-full bg-primary/15 animate-ping opacity-30"
            style={{ animationDelay: "0.3s" }}
          />
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/20">
            <MapPin className="w-14 h-14 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <h2 className="text-display-md text-foreground mb-3">
          {t("discovery.locationPermission.title", "Enable Your Location")}
        </h2>
        <p className="text-muted-foreground text-body-sm mb-2">
          {t(
            "discovery.locationPermission.desc",
            "We use your location to show workers closest to you first — making it quick and easy to find help nearby.",
          )}
        </p>
        <p className="text-xs text-muted-foreground/70 mb-8">
          {t(
            "discovery.locationPermission.privacy",
            "Your location is only used for search and is never stored or shared.",
          )}
        </p>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            size="lg"
            onClick={onGrant}
            disabled={loading}
            className="w-full gap-2 bg-primary text-primary-foreground hover:opacity-90"
            data-ocid="discover.enable_location_button"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />{" "}
                Detecting location...
              </>
            ) : (
              <>
                <LocateFixed className="w-4 h-4" />{" "}
                {t("discovery.enableLocation", "Enable Location")}
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-muted-foreground hover:text-foreground text-xs"
            data-ocid="discover.skip_location_button"
          >
            {t("discovery.locationPermission.skip", "Skip — show all workers")}
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BadgeCheck className="w-3.5 h-3.5 text-success" /> Verified Workers
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Location-Based
          </span>
          <span className="flex items-center gap-1">🔒 Private</span>
        </div>
      </div>
    </div>
  );
}

// ─── Worker Profile Modal ───────────────────────────────────────────────────
function WorkerProfileModal({
  worker,
  onClose,
  t,
}: {
  worker: WorkerPublic;
  onClose: () => void;
  t: (k: string, f?: string) => string;
}) {
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const professionLabel =
    worker.profession === "Other" && worker.profession_custom
      ? worker.profession_custom
      : (PROFESSIONS.find((p) => p.value === worker.profession)?.label ??
        worker.profession);

  const professionIcon = PROFESSION_ICONS[worker.profession] ?? "🔨";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      data-ocid="worker_profile.dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="presentation"
      />

      {/* Modal panel */}
      <div className="relative w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl shadow-elevated overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header banner */}
        <div className="h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-smooth"
            data-ocid="worker_profile.close_button"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          {/* Available strip */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 ${worker.is_available ? "bg-success" : "bg-muted-foreground/30"}`}
          />
        </div>

        {/* Avatar overlap */}
        <div className="px-6 pb-6">
          <div className="-mt-10 mb-4 flex items-end justify-between">
            <div className="relative">
              {worker.profile_photo ? (
                <img
                  src={worker.profile_photo}
                  alt={worker.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-card shadow-card"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-primary/15 border-4 border-card shadow-card flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {getInitials(worker.name)}
                  </span>
                </div>
              )}
              {worker.is_available && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success border-2 border-card" />
              )}
            </div>
            <Badge
              variant={worker.is_available ? "default" : "secondary"}
              className={`text-xs ${worker.is_available ? "bg-success/10 text-success border-success/30" : ""}`}
            >
              {worker.is_available
                ? t("worker.available")
                : t("worker.unavailable")}
            </Badge>
          </div>

          {/* Name + profession */}
          <div className="mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-display font-bold text-foreground">
                {worker.name}
              </h2>
              {worker.verification_status === "Verified" && (
                <BadgeCheck className="w-5 h-5 text-primary" />
              )}
            </div>
            <p className="text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <span className="text-base">{professionIcon}</span>
              <span>{professionLabel}</span>
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-muted/40 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-foreground">
                ₹{worker.hourly_rate}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("worker.perHour", "/hr")}
              </p>
            </div>
            {worker.distance_km != null && (
              <div className="bg-muted/40 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-foreground">
                  {worker.distance_km.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("worker.kmAway", "km away")}
                </p>
              </div>
            )}
            <div className="bg-muted/40 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-foreground">
                {worker.skills.length}
              </p>
              <p className="text-xs text-muted-foreground">Skills</p>
            </div>
          </div>

          <Separator className="mb-4" />

          {/* Location */}
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm text-foreground">
                {worker.location_address}
              </p>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Availability</p>
            <div className="flex flex-wrap gap-1.5">
              {worker.availability.startTime && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary">
                  🕐 {worker.availability.startTime} –{" "}
                  {worker.availability.endTime}
                </span>
              )}
            </div>
          </div>

          {/* Skills */}
          {worker.skills.length > 0 && (
            <div className="mb-5">
              <p className="text-xs text-muted-foreground mb-2">
                Skills &amp; Expertise
              </p>
              <div className="flex flex-wrap gap-1.5">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-muted text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Separator className="mb-4" />

          {/* Contact section */}
          <div className="space-y-2">
            {!phoneRevealed ? (
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5"
                onClick={() => setPhoneRevealed(true)}
                data-ocid="worker_profile.show_phone_button"
              >
                <EyeOff className="w-4 h-4" />
                Show Phone Number
              </Button>
            ) : (
              <div
                className="flex items-center justify-between bg-success/5 border border-success/20 rounded-lg px-4 py-3"
                data-ocid="worker_profile.phone_revealed"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-success" />
                  <span className="font-mono font-semibold text-foreground">
                    {worker.phone}
                  </span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => window.open(`tel:${worker.phone}`)}
                  className="bg-success text-success-foreground hover:opacity-90 text-xs gap-1"
                  data-ocid="worker_profile.call_button"
                >
                  <Phone className="w-3 h-3" /> Call Now
                </Button>
              </div>
            )}

            <Button
              type="button"
              size="lg"
              className="w-full gap-2 bg-accent text-accent-foreground hover:opacity-90"
              onClick={() => window.open(`tel:${worker.phone}`)}
              data-ocid="worker_profile.contact_button"
            >
              <Phone className="w-4 h-4" /> {t("worker.contactWorker")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Filter Panel ────────────────────────────────────────────────────────────
function FilterPanel({
  professionFilter,
  setProfessionFilter,
  availFilters: _availFilters,
  setAvailFilters: _setAvailFilters,
  radiusKm,
  setRadiusKm,
  availableNow,
  setAvailableNow,
  sortBy,
  setSortBy,
  t,
  onClose,
}: {
  professionFilter: Profession | "all";
  setProfessionFilter: (v: Profession | "all") => void;
  availFilters: string[];
  setAvailFilters: (v: string[]) => void;
  radiusKm: RadiusKm;
  setRadiusKm: (v: RadiusKm) => void;
  availableNow: boolean;
  setAvailableNow: (v: boolean) => void;
  sortBy: "distance" | "rate" | "name";
  setSortBy: (v: "distance" | "rate" | "name") => void;
  t: (k: string, f?: string) => string;
  onClose?: () => void;
}) {
  const constructionProfessions = PROFESSIONS.filter(
    (p) => p.group === "construction",
  );
  const nonConstructionProfessions = PROFESSIONS.filter(
    (p) => p.group === "non-construction",
  );

  const hasActiveFilters =
    professionFilter !== "all" || availableNow || radiusKm !== 25;

  return (
    <div className="space-y-5 p-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-accent" />
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setProfessionFilter("all");
              setAvailableNow(false);
              setRadiusKm(25);
            }}
            className="text-xs text-muted-foreground hover:text-destructive transition-smooth"
            data-ocid="discover.clear_filters_button"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Available Now toggle */}
      <div className="flex items-center justify-between bg-success/5 border border-success/20 rounded-lg px-3 py-2.5">
        <Label
          htmlFor="avail-now-toggle"
          className="text-sm font-medium text-foreground cursor-pointer"
        >
          ✅ Available Now
        </Label>
        <Switch
          id="avail-now-toggle"
          checked={availableNow}
          onCheckedChange={setAvailableNow}
          data-ocid="discover.available_now_toggle"
        />
      </div>

      {/* Radius slider */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
          Distance Radius
        </p>
        <div className="flex gap-2">
          {RADIUS_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRadiusKm(r)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-smooth ${
                radiusKm === r
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input bg-card text-muted-foreground hover:border-primary/40"
              }`}
              data-ocid={`discover.radius_${r}km_button`}
            >
              {r}km
            </button>
          ))}
        </div>
      </div>

      {/* Profession filter */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
          {t("discovery.filterProfession")}
        </p>
        <div className="max-h-48 overflow-y-auto space-y-0.5 rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setProfessionFilter("all")}
            className={`w-full text-left px-3 py-2 text-sm transition-smooth ${
              professionFilter === "all"
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted"
            }`}
            data-ocid="discover.profession_filter.all"
          >
            All Professions
          </button>
          <div className="px-3 py-1 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
            🏗️ {t("worker.group.construction")}
          </div>
          {constructionProfessions.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setProfessionFilter(p.value)}
              className={`w-full text-left px-4 py-1.5 text-sm transition-smooth ${
                professionFilter === p.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
              data-ocid={`discover.profession_filter.${p.value.toLowerCase()}`}
            >
              {p.label}
            </button>
          ))}
          <div className="px-3 py-1 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
            🛠️ {t("worker.group.non-construction")}
          </div>
          {nonConstructionProfessions.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setProfessionFilter(p.value)}
              className={`w-full text-left px-4 py-1.5 text-sm transition-smooth ${
                professionFilter === p.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              }`}
              data-ocid={`discover.profession_filter.${p.value.toLowerCase()}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5">
          {t("discovery.sortBy")}
        </p>
        <div className="space-y-1">
          {(["distance", "rate", "name"] as const).map((opt) => {
            const labels = {
              distance: t("discovery.sortDistance"),
              rate: t("discovery.sortRate"),
              name: t("discovery.sortName"),
            };
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setSortBy(opt)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${
                  sortBy === opt
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
                data-ocid={`discover.sort_${opt}_button`}
              >
                {labels[opt]}
              </button>
            );
          })}
        </div>
      </div>

      {onClose && (
        <Button
          type="button"
          className="w-full"
          onClick={onClose}
          data-ocid="discover.apply_filters_button"
        >
          Apply Filters
        </Button>
      )}
    </div>
  );
}

// ─── Worker Card Skeleton ───────────────────────────────────────────────────
function WorkerCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="h-1.5 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
        <Skeleton className="h-3 w-full" />
        <div className="flex gap-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Discover Page ─────────────────────────────────────────────────────
export function DiscoverPage() {
  const { t } = useGlobalTranslation();

  // Location state
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();
  const [locationGranted, setLocationGranted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [professionFilter, setProfessionFilter] = useState<Profession | "all">(
    "all",
  );
  const availFilters: string[] = [];
  const [radiusKm, setRadiusKm] = useState<RadiusKm>(25);
  const [availableNow, setAvailableNow] = useState(false);
  const [sortBy, setSortBy] = useState<"distance" | "rate" | "name">(
    "distance",
  );

  // Map/list view toggle
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  // Mobile filter sheet
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // Worker modal
  const [selectedWorker, setSelectedWorker] = useState<WorkerPublic | null>(
    null,
  );

  const { data: workers, isLoading } = useNearbyWorkers(
    lat,
    lng,
    radiusKm,
    professionFilter !== "all" ? (professionFilter as Profession) : null,
  );

  // Reverse geocode: get city name from coords
  const reverseGeocode = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        const res = await fetch(url);
        if (res.ok) {
          const data = (await res.json()) as {
            address?: {
              city?: string;
              town?: string;
              suburb?: string;
              village?: string;
              state?: string;
            };
          };
          const addr = data.address ?? {};
          const area =
            addr.suburb ??
            addr.city ??
            addr.town ??
            addr.village ??
            addr.state ??
            null;
          setLocationName(area);
        }
      } catch {
        // silent fail
      }
    },
    [],
  );

  const requestLocation = useCallback(() => {
    setLocationLoading(true);
    if (!navigator.geolocation) {
      setLat(19.076);
      setLng(72.877);
      setLocationGranted(true);
      setShowLocationPrompt(false);
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        setLocationGranted(true);
        setShowLocationPrompt(false);
        setLocationLoading(false);
        reverseGeocode(latitude, longitude);
      },
      () => {
        // Permission denied or error — still show workers with default coords
        setLat(19.076);
        setLng(72.877);
        setLocationGranted(false);
        setShowLocationPrompt(false);
        setLocationLoading(false);
      },
    );
  }, [reverseGeocode]);

  // Derived: filter + sort workers
  const filtered: WorkerPublic[] = (workers ?? []).filter((w) => {
    const matchSearch =
      !search ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      w.profession.toLowerCase().includes(search.toLowerCase());
    const matchProfession =
      professionFilter === "all" || w.profession === professionFilter;
    const matchAvail = true; // Time-range availability; no enum slot filter
    const matchAvailNow = !availableNow || w.is_available;
    const matchRadius = w.distance_km == null || w.distance_km <= radiusKm;
    return (
      matchSearch &&
      matchProfession &&
      matchAvail &&
      matchAvailNow &&
      matchRadius
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "distance")
      return (a.distance_km ?? 99) - (b.distance_km ?? 99);
    if (sortBy === "rate") return a.hourly_rate - b.hourly_rate;
    return a.name.localeCompare(b.name);
  });

  const activeFilterCount =
    (professionFilter !== "all" ? 1 : 0) +
    (availableNow ? 1 : 0) +
    (radiusKm !== 25 ? 1 : 0);

  // Show location permission screen on first visit
  const skipLocation = useCallback(() => {
    setLat(19.076);
    setLng(72.877);
    setLocationGranted(true);
    setShowLocationPrompt(false);
  }, []);

  if (showLocationPrompt) {
    return (
      <LocationPermissionScreen
        onGrant={requestLocation}
        onSkip={skipLocation}
        loading={locationLoading}
        t={t}
      />
    );
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="discover.page">
      {/* ── Sticky search + filter bar ── */}
      <div className="bg-card border-b border-border sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("discovery.searchPlaceholder")}
                className="pl-9 pr-8 bg-background"
                data-ocid="discover.search_input"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Map/List toggle */}
            <div
              className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1 flex-shrink-0"
              data-ocid="discover.view_toggle"
            >
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${
                  viewMode === "map"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid="discover.map_view_button"
              >
                <MapIcon className="w-3.5 h-3.5" /> Map
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${
                  viewMode === "list"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid="discover.list_view_button"
              >
                <LayoutList className="w-3.5 h-3.5" /> List
              </button>
            </div>

            {/* Mobile: Filter sheet trigger */}
            <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={`lg:hidden gap-1.5 flex-shrink-0 ${
                    activeFilterCount > 0 ? "border-primary text-primary" : ""
                  }`}
                  data-ocid="discover.filter_sheet_button"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="max-h-[80vh] overflow-y-auto rounded-t-2xl"
                data-ocid="discover.filter_sheet"
              >
                <SheetHeader className="pb-4">
                  <SheetTitle>Filters &amp; Sort</SheetTitle>
                </SheetHeader>
                <FilterPanel
                  professionFilter={professionFilter}
                  setProfessionFilter={setProfessionFilter}
                  availFilters={availFilters}
                  setAvailFilters={() => {}}
                  radiusKm={radiusKm}
                  setRadiusKm={setRadiusKm}
                  availableNow={availableNow}
                  setAvailableNow={setAvailableNow}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  t={t}
                  onClose={() => setFilterSheetOpen(false)}
                />
              </SheetContent>
            </Sheet>

            {/* Desktop: Available Now quick toggle */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <Switch
                id="avail-now-desktop"
                checked={availableNow}
                onCheckedChange={setAvailableNow}
                data-ocid="discover.available_now_toggle_desktop"
              />
              <Label
                htmlFor="avail-now-desktop"
                className="text-sm text-foreground cursor-pointer whitespace-nowrap"
              >
                ✅ Available Now
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex gap-6">
          {/* ── Desktop sidebar filters ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border p-4 sticky top-32">
              <FilterPanel
                professionFilter={professionFilter}
                setProfessionFilter={setProfessionFilter}
                availFilters={availFilters}
                setAvailFilters={() => {}}
                radiusKm={radiusKm}
                setRadiusKm={setRadiusKm}
                availableNow={availableNow}
                setAvailableNow={setAvailableNow}
                sortBy={sortBy}
                setSortBy={setSortBy}
                t={t}
              />
            </div>
          </aside>

          {/* ── Workers section ── */}
          <div className="flex-1 min-w-0">
            {/* Location banner */}
            <div
              className="flex items-center justify-between mb-4 bg-primary/5 border border-primary/15 rounded-xl px-4 py-2.5"
              data-ocid="discover.location_banner"
            >
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-primary flex-shrink-0" />
                {locationGranted ? (
                  <span className="text-sm text-foreground">
                    {locationName ? (
                      <>
                        <span className="font-medium">{locationName}</span>{" "}
                        <span className="text-muted-foreground">
                          — workers sorted by distance
                        </span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">
                        {t("discovery.showingNearby")}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {t("discovery.locationRequired")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  {sorted.length} found
                </Badge>
                {!locationGranted && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={requestLocation}
                    disabled={locationLoading}
                    className="gap-1 text-xs border-primary/30 text-primary hover:bg-primary/5"
                    data-ocid="discover.retry_location_button"
                  >
                    <LocateFixed className="w-3.5 h-3.5" />
                    {t("discovery.enableLocation")}
                  </Button>
                )}
                {/* Mobile map/list toggle */}
                <div
                  className="flex sm:hidden items-center gap-1 bg-muted rounded-lg p-0.5"
                  data-ocid="discover.view_toggle_mobile"
                >
                  <button
                    type="button"
                    onClick={() => setViewMode("map")}
                    className={`p-1.5 rounded-md transition-smooth ${
                      viewMode === "map"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground"
                    }`}
                    aria-label="Map view"
                    data-ocid="discover.map_view_button_mobile"
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md transition-smooth ${
                      viewMode === "list"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground"
                    }`}
                    aria-label="List view"
                    data-ocid="discover.list_view_button_mobile"
                  >
                    <LayoutList className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div
                className="flex flex-wrap gap-2 mb-4"
                data-ocid="discover.active_filters"
              >
                {professionFilter !== "all" && (
                  <button
                    type="button"
                    onClick={() => setProfessionFilter("all")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-smooth"
                    data-ocid="discover.filter_chip.profession"
                  >
                    {
                      PROFESSIONS.find((p) => p.value === professionFilter)
                        ?.label
                    }
                    <X className="w-3 h-3" />
                  </button>
                )}
                {availFilters.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-secondary/10 text-secondary border border-secondary/20"
                  >
                    {a}
                  </span>
                ))}
                {availableNow && (
                  <button
                    type="button"
                    onClick={() => setAvailableNow(false)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-smooth"
                    data-ocid="discover.filter_chip.available_now"
                  >
                    ✅ Available Now <X className="w-3 h-3" />
                  </button>
                )}
                {radiusKm !== 25 && (
                  <button
                    type="button"
                    onClick={() => setRadiusKm(25)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-smooth"
                    data-ocid="discover.filter_chip.radius"
                  >
                    📍 {radiusKm}km <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Map view */}
            {viewMode === "map" && lat && lng && (
              <div className="mb-6" data-ocid="discover.map_section">
                {isLoading ? (
                  <div
                    className="w-full rounded-xl bg-muted animate-pulse flex items-center justify-center text-muted-foreground text-sm"
                    style={{ height: 400 }}
                    data-ocid="discover.map_loading_state"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <MapPin className="w-8 h-8 opacity-40" />
                      Loading map...
                    </div>
                  </div>
                ) : (
                  <WorkerMap
                    workers={sorted}
                    userLat={lat}
                    userLng={lng}
                    onWorkerSelect={setSelectedWorker}
                  />
                )}
                {/* Map legend */}
                <div className="flex flex-wrap gap-3 mt-2 px-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
                    Construction
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                    Domestic
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                    Other
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
                    You
                  </span>
                </div>
              </div>
            )}

            {/* Workers grid */}
            {isLoading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                data-ocid="discover.loading_state"
              >
                <WorkerCardSkeleton />
                <WorkerCardSkeleton />
                <WorkerCardSkeleton />
                <WorkerCardSkeleton />
                <WorkerCardSkeleton />
                <WorkerCardSkeleton />
              </div>
            ) : sorted.length === 0 ? (
              <div
                className="text-center py-16 bg-card rounded-2xl border border-border"
                data-ocid="discover.empty_state"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {t("discovery.noWorkers")}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                  Try expanding your search radius or changing your filters
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setRadiusKm(50)}
                    data-ocid="discover.expand_radius_button"
                  >
                    📍 Expand to 50km
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setProfessionFilter("all");
                      setAvailableNow(false);
                      setRadiusKm(25);
                      setSearch("");
                    }}
                    data-ocid="discover.clear_all_filters_button"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                data-ocid="discover.worker_list"
              >
                {sorted.map((worker, i) => (
                  <button
                    key={worker.id}
                    type="button"
                    onClick={() => setSelectedWorker(worker)}
                    className="cursor-pointer w-full text-left"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setSelectedWorker(worker);
                    }}
                    aria-label={`View ${worker.name}'s profile`}
                    data-ocid={`discover.worker_card.item.${i + 1}`}
                  >
                    <WorkerCard worker={worker} index={i} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Worker profile modal ── */}
      {selectedWorker && (
        <WorkerProfileModal
          worker={selectedWorker}
          onClose={() => setSelectedWorker(null)}
          t={t}
        />
      )}
    </div>
  );
}
