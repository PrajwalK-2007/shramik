import { c as createLucideIcon, u as useGlobalTranslation, v as usePendingWorkers, x as useApproveWorker, y as useRejectWorker, r as reactExports, j as jsxRuntimeExports, B as Button, X, C as Clock, i as ue } from "./index-D4yy3BhY.js";
import { C as Calendar, A as AdminWorkerModal, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./AdminWorkerModal-CliqeoFf.js";
import { B as Badge } from "./badge-gXH7trBI.js";
import { C as Card, a as CardContent } from "./card-CPR4qmTf.js";
import { C as Checkbox } from "./checkbox-BmMCNrW8.js";
import { I as Input } from "./input-DxOaIX0x.js";
import { L as Label } from "./label-BaD6ci6U.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DOkryjF-.js";
import { S as Skeleton } from "./skeleton-CyfHYuxG.js";
import { T as Textarea } from "./textarea-Bo00sZbn.js";
import { P as PROFESSIONS } from "./index-D3QYH2aj.js";
import { L as LoaderCircle } from "./loader-circle-D-_rz6SG.js";
import { S as Search } from "./search-BxA_JzXm.js";
import { F as Funnel } from "./funnel-CC_a5AtC.js";
import { S as SquareCheckBig } from "./square-check-big-BKCwQRRa.js";
import { S as ShieldCheck } from "./shield-check-B3gYHK5J.js";
import { P as Phone } from "./phone-Gf2viXky.js";
import { M as MapPin } from "./map-pin-BxJaMctR.js";
import { I as IndianRupee } from "./indian-rupee-4DL0qXIY.js";
import { E as Eye } from "./eye-CXEDHLRe.js";
import "./index-f0aJcAoU.js";
import "./index-DYUwcsMR.js";
import "./mail-Bm7LM0lL.js";
import "./wrench-D0J1_6Oa.js";
import "./circle-check-D2C7GC-o.js";
import "./index-BxqwsFjM.js";
import "./chevron-down-D6yoZGjh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function AdminPendingPage() {
  const { t } = useGlobalTranslation();
  const { data: workers, isLoading, refetch, isFetching } = usePendingWorkers();
  const { mutateAsync: approve, isPending: approving } = useApproveWorker();
  const { mutateAsync: reject, isPending: rejecting } = useRejectWorker();
  const [search, setSearch] = reactExports.useState("");
  const [professionFilter, setProfessionFilter] = reactExports.useState("all");
  const [sortOrder, setSortOrder] = reactExports.useState("newest");
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [rejectDialog, setRejectDialog] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [bulkRejectOpen, setBulkRejectOpen] = reactExports.useState(false);
  const [bulkRejectReason, setBulkRejectReason] = reactExports.useState("");
  const [profileModal, setProfileModal] = reactExports.useState(null);
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const filteredWorkers = (workers ?? []).filter((w) => {
    const q = search.toLowerCase();
    const matchSearch = !search || w.name.toLowerCase().includes(q) || w.email.toLowerCase().includes(q) || w.phone.includes(q) || w.profession.toLowerCase().includes(q) || (w.profession_custom ?? "").toLowerCase().includes(q);
    const matchProfession = professionFilter === "all" || w.profession === professionFilter;
    return matchSearch && matchProfession;
  }).sort(
    (a, b) => sortOrder === "newest" ? Number(b.created_at) - Number(a.created_at) : Number(a.created_at) - Number(b.created_at)
  );
  const toggleAllSelect = () => {
    if (selected.size === filteredWorkers.length && filteredWorkers.length > 0) {
      setSelected(/* @__PURE__ */ new Set());
    } else {
      setSelected(new Set(filteredWorkers.map((w) => w.id)));
    }
  };
  const handleApprove = async (worker) => {
    await approve({ workerId: worker.id });
    ue.success(`${worker.name} approved!`);
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(worker.id);
      return n;
    });
  };
  const handleReject = (worker) => {
    setRejectDialog(worker);
    setRejectReason("");
  };
  const confirmReject = async () => {
    if (!rejectDialog || !rejectReason.trim()) return;
    await reject({ workerId: rejectDialog.id, reason: rejectReason });
    ue.error(`${rejectDialog.name} rejected`);
    setRejectDialog(null);
    setRejectReason("");
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(rejectDialog.id);
      return n;
    });
  };
  const handleBulkApprove = async () => {
    const ids = Array.from(selected);
    await Promise.all(ids.map((id) => approve({ workerId: id })));
    ue.success(`${ids.length} workers approved`);
    setSelected(/* @__PURE__ */ new Set());
  };
  const handleBulkReject = async () => {
    if (!bulkRejectReason.trim()) return;
    const ids = Array.from(selected);
    await Promise.all(
      ids.map((id) => reject({ workerId: id, reason: bulkRejectReason }))
    );
    ue.error(`${ids.length} workers rejected`);
    setSelected(/* @__PURE__ */ new Set());
    setBulkRejectOpen(false);
    setBulkRejectReason("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8", "data-ocid": "admin_pending.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-lg text-foreground", children: t("admin.pendingApprovals") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: isLoading ? "Loading pending workers..." : `${filteredWorkers.length} of ${(workers == null ? void 0 : workers.length) ?? 0} workers awaiting review` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => refetch(),
            disabled: isFetching,
            className: "gap-1.5 flex-shrink-0",
            "data-ocid": "admin_pending.refresh_button",
            children: [
              isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  className: "w-3.5 h-3.5",
                  role: "img",
                  "aria-label": "Refresh",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Refresh" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" })
                  ]
                }
              ),
              "Refresh"
            ]
          }
        )
      ] }) }),
      !isLoading && ((workers == null ? void 0 : workers.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search by name, email, phone...",
              className: "pl-9",
              "data-ocid": "admin_pending.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: professionFilter,
            onValueChange: setProfessionFilter,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectTrigger,
                {
                  className: "w-[180px]",
                  "data-ocid": "admin_pending.profession_filter",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 mr-1.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All professions" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All professions" }),
                PROFESSIONS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, children: p.label }, p.value))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: sortOrder,
            onValueChange: (v) => setSortOrder(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SelectTrigger,
                {
                  className: "w-[160px]",
                  "data-ocid": "admin_pending.sort_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3.5 h-3.5 mr-1.5 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "Newest first" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "oldest", children: "Oldest first" })
              ] })
            ]
          }
        )
      ] }),
      filteredWorkers.length > 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl px-4 py-3 mb-5 flex flex-wrap items-center gap-3",
          "data-ocid": "admin_pending.bulk_toolbar",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: "select-all",
                checked: selected.size > 0 && selected.size === filteredWorkers.length,
                onCheckedChange: toggleAllSelect,
                "data-ocid": "admin_pending.select_all_checkbox"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "select-all", className: "text-sm cursor-pointer", children: selected.size > 0 ? `${selected.size} selected` : "Select all" }),
            selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-auto flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  onClick: handleBulkApprove,
                  disabled: approving,
                  className: "bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1",
                  "data-ocid": "admin_pending.bulk_approve_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3.5 h-3.5" }),
                    "Approve (",
                    selected.size,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => setBulkRejectOpen(true),
                  disabled: rejecting,
                  className: "text-destructive hover:bg-destructive/10 border-destructive/30 gap-1",
                  "data-ocid": "admin_pending.bulk_reject_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                    "Reject (",
                    selected.size,
                    ")"
                  ]
                }
              )
            ] })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "admin_pending.loading_state", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }, k)) }) : filteredWorkers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 bg-card rounded-xl border border-border",
          "data-ocid": "admin_pending.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-12 h-12 text-success mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: search || professionFilter !== "all" ? "No workers match your filters" : "All caught up!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: search || professionFilter !== "all" ? "Try adjusting your search or filters" : "No pending approvals at this time" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "admin_pending.worker_list", children: filteredWorkers.map((worker, i) => {
        var _a;
        const professionLabel = ((_a = PROFESSIONS.find((p) => p.value === worker.profession)) == null ? void 0 : _a.label) ?? worker.profession;
        const isSelected = selected.has(worker.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: `border transition-smooth ${isSelected ? "border-primary/40 bg-primary/5" : "border-border"}`,
            "data-ocid": `admin_pending.worker_card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: isSelected,
                  onCheckedChange: () => toggleSelect(worker.id),
                  className: "mt-1 flex-shrink-0",
                  "data-ocid": `admin_pending.worker_checkbox.${i + 1}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden", children: worker.profile_photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: worker.profile_photo,
                  alt: worker.name,
                  className: "w-12 h-12 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-sm", children: worker.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: worker.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-warning/10 text-warning border-warning/30 text-xs", children: "Pending" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: professionLabel }),
                worker.profession === "Other" && worker.profession_custom && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "(",
                  worker.profession_custom,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                    worker.phone
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                    worker.location_address
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3 h-3" }),
                    worker.hourly_rate,
                    "/hr"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                    formatDate(worker.created_at)
                  ] }),
                  worker.availability.startTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                    worker.availability.startTime,
                    " –",
                    " ",
                    worker.availability.endTime
                  ] })
                ] }),
                worker.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: worker.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-xs",
                    children: s
                  },
                  s
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    onClick: () => setProfileModal(worker),
                    className: "gap-1",
                    "data-ocid": `admin_pending.view_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                      "View"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    onClick: () => handleApprove(worker),
                    className: "bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1",
                    disabled: approving,
                    "data-ocid": `admin_pending.approve_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
                      t("admin.approve")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    onClick: () => handleReject(worker),
                    className: "text-destructive hover:bg-destructive/10 border-destructive/30 gap-1",
                    disabled: rejecting,
                    "data-ocid": `admin_pending.reject_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                      t("admin.reject")
                    ]
                  }
                )
              ] })
            ] }) })
          },
          worker.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AdminWorkerModal,
      {
        worker: profileModal,
        open: !!profileModal,
        onClose: () => setProfileModal(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!rejectDialog,
        onOpenChange: (o) => !o && setRejectDialog(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin_pending.reject_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
            "Reject \\u2014 ",
            rejectDialog == null ? void 0 : rejectDialog.name
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-destructive/5 border border-destructive/20 rounded-lg p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", children: "This will reject the worker registration. Please provide a clear reason." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                t("admin.rejectionReason"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: rejectReason,
                  onChange: (e) => setRejectReason(e.target.value),
                  placeholder: "Provide a clear reason for rejection...",
                  rows: 3,
                  className: "resize-none",
                  "data-ocid": "admin_pending.rejection_reason_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setRejectDialog(null),
                  "data-ocid": "admin_pending.reject_cancel_button",
                  children: t("common.cancel")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: confirmReject,
                  disabled: !rejectReason.trim() || rejecting,
                  className: "bg-destructive text-destructive-foreground hover:opacity-90",
                  "data-ocid": "admin_pending.reject_confirm_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1" }),
                    t("admin.reject")
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: bulkRejectOpen,
        onOpenChange: (o) => !o && setBulkRejectOpen(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "admin_pending.bulk_reject_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
            "Reject ",
            selected.size,
            " Workers"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                t("admin.rejectionReason"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: bulkRejectReason,
                  onChange: (e) => setBulkRejectReason(e.target.value),
                  placeholder: "Reason applied to all selected workers...",
                  rows: 3,
                  className: "resize-none",
                  "data-ocid": "admin_pending.bulk_reject_reason_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setBulkRejectOpen(false),
                  "data-ocid": "admin_pending.bulk_reject_cancel_button",
                  children: t("common.cancel")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: handleBulkReject,
                  disabled: !bulkRejectReason.trim() || rejecting,
                  className: "bg-destructive text-destructive-foreground hover:opacity-90",
                  "data-ocid": "admin_pending.bulk_reject_confirm_button",
                  children: [
                    t("admin.reject"),
                    " All (",
                    selected.size,
                    ")"
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminPendingPage
};
