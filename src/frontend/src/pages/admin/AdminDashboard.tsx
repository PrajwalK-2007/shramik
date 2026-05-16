import { AdminWorkerModal } from "@/components/AdminWorkerModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useApproveWorker,
  usePendingWorkers,
  usePlatformStats,
  useVerifiedWorkers,
} from "@/hooks/useAdmin";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { PROFESSIONS } from "@/types";
import type { WorkerProfile } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  IndianRupee,
  Loader2,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconColor: string;
  iconBg: string;
  href?: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  iconColor,
  iconBg,
  href,
}: StatCardProps) {
  const content = (
    <div
      className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-smooth"
      data-ocid="admin_dashboard.stat_card"
    >
      <div
        className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}
      >
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      {href && (
        <ChevronRight className="w-4 h-4 text-muted-foreground self-center flex-shrink-0" />
      )}
    </div>
  );
  return href ? (
    <Link to={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

export function AdminDashboardPage() {
  const { t } = useGlobalTranslation();
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { data: pending, refetch: refetchPending } = usePendingWorkers();
  const { data: verifiedWorkers } = useVerifiedWorkers();
  const { mutateAsync: approve, isPending: approving } = useApproveWorker();

  const [profileModal, setProfileModal] = useState<WorkerProfile | null>(null);

  const recentAll = [...(pending ?? []), ...(verifiedWorkers ?? [])]
    .slice()
    .sort((a, b) => Number(b.created_at) - Number(a.created_at))
    .slice(0, 5);

  const handleQuickApprove = async (worker: WorkerProfile) => {
    await approve({ workerId: worker.id });
    toast.success(`${worker.name} approved!`);
  };

  return (
    <div className="py-8" data-ocid="admin_dashboard.page">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-display-lg text-foreground">
                {t("admin.dashboard")}
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back. Here&apos;s what&apos;s happening on the platform.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetchPending()}
              className="gap-1.5 flex-shrink-0"
              data-ocid="admin_dashboard.refresh_button"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Refresh
            </Button>
          </div>
        </div>

        {statsLoading ? (
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            data-ocid="admin_dashboard.loading_state"
          >
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Users}
              label={t("admin.totalWorkers")}
              value={stats?.total_workers ?? 0}
              iconColor="text-primary"
              iconBg="bg-primary/10"
              href="/admin/users"
            />
            <StatCard
              icon={ShieldCheck}
              label={t("admin.verifiedCount")}
              value={stats?.verified_workers ?? 0}
              iconColor="text-success"
              iconBg="bg-success/10"
            />
            <StatCard
              icon={Clock}
              label={t("admin.pendingCount")}
              value={stats?.pending_workers ?? 0}
              iconColor="text-warning"
              iconBg="bg-warning/10"
              href="/admin/pending"
            />
            <StatCard
              icon={IndianRupee}
              label={t("admin.avgRate")}
              value={`\u20B9${stats?.avg_hourly_rate ?? 0}`}
              iconColor="text-accent"
              iconBg="bg-accent/10"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Quick Actions
            </h2>
            {[
              {
                href: "/admin/pending" as const,
                icon: Clock,
                label: t("admin.pendingApprovals"),
                badge: pending?.length,
                desc: "Review & approve workers",
                urgent: (pending?.length ?? 0) > 0,
              },
              {
                href: "/admin/users" as const,
                icon: Users,
                label: t("admin.users"),
                badge: null,
                desc: "Manage all platform users",
                urgent: false,
              },
              {
                href: "/admin/stats" as const,
                icon: BarChart3,
                label: t("admin.stats"),
                badge: null,
                desc: "View charts & analytics",
                urgent: false,
              },
            ].map(({ href, icon: Icon, label, badge, desc, urgent }) => (
              <Link
                key={href}
                to={href}
                data-ocid={`admin_dashboard.nav_${href.split("/").pop()}_link`}
              >
                <div
                  className={`bg-card border rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-smooth ${urgent ? "border-warning/40 bg-warning/5" : "border-border"}`}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${urgent ? "text-warning" : "text-primary"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  {badge != null && badge > 0 && (
                    <Badge className="bg-warning/15 text-warning border-warning/30 text-xs flex-shrink-0">
                      {badge}
                    </Badge>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                Recent Registrations
              </h2>
              {(pending?.length ?? 0) > 0 && (
                <Badge className="bg-warning/10 text-warning border-warning/30 text-xs">
                  {pending?.length} pending
                </Badge>
              )}
            </div>
            <Card
              className="border-border shadow-card"
              data-ocid="admin_dashboard.activity_panel"
            >
              <CardContent className="pt-4">
                {recentAll.length === 0 ? (
                  <div
                    className="py-8 text-center"
                    data-ocid="admin_dashboard.activity_empty_state"
                  >
                    <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No recent registrations
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentAll.map((worker, i) => {
                      const profLabel =
                        PROFESSIONS.find((p) => p.value === worker.profession)
                          ?.label ?? worker.profession;
                      const hoursAgo = Math.floor(
                        (Date.now() - Number(worker.created_at)) / 3600000,
                      );
                      const isPending =
                        worker.verification_status === "Pending";
                      return (
                        <div
                          key={worker.id}
                          className="flex items-center gap-3"
                          data-ocid={`admin_dashboard.activity_item.${i + 1}`}
                        >
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {worker.profile_photo ? (
                              <img
                                src={worker.profile_photo}
                                alt={worker.name}
                                className="w-9 h-9 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-primary font-bold text-xs">
                                {worker.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {worker.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {profLabel}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {isPending ? (
                              <>
                                <Badge className="text-xs bg-warning/10 text-warning border-warning/30">
                                  <AlertCircle className="w-2.5 h-2.5 mr-1" />
                                  Pending
                                </Badge>
                                <Button
                                  type="button"
                                  size="sm"
                                  className="h-7 text-xs bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1"
                                  onClick={() => handleQuickApprove(worker)}
                                  disabled={approving}
                                  data-ocid={`admin_dashboard.quick_approve_button.${i + 1}`}
                                >
                                  <ShieldCheck className="w-3 h-3" />
                                  Approve
                                </Button>
                              </>
                            ) : (
                              <Badge className="text-xs bg-success/10 text-success border-success/30">
                                <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0"
                              onClick={() => setProfileModal(worker)}
                              data-ocid={`admin_dashboard.view_profile_button.${i + 1}`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {hoursAgo < 1 ? "Just now" : `${hoursAgo}h ago`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {recentAll.length > 0 && (
                  <div className="pt-4 border-t border-border mt-4">
                    <Link
                      to="/admin/users"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                      data-ocid="admin_dashboard.view_all_link"
                    >
                      View all workers <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {stats && (
          <div
            className="mt-6 bg-card border border-border rounded-xl p-5"
            data-ocid="admin_dashboard.summary_panel"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-foreground text-sm">
                Platform Health
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Verification Rate",
                  value:
                    stats.total_workers > 0
                      ? `${Math.round((stats.verified_workers / stats.total_workers) * 100)}%`
                      : "\u2014",
                  icon: ShieldCheck,
                  color: "text-success",
                },
                {
                  label: "Total Seekers",
                  value: stats.total_seekers,
                  icon: UserPlus,
                  color: "text-secondary",
                },
                {
                  label: "Removed Workers",
                  value: stats.removed_workers,
                  icon: AlertCircle,
                  color: "text-destructive",
                },
                {
                  label: "Avg. Rate/hr",
                  value: `\u20B9${stats.avg_hourly_rate}`,
                  icon: IndianRupee,
                  color: "text-accent",
                },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AdminWorkerModal
        worker={profileModal}
        open={!!profileModal}
        onClose={() => setProfileModal(null)}
      />
    </div>
  );
}
