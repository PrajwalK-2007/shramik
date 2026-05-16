import { c as createLucideIcon, u as useGlobalTranslation, b as useAuth, j as jsxRuntimeExports, L as Link, B as Button, U as Users, C as Clock, i as ue } from "./index-D4yy3BhY.js";
import { B as Badge } from "./badge-gXH7trBI.js";
import { C as Card, a as CardContent } from "./card-CPR4qmTf.js";
import { S as Skeleton } from "./skeleton-CyfHYuxG.js";
import { c as useWorkerProfile, d as useToggleAvailability } from "./useWorker-TE3Va5_T.js";
import { P as PROFESSIONS } from "./index-D3QYH2aj.js";
import { E as Eye } from "./eye-CXEDHLRe.js";
import { P as Pencil } from "./pencil-BxicoJji.js";
import { C as CircleAlert } from "./circle-alert-C_A-Fwyl.js";
import { C as CircleCheck } from "./circle-check-D2C7GC-o.js";
import { B as BadgeCheck } from "./badge-check-CCQv5C2K.js";
import { M as MapPin } from "./map-pin-BxJaMctR.js";
import { T as TrendingUp } from "./trending-up-Bt_FYGdf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function calcCompletion(profile) {
  if (!profile) return { pct: 0, missing: [] };
  const checks = [
    { label: "Full Name", ok: !!profile.name },
    { label: "Phone Number", ok: !!profile.phone },
    { label: "Profession", ok: !!profile.profession },
    { label: "Location Address", ok: !!profile.location_address },
    { label: "Hourly Rate", ok: profile.hourly_rate > 0 },
    {
      label: "Availability",
      ok: !!(profile.availability.startTime && profile.availability.endTime)
    },
    { label: "Skills", ok: profile.skills.length > 0 },
    { label: "Profile Photo", ok: !!profile.profile_photo }
  ];
  const done = checks.filter((c) => c.ok).length;
  const missing = checks.filter((c) => !c.ok).map((c) => c.label);
  return { pct: Math.round(done / checks.length * 100), missing };
}
function WorkerDashboardPage() {
  var _a;
  const { t } = useGlobalTranslation();
  const { userId } = useAuth();
  const { data: profile, isLoading } = useWorkerProfile();
  const { mutateAsync: toggleAvail, isPending: isToggling } = useToggleAvailability();
  const handleToggle = async () => {
    if (!profile) return;
    try {
      const newState = await toggleAvail();
      ue.success(
        newState ? "✅ You're now showing as Available!" : "🔴 Set as Unavailable"
      );
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update availability"
      );
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 min-h-screen py-8",
        "data-ocid": "worker_dashboard.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" })
        ] })
      }
    );
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 min-h-[70vh] flex items-center justify-center",
        "data-ocid": "worker_dashboard.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "👷" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "No Profile Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Please complete your registration first." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "bg-primary hover:opacity-90", children: "Register Now" }) })
        ] })
      }
    );
  }
  const professionLabel = ((_a = PROFESSIONS.find((p) => p.value === profile.profession)) == null ? void 0 : _a.label) ?? profile.profession;
  const { pct, missing } = calcCompletion(profile);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-muted/30 min-h-screen py-8",
      "data-ocid": "worker_dashboard.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: t("nav.dashboard") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "gap-1.5",
                "data-ocid": "worker_dashboard.view_profile_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                  "View Profile"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/edit", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                className: "gap-1.5 bg-primary hover:opacity-90",
                "data-ocid": "worker_dashboard.edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }),
                  t("worker.editProfile")
                ]
              }
            ) })
          ] })
        ] }),
        profile.verification_status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 bg-warning/10 border border-warning/30 rounded-xl p-4",
            "data-ocid": "worker_dashboard.pending_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-warning flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-warning", children: "Under Review" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: "Your profile is under review. Admin will verify within 24 hours." })
              ] })
            ]
          }
        ),
        profile.verification_status === "Rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-xl p-4",
            "data-ocid": "worker_dashboard.rejected_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-destructive flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-destructive", children: "Registration Rejected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: t("auth.workerRejected") }),
                profile.rejection_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-medium text-destructive", children: [
                  "Reason: ",
                  profile.rejection_reason
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "destructive",
                    className: "mt-2",
                    "data-ocid": "worker_dashboard.rejected_edit_button",
                    children: "Update Profile"
                  }
                ) })
              ] })
            ]
          }
        ),
        profile.verification_status === "Verified" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 bg-success/10 border border-success/30 rounded-xl px-4 py-3",
            "data-ocid": "worker_dashboard.verified_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-success flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-success", children: "Profile Verified — You appear in search results" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-border shadow-card",
            "data-ocid": "worker_dashboard.profile_card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                profile.profile_photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: profile.profile_photo,
                    alt: profile.name,
                    className: "w-16 h-16 rounded-full object-cover border-2 border-primary/30 flex-shrink-0"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-lg", children: profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground text-lg truncate", children: profile.name }),
                    profile.verification_status === "Verified" && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-5 h-5 text-primary flex-shrink-0" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: professionLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1.5 text-sm text-muted-foreground flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[160px]", children: profile.location_address })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                      "₹",
                      profile.hourly_rate,
                      "/hr"
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleToggle,
                  disabled: isToggling,
                  className: `w-full py-3.5 rounded-xl font-semibold text-base transition-smooth flex items-center justify-center gap-2.5 ${profile.is_available ? "bg-success/15 text-success border-2 border-success/30 hover:bg-success/25" : "bg-destructive/10 text-destructive border-2 border-destructive/30 hover:bg-destructive/20"} ${isToggling ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`,
                  "data-ocid": "worker_dashboard.availability_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-3 h-3 rounded-full flex-shrink-0 ${profile.is_available ? "bg-success animate-pulse" : "bg-destructive"}`
                      }
                    ),
                    isToggling ? "Updating..." : profile.is_available ? "Available Now — Tap to Set Unavailable" : "Set as Available Now"
                  ]
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border shadow-card",
              "data-ocid": "worker_dashboard.views_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Monthly Views" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: "0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Profile impressions" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border shadow-card",
              "data-ocid": "worker_dashboard.visits_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-accent" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Profile Visits" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground", children: "0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Direct profile opens" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-border shadow-card",
            "data-ocid": "worker_dashboard.completion_card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: "Profile Strength" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `text-sm font-bold ${pct >= 80 ? "text-success" : pct >= 50 ? "text-warning" : "text-destructive"}`,
                    children: [
                      pct,
                      "%"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-2 rounded-full transition-smooth ${pct >= 80 ? "bg-success" : pct >= 50 ? "bg-warning" : "bg-destructive"}`,
                  style: { width: `${pct}%` }
                }
              ) }),
              missing.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1.5", children: "Missing fields:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: missing.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs text-muted-foreground border-muted-foreground/30",
                    children: m
                  },
                  m
                )) })
              ] }),
              missing.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-success", children: "🎉 Your profile is complete!" })
            ] })
          }
        ),
        profile.availability.startTime && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground text-sm mb-3 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            " ",
            t("worker.availability")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: profile.availability.startTime && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-primary/20 gap-1", children: [
            "🕐 ",
            profile.availability.startTime,
            " –",
            " ",
            profile.availability.endTime
          ] }) })
        ] }) }),
        profile.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm mb-3", children: t("worker.skills") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: profile.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: s }, s)) })
        ] }) })
      ] })
    }
  );
}
export {
  WorkerDashboardPage
};
