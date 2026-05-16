import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { useUpdateWorkerProfile, useWorkerProfile } from "@/hooks/useWorker";
import { PROFESSIONS } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  Camera,
  ChevronLeft,
  Clock,
  CreditCard,
  Globe,
  IndianRupee,
  MapPin,
  Pencil,
  Phone,
  PhoneCall,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// ─── Profession icon map ──────────────────────────────────────────────────────
const PROF_ICONS: Record<string, string> = {
  Mason: "🧱",
  Carpenter: "🪚",
  Electrician: "⚡",
  Plumber: "🔧",
  Painter: "🖌️",
  Welder: "🔥",
  SteelFixer: "🔩",
  TileLayer: "🪣",
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
  Mechanic: "🔨",
  Helper: "🤝",
  DeliveryWorker: "📦",
  Tailor: "✂️",
  Barber: "💈",
  Washer: "👕",
  Caretaker: "👴",
  Peon: "📋",
  Watchman: "👁️",
  Loader: "💪",
  Sweeper: "🧺",
  PestControl: "🐛",
  EventHelper: "🎉",
  Mover: "📦",
  Other: "💼",
};

export function WorkerProfilePage() {
  const { t } = useGlobalTranslation();
  const { userId } = useAuth();
  const { data: profile, isLoading } = useWorkerProfile(userId);
  const { mutateAsync: updateWorker, isPending: isSavingPhoto } =
    useUpdateWorkerProfile();

  const [showPhone, setShowPhone] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo must be under 5MB");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = async () => {
    if (!profile || !photoPreview) return;
    try {
      await updateWorker({ id: profile.id, profile_photo: photoPreview });
      toast.success("Profile photo updated! 📸");
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch {
      toast.error("Could not save photo. Try again.");
    }
  };

  const handleCancelPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        className="bg-muted/30 min-h-screen py-8"
        data-ocid="worker_profile.loading_state"
      >
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-card rounded-2xl shadow-card overflow-hidden">
            <div className="h-28 bg-primary/10" />
            <div className="px-6 pb-6">
              <Skeleton className="w-24 h-24 rounded-full -mt-12 mb-4 border-4 border-card" />
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-5 w-32 mb-4" />
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── No profile ────────────────────────────────────────────────────────────
  if (!profile) {
    return (
      <div
        className="bg-muted/30 min-h-[70vh] flex items-center justify-center"
        data-ocid="worker_profile.empty_state"
      >
        <div className="text-center px-4">
          <div className="text-6xl mb-4">👷</div>
          <h2 className="text-display-md text-foreground mb-2">
            No Profile Found
          </h2>
          <p className="text-muted-foreground mb-6">
            Register to create your profile.
          </p>
          <Link to="/register">
            <Button type="button" className="bg-primary hover:opacity-90">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const professionLabel =
    PROFESSIONS.find((p) => p.value === profile.profession)?.label ??
    profile.profession;
  const profIcon = PROF_ICONS[profile.profession] ?? "💼";
  const displayPhoto = photoPreview ?? profile.profile_photo;
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className="bg-muted/30 min-h-screen py-8"
      data-ocid="worker_profile.page"
    >
      <div className="container mx-auto px-4 max-w-lg">
        {/* Back + Edit actions */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/worker/dashboard">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground"
              data-ocid="worker_profile.back_button"
            >
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Button>
          </Link>
          <Link to="/worker/edit">
            <Button
              type="button"
              size="sm"
              className="gap-1.5 bg-primary hover:opacity-90"
              data-ocid="worker_profile.edit_button"
            >
              <Pencil className="w-3.5 h-3.5" /> {t("worker.editProfile")}
            </Button>
          </Link>
        </div>

        {/* ── Profile Hero Card ─────────────────────────────────────────── */}
        <Card
          className="border-border shadow-elevated overflow-hidden"
          data-ocid="worker_profile.card"
        >
          {/* Cover gradient */}
          <div className="h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 80%, oklch(0.55 0.2 263 / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.6 0.15 142 / 0.3) 0%, transparent 50%)",
              }}
            />
          </div>

          <div className="px-5 pb-6 -mt-12">
            {/* Avatar with upload controls */}
            <div className="flex items-end gap-3 mb-1">
              <div className="relative flex-shrink-0">
                {displayPhoto ? (
                  <img
                    src={displayPhoto}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-card shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/15 border-4 border-card shadow-md flex items-center justify-center">
                    <span className="text-primary font-bold text-2xl">
                      {initials}
                    </span>
                  </div>
                )}
                {/* Camera overlay button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-smooth"
                  aria-label="Change profile photo"
                  data-ocid="worker_profile.photo_upload_button"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                  data-ocid="worker_profile.photo_input"
                />
              </div>

              {/* Photo action buttons — only shown after selection */}
              {photoFile && (
                <div className="flex gap-2 pb-1">
                  <Button
                    type="button"
                    size="sm"
                    className="bg-primary hover:opacity-90 h-8 text-xs"
                    onClick={handleSavePhoto}
                    disabled={isSavingPhoto}
                    data-ocid="worker_profile.save_photo_button"
                  >
                    {isSavingPhoto ? (
                      <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Save Photo"
                    )}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={handleCancelPhoto}
                    data-ocid="worker_profile.cancel_photo_button"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {/* Upload / Change Photo hint text */}
            <button
              type="button"
              className="text-xs text-muted-foreground mb-3 cursor-pointer hover:text-primary transition-smooth bg-transparent border-0 p-0"
              onClick={() => fileInputRef.current?.click()}
            >
              {profile.profile_photo ? "Change photo" : "Upload photo"}
            </button>

            {/* Name + verification */}
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-display-md text-foreground">
                {profile.name}
              </h1>
              {profile.verification_status === "Verified" && (
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                  <BadgeCheck className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">
                    Verified
                  </span>
                </div>
              )}
              {profile.verification_status === "Pending" && (
                <Badge variant="secondary" className="text-xs">
                  Pending Approval
                </Badge>
              )}
              {profile.verification_status === "Rejected" && (
                <Badge variant="destructive" className="text-xs">
                  Rejected
                </Badge>
              )}
            </div>

            {/* Profession */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg">{profIcon}</span>
              <span className="text-muted-foreground font-medium">
                {professionLabel}
              </span>
              {profile.profession === "Other" && profile.profession_custom && (
                <span className="text-muted-foreground">
                  — {profile.profession_custom}
                </span>
              )}
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Location + Rate */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{profile.location_address}</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                <IndianRupee className="w-3.5 h-3.5" />
                <span>{profile.hourly_rate}/hour</span>
              </div>
            </div>

            {/* Availability time range */}
            {(profile.availability.startTime ||
              profile.availability.endTime) && (
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-secondary/15 text-secondary border-secondary/20 gap-1">
                  🕐 {profile.availability.startTime} –{" "}
                  {profile.availability.endTime}
                </Badge>
                {profile.years_of_experience !== undefined &&
                  profile.years_of_experience > 0 && (
                    <Badge variant="outline" className="gap-1 text-xs">
                      <BookOpen className="w-3 h-3" />
                      {profile.years_of_experience} yr
                      {profile.years_of_experience !== 1 ? "s" : ""} exp
                    </Badge>
                  )}
              </div>
            )}

            {/* Is-Available indicator */}
            <div className="mt-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  profile.is_available
                    ? "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground"
                }`}
                data-ocid="worker_profile.availability_badge"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    profile.is_available
                      ? "bg-success animate-pulse"
                      : "bg-muted-foreground"
                  }`}
                />
                {profile.is_available
                  ? t("worker.available")
                  : t("worker.unavailable")}
              </span>
            </div>
          </div>
        </Card>

        {/* ── Extended Info cards ──────────────────────────────────────── */}
        {(profile.languages_spoken?.length ||
          profile.payment_preference ||
          profile.years_of_experience !== undefined) && (
          <Card className="border-border shadow-card mt-4">
            <CardContent className="pt-4 pb-4 space-y-3">
              <h2 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> Profile Details
              </h2>

              {profile.years_of_experience !== undefined &&
                profile.years_of_experience > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium text-foreground">
                      {profile.years_of_experience} year
                      {profile.years_of_experience !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

              {profile.languages_spoken &&
                profile.languages_spoken.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">Languages:</span>
                    <div className="flex flex-wrap gap-1">
                      {profile.languages_spoken.map((lang) => (
                        <Badge
                          key={lang}
                          variant="secondary"
                          className="text-xs"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

              {profile.payment_preference && (
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Payment:</span>
                  <span className="font-medium text-foreground">
                    {profile.payment_preference}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Skills ───────────────────────────────────────────────────────── */}
        {profile.skills.length > 0 && (
          <Card className="border-border shadow-card mt-4">
            <CardContent className="pt-4 pb-4">
              <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Contact button ───────────────────────────────────────────────── */}
        <Card
          className="border-border shadow-card mt-4"
          data-ocid="worker_profile.contact_card"
        >
          <CardContent className="pt-4 pb-4">
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" /> Contact
            </h2>
            {showPhone ? (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2 bg-success/10 text-success border border-success/30 rounded-lg px-4 py-2.5 font-semibold text-sm transition-smooth hover:bg-success/20"
                data-ocid="worker_profile.phone_link"
              >
                <Phone className="w-4 h-4" />
                {profile.phone}
              </a>
            ) : (
              <Button
                type="button"
                onClick={() => setShowPhone(true)}
                className="w-full bg-accent text-accent-foreground hover:opacity-90 gap-2"
                data-ocid="worker_profile.show_phone_button"
              >
                <Phone className="w-4 h-4" />
                {t("worker.contactWorker")}
              </Button>
            )}

            {/* Emergency contact if set */}
            {profile.emergency_contact_name && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">
                  Emergency Contact
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <PhoneCall className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">
                    {profile.emergency_contact_name}
                  </span>
                  {profile.emergency_contact_phone && (
                    <a
                      href={`tel:${profile.emergency_contact_phone}`}
                      className="text-primary hover:underline"
                    >
                      {profile.emergency_contact_phone}
                    </a>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Availability schedule card ──────────────────────────────────── */}
        <Card className="border-border shadow-card mt-4">
          <CardContent className="pt-4 pb-4">
            <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />{" "}
              {t("worker.availability")}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-primary/10 text-primary font-medium">
                <span>🕐</span>
                <span className="truncate">
                  {profile.availability.startTime} –{" "}
                  {profile.availability.endTime}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
