import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  usePendingWorkers,
  usePlatformStats,
  useVerifiedWorkers,
} from "@/hooks/useAdmin";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { PROFESSIONS } from "@/types";
import type { WorkerAvailability } from "@/types";

function getAvailabilityLabel(a: WorkerAvailability): string {
  const start = Number.parseInt(a.startTime.split(":")[0], 10);
  const end = Number.parseInt(a.endTime.split(":")[0], 10);
  const duration = end - start;
  if (duration >= 8) return "Full Day";
  if (start < 12 && end <= 12) return "Morning";
  if (start >= 12 && start < 17) return "Afternoon";
  if (start >= 17) return "Evening";
  return "Flexible";
}
import {
  AlertCircle,
  Clock,
  IndianRupee,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PIE_COLORS = [
  "oklch(0.65 0.18 142)",
  "oklch(0.75 0.18 85)",
  "oklch(0.55 0.22 25)",
];

export function AdminStatsPage() {
  const { t } = useGlobalTranslation();
  const { data: stats, isLoading } = usePlatformStats();
  const { data: verifiedWorkers } = useVerifiedWorkers();
  const { data: pendingWorkers } = usePendingWorkers();

  const allWorkers = [...(verifiedWorkers ?? []), ...(pendingWorkers ?? [])];

  // Availability distribution from real worker data
  const availabilityDistribution = (() => {
    const counts: Record<string, number> = {};
    for (const w of allWorkers) {
      if (w.availability) {
        const label = getAvailabilityLabel(w.availability);
        counts[label] = (counts[label] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  })();

  // Average rate by profession from real worker data
  const avgRateByProfession = (() => {
    const byProfession: Record<string, { total: number; count: number }> = {};
    for (const w of allWorkers) {
      const label =
        PROFESSIONS.find((p) => p.value === w.profession)?.label ??
        w.profession;
      if (!byProfession[label]) byProfession[label] = { total: 0, count: 0 };
      byProfession[label].total += w.hourly_rate;
      byProfession[label].count += 1;
    }
    return Object.entries(byProfession)
      .map(([profession, { total, count }]) => ({
        name:
          profession.length > 14
            ? `${profession.slice(0, 14)}\u2026`
            : profession,
        avgRate: Math.round(total / count),
      }))
      .sort((a, b) => b.avgRate - a.avgRate)
      .slice(0, 10);
  })();

  const statItems = stats
    ? [
        {
          icon: Users,
          label: t("admin.totalWorkers"),
          value: stats.total_workers,
          color: "text-primary",
          bg: "bg-primary/10",
        },
        {
          icon: UserPlus,
          label: t("admin.totalSeekers"),
          value: stats.total_seekers,
          color: "text-secondary",
          bg: "bg-secondary/10",
        },
        {
          icon: ShieldCheck,
          label: t("admin.verifiedCount"),
          value: stats.verified_workers,
          color: "text-success",
          bg: "bg-success/10",
        },
        {
          icon: Clock,
          label: t("admin.pendingCount"),
          value: stats.pending_workers,
          color: "text-warning",
          bg: "bg-warning/10",
        },
        {
          icon: AlertCircle,
          label: "Removed Workers",
          value: stats.removed_workers,
          color: "text-destructive",
          bg: "bg-destructive/10",
        },
        {
          icon: IndianRupee,
          label: t("admin.avgRate"),
          value: `\u20B9${stats.avg_hourly_rate}`,
          color: "text-accent",
          bg: "bg-accent/10",
        },
      ]
    : [];

  const pieData = stats
    ? [
        { name: "Verified", value: stats.verified_workers },
        { name: "Pending", value: stats.pending_workers },
        { name: "Removed", value: stats.removed_workers },
      ].filter((d) => d.value > 0)
    : [];

  const barData = (stats?.top_professions ?? []).slice(0, 10).map((p) => ({
    name:
      p.profession.length > 12
        ? `${p.profession.slice(0, 12)}\u2026`
        : p.profession,
    count: p.count,
  }));

  const verificationRate =
    stats && stats.total_workers > 0
      ? Math.round((stats.verified_workers / stats.total_workers) * 100)
      : 0;

  return (
    <div className="py-8" data-ocid="admin_stats.page">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-display-lg text-foreground">
            {t("admin.stats")}
          </h1>
          <p className="text-muted-foreground mt-1">
            Platform performance overview and analytics
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
            data-ocid="admin_stats.loading_state"
          >
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton key={k} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {statItems.map(({ icon: Icon, label, value, color, bg }) => (
              <Card
                key={label}
                className="border-border shadow-card"
                data-ocid="admin_stats.stat_card"
              >
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {value}
                      </p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {stats && (
          <Card
            className="border-border mb-8"
            data-ocid="admin_stats.verification_rate_card"
          >
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground text-sm">
                  Overall Verification Rate
                </p>
                <span className="text-sm font-bold text-success">
                  {verificationRate}%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full transition-smooth"
                  style={{ width: `${verificationRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                {stats.verified_workers} verified out of {stats.total_workers}{" "}
                total workers
              </p>
            </CardContent>
          </Card>
        )}

        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {barData.length > 0 && (
              <Card
                className="border-border shadow-card"
                data-ocid="admin_stats.bar_chart_card"
              >
                <CardContent className="pt-5">
                  <h2 className="font-semibold text-foreground mb-4">
                    Top Professions by Workers
                  </h2>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={barData}
                      margin={{ top: 0, right: 8, left: -20, bottom: 40 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.92 0.01 0)"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "oklch(0.5 0.01 0)" }}
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "oklch(0.5 0.01 0)" }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1.0 0 0)",
                          border: "1px solid oklch(0.92 0.01 0)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                      <Bar
                        dataKey="count"
                        name="Workers"
                        radius={[4, 4, 0, 0]}
                        fill="oklch(0.55 0.2 263)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {pieData.length > 0 && (
              <Card
                className="border-border shadow-card"
                data-ocid="admin_stats.pie_chart_card"
              >
                <CardContent className="pt-5">
                  <h2 className="font-semibold text-foreground mb-4">
                    Worker Status Breakdown
                  </h2>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${Math.round((percent ?? 0) * 100)}%`
                        }
                        labelLine={false}
                      >
                        {pieData.map((entry, idx) => (
                          <Cell
                            key={entry.name}
                            fill={PIE_COLORS[idx % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1.0 0 0)",
                          border: "1px solid oklch(0.92 0.01 0)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        formatter={(value) => (
                          <span
                            style={{ fontSize: 12, color: "oklch(0.5 0.01 0)" }}
                          >
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {availabilityDistribution.length > 0 && (
              <Card
                className="border-border shadow-card"
                data-ocid="admin_stats.availability_chart_card"
              >
                <CardContent className="pt-5">
                  <h2 className="font-semibold text-foreground mb-4">
                    Availability Distribution
                  </h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={availabilityDistribution}
                      margin={{ top: 0, right: 8, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.92 0.01 0)"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "oklch(0.5 0.01 0)" }}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "oklch(0.5 0.01 0)" }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1.0 0 0)",
                          border: "1px solid oklch(0.92 0.01 0)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                      <Bar
                        dataKey="count"
                        name="Workers"
                        radius={[4, 4, 0, 0]}
                        fill="oklch(0.65 0.18 142)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {avgRateByProfession.length > 0 && (
              <Card
                className="border-border shadow-card"
                data-ocid="admin_stats.avg_rate_chart_card"
              >
                <CardContent className="pt-5">
                  <h2 className="font-semibold text-foreground mb-4">
                    Avg. Rate by Profession (\u20B9/hr)
                  </h2>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={avgRateByProfession}
                      margin={{ top: 0, right: 8, left: -10, bottom: 60 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.92 0.01 0)"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 9, fill: "oklch(0.5 0.01 0)" }}
                        angle={-40}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "oklch(0.5 0.01 0)" }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(1.0 0 0)",
                          border: "1px solid oklch(0.92 0.01 0)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                        formatter={(value: number) => [
                          `\u20B9${value}/hr`,
                          "Avg Rate",
                        ]}
                      />
                      <Bar
                        dataKey="avgRate"
                        name="Avg Rate"
                        radius={[4, 4, 0, 0]}
                        fill="oklch(0.75 0.18 85)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {stats && stats.top_professions.length > 0 && (
          <Card
            className="border-border shadow-card"
            data-ocid="admin_stats.top_professions_card"
          >
            <CardContent className="pt-5">
              <h2 className="font-semibold text-foreground mb-4">
                Profession Detail (Top{" "}
                {Math.min(10, stats.top_professions.length)})
              </h2>
              <div className="space-y-3">
                {stats.top_professions
                  .slice(0, 10)
                  .map(({ profession, count }, i) => {
                    const maxCount = stats.top_professions[0]?.count ?? 1;
                    const pct = Math.round((count / maxCount) * 100);
                    const profLabel =
                      PROFESSIONS.find((p) => p.value === profession)?.label ??
                      profession;
                    return (
                      <div
                        key={profession}
                        className="space-y-1"
                        data-ocid={`admin_stats.profession_bar.${i + 1}`}
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground truncate max-w-[200px]">
                            {profLabel}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                            {count} worker{count !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-smooth"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
