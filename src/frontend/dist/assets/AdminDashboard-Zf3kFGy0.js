import { c as createLucideIcon, u as useGlobalTranslation, t as usePlatformStats, v as usePendingWorkers, w as useVerifiedWorkers, x as useApproveWorker, r as reactExports, j as jsxRuntimeExports, B as Button, U as Users, C as Clock, s as ChartColumn, L as Link, d as ChevronRight, i as ue } from "./index-D4yy3BhY.js";
import { R as RotateCcw, A as AdminWorkerModal } from "./AdminWorkerModal-CliqeoFf.js";
import { B as Badge } from "./badge-gXH7trBI.js";
import { C as Card, a as CardContent } from "./card-CPR4qmTf.js";
import { S as Skeleton } from "./skeleton-CyfHYuxG.js";
import { P as PROFESSIONS } from "./index-D3QYH2aj.js";
import { S as ShieldCheck } from "./shield-check-B3gYHK5J.js";
import { I as IndianRupee } from "./indian-rupee-4DL0qXIY.js";
import { C as CircleAlert } from "./circle-alert-C_A-Fwyl.js";
import { C as CircleCheck } from "./circle-check-D2C7GC-o.js";
import { E as Eye } from "./eye-CXEDHLRe.js";
import { T as TrendingUp } from "./trending-up-Bt_FYGdf.js";
import { U as UserPlus } from "./user-plus-3jpzyJcS.js";
import "./index-f0aJcAoU.js";
import "./index-DYUwcsMR.js";
import "./label-BaD6ci6U.js";
import "./textarea-Bo00sZbn.js";
import "./mail-Bm7LM0lL.js";
import "./phone-Gf2viXky.js";
import "./map-pin-BxJaMctR.js";
import "./wrench-D0J1_6Oa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode);
function StatCard({
  icon: Icon,
  label,
  value,
  iconColor,
  iconBg,
  href
}) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-smooth",
      "data-ocid": "admin_dashboard.stat_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-6 h-6 ${iconColor}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: label })
        ] }),
        href && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground self-center flex-shrink-0" })
      ]
    }
  );
  return href ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, className: "block", children: content }) : content;
}
function AdminDashboardPage() {
  const { t } = useGlobalTranslation();
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { data: pending, refetch: refetchPending } = usePendingWorkers();
  const { data: verifiedWorkers } = useVerifiedWorkers();
  const { mutateAsync: approve, isPending: approving } = useApproveWorker();
  const [profileModal, setProfileModal] = reactExports.useState(null);
  const recentAll = [...pending ?? [], ...verifiedWorkers ?? []].slice().sort((a, b) => Number(b.created_at) - Number(a.created_at)).slice(0, 5);
  const handleQuickApprove = async (worker) => {
    await approve({ workerId: worker.id });
    ue.success(`${worker.name} approved!`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8", "data-ocid": "admin_dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground", children: t("admin.dashboard") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Welcome back. Here's what's happening on the platform." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => refetchPending(),
            className: "gap-1.5 flex-shrink-0",
            "data-ocid": "admin_dashboard.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
              "Refresh"
            ]
          }
        )
      ] }) }),
      statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
          "data-ocid": "admin_dashboard.loading_state",
          children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, k))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: Users,
            label: t("admin.totalWorkers"),
            value: (stats == null ? void 0 : stats.total_workers) ?? 0,
            iconColor: "text-primary",
            iconBg: "bg-primary/10",
            href: "/admin/users"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: ShieldCheck,
            label: t("admin.verifiedCount"),
            value: (stats == null ? void 0 : stats.verified_workers) ?? 0,
            iconColor: "text-success",
            iconBg: "bg-success/10"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: Clock,
            label: t("admin.pendingCount"),
            value: (stats == null ? void 0 : stats.pending_workers) ?? 0,
            iconColor: "text-warning",
            iconBg: "bg-warning/10",
            href: "/admin/pending"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: IndianRupee,
            label: t("admin.avgRate"),
            value: `₹${(stats == null ? void 0 : stats.avg_hourly_rate) ?? 0}`,
            iconColor: "text-accent",
            iconBg: "bg-accent/10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Quick Actions" }),
          [
            {
              href: "/admin/pending",
              icon: Clock,
              label: t("admin.pendingApprovals"),
              badge: pending == null ? void 0 : pending.length,
              desc: "Review & approve workers",
              urgent: ((pending == null ? void 0 : pending.length) ?? 0) > 0
            },
            {
              href: "/admin/users",
              icon: Users,
              label: t("admin.users"),
              badge: null,
              desc: "Manage all platform users",
              urgent: false
            },
            {
              href: "/admin/stats",
              icon: ChartColumn,
              label: t("admin.stats"),
              badge: null,
              desc: "View charts & analytics",
              urgent: false
            }
          ].map(({ href, icon: Icon, label, badge, desc, urgent }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: href,
              "data-ocid": `admin_dashboard.nav_${href.split("/").pop()}_link`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `bg-card border rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-smooth ${urgent ? "border-warning/40 bg-warning/5" : "border-border"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        className: `w-5 h-5 flex-shrink-0 ${urgent ? "text-warning" : "text-primary"}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
                    ] }),
                    badge != null && badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-warning/15 text-warning border-warning/30 text-xs flex-shrink-0", children: badge }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
                  ]
                }
              )
            },
            href
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Recent Registrations" }),
            ((pending == null ? void 0 : pending.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-warning/10 text-warning border-warning/30 text-xs", children: [
              pending == null ? void 0 : pending.length,
              " pending"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border shadow-card",
              "data-ocid": "admin_dashboard.activity_panel",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4", children: [
                recentAll.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "py-8 text-center",
                    "data-ocid": "admin_dashboard.activity_empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No recent registrations" })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recentAll.map((worker, i) => {
                  var _a;
                  const profLabel = ((_a = PROFESSIONS.find((p) => p.value === worker.profession)) == null ? void 0 : _a.label) ?? worker.profession;
                  const hoursAgo = Math.floor(
                    (Date.now() - Number(worker.created_at)) / 36e5
                  );
                  const isPending = worker.verification_status === "Pending";
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3",
                      "data-ocid": `admin_dashboard.activity_item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden", children: worker.profile_photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: worker.profile_photo,
                            alt: worker.name,
                            className: "w-9 h-9 rounded-full object-cover"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-xs", children: worker.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: worker.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: profLabel })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                          isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-warning/10 text-warning border-warning/30", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-2.5 h-2.5 mr-1" }),
                              "Pending"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                type: "button",
                                size: "sm",
                                className: "h-7 text-xs bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1",
                                onClick: () => handleQuickApprove(worker),
                                disabled: approving,
                                "data-ocid": `admin_dashboard.quick_approve_button.${i + 1}`,
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3" }),
                                  "Approve"
                                ]
                              }
                            )
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs bg-success/10 text-success border-success/30", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5 mr-1" }),
                            "Verified"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              type: "button",
                              size: "sm",
                              variant: "ghost",
                              className: "h-7 w-7 p-0",
                              onClick: () => setProfileModal(worker),
                              "data-ocid": `admin_dashboard.view_profile_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: hoursAgo < 1 ? "Just now" : `${hoursAgo}h ago` })
                      ]
                    },
                    worker.id
                  );
                }) }),
                recentAll.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-border mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/admin/users",
                    className: "text-sm text-primary hover:underline flex items-center gap-1",
                    "data-ocid": "admin_dashboard.view_all_link",
                    children: [
                      "View all workers ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                    ]
                  }
                ) })
              ] })
            }
          )
        ] })
      ] }),
      stats && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-6 bg-card border border-border rounded-xl p-5",
          "data-ocid": "admin_dashboard.summary_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-sm", children: "Platform Health" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
              {
                label: "Verification Rate",
                value: stats.total_workers > 0 ? `${Math.round(stats.verified_workers / stats.total_workers * 100)}%` : "—",
                icon: ShieldCheck,
                color: "text-success"
              },
              {
                label: "Total Seekers",
                value: stats.total_seekers,
                icon: UserPlus,
                color: "text-secondary"
              },
              {
                label: "Removed Workers",
                value: stats.removed_workers,
                icon: CircleAlert,
                color: "text-destructive"
              },
              {
                label: "Avg. Rate/hr",
                value: `₹${stats.avg_hourly_rate}`,
                icon: IndianRupee,
                color: "text-accent"
              }
            ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 flex-shrink-0 ${color}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
              ] })
            ] }, label)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminWorkerModal,
      {
        worker: profileModal,
        open: !!profileModal,
        onClose: () => setProfileModal(null)
      }
    )
  ] });
}
export {
  AdminDashboardPage
};
