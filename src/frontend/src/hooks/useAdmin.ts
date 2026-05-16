import { type WorkerAvailability, createActor } from "@/backend";
import type { WorkerProfile as BWorkerProfile } from "@/backend";
import type {
  PlatformStats,
  Profession,
  SeekerProfile,
  WorkerProfile,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Type adapter ─────────────────────────────────────────────────────────────

function adaptWorkerProfile(b: BWorkerProfile): WorkerProfile {
  return {
    id:
      typeof b.id === "object" && "toText" in b.id
        ? (b.id as { toText(): string }).toText()
        : String(b.id),
    name: b.name,
    email: b.email,
    phone: b.phone,
    profession: b.profession as unknown as Profession,
    profession_custom: b.profession_custom,
    availability: b.availability as WorkerAvailability,
    location_lat: b.location_lat,
    location_lng: b.location_lng,
    location_address: b.location_address,
    hourly_rate: Number(b.hourly_rate),
    skills: b.skills,
    profile_photo: b.profile_photo ? b.profile_photo.getDirectURL() : undefined,
    verification_status:
      b.verification_status as WorkerProfile["verification_status"],
    created_at: b.created_at,
    is_available: b.is_available,
    rejection_reason: b.rejection_reason,
    admin_notes: b.admin_notes,
  };
}

function parsePrincipal(id: string): Principal {
  return Principal.fromText(id);
}

export function usePendingWorkers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WorkerProfile[]>({
    queryKey: ["admin", "workers", "pending"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const results = await actor.getPendingWorkers();
        return results.map(adaptWorkerProfile);
      } catch (e) {
        console.error("getPendingWorkers error", e);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchInterval: 15_000,
    refetchIntervalInBackground: false,
  });
}

export function useVerifiedWorkers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WorkerProfile[]>({
    queryKey: ["admin", "workers", "verified"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const results = await actor.getVerifiedWorkers();
        return results.map(adaptWorkerProfile);
      } catch (e) {
        console.error("getVerifiedWorkers error", e);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });
}

export function useRemovedWorkers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WorkerProfile[]>({
    queryKey: ["admin", "workers", "removed"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const results = await actor.getRemovedWorkers();
        return results.map(adaptWorkerProfile);
      } catch (e) {
        console.error("getRemovedWorkers error", e);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllWorkers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WorkerProfile[]>({
    queryKey: ["admin", "workers", "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const [verified, pending, removed] = await Promise.all([
          actor.getVerifiedWorkers(),
          actor.getPendingWorkers(),
          actor.getRemovedWorkers(),
        ]);
        return [
          ...pending.map(adaptWorkerProfile),
          ...verified.map(adaptWorkerProfile),
          ...removed.map(adaptWorkerProfile),
        ];
      } catch (e) {
        console.error("getAllWorkers error", e);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchInterval: 20_000,
    refetchIntervalInBackground: false,
  });
}

export function useAllSeekers() {
  // Seekers list not exposed in the admin API
  return useQuery<SeekerProfile[]>({
    queryKey: ["admin", "seekers", "all"],
    queryFn: async () => [],
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useUpdateAdminNotes() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { workerId: string; notes: string }>({
    mutationFn: async ({ workerId, notes }) => {
      if (!actor) throw new Error("Service not ready");
      await actor.updateAdminNotes(parsePrincipal(workerId), notes);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function usePlatformStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PlatformStats>({
    queryKey: ["admin", "stats"],
    staleTime: 0,
    refetchInterval: 20_000,
    queryFn: async () => {
      if (!actor) {
        return {
          total_workers: 0,
          total_seekers: 0,
          verified_workers: 0,
          pending_workers: 0,
          removed_workers: 0,
          top_professions: [],
          avg_hourly_rate: 0,
        };
      }
      try {
        const s = await actor.getStats();
        return {
          total_workers: Number(s.total_workers),
          total_seekers: Number(s.total_seekers),
          verified_workers: Number(s.verified_workers),
          pending_workers: Number(s.pending_workers),
          removed_workers: Number(s.removed_workers),
          top_professions: s.top_professions.map((p) => ({
            profession: p.profession as string,
            count: Number(p.count),
          })),
          avg_hourly_rate: Number(s.avg_hourly_rate),
        };
      } catch (e) {
        console.error("getStats error", e);
        return {
          total_workers: 0,
          total_seekers: 0,
          verified_workers: 0,
          pending_workers: 0,
          removed_workers: 0,
          top_professions: [],
          avg_hourly_rate: 0,
        };
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useApproveWorker() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { workerId: string; notes?: string }>({
    mutationFn: async ({ workerId }) => {
      if (!actor) throw new Error("Service not ready");
      await actor.approveWorker(parsePrincipal(workerId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useRejectWorker() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { workerId: string; reason: string }>({
    mutationFn: async ({ workerId, reason }) => {
      if (!actor) throw new Error("Service not ready");
      await actor.rejectWorker(
        parsePrincipal(workerId),
        reason || "Rejected by admin",
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useRemoveWorker() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { workerId: string; reason?: string }>({
    mutationFn: async ({ workerId, reason }) => {
      if (!actor) throw new Error("Service not ready");
      await actor.removeWorker(
        parsePrincipal(workerId),
        reason || "Removed by admin",
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}

export function useRestoreWorker() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { workerId: string }>({
    mutationFn: async ({ workerId }) => {
      if (!actor) throw new Error("Service not ready");
      await actor.restoreWorker(parsePrincipal(workerId));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
  });
}
