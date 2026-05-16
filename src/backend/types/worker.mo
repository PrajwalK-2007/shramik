import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type WorkerProfile = {
    id : Common.WorkerId;
    name : Text;
    email : Text;
    phone : Text;
    password : Text;
    profession : Common.Profession;
    profession_custom : ?Text;
    availability : Common.WorkerAvailability;
    location_lat : Float;
    location_lng : Float;
    location_address : Text;
    hourly_rate : Nat;
    skills : [Text];
    profile_photo : ?Storage.ExternalBlob;
    verification_status : Common.VerificationStatus;
    created_at : Common.Timestamp;
    approved_at : ?Common.Timestamp;
    is_available : Bool;
    rejection_reason : ?Text;
    admin_notes : ?Text;
    bio : ?Text;
    years_of_experience : ?Nat;
    languages_spoken : ?[Text];
    emergency_contact_name : ?Text;
    emergency_contact_phone : ?Text;
    payment_preference : ?Text;
  };

  public type WorkerRegistration = {
    name : Text;
    email : Text;
    phone : Text;
    password : Text;
    profession : Common.Profession;
    profession_custom : ?Text;
    availability : Common.WorkerAvailability;
    location_lat : Float;
    location_lng : Float;
    location_address : Text;
    hourly_rate : Nat;
    skills : [Text];
    profile_photo : ?Storage.ExternalBlob;
    bio : ?Text;
    years_of_experience : ?Nat;
    languages_spoken : ?[Text];
    emergency_contact_name : ?Text;
    emergency_contact_phone : ?Text;
    payment_preference : ?Text;
  };

  public type WorkerUpdate = {
    name : Text;
    email : Text;
    phone : Text;
    profession : Common.Profession;
    profession_custom : ?Text;
    availability : Common.WorkerAvailability;
    location_lat : Float;
    location_lng : Float;
    location_address : Text;
    hourly_rate : Nat;
    skills : [Text];
    profile_photo : ?Storage.ExternalBlob;
    bio : ?Text;
    years_of_experience : ?Nat;
    languages_spoken : ?[Text];
    emergency_contact_name : ?Text;
    emergency_contact_phone : ?Text;
    payment_preference : ?Text;
  };

  public type WorkerPublic = {
    id : Common.WorkerId;
    name : Text;
    phone : Text;
    profession : Common.Profession;
    profession_custom : ?Text;
    availability : Common.WorkerAvailability;
    location_lat : Float;
    location_lng : Float;
    location_address : Text;
    hourly_rate : Nat;
    skills : [Text];
    profile_photo : ?Storage.ExternalBlob;
    verification_status : Common.VerificationStatus;
    approved_at : ?Common.Timestamp;
    is_available : Bool;
    distance_km : ?Float;
  };
};
