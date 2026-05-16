import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface WorkerUpdate {
    bio?: string;
    profile_photo?: ExternalBlob;
    payment_preference?: string;
    name: string;
    profession: Profession;
    email: string;
    availability: WorkerAvailability;
    hourly_rate: bigint;
    emergency_contact_name?: string;
    languages_spoken?: Array<string>;
    profession_custom?: string;
    emergency_contact_phone?: string;
    phone: string;
    location_lat: number;
    location_lng: number;
    location_address: string;
    skills: Array<string>;
    years_of_experience?: bigint;
}
export interface WorkerAvailability {
    startTime: string;
    endTime: string;
}
export interface SeekerRegistration {
    password: string;
    name: string;
    email: string;
    phone: string;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface WorkerProfile {
    id: WorkerId;
    bio?: string;
    profile_photo?: ExternalBlob;
    payment_preference?: string;
    password: string;
    name: string;
    profession: Profession;
    approved_at?: Timestamp;
    created_at: Timestamp;
    email: string;
    verification_status: VerificationStatus;
    availability: WorkerAvailability;
    hourly_rate: bigint;
    emergency_contact_name?: string;
    languages_spoken?: Array<string>;
    is_available: boolean;
    profession_custom?: string;
    admin_notes?: string;
    emergency_contact_phone?: string;
    rejection_reason?: string;
    phone: string;
    location_lat: number;
    location_lng: number;
    location_address: string;
    skills: Array<string>;
    years_of_experience?: bigint;
}
export interface ProfessionCount {
    count: bigint;
    profession: Profession;
}
export interface SeekerProfile {
    id: SeekerId;
    password: string;
    name: string;
    created_at: Timestamp;
    email: string;
    is_active: boolean;
    phone: string;
}
export type WorkerId = Principal;
export interface WorkerRegistration {
    bio?: string;
    profile_photo?: ExternalBlob;
    payment_preference?: string;
    password: string;
    name: string;
    profession: Profession;
    email: string;
    availability: WorkerAvailability;
    hourly_rate: bigint;
    emergency_contact_name?: string;
    languages_spoken?: Array<string>;
    profession_custom?: string;
    emergency_contact_phone?: string;
    phone: string;
    location_lat: number;
    location_lng: number;
    location_address: string;
    skills: Array<string>;
    years_of_experience?: bigint;
}
export interface PlatformStats {
    verified_workers: bigint;
    total_seekers: bigint;
    avg_hourly_rate: bigint;
    total_workers: bigint;
    pending_workers: bigint;
    removed_workers: bigint;
    top_professions: Array<ProfessionCount>;
}
export type SeekerId = Principal;
export interface WorkerPublic {
    id: WorkerId;
    profile_photo?: ExternalBlob;
    name: string;
    profession: Profession;
    approved_at?: Timestamp;
    verification_status: VerificationStatus;
    availability: WorkerAvailability;
    hourly_rate: bigint;
    is_available: boolean;
    profession_custom?: string;
    phone: string;
    location_lat: number;
    location_lng: number;
    location_address: string;
    skills: Array<string>;
    distance_km?: number;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum Profession {
    SecurityGuard = "SecurityGuard",
    Driver = "Driver",
    Cook = "Cook",
    Peon = "Peon",
    Gardner = "Gardner",
    Welder = "Welder",
    Helper = "Helper",
    EventHelper = "EventHelper",
    Scaffolding = "Scaffolding",
    Mechanic = "Mechanic",
    Electrician = "Electrician",
    RoofWorker = "RoofWorker",
    ACTechnician = "ACTechnician",
    HeavyEquipmentOperator = "HeavyEquipmentOperator",
    Cleaner = "Cleaner",
    Sweeper = "Sweeper",
    Painter = "Painter",
    Barber = "Barber",
    Loader = "Loader",
    Mason = "Mason",
    TileLayer = "TileLayer",
    Carpenter = "Carpenter",
    Mover = "Mover",
    SteelFixer = "SteelFixer",
    Tailor = "Tailor",
    PestControl = "PestControl",
    DemolitionWorker = "DemolitionWorker",
    Other = "Other",
    DeliveryWorker = "DeliveryWorker",
    Caretaker = "Caretaker",
    Plumber = "Plumber",
    Watchman = "Watchman",
    GlassFitter = "GlassFitter",
    Washer = "Washer",
    RoadWorker = "RoadWorker"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum VerificationStatus {
    Rejected = "Rejected",
    Removed = "Removed",
    Verified = "Verified",
    Pending = "Pending"
}
export interface backendInterface {
    adminLogin(email: string, password: string): Promise<{
        __kind__: "ok";
        ok: {
            name: string;
            email: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    approveWorker(workerId: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getMyWorkerProfile(): Promise<WorkerProfile | null>;
    getNearbyWorkers(lat: number, lng: number, radius_km: number, profession: Profession | null, availabilityFilter: {
        startTime: string;
        endTime: string;
    } | null): Promise<Array<WorkerPublic>>;
    getPendingWorkers(): Promise<Array<WorkerProfile>>;
    getRecentVerifiedWorkers(limit: bigint): Promise<Array<WorkerPublic>>;
    getRemovedWorkers(): Promise<Array<WorkerProfile>>;
    getSeekerProfile(): Promise<SeekerProfile | null>;
    getStats(): Promise<PlatformStats>;
    getVerifiedWorkers(): Promise<Array<WorkerProfile>>;
    getWorkerById(id: Principal): Promise<WorkerPublic | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    registerSeeker(reg: SeekerRegistration): Promise<SeekerProfile>;
    registerWorker(reg: WorkerRegistration): Promise<WorkerProfile>;
    rejectWorker(workerId: Principal, reason: string): Promise<void>;
    removeWorker(workerId: Principal, reason: string): Promise<void>;
    requestApproval(): Promise<void>;
    restoreWorker(workerId: Principal): Promise<void>;
    seekerLogin(email: string, password: string): Promise<{
        __kind__: "ok";
        ok: {
            id: string;
            name: string;
            email: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    toggleAvailability(): Promise<boolean>;
    updateAdminNotes(workerId: Principal, notes: string): Promise<void>;
    updateWorkerProfile(upd: WorkerUpdate): Promise<WorkerProfile>;
    workerLogin(email: string, password: string): Promise<{
        __kind__: "ok";
        ok: {
            id: string;
            name: string;
            profession: string;
            email: string;
            verification_status: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
}
