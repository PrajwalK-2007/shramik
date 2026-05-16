import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { useToggleAvailability, useWorkerProfile } from "@/hooks/useWorker";
import { PROFESSIONS } from "@/types";
import type { WorkerProfile } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  Pencil,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

// ─── Profile completeness calculator ──────────────────────────────────────
function calcCompletion(profile: WorkerProfile | null | undefined) {
  if (!profile) return { pct: 0, missing: [] as string[] };
  const checks: Array<{ label: string; ok: boolean }> = [
    { label: "Full Name", ok: !!profile.name },
    { label: "Phone Number", ok: !!profile.phone },
    { label: "Profession", ok: !!profile.profession },
    { label: "Location Address", ok: !!profile.location_address },
    { label: "Hourly Rate", ok: profile.hourly_rate > 0 },
    {
      label: "Availability",
      ok: !!(profile.availability.startTime && profile.availability.endTime),
    },
    { label: "Skills", ok: profile.skills.length > 0 },
    { label: "Profile Photo", ok: !!profile.profile_photo },
  ];
  const done = checks.filter((c) => c.ok).length;
  const missing = checks.filter((c) => !c.ok).map((c) => c.label);
  return { pct: Math.round((done / checks.length) * 100), missing };
}

export function WorkerDashboardPage() {
  const { t } = useGlobalTranslation();
  const { userId } = useAuth();
  const { data: profile, isLoading } = useWorkerProfile(userId);
  const { mutateAsync: toggleAvail, isPending: isToggling } =
    useToggleAvailability();

  const handleToggle = async () => {
    if (!profile) return;
    try {
      const newState = await toggleAvail();
      toast.success(
        newState
          ? "✅ You're now showing as Available!"
          : "🔴 Set as Unavailable",
      );
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update availability",
      );
    }
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        className="bg-muted/30 min-h-screen py-8"
        data-ocid="worker_dashboard.loading_state"
      >
        <div className="container mx-auto px-4 max-w-2xl space-y-4">
          <Skeleton className="h-10 w-48 rounded-lg" />
          <Skeleton className="h-36 rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
          <Skeleton className="h-28 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>
    );
  }

  // ── No profile ────────────────────────────────────────────────────────────
  if (!profile) {
    return (
      <div
        className="bg-muted/30 min-h-[70vh] flex items-center justify-center"
        data-ocid="worker_dashboard.empty_state"
      >
        <div className="text-center px-4">
          <div className="text-6xl mb-4">👷</div>
          <h2 className="text-display-md text-foreground mb-2">
            No Profile Found
          </h2>
          <p className="text-muted-foreground mb-6">
            Please complete your registration first.
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
  const { pct, missing } = calcCompletion(profile);

  return (
    <div
      className="bg-muted/30 min-h-screen py-8"
      data-ocid="worker_dashboard.page"
    >
      <div className="container mx-auto px-4 max-w-2xl space-y-5">
        {/* Page header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-display-md text-foreground">
            {t("nav.dashboard")}
          </h1>
          <div className="flex items-center gap-2">
            <Link to="/worker/profile">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                data-ocid="worker_dashboard.view_profile_button"
              >
                <Eye className="w-4 h-4" />
                View Profile
              </Button>
            </Link>
            <Link to="/worker/edit">
              <Button
                type="button"
                size="sm"
                className="gap-1.5 bg-primary hover:opacity-90"
                data-ocid="worker_dashboard.edit_button"
              >
                <Pencil className="w-4 h-4" />
                {t("worker.editProfile")}
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Verification Banner ─────────────────────────────────────────── */}
        {profile.verification_status === "Pending" && (
          <div
            className="flex items-start gap-3 bg-warning/10 border border-warning/30 rounded-xl p-4"
            data-ocid="worker_dashboard.pending_banner"
          >
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-warning">Under Review</p>
              <p className="text-muted-foreground mt-0.5">
                Your profile is under review. Admin will verify within 24 hours.
              </p>
            </div>
          </div>
        )}
        {profile.verification_status === "Rejected" && (
          <div
            className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4"
            data-ocid="worker_dashboard.rejected_banner"
          >
            <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-destructive">
                Registration Rejected
              </p>
              <p className="text-muted-foreground mt-0.5">
                {t("auth.workerRejected")}
              </p>
              {profile.rejection_reason && (
                <p className="mt-1 font-medium text-destructive">
                  Reason: {profile.rejection_reason}
                </p>
              )}
              <Link to="/worker/edit">
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="mt-2"
                  data-ocid="worker_dashboard.rejected_edit_button"
                >
                  Update Profile
                </Button>
              </Link>
            </div>
          </div>
        )}
        {profile.verification_status === "Verified" && (
          <div
            className="flex items-center gap-3 bg-success/10 border border-success/30 rounded-xl px-4 py-3"
            data-ocid="worker_dashboard.verified_banner"
          >
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
            <p className="text-sm font-medium text-success">
              Profile Verified — You appear in search results
            </p>
          </div>
        )}

        {/* ── Profile Card ────────────────────────────────────────────────── */}
        <Card
          className="border-border shadow-card"
          data-ocid="worker_dashboard.profile_card"
        >
          <CardContent className="pt-5 pb-5">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              {profile.profile_photo ? (
                <img
                  src={profile.profile_photo}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 flex-shrink-0">
                  <span className="text-primary font-bold text-lg">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-foreground text-lg truncate">
                    {profile.name}
                  </h2>
                  {profile.verification_status === "Verified" && (
                    <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {professionLabel}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[160px]">
                      {profile.location_address}
                    </span>
                  </span>
                  <span className="font-semibold text-foreground">
                    ₹{profile.hourly_rate}/hr
                  </span>
                </div>
              </div>
            </div>

            {/* ── Large Availability Toggle ──────────────────────────────── */}
            <div className="mt-4 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleToggle}
                disabled={isToggling}
                className={`w-full py-3.5 rounded-xl font-semibold text-base transition-smooth flex items-center justify-center gap-2.5 ${
                  profile.is_available
                    ? "bg-success/15 text-success border-2 border-success/30 hover:bg-success/25"
                    : "bg-destructive/10 text-destructive border-2 border-destructive/30 hover:bg-destructive/20"
                } ${isToggling ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                data-ocid="worker_dashboard.availability_toggle"
              >
                <span
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    profile.is_available
                      ? "bg-success animate-pulse"
                      : "bg-destructive"
                  }`}
                />
                {isToggling
                  ? "Updating..."
                  : profile.is_available
                    ? "Available Now — Tap to Set Unavailable"
                    : "Set as Available Now"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* ── Stats mini-cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="border-border shadow-card"
            data-ocid="worker_dashboard.views_card"
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  Monthly Views
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">
                Profile impressions
              </p>
            </CardContent>
          </Card>
          <Card
            className="border-border shadow-card"
            data-ocid="worker_dashboard.visits_card"
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  Profile Visits
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">
                Direct profile opens
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ── Profile Completeness ─────────────────────────────────────────── */}
        <Card
          className="border-border shadow-card"
          data-ocid="worker_dashboard.completion_card"
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                <span className="font-semibold text-foreground text-sm">
                  Profile Strength
                </span>
              </div>
              <span
                className={`text-sm font-bold ${
                  pct >= 80
                    ? "text-success"
                    : pct >= 50
                      ? "text-warning"
                      : "text-destructive"
                }`}
              >
                {pct}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full transition-smooth ${
                  pct >= 80
                    ? "bg-success"
                    : pct >= 50
                      ? "bg-warning"
                      : "bg-destructive"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {missing.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  Missing fields:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {missing.map((m) => (
                    <Badge
                      key={m}
                      variant="outline"
                      className="text-xs text-muted-foreground border-muted-foreground/30"
                    >
                      {m}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {missing.length === 0 && (
              <p className="text-xs text-success">
                🎉 Your profile is complete!
              </p>
            )}
          </CardContent>
        </Card>

        {/* ── Availability Time Range ───────────────────────────────────────────── */}
        {profile.availability.startTime && (
          <Card className="border-border shadow-card">
            <CardContent className="pt-4 pb-4">
              <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {t("worker.availability")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.availability.startTime && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
                    🕐 {profile.availability.startTime} –{" "}
                    {profile.availability.endTime}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Skills ───────────────────────────────────────────────────────── */}
        {profile.skills.length > 0 && (
          <Card className="border-border shadow-card">
            <CardContent className="pt-4 pb-4">
              <h3 className="font-semibold text-foreground text-sm mb-3">
                {t("worker.skills")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
