import { AdminWorkerModal } from "@/components/AdminWorkerModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useApproveWorker,
  usePendingWorkers,
  useRejectWorker,
} from "@/hooks/useAdmin";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { PROFESSIONS } from "@/types";
import type { WorkerProfile } from "@/types";
import {
  ArrowUpDown,
  Calendar,
  CheckSquare,
  Clock,
  Eye,
  Filter,
  IndianRupee,
  Loader2,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const _AVAILABILITY_SHORT: Record<string, string> = {
  Morning: "Morning",
  Afternoon: "Afternoon",
  Evening: "Evening",
  FullDay: "Full Day",
  Flexible: "Flexible",
  Weekends: "Weekends",
};

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function AdminPendingPage() {
  const { t } = useGlobalTranslation();
  const { data: workers, isLoading, refetch, isFetching } = usePendingWorkers();
  const { mutateAsync: approve, isPending: approving } = useApproveWorker();
  const { mutateAsync: reject, isPending: rejecting } = useRejectWorker();

  const [search, setSearch] = useState("");
  const [professionFilter, setProfessionFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [rejectDialog, setRejectDialog] = useState<WorkerProfile | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [bulkRejectOpen, setBulkRejectOpen] = useState(false);
  const [bulkRejectReason, setBulkRejectReason] = useState("");
  const [profileModal, setProfileModal] = useState<WorkerProfile | null>(null);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredWorkers = (workers ?? [])
    .filter((w) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        w.name.toLowerCase().includes(q) ||
        w.email.toLowerCase().includes(q) ||
        w.phone.includes(q) ||
        w.profession.toLowerCase().includes(q) ||
        (w.profession_custom ?? "").toLowerCase().includes(q);
      const matchProfession =
        professionFilter === "all" || w.profession === professionFilter;
      return matchSearch && matchProfession;
    })
    .sort((a, b) =>
      sortOrder === "newest"
        ? Number(b.created_at) - Number(a.created_at)
        : Number(a.created_at) - Number(b.created_at),
    );

  const toggleAllSelect = () => {
    if (
      selected.size === filteredWorkers.length &&
      filteredWorkers.length > 0
    ) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredWorkers.map((w) => w.id)));
    }
  };

  const handleApprove = async (worker: WorkerProfile) => {
    await approve({ workerId: worker.id });
    toast.success(`${worker.name} approved!`);
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(worker.id);
      return n;
    });
  };

  const handleReject = (worker: WorkerProfile) => {
    setRejectDialog(worker);
    setRejectReason("");
  };

  const confirmReject = async () => {
    if (!rejectDialog || !rejectReason.trim()) return;
    await reject({ workerId: rejectDialog.id, reason: rejectReason });
    toast.error(`${rejectDialog.name} rejected`);
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
    toast.success(`${ids.length} workers approved`);
    setSelected(new Set());
  };

  const handleBulkReject = async () => {
    if (!bulkRejectReason.trim()) return;
    const ids = Array.from(selected);
    await Promise.all(
      ids.map((id) => reject({ workerId: id, reason: bulkRejectReason })),
    );
    toast.error(`${ids.length} workers rejected`);
    setSelected(new Set());
    setBulkRejectOpen(false);
    setBulkRejectReason("");
  };

  return (
    <div className="py-8" data-ocid="admin_pending.page">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h1 className="text-display-lg text-foreground">
                {t("admin.pendingApprovals")}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isLoading
                  ? "Loading pending workers..."
                  : `${filteredWorkers.length} of ${workers?.length ?? 0} workers awaiting review`}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              className="gap-1.5 flex-shrink-0"
              data-ocid="admin_pending.refresh_button"
            >
              {isFetching ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-3.5 h-3.5"
                  role="img"
                  aria-label="Refresh"
                >
                  <title>Refresh</title>
                  <path d="M23 4v6h-6M1 20v-6h6" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              )}
              Refresh
            </Button>
          </div>
        </div>

        {!isLoading && (workers?.length ?? 0) > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="pl-9"
                data-ocid="admin_pending.search_input"
              />
            </div>
            <Select
              value={professionFilter}
              onValueChange={setProfessionFilter}
            >
              <SelectTrigger
                className="w-[180px]"
                data-ocid="admin_pending.profession_filter"
              >
                <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="All professions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All professions</SelectItem>
                {PROFESSIONS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={sortOrder}
              onValueChange={(v) => setSortOrder(v as "newest" | "oldest")}
            >
              <SelectTrigger
                className="w-[160px]"
                data-ocid="admin_pending.sort_select"
              >
                <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {filteredWorkers.length > 0 && !isLoading && (
          <div
            className="bg-card border border-border rounded-xl px-4 py-3 mb-5 flex flex-wrap items-center gap-3"
            data-ocid="admin_pending.bulk_toolbar"
          >
            <Checkbox
              id="select-all"
              checked={
                selected.size > 0 && selected.size === filteredWorkers.length
              }
              onCheckedChange={toggleAllSelect}
              data-ocid="admin_pending.select_all_checkbox"
            />
            <Label htmlFor="select-all" className="text-sm cursor-pointer">
              {selected.size > 0 ? `${selected.size} selected` : "Select all"}
            </Label>
            {selected.size > 0 && (
              <div className="flex gap-2 ml-auto flex-wrap">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleBulkApprove}
                  disabled={approving}
                  className="bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1"
                  data-ocid="admin_pending.bulk_approve_button"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  Approve ({selected.size})
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setBulkRejectOpen(true)}
                  disabled={rejecting}
                  className="text-destructive hover:bg-destructive/10 border-destructive/30 gap-1"
                  data-ocid="admin_pending.bulk_reject_button"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject ({selected.size})
                </Button>
              </div>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4" data-ocid="admin_pending.loading_state">
            {["a", "b", "c"].map((k) => (
              <Skeleton key={k} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div
            className="text-center py-16 bg-card rounded-xl border border-border"
            data-ocid="admin_pending.empty_state"
          >
            <ShieldCheck className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">
              {search || professionFilter !== "all"
                ? "No workers match your filters"
                : "All caught up!"}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {search || professionFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No pending approvals at this time"}
            </p>
          </div>
        ) : (
          <div className="space-y-4" data-ocid="admin_pending.worker_list">
            {filteredWorkers.map((worker, i) => {
              const professionLabel =
                PROFESSIONS.find((p) => p.value === worker.profession)?.label ??
                worker.profession;
              const isSelected = selected.has(worker.id);

              return (
                <Card
                  key={worker.id}
                  className={`border transition-smooth ${
                    isSelected
                      ? "border-primary/40 bg-primary/5"
                      : "border-border"
                  }`}
                  data-ocid={`admin_pending.worker_card.${i + 1}`}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelect(worker.id)}
                        className="mt-1 flex-shrink-0"
                        data-ocid={`admin_pending.worker_checkbox.${i + 1}`}
                      />
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {worker.profile_photo ? (
                          <img
                            src={worker.profile_photo}
                            alt={worker.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-primary font-bold text-sm">
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
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">
                            {worker.name}
                          </h3>
                          <Badge className="bg-warning/10 text-warning border-warning/30 text-xs">
                            Pending
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                          {professionLabel}
                        </p>
                        {worker.profession === "Other" &&
                          worker.profession_custom && (
                            <p className="text-xs text-muted-foreground">
                              ({worker.profession_custom})
                            </p>
                          )}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {worker.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {worker.location_address}
                          </span>
                          <span className="flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" />
                            {worker.hourly_rate}/hr
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(worker.created_at)}
                          </span>
                          {worker.availability.startTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {worker.availability.startTime} –{" "}
                              {worker.availability.endTime}
                            </span>
                          )}
                        </div>
                        {worker.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {worker.skills.map((s) => (
                              <Badge
                                key={s}
                                variant="secondary"
                                className="text-xs"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setProfileModal(worker)}
                          className="gap-1"
                          data-ocid={`admin_pending.view_button.${i + 1}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleApprove(worker)}
                          className="bg-success/10 text-success hover:bg-success/20 border border-success/30 gap-1"
                          disabled={approving}
                          data-ocid={`admin_pending.approve_button.${i + 1}`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {t("admin.approve")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(worker)}
                          className="text-destructive hover:bg-destructive/10 border-destructive/30 gap-1"
                          disabled={rejecting}
                          data-ocid={`admin_pending.reject_button.${i + 1}`}
                        >
                          <X className="w-3.5 h-3.5" />
                          {t("admin.reject")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <AdminWorkerModal
        worker={profileModal}
        open={!!profileModal}
        onClose={() => setProfileModal(null)}
      />

      <Dialog
        open={!!rejectDialog}
        onOpenChange={(o) => !o && setRejectDialog(null)}
      >
        <DialogContent data-ocid="admin_pending.reject_dialog">
          <DialogHeader>
            <DialogTitle>Reject \u2014 {rejectDialog?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
              <p className="text-destructive text-xs">
                This will reject the worker registration. Please provide a clear
                reason.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>
                {t("admin.rejectionReason")}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Provide a clear reason for rejection..."
                rows={3}
                className="resize-none"
                data-ocid="admin_pending.rejection_reason_textarea"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRejectDialog(null)}
                data-ocid="admin_pending.reject_cancel_button"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="button"
                onClick={confirmReject}
                disabled={!rejectReason.trim() || rejecting}
                className="bg-destructive text-destructive-foreground hover:opacity-90"
                data-ocid="admin_pending.reject_confirm_button"
              >
                <X className="w-4 h-4 mr-1" />
                {t("admin.reject")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={bulkRejectOpen}
        onOpenChange={(o) => !o && setBulkRejectOpen(false)}
      >
        <DialogContent data-ocid="admin_pending.bulk_reject_dialog">
          <DialogHeader>
            <DialogTitle>Reject {selected.size} Workers</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label>
                {t("admin.rejectionReason")}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                value={bulkRejectReason}
                onChange={(e) => setBulkRejectReason(e.target.value)}
                placeholder="Reason applied to all selected workers..."
                rows={3}
                className="resize-none"
                data-ocid="admin_pending.bulk_reject_reason_textarea"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setBulkRejectOpen(false)}
                data-ocid="admin_pending.bulk_reject_cancel_button"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="button"
                onClick={handleBulkReject}
                disabled={!bulkRejectReason.trim() || rejecting}
                className="bg-destructive text-destructive-foreground hover:opacity-90"
                data-ocid="admin_pending.bulk_reject_confirm_button"
              >
                {t("admin.reject")} All ({selected.size})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
