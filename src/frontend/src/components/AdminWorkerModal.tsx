import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  useApproveWorker,
  useRejectWorker,
  useRemoveWorker,
  useRestoreWorker,
  useUpdateAdminNotes,
} from "@/hooks/useAdmin";
import { PROFESSIONS } from "@/types";
import type { WorkerProfile } from "@/types";
import {
  Calendar,
  CheckCircle2,
  Clock,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Trash2,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({
  status,
}: { status: WorkerProfile["verification_status"] }) {
  if (status === "Verified")
    return (
      <Badge className="bg-success/10 text-success border-success/30 gap-1">
        <CheckCircle2 className="w-3 h-3" />
        Verified
      </Badge>
    );
  if (status === "Pending")
    return (
      <Badge className="bg-warning/10 text-warning border-warning/30 gap-1">
        <Clock className="w-3 h-3" />
        Pending Review
      </Badge>
    );
  if (status === "Removed")
    return (
      <Badge className="bg-destructive/10 text-destructive border-destructive/30 gap-1">
        <X className="w-3 h-3" />
        Removed
      </Badge>
    );
  return <Badge variant="secondary">{status}</Badge>;
}

interface AdminWorkerModalProps {
  worker: WorkerProfile | null;
  open: boolean;
  onClose: () => void;
  /** If provided, called after a status-changing action (approve/reject/remove/restore) */
  onAction?: () => void;
}

export function AdminWorkerModal({
  worker,
  open,
  onClose,
  onAction,
}: AdminWorkerModalProps) {
  const { mutateAsync: approve, isPending: approving } = useApproveWorker();
  const { mutateAsync: saveNotes, isPending: savingNotes } =
    useUpdateAdminNotes();
  const { mutateAsync: reject, isPending: rejecting } = useRejectWorker();
  const { mutateAsync: removeWorker, isPending: removing } = useRemoveWorker();
  const { mutateAsync: restore, isPending: restoring } = useRestoreWorker();

  const [rejectReason, setRejectReason] = useState("");
  const [removeReason, setRemoveReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [notesEditing, setNotesEditing] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "reject" | "remove" | null
  >(null);

  if (!worker) return null;

  const profLabel =
    PROFESSIONS.find((p) => p.value === worker.profession)?.label ??
    worker.profession;

  const handleApprove = async () => {
    await approve({ workerId: worker.id });
    toast.success(`${worker.name} approved!`);
    onAction?.();
    onClose();
  };

  const handleRejectConfirm = async () => {
    if (!rejectReason.trim()) return;
    await reject({ workerId: worker.id, reason: rejectReason });
    toast.error(`${worker.name} rejected`);
    setRejectReason("");
    setConfirmAction(null);
    onAction?.();
    onClose();
  };

  const handleRemoveConfirm = async () => {
    if (!removeReason.trim()) return;
    await removeWorker({ workerId: worker.id, reason: removeReason });
    toast.error(`${worker.name} removed from platform`);
    setRemoveReason("");
    setConfirmAction(null);
    onAction?.();
    onClose();
  };

  const handleRestore = async () => {
    await restore({ workerId: worker.id });
    toast.success(`${worker.name} restored to pending`);
    onAction?.();
    onClose();
  };

  const handleClose = () => {
    setConfirmAction(null);
    setRejectReason("");
    setRemoveReason("");
    setNotesEditing(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className="max-w-xl max-h-[90vh] overflow-y-auto"
        data-ocid="admin_worker_modal.dialog"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Worker Profile
          </DialogTitle>
        </DialogHeader>

        {/* ── Photo + Name + Status header ── */}
        <div className="flex items-start gap-4 mt-2">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {worker.profile_photo ? (
              <img
                src={worker.profile_photo}
                alt={worker.name}
                className="w-20 h-20 object-cover rounded-2xl"
              />
            ) : (
              <span className="text-primary font-bold text-2xl">
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
            <h2 className="font-bold text-foreground text-xl leading-tight">
              {worker.name}
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">{profLabel}</p>
            {worker.profession === "Other" && worker.profession_custom && (
              <p className="text-xs text-muted-foreground">
                ({worker.profession_custom})
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              <StatusBadge status={worker.verification_status} />
              {worker.is_available && (
                <Badge className="bg-success/10 text-success border-success/30 text-xs">
                  Available Now
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-3" />

        {/* ── Contact Section ── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Contact Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 bg-muted/30 rounded-lg p-3">
              <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground break-all">
                  {worker.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-muted/30 rounded-lg p-3">
              <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">
                  {worker.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Location Section ── */}
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Location
          </p>
          <div className="flex items-start gap-2 bg-muted/30 rounded-lg p-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground break-words">
                {worker.location_address}
              </p>
              {worker.location_lat !== 0 && worker.location_lng !== 0 && (
                <a
                  href={`https://maps.google.com/?q=${worker.location_lat},${worker.location_lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline mt-0.5 block"
                >
                  View on Map ({worker.location_lat.toFixed(4)},{" "}
                  {worker.location_lng.toFixed(4)})
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Professional Info ── */}
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Professional Info
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2 bg-muted/30 rounded-lg p-3">
              <IndianRupee className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Hourly Rate</p>
                <p className="text-sm font-semibold text-foreground">
                  ₹{worker.hourly_rate}/hr
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-muted/30 rounded-lg p-3">
              <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Availability</p>
                <p className="text-sm font-medium text-foreground">
                  {worker.availability.startTime && worker.availability.endTime
                    ? `${worker.availability.startTime} – ${worker.availability.endTime}`
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>
          {worker.skills.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Wrench className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Skills</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {worker.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Registration Dates ── */}
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Registration
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2 bg-muted/30 rounded-lg p-3">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Registered</p>
                <p className="text-sm font-medium text-foreground">
                  {formatDate(worker.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Admin Notes ── */}
        <div className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Admin Notes
          </p>
          {notesEditing ? (
            <div className="space-y-2">
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Internal notes (only visible to admins)..."
                rows={3}
                className="resize-none text-sm"
                data-ocid="admin_worker_modal.notes_textarea"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNotesEditing(false);
                    setAdminNotes(worker.admin_notes ?? "");
                  }}
                  data-ocid="admin_worker_modal.notes_cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={savingNotes}
                  onClick={async () => {
                    await saveNotes({ workerId: worker.id, notes: adminNotes });
                    setNotesEditing(false);
                    toast.success("Notes saved");
                  }}
                  data-ocid="admin_worker_modal.notes_save_button"
                >
                  {savingNotes ? "Saving…" : "Save Notes"}
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="w-full text-left bg-muted/30 rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-smooth min-h-[60px]"
              onClick={() => {
                setNotesEditing(true);
                setAdminNotes(worker.admin_notes ?? "");
              }}
              data-ocid="admin_worker_modal.notes_edit_button"
            >
              {worker.admin_notes ? (
                <p className="text-sm text-foreground italic">
                  {worker.admin_notes}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click to add admin notes...
                </p>
              )}
            </button>
          )}
        </div>

        {/* ── Rejection/Removal reason ── */}
        {worker.rejection_reason && (
          <div className="mt-3 bg-destructive/5 border border-destructive/20 rounded-lg p-3">
            <p className="text-xs text-destructive font-medium mb-1">
              Rejection / Removal Reason
            </p>
            <p className="text-sm text-foreground">{worker.rejection_reason}</p>
          </div>
        )}

        <Separator className="my-3" />

        {/* ── Confirm action panels ── */}
        {confirmAction === "reject" && (
          <div
            className="space-y-2 bg-destructive/5 border border-destructive/20 rounded-xl p-4"
            data-ocid="admin_worker_modal.reject_panel"
          >
            <p className="text-sm font-medium text-destructive">
              Reject this worker?
            </p>
            <div className="space-y-1.5">
              <Label>
                Reason <span className="text-destructive">*</span>
              </Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Provide a reason for rejection..."
                rows={2}
                className="resize-none text-sm"
                data-ocid="admin_worker_modal.reject_reason_textarea"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfirmAction(null)}
                data-ocid="admin_worker_modal.reject_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleRejectConfirm}
                disabled={!rejectReason.trim() || rejecting}
                className="bg-destructive text-destructive-foreground hover:opacity-90"
                data-ocid="admin_worker_modal.reject_confirm_button"
              >
                Confirm Reject
              </Button>
            </div>
          </div>
        )}

        {confirmAction === "remove" && (
          <div
            className="space-y-2 bg-destructive/5 border border-destructive/20 rounded-xl p-4"
            data-ocid="admin_worker_modal.remove_panel"
          >
            <p className="text-sm font-medium text-destructive">
              Remove this worker from the platform?
            </p>
            <div className="space-y-1.5">
              <Label>
                Reason <span className="text-destructive">*</span>
              </Label>
              <Textarea
                value={removeReason}
                onChange={(e) => setRemoveReason(e.target.value)}
                placeholder="Provide a reason for removal..."
                rows={2}
                className="resize-none text-sm"
                data-ocid="admin_worker_modal.remove_reason_textarea"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfirmAction(null)}
                data-ocid="admin_worker_modal.remove_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleRemoveConfirm}
                disabled={!removeReason.trim() || removing}
                className="bg-destructive text-destructive-foreground hover:opacity-90"
                data-ocid="admin_worker_modal.remove_confirm_button"
              >
                Confirm Remove
              </Button>
            </div>
          </div>
        )}

        {/* ── Action Buttons ── */}
        {confirmAction === null && (
          <div
            className="flex flex-wrap gap-2"
            data-ocid="admin_worker_modal.actions"
          >
            {worker.verification_status === "Pending" && (
              <>
                <Button
                  type="button"
                  onClick={handleApprove}
                  disabled={approving}
                  className="bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1 flex-1"
                  data-ocid="admin_worker_modal.approve_button"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Approve Worker
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setConfirmAction("reject")}
                  className="text-destructive hover:bg-destructive/10 border-destructive/30 gap-1 flex-1"
                  data-ocid="admin_worker_modal.reject_button"
                >
                  <X className="w-4 h-4" />
                  Reject
                </Button>
              </>
            )}
            {worker.verification_status === "Verified" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmAction("remove")}
                className="text-destructive hover:bg-destructive/10 border-destructive/30 gap-1"
                data-ocid="admin_worker_modal.remove_button"
              >
                <Trash2 className="w-4 h-4" />
                Remove from Platform
              </Button>
            )}
            {(worker.verification_status === "Removed" ||
              worker.verification_status === "Rejected") && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRestore}
                disabled={restoring}
                className="text-success hover:bg-success/10 border-success/30 gap-1"
                data-ocid="admin_worker_modal.restore_button"
              >
                <RotateCcw className="w-4 h-4" />
                Restore to Pending
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
