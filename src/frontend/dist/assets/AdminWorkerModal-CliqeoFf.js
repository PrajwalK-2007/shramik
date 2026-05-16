import { c as createLucideIcon, j as jsxRuntimeExports, X, l as cn, x as useApproveWorker, H as useUpdateAdminNotes, y as useRejectWorker, D as useRemoveWorker, E as useRestoreWorker, r as reactExports, k as User, C as Clock, B as Button, i as ue } from "./index-D4yy3BhY.js";
import { B as Badge } from "./badge-gXH7trBI.js";
import { R as Root, C as Content, a as Close, b as Title, P as Portal, O as Overlay } from "./index-f0aJcAoU.js";
import { L as Label } from "./label-BaD6ci6U.js";
import { S as Separator } from "./index-DYUwcsMR.js";
import { T as Textarea } from "./textarea-Bo00sZbn.js";
import { P as PROFESSIONS } from "./index-D3QYH2aj.js";
import { M as Mail } from "./mail-Bm7LM0lL.js";
import { P as Phone } from "./phone-Gf2viXky.js";
import { M as MapPin } from "./map-pin-BxJaMctR.js";
import { I as IndianRupee } from "./indian-rupee-4DL0qXIY.js";
import { W as Wrench } from "./wrench-D0J1_6Oa.js";
import { S as ShieldCheck } from "./shield-check-B3gYHK5J.js";
import { C as CircleCheck } from "./circle-check-D2C7GC-o.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function StatusBadge({
  status
}) {
  if (status === "Verified")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-success/10 text-success border-success/30 gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      "Verified"
    ] });
  if (status === "Pending")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-warning/10 text-warning border-warning/30 gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
      "Pending Review"
    ] });
  if (status === "Removed")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive/10 text-destructive border-destructive/30 gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
      "Removed"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: status });
}
function AdminWorkerModal({
  worker,
  open,
  onClose,
  onAction
}) {
  var _a;
  const { mutateAsync: approve, isPending: approving } = useApproveWorker();
  const { mutateAsync: saveNotes, isPending: savingNotes } = useUpdateAdminNotes();
  const { mutateAsync: reject, isPending: rejecting } = useRejectWorker();
  const { mutateAsync: removeWorker, isPending: removing } = useRemoveWorker();
  const { mutateAsync: restore, isPending: restoring } = useRestoreWorker();
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [removeReason, setRemoveReason] = reactExports.useState("");
  const [adminNotes, setAdminNotes] = reactExports.useState("");
  const [notesEditing, setNotesEditing] = reactExports.useState(false);
  const [confirmAction, setConfirmAction] = reactExports.useState(null);
  if (!worker) return null;
  const profLabel = ((_a = PROFESSIONS.find((p) => p.value === worker.profession)) == null ? void 0 : _a.label) ?? worker.profession;
  const handleApprove = async () => {
    await approve({ workerId: worker.id });
    ue.success(`${worker.name} approved!`);
    onAction == null ? void 0 : onAction();
    onClose();
  };
  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) return;
    await reject({ workerId: worker.id, reason: rejectReason });
    ue.error(`${worker.name} rejected`);
    setRejectReason("");
    setConfirmAction(null);
    onAction == null ? void 0 : onAction();
    onClose();
  };
  const handleRemoveConfirm = async () => {
    if (!removeReason.trim()) return;
    await removeWorker({ workerId: worker.id, reason: removeReason });
    ue.error(`${worker.name} removed from platform`);
    setRemoveReason("");
    setConfirmAction(null);
    onAction == null ? void 0 : onAction();
    onClose();
  };
  const handleRestore = async () => {
    await restore({ workerId: worker.id });
    ue.success(`${worker.name} restored to pending`);
    onAction == null ? void 0 : onAction();
    onClose();
  };
  const handleClose = () => {
    setConfirmAction(null);
    setRejectReason("");
    setRemoveReason("");
    setNotesEditing(false);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => !o && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-xl max-h-[90vh] overflow-y-auto",
      "data-ocid": "admin_worker_modal.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
          "Worker Profile"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden", children: worker.profile_photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: worker.profile_photo,
              alt: worker.name,
              className: "w-20 h-20 object-cover rounded-2xl"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-2xl", children: worker.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-foreground text-xl leading-tight", children: worker.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: profLabel }),
            worker.profession === "Other" && worker.profession_custom && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "(",
              worker.profession_custom,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: worker.verification_status }),
              worker.is_available && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/10 text-success border-success/30 text-xs", children: "Available Now" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2", children: "Contact Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground break-all", children: worker.email })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: worker.phone })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-muted/30 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground break-words", children: worker.location_address }),
              worker.location_lat !== 0 && worker.location_lng !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `https://maps.google.com/?q=${worker.location_lat},${worker.location_lng}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-xs text-primary hover:underline mt-0.5 block",
                  children: [
                    "View on Map (",
                    worker.location_lat.toFixed(4),
                    ",",
                    " ",
                    worker.location_lng.toFixed(4),
                    ")"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2", children: "Professional Info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-accent mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Hourly Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                  "₹",
                  worker.hourly_rate,
                  "/hr"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-muted/30 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Availability" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: worker.availability.startTime && worker.availability.endTime ? `${worker.availability.startTime} – ${worker.availability.endTime}` : "Not specified" })
              ] })
            ] })
          ] }),
          worker.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Skills" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: worker.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2", children: "Registration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-muted/30 rounded-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Registered" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formatDate(worker.created_at) })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2", children: "Admin Notes" }),
          notesEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: adminNotes,
                onChange: (e) => setAdminNotes(e.target.value),
                placeholder: "Internal notes (only visible to admins)...",
                rows: 3,
                className: "resize-none text-sm",
                "data-ocid": "admin_worker_modal.notes_textarea"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: () => {
                    setNotesEditing(false);
                    setAdminNotes(worker.admin_notes ?? "");
                  },
                  "data-ocid": "admin_worker_modal.notes_cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  disabled: savingNotes,
                  onClick: async () => {
                    await saveNotes({ workerId: worker.id, notes: adminNotes });
                    setNotesEditing(false);
                    ue.success("Notes saved");
                  },
                  "data-ocid": "admin_worker_modal.notes_save_button",
                  children: savingNotes ? "Saving…" : "Save Notes"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "w-full text-left bg-muted/30 rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-smooth min-h-[60px]",
              onClick: () => {
                setNotesEditing(true);
                setAdminNotes(worker.admin_notes ?? "");
              },
              "data-ocid": "admin_worker_modal.notes_edit_button",
              children: worker.admin_notes ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground italic", children: worker.admin_notes }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click to add admin notes..." })
            }
          )
        ] }),
        worker.rejection_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 bg-destructive/5 border border-destructive/20 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-medium mb-1", children: "Rejection / Removal Reason" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: worker.rejection_reason })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
        confirmAction === "reject" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-2 bg-destructive/5 border border-destructive/20 rounded-xl p-4",
            "data-ocid": "admin_worker_modal.reject_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: "Reject this worker?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Reason ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: rejectReason,
                    onChange: (e) => setRejectReason(e.target.value),
                    placeholder: "Provide a reason for rejection...",
                    rows: 2,
                    className: "resize-none text-sm",
                    "data-ocid": "admin_worker_modal.reject_reason_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => setConfirmAction(null),
                    "data-ocid": "admin_worker_modal.reject_cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    onClick: handleRejectConfirm,
                    disabled: !rejectReason.trim() || rejecting,
                    className: "bg-destructive text-destructive-foreground hover:opacity-90",
                    "data-ocid": "admin_worker_modal.reject_confirm_button",
                    children: "Confirm Reject"
                  }
                )
              ] })
            ]
          }
        ),
        confirmAction === "remove" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "space-y-2 bg-destructive/5 border border-destructive/20 rounded-xl p-4",
            "data-ocid": "admin_worker_modal.remove_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: "Remove this worker from the platform?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                  "Reason ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: removeReason,
                    onChange: (e) => setRemoveReason(e.target.value),
                    placeholder: "Provide a reason for removal...",
                    rows: 2,
                    className: "resize-none text-sm",
                    "data-ocid": "admin_worker_modal.remove_reason_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => setConfirmAction(null),
                    "data-ocid": "admin_worker_modal.remove_cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    onClick: handleRemoveConfirm,
                    disabled: !removeReason.trim() || removing,
                    className: "bg-destructive text-destructive-foreground hover:opacity-90",
                    "data-ocid": "admin_worker_modal.remove_confirm_button",
                    children: "Confirm Remove"
                  }
                )
              ] })
            ]
          }
        ),
        confirmAction === null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap gap-2",
            "data-ocid": "admin_worker_modal.actions",
            children: [
              worker.verification_status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    onClick: handleApprove,
                    disabled: approving,
                    className: "bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1 flex-1",
                    "data-ocid": "admin_worker_modal.approve_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
                      "Approve Worker"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setConfirmAction("reject"),
                    className: "text-destructive hover:bg-destructive/10 border-destructive/30 gap-1 flex-1",
                    "data-ocid": "admin_worker_modal.reject_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                      "Reject"
                    ]
                  }
                )
              ] }),
              worker.verification_status === "Verified" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setConfirmAction("remove"),
                  className: "text-destructive hover:bg-destructive/10 border-destructive/30 gap-1",
                  "data-ocid": "admin_worker_modal.remove_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                    "Remove from Platform"
                  ]
                }
              ),
              (worker.verification_status === "Removed" || worker.verification_status === "Rejected") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: handleRestore,
                  disabled: restoring,
                  className: "text-success hover:bg-success/10 border-success/30 gap-1",
                  "data-ocid": "admin_worker_modal.restore_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
                    "Restore to Pending"
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}
export {
  AdminWorkerModal as A,
  Calendar as C,
  Dialog as D,
  RotateCcw as R,
  Trash2 as T,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c
};
