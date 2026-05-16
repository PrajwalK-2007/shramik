// ─── Shared Types for KrutiSetu ────────────────────────────────────────────

export type Language = "en" | "hi" | "mr";

export type UserType = "worker" | "seeker" | "admin" | null;

export type VerificationStatus =
  | "Pending"
  | "Verified"
  | "Rejected"
  | "Removed";

export type Availability =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "FullDay"
  | "Flexible"
  | "Weekends";

export interface WorkerAvailability {
  startTime: string;
  endTime: string;
}

export type Profession =
  // Construction
  | "Mason"
  | "Carpenter"
  | "Electrician"
  | "Plumber"
  | "Painter"
  | "Welder"
  | "SteelFixer"
  | "TileLayer"
  | "RoofWorker"
  | "GlassFitter"
  | "ACTechnician"
  | "Scaffolding"
  | "HeavyEquipmentOperator"
  | "RoadWorker"
  | "DemolitionWorker"
  // Non-Construction
  | "Cook"
  | "Cleaner"
  | "Gardner"
  | "Driver"
  | "SecurityGuard"
  | "Mechanic"
  | "Helper"
  | "DeliveryWorker"
  | "Tailor"
  | "Barber"
  | "Washer"
  | "Caretaker"
  | "Peon"
  | "Watchman"
  | "Loader"
  | "Sweeper"
  | "PestControl"
  | "EventHelper"
  | "Mover"
  | "Other";

export interface WorkerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profession: Profession;
  profession_custom?: string;
  availability: WorkerAvailability;
  location_lat: number;
  location_lng: number;
  location_address: string;
  hourly_rate: number;
  skills: string[];
  profile_photo?: string;
  verification_status: VerificationStatus;
  created_at: bigint;
  is_available: boolean;
  rejection_reason?: string;
  admin_notes?: string;
  bio?: string;
  years_of_experience?: number;
  languages_spoken?: string[];
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  payment_preference?: string;
}

export interface WorkerPublic {
  id: string;
  name: string;
  phone: string;
  profession: Profession;
  profession_custom?: string;
  availability: WorkerAvailability;
  location_lat: number;
  location_lng: number;
  location_address: string;
  hourly_rate: number;
  skills: string[];
  profile_photo?: string;
  verification_status: VerificationStatus;
  is_available: boolean;
  distance_km?: number;
}

export interface SeekerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: bigint;
  is_active: boolean;
}

export interface PlatformStats {
  total_workers: number;
  total_seekers: number;
  verified_workers: number;
  pending_workers: number;
  removed_workers: number;
  top_professions: Array<{ profession: string; count: number }>;
  avg_hourly_rate: number;
}

export interface ProfessionOption {
  value: Profession;
  label: string;
  group: "construction" | "non-construction";
}

export const PROFESSIONS: ProfessionOption[] = [
  // Construction
  { value: "Mason", label: "Mason (Raj Mistri)", group: "construction" },
  { value: "Carpenter", label: "Carpenter (Badhiya)", group: "construction" },
  { value: "Electrician", label: "Electrician", group: "construction" },
  { value: "Plumber", label: "Plumber", group: "construction" },
  { value: "Painter", label: "Painter", group: "construction" },
  { value: "Welder", label: "Welder", group: "construction" },
  { value: "SteelFixer", label: "Steel Fixer / Sariya", group: "construction" },
  { value: "TileLayer", label: "Tile Layer", group: "construction" },
  { value: "RoofWorker", label: "Roof Worker", group: "construction" },
  { value: "GlassFitter", label: "Glass Fitter", group: "construction" },
  { value: "ACTechnician", label: "AC Technician", group: "construction" },
  { value: "Scaffolding", label: "Scaffolding Worker", group: "construction" },
  {
    value: "HeavyEquipmentOperator",
    label: "Heavy Equipment Operator",
    group: "construction",
  },
  { value: "RoadWorker", label: "Road Worker", group: "construction" },
  {
    value: "DemolitionWorker",
    label: "Demolition Worker",
    group: "construction",
  },
  // Non-Construction
  { value: "Cook", label: "Cook (Bawarchi)", group: "non-construction" },
  {
    value: "Cleaner",
    label: "Cleaner / Housekeeping",
    group: "non-construction",
  },
  { value: "Gardner", label: "Gardner (Mali)", group: "non-construction" },
  { value: "Driver", label: "Driver", group: "non-construction" },
  {
    value: "SecurityGuard",
    label: "Security Guard",
    group: "non-construction",
  },
  { value: "Mechanic", label: "Mechanic", group: "non-construction" },
  { value: "Helper", label: "General Helper", group: "non-construction" },
  {
    value: "DeliveryWorker",
    label: "Delivery Worker",
    group: "non-construction",
  },
  { value: "Tailor", label: "Tailor (Darzi)", group: "non-construction" },
  { value: "Barber", label: "Barber (Nai)", group: "non-construction" },
  {
    value: "Washer",
    label: "Washer / Laundry (Dhobi)",
    group: "non-construction",
  },
  { value: "Caretaker", label: "Caretaker / Nanny", group: "non-construction" },
  { value: "Peon", label: "Peon / Office Boy", group: "non-construction" },
  {
    value: "Watchman",
    label: "Watchman (Chowkidar)",
    group: "non-construction",
  },
  { value: "Loader", label: "Loader / Labour", group: "non-construction" },
  {
    value: "Sweeper",
    label: "Sweeper / Safai Karmachari",
    group: "non-construction",
  },
  { value: "PestControl", label: "Pest Control", group: "non-construction" },
  { value: "EventHelper", label: "Event Helper", group: "non-construction" },
  { value: "Mover", label: "Mover / Packers", group: "non-construction" },
  { value: "Other", label: "Other (specify)", group: "non-construction" },
];

export const DEFAULT_AVAILABILITY: WorkerAvailability = {
  startTime: "09:00",
  endTime: "17:00",
};

/** Convert WorkerAvailability time range to closest backend Availability enum values */
export function availabilityToBackend(a: WorkerAvailability): Availability[] {
  const start = Number.parseInt(a.startTime.split(":")[0], 10);
  const end = Number.parseInt(a.endTime.split(":")[0], 10);
  const duration = end - start;
  if (duration >= 8) return ["FullDay"];
  if (start < 12 && end <= 12) return ["Morning"];
  if (start >= 12 && start < 17) return ["Afternoon"];
  if (start >= 17) return ["Evening"];
  if (start < 12 && end > 12) return ["FullDay"];
  return ["Flexible"];
}

/** Convert backend Availability[] to WorkerAvailability time range */
export function availabilityFromBackend(
  slots: Availability[],
): WorkerAvailability {
  if (!slots || slots.length === 0)
    return { startTime: "09:00", endTime: "17:00" };
  const first = slots[0];
  switch (first) {
    case "Morning":
      return { startTime: "06:00", endTime: "12:00" };
    case "Afternoon":
      return { startTime: "12:00", endTime: "17:00" };
    case "Evening":
      return { startTime: "17:00", endTime: "21:00" };
    case "FullDay":
      return { startTime: "08:00", endTime: "18:00" };
    case "Weekends":
      return { startTime: "08:00", endTime: "18:00" };
    default:
      return { startTime: "09:00", endTime: "17:00" };
  }
}
