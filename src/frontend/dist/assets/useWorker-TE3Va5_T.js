import { e as useActor, f as useQuery, p as useQueryClient, q as useMutation, g as createActor } from "./index-D4yy3BhY.js";
function loadExtendedProfile(workerId) {
  try {
    const raw = localStorage.getItem(`shramik_ext_${workerId}`);
    if (!raw) return {};
    const ext = JSON.parse(raw);
    return {
      bio: ext.bio,
      years_of_experience: ext.years_of_experience,
      languages_spoken: ext.languages_spoken,
      emergency_contact_name: ext.emergency_contact_name,
      emergency_contact_phone: ext.emergency_contact_phone,
      payment_preference: ext.payment_preference,
      ...ext.profile_photo_base64 ? { profile_photo: ext.profile_photo_base64 } : {}
    };
  } catch {
    return {};
  }
}
function saveExtendedProfile(workerId, data) {
  try {
    const existing = localStorage.getItem(`shramik_ext_${workerId}`);
    const current = existing ? JSON.parse(existing) : {};
    localStorage.setItem(
      `shramik_ext_${workerId}`,
      JSON.stringify({ ...current, ...data })
    );
  } catch {
  }
}
function adaptWorkerProfile(b) {
  return {
    id: typeof b.id === "object" && "toText" in b.id ? b.id.toText() : String(b.id),
    name: b.name,
    email: b.email,
    phone: b.phone,
    profession: b.profession,
    profession_custom: b.profession_custom,
    availability: b.availability,
    location_lat: b.location_lat,
    location_lng: b.location_lng,
    location_address: b.location_address,
    hourly_rate: Number(b.hourly_rate),
    skills: b.skills,
    profile_photo: b.profile_photo ? b.profile_photo.getDirectURL() : void 0,
    verification_status: b.verification_status,
    created_at: b.created_at,
    is_available: b.is_available,
    rejection_reason: b.rejection_reason,
    admin_notes: b.admin_notes,
    // Extended profile fields stored in localStorage keyed by worker id
    ...loadExtendedProfile(
      typeof b.id === "object" && "toText" in b.id ? b.id.toText() : String(b.id)
    )
  };
}
function adaptWorkerPublic(b) {
  return {
    id: typeof b.id === "object" && "toText" in b.id ? b.id.toText() : String(b.id),
    name: b.name,
    phone: b.phone,
    profession: b.profession,
    profession_custom: b.profession_custom,
    availability: b.availability,
    location_lat: b.location_lat,
    location_lng: b.location_lng,
    location_address: b.location_address,
    hourly_rate: Number(b.hourly_rate),
    skills: b.skills,
    profile_photo: b.profile_photo ? b.profile_photo.getDirectURL() : void 0,
    verification_status: b.verification_status,
    is_available: b.is_available,
    distance_km: b.distance_km
  };
}
function useRecentVerifiedWorkers(limit = 3) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["workers", "recent-verified", limit],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const results = await actor.getVerifiedWorkers();
        const adapted = results.map(adaptWorkerProfile);
        return adapted.slice(-limit).reverse().map(
          (w) => ({
            id: w.id,
            name: w.name,
            phone: w.phone,
            profession: w.profession,
            profession_custom: w.profession_custom,
            availability: w.availability,
            location_lat: w.location_lat,
            location_lng: w.location_lng,
            location_address: w.location_address,
            hourly_rate: w.hourly_rate,
            skills: w.skills,
            profile_photo: w.profile_photo,
            verification_status: w.verification_status,
            is_available: w.is_available
          })
        );
      } catch (e) {
        console.error("getVerifiedWorkers error", e);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
function useNearbyWorkers(lat, lng, radius = 10, profession) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["workers", "nearby", lat, lng, radius, profession],
    queryFn: async () => {
      if (!actor || !lat || !lng) return [];
      try {
        const results = await actor.getNearbyWorkers(
          lat,
          lng,
          radius,
          profession ?? null,
          null
        );
        return results.map(adaptWorkerPublic);
      } catch (e) {
        console.error("getNearbyWorkers error", e);
        return [];
      }
    },
    enabled: !!actor && !isFetching && !!lat && !!lng,
    staleTime: 3e4
  });
}
function useWorkerProfile(_workerId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["worker", "profile", "me"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getMyWorkerProfile();
        if (!result) return null;
        return adaptWorkerProfile(result);
      } catch (e) {
        console.error("getMyWorkerProfile error", e);
        return null;
      }
    },
    enabled: !!actor && !isFetching
  });
}
function useRegisterWorker() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Service not ready. Please try again.");
      const result = await actor.registerWorker({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        profession: data.profession,
        profession_custom: data.profession_custom,
        availability: data.availability,
        location_lat: data.location_lat,
        location_lng: data.location_lng,
        location_address: data.location_address,
        hourly_rate: BigInt(Math.round(data.hourly_rate)),
        skills: data.skills,
        profile_photo: void 0
      });
      return adaptWorkerProfile(result);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["worker"] });
    }
  });
}
function useUpdateWorkerProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      var _a;
      if (!actor) throw new Error("Service not ready");
      const current = await actor.getMyWorkerProfile();
      if (!current) throw new Error("Profile not found");
      const photoIsBase64 = (_a = data.profile_photo) == null ? void 0 : _a.startsWith("data:");
      const result = await actor.updateWorkerProfile({
        name: data.name ?? current.name,
        email: data.email ?? current.email,
        phone: data.phone ?? current.phone,
        profession: data.profession ?? current.profession,
        profession_custom: data.profession_custom ?? current.profession_custom,
        availability: data.availability != null ? data.availability : current.availability,
        location_lat: data.location_lat ?? current.location_lat,
        location_lng: data.location_lng ?? current.location_lng,
        location_address: data.location_address ?? current.location_address,
        hourly_rate: data.hourly_rate != null ? BigInt(Math.round(data.hourly_rate)) : current.hourly_rate,
        skills: data.skills ?? current.skills,
        profile_photo: void 0
      });
      const adapted = adaptWorkerProfile(result);
      const workerId = adapted.id;
      saveExtendedProfile(workerId, {
        bio: data.bio,
        years_of_experience: data.years_of_experience,
        languages_spoken: data.languages_spoken,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_phone,
        payment_preference: data.payment_preference,
        ...photoIsBase64 ? { profile_photo_base64: data.profile_photo } : {}
      });
      return {
        ...adapted,
        bio: data.bio ?? adapted.bio,
        years_of_experience: data.years_of_experience ?? adapted.years_of_experience,
        languages_spoken: data.languages_spoken ?? adapted.languages_spoken,
        emergency_contact_name: data.emergency_contact_name ?? adapted.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_phone ?? adapted.emergency_contact_phone,
        payment_preference: data.payment_preference ?? adapted.payment_preference,
        ...photoIsBase64 ? { profile_photo: data.profile_photo } : {}
      };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["worker"] });
    }
  });
}
function useToggleAvailability() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Service not ready");
      return actor.toggleAvailability();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["worker"] });
    }
  });
}
export {
  useRecentVerifiedWorkers as a,
  useRegisterWorker as b,
  useWorkerProfile as c,
  useToggleAvailability as d,
  useUpdateWorkerProfile as e,
  useNearbyWorkers as u
};
