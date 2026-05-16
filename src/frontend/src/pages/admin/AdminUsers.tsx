import { AdminWorkerModal } from "@/components/AdminWorkerModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllSeekers,
  usePendingWorkers,
  useRemoveWorker,
  useRemovedWorkers,
  useRestoreWorker,
  useVerifiedWorkers,
} from "@/hooks/useAdmin";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { PROFESSIONS } from "@/types";
import type { WorkerProfile } from "@/types";
import {
  AlertCircle,
  Calendar,
  Clock,
  Eye,
  Filter,
  IndianRupee,
  MapPin,
  Phone,
  RotateCcw,
  Search,
  ShieldCheck,
  Trash2,
  UserX,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 20;

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

interface RemoveDialogState {
  worker: WorkerProfile;
  reason: string;
}

function PaginationRow({
  currentPage,
  total,
  onPrev,
  onNext,
}: {
  currentPage: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-xs text-muted-foreground">
        Page {currentPage} of {total}
      </p>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={currentPage <= 1}
          onClick={onPrev}
          data-ocid="admin_users.pagination_prev"
        >
          Previous
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={currentPage >= total}
          onClick={onNext}
          data-ocid="admin_users.pagination_next"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function AdminUsersPage() {
  const { t } = useGlobalTranslation();
  const { data: verified, isLoading: vLoading } = useVerifiedWorkers();
  const { data: removed, isLoading: rLoading } = useRemovedWorkers();
  const { data: pending, isLoading: pLoading } = usePendingWorkers();
  const { data: seekers, isLoading: sLoading } = useAllSeekers();
  const { mutateAsync: removeWorker, isPending: removing } = useRemoveWorker();
  const { mutateAsync: restoreWorker, isPending: restoring } =
    useRestoreWorker();

  const [search, setSearch] = useState("");
  const [professionFilter, setProfessionFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [profileModal, setProfileModal] = useState<WorkerProfile | null>(null);
  const [removeDialog, setRemoveDialog] = useState<RemoveDialogState | null>(
    null,
  );

  const filterWorkers = (list: WorkerProfile[]) =>
    list.filter(
      (w) =>
        (!search ||
          w.name.toLowerCase().includes(search.toLowerCase()) ||
          w.phone.includes(search) ||
          w.email.toLowerCase().includes(search.toLowerCase()) ||
          w.profession.toLowerCase().includes(search.toLowerCase()) ||
          w.location_address.toLowerCase().includes(search.toLowerCase())) &&
        (professionFilter === "all" || w.profession === professionFilter),
    );

  const filteredVerified = filterWorkers(verified ?? []);
  const filteredRemoved = filterWorkers(removed ?? []);
  const filteredPending = filterWorkers(pending ?? []);

  const pagedVerified = filteredVerified.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const pagedRemoved = filteredRemoved.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const pagedPending = filteredPending.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const totalVerifiedPages = Math.max(
    1,
    Math.ceil(filteredVerified.length / PAGE_SIZE),
  );
  const totalRemovedPages = Math.max(
    1,
    Math.ceil(filteredRemoved.length / PAGE_SIZE),
  );
  const totalPendingPages = Math.max(
    1,
    Math.ceil(filteredPending.length / PAGE_SIZE),
  );

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };
  const handleProfessionFilter = (val: string) => {
    setProfessionFilter(val);
    setPage(1);
  };

  const confirmRemove = async () => {
    if (!removeDialog || !removeDialog.reason.trim()) return;
    await removeWorker({
      workerId: removeDialog.worker.id,
      reason: removeDialog.reason,
    });
    toast.error(`${removeDialog.worker.name} removed from platform`);
    setRemoveDialog(null);
  };

  const handleRestore = async (w: WorkerProfile) => {
    await restoreWorker({ workerId: w.id });
    toast.success(`${w.name} restored to pending`);
  };

  const WorkerRow = ({
    worker,
    idx,
    showRemove,
    showRestore,
  }: {
    worker: WorkerProfile;
    idx: number;
    showRemove: boolean;
    showRestore: boolean;
  }) => {
    const pLabel =
      PROFESSIONS.find((p) => p.value === worker.profession)?.label ??
      worker.profession;
    return (
      <Card
        className="border-border"
        data-ocid={`admin_users.worker_row.${idx + 1}`}
      >
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {worker.profile_photo ? (
                <img
                  src={worker.profile_photo}
                  alt={worker.name}
                  className="w-11 h-11 rounded-full object-cover"
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
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-foreground text-sm">
                  {worker.name}
                </span>
                {worker.verification_status === "Verified" ? (
                  <Badge className="text-xs bg-success/10 text-success border-success/30">
                    <ShieldCheck className="w-2.5 h-2.5 mr-1" />
                    Verified
                  </Badge>
                ) : worker.verification_status === "Pending" ? (
                  <Badge className="text-xs bg-warning/10 text-warning border-warning/30">
                    <Clock className="w-2.5 h-2.5 mr-1" />
                    Pending
                  </Badge>
                ) : (
                  <Badge className="text-xs bg-muted text-muted-foreground">
                    <UserX className="w-2.5 h-2.5 mr-1" />
                    Removed
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                {pLabel}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {worker.phone}
                </span>
                <span className="flex items-center gap-1 truncate max-w-[180px]">
                  <MapPin className="w-3 h-3" />
                  {worker.location_address}
                </span>
                <span className="flex items-center gap-1">
                  <IndianRupee className="w-3 h-3" />
                  \u20b9{worker.hourly_rate}/hr
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
              <p className="text-xs text-muted-foreground mt-0.5">
                {worker.email}
              </p>
              {worker.admin_notes && (
                <p className="text-xs text-muted-foreground mt-1 italic">
                  Note: {worker.admin_notes}
                </p>
              )}
              {worker.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {worker.skills.slice(0, 4).map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                  {worker.skills.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{worker.skills.length - 4}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setProfileModal(worker)}
                className="gap-1 text-xs"
                data-ocid={`admin_users.view_button.${idx + 1}`}
              >
                <Eye className="w-3.5 h-3.5" />
                View All
              </Button>
              {showRemove && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => setRemoveDialog({ worker, reason: "" })}
                  className="text-destructive hover:bg-destructive/10 border-destructive/30 gap-1"
                  data-ocid={`admin_users.remove_button.${idx + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {t("admin.remove")}
                </Button>
              )}
              {showRestore && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleRestore(worker)}
                  disabled={restoring}
                  className="text-success hover:bg-success/10 border-success/30 gap-1"
                  data-ocid={`admin_users.restore_button.${idx + 1}`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t("admin.restore")}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="py-8" data-ocid="admin_users.page">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-display-lg text-foreground">
            {t("admin.users")}
          </h1>
          <p className="text-muted-foreground mt-1">
            Full access to all worker information \u2014 verified, pending, and
            removed
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search name, phone, email, profession, address..."
              className="pl-9"
              data-ocid="admin_users.search_input"
            />
          </div>
          <Select
            value={professionFilter}
            onValueChange={handleProfessionFilter}
          >
            <SelectTrigger
              className="w-[190px]"
              data-ocid="admin_users.profession_filter"
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
        </div>

        <Tabs
          defaultValue="verified"
          onValueChange={() => setPage(1)}
          data-ocid="admin_users.tabs"
        >
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="verified" data-ocid="admin_users.verified_tab">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              {t("admin.verifiedWorkers")} ({filteredVerified.length})
            </TabsTrigger>
            <TabsTrigger value="pending" data-ocid="admin_users.pending_tab">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              Pending ({filteredPending.length})
            </TabsTrigger>
            <TabsTrigger value="removed" data-ocid="admin_users.removed_tab">
              <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
              {t("admin.removedWorkers")} ({filteredRemoved.length})
            </TabsTrigger>
            <TabsTrigger value="seekers" data-ocid="admin_users.seekers_tab">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              Seekers ({seekers?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verified">
            {vLoading ? (
              <div className="space-y-3" data-ocid="admin_users.loading_state">
                {["a", "b", "c"].map((k) => (
                  <Skeleton key={k} className="h-28 rounded-xl" />
                ))}
              </div>
            ) : filteredVerified.length === 0 ? (
              <div
                className="text-center py-12 bg-card rounded-xl border border-border"
                data-ocid="admin_users.verified_empty_state"
              >
                <ShieldCheck className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  {search || professionFilter !== "all"
                    ? "No workers match your search"
                    : "No verified workers yet"}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {pagedVerified.map((worker, i) => (
                    <WorkerRow
                      key={worker.id}
                      worker={worker}
                      idx={(page - 1) * PAGE_SIZE + i}
                      showRemove={true}
                      showRestore={false}
                    />
                  ))}
                </div>
                <PaginationRow
                  currentPage={page}
                  total={totalVerifiedPages}
                  onPrev={() => setPage((p) => p - 1)}
                  onNext={() => setPage((p) => p + 1)}
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="pending">
            {pLoading ? (
              <div className="space-y-3">
                {["a", "b"].map((k) => (
                  <Skeleton key={k} className="h-28 rounded-xl" />
                ))}
              </div>
            ) : filteredPending.length === 0 ? (
              <div
                className="text-center py-12 bg-card rounded-xl border border-border"
                data-ocid="admin_users.pending_empty_state"
              >
                <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  {search || professionFilter !== "all"
                    ? "No pending workers match your search"
                    : "No pending approvals"}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {pagedPending.map((worker, i) => (
                    <WorkerRow
                      key={worker.id}
                      worker={worker}
                      idx={(page - 1) * PAGE_SIZE + i}
                      showRemove={false}
                      showRestore={false}
                    />
                  ))}
                </div>
                <PaginationRow
                  currentPage={page}
                  total={totalPendingPages}
                  onPrev={() => setPage((p) => p - 1)}
                  onNext={() => setPage((p) => p + 1)}
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="removed">
            {rLoading ? (
              <div className="space-y-3">
                {["a", "b"].map((k) => (
                  <Skeleton key={k} className="h-28 rounded-xl" />
                ))}
              </div>
            ) : filteredRemoved.length === 0 ? (
              <div
                className="text-center py-12 bg-card rounded-xl border border-border"
                data-ocid="admin_users.removed_empty_state"
              >
                <UserX className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  {search || professionFilter !== "all"
                    ? "No removed workers match your search"
                    : "No removed workers"}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {pagedRemoved.map((worker, i) => (
                    <WorkerRow
                      key={worker.id}
                      worker={worker}
                      idx={(page - 1) * PAGE_SIZE + i}
                      showRemove={false}
                      showRestore={true}
                    />
                  ))}
                </div>
                <PaginationRow
                  currentPage={page}
                  total={totalRemovedPages}
                  onPrev={() => setPage((p) => p - 1)}
                  onNext={() => setPage((p) => p + 1)}
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="seekers">
            {sLoading ? (
              <div className="space-y-3">
                {["a", "b"].map((k) => (
                  <Skeleton key={k} className="h-16 rounded-xl" />
                ))}
              </div>
            ) : (seekers ?? []).length === 0 ? (
              <div
                className="text-center py-12 bg-card rounded-xl border border-border"
                data-ocid="admin_users.seekers_empty_state"
              >
                <Users className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No seekers registered yet
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {(seekers ?? []).map((seeker, i) => (
                  <Card
                    key={seeker.id}
                    className="border-border"
                    data-ocid={`admin_users.seeker_row.${i + 1}`}
                  >
                    <CardContent className="py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-secondary font-bold text-xs">
                          {seeker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-foreground text-sm">
                          {seeker.name}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {seeker.email} \u00b7 {seeker.phone}
                        </p>
                      </div>
                      <Badge
                        className={`text-xs flex-shrink-0 ${seeker.is_active ? "bg-success/10 text-success border-success/30" : "bg-muted text-muted-foreground"}`}
                      >
                        {seeker.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AdminWorkerModal
        worker={profileModal}
        open={!!profileModal}
        onClose={() => setProfileModal(null)}
      />

      <Dialog
        open={!!removeDialog}
        onOpenChange={(o) => !o && setRemoveDialog(null)}
      >
        <DialogContent data-ocid="admin_users.remove_dialog">
          <DialogHeader>
            <DialogTitle>Remove \u2014 {removeDialog?.worker.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
              <p className="text-xs text-destructive">
                This worker will be removed from the platform and will no longer
                be visible.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>
                Reason for removal <span className="text-destructive">*</span>
              </Label>
              <Textarea
                value={removeDialog?.reason ?? ""}
                onChange={(e) =>
                  setRemoveDialog((prev) =>
                    prev ? { ...prev, reason: e.target.value } : null,
                  )
                }
                placeholder="Provide a reason for removing this worker..."
                rows={3}
                className="resize-none"
                data-ocid="admin_users.remove_reason_textarea"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRemoveDialog(null)}
                data-ocid="admin_users.remove_cancel_button"
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="button"
                onClick={confirmRemove}
                disabled={!removeDialog?.reason.trim() || removing}
                className="bg-destructive text-destructive-foreground hover:opacity-90"
                data-ocid="admin_users.remove_confirm_button"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {t("admin.remove")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
