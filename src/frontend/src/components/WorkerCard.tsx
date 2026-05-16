import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import type { WorkerPublic } from "@/types";
import { PROFESSIONS } from "@/types";
import { BadgeCheck, Clock, MapPin, Phone, Star } from "lucide-react";

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

interface WorkerCardProps {
  worker: WorkerPublic;
  index?: number;
}

export function WorkerCard({ worker, index = 0 }: WorkerCardProps) {
  const { t } = useGlobalTranslation();

  const professionLabel =
    worker.profession === "Other" && worker.profession_custom
      ? worker.profession_custom
      : (PROFESSIONS.find((p) => p.value === worker.profession)?.label ??
        worker.profession);

  const professionIcon = PROFESSION_ICONS[worker.profession] ?? "🔨";

  const handleContact = () => {
    window.open(`tel:${worker.phone}`);
  };

  return (
    <Card
      className="card-hover overflow-hidden border-border"
      data-ocid={`worker_card.item.${index + 1}`}
    >
      <CardContent className="p-0">
        {/* Availability indicator strip */}
        <div
          className={`h-1.5 w-full ${
            worker.is_available ? "bg-success" : "bg-muted-foreground/30"
          }`}
        />

        <div className="p-4 space-y-3">
          {/* Header row */}
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {worker.profile_photo ? (
                <img
                  src={worker.profile_photo}
                  alt={worker.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                  <span className="text-primary font-bold text-sm">
                    {getInitials(worker.name)}
                  </span>
                </div>
              )}
              {/* Online dot */}
              {worker.is_available && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" />
              )}
            </div>

            {/* Name + profession */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-semibold text-foreground text-sm truncate">
                  {worker.name}
                </h3>
                {worker.verification_status === "Verified" && (
                  <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <span>{professionIcon}</span>
                <span className="truncate">{professionLabel}</span>
              </p>
            </div>

            {/* Rate */}
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-foreground text-sm">
                ₹{worker.hourly_rate}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("worker.perHour")}
              </p>
            </div>
          </div>

          {/* Location + distance */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{worker.location_address}</span>
            {worker.distance_km != null && (
              <span className="flex-shrink-0 text-primary font-medium">
                · {worker.distance_km.toFixed(1)} {t("worker.kmAway")}
              </span>
            )}
          </div>

          {/* Skills */}
          {worker.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {worker.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
              {worker.skills.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                  +{worker.skills.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Availability time range */}
          <div className="flex flex-wrap gap-1">
            {worker.availability.startTime && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                <Clock className="w-3 h-3 mr-1" />
                {worker.availability.startTime} – {worker.availability.endTime}
              </Badge>
            )}
          </div>

          {/* Status + CTA */}
          <div className="flex items-center justify-between pt-1">
            <Badge
              variant={worker.is_available ? "default" : "secondary"}
              className={`text-xs ${
                worker.is_available
                  ? "bg-success/10 text-success border-success/30"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {worker.is_available
                ? t("worker.available")
                : t("worker.unavailable")}
            </Badge>

            <Button
              type="button"
              size="sm"
              onClick={handleContact}
              className="bg-accent text-accent-foreground hover:opacity-90 text-xs px-3 gap-1"
              data-ocid={`worker_card.contact_button.${index + 1}`}
            >
              <Phone className="w-3 h-3" />
              {t("worker.contactWorker")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
