import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import WorkerTypes "../types/worker";

module {
  public func register(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    _state : { var nextWorkerId : Nat },
    caller : Principal,
    reg : WorkerTypes.WorkerRegistration,
  ) : WorkerTypes.WorkerProfile {
    if (workers.containsKey(caller)) {
      Runtime.trap("Worker already registered");
    };
    let profile : WorkerTypes.WorkerProfile = {
      id = caller;
      name = reg.name;
      email = reg.email;
      phone = reg.phone;
      password = reg.password;
      profession = reg.profession;
      profession_custom = reg.profession_custom;
      availability = reg.availability;
      location_lat = reg.location_lat;
      location_lng = reg.location_lng;
      location_address = reg.location_address;
      hourly_rate = reg.hourly_rate;
      skills = reg.skills;
      profile_photo = reg.profile_photo;
      verification_status = #Pending;
      created_at = Time.now();
      approved_at = null;
      is_available = true;
      rejection_reason = null;
      admin_notes = null;
      bio = reg.bio;
      years_of_experience = reg.years_of_experience;
      languages_spoken = reg.languages_spoken;
      emergency_contact_name = reg.emergency_contact_name;
      emergency_contact_phone = reg.emergency_contact_phone;
      payment_preference = reg.payment_preference;
    };
    workers.add(caller, profile);
    profile;
  };

  public func update(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    caller : Principal,
    upd : WorkerTypes.WorkerUpdate,
  ) : WorkerTypes.WorkerProfile {
    let existing = switch (workers.get(caller)) {
      case (?w) { w };
      case null { Runtime.trap("Worker not found") };
    };
    let updated : WorkerTypes.WorkerProfile = {
      existing with
      name = upd.name;
      email = upd.email;
      phone = upd.phone;
      profession = upd.profession;
      profession_custom = upd.profession_custom;
      availability = upd.availability;
      location_lat = upd.location_lat;
      location_lng = upd.location_lng;
      location_address = upd.location_address;
      hourly_rate = upd.hourly_rate;
      skills = upd.skills;
      profile_photo = upd.profile_photo;
      bio = upd.bio;
      years_of_experience = upd.years_of_experience;
      languages_spoken = upd.languages_spoken;
      emergency_contact_name = upd.emergency_contact_name;
      emergency_contact_phone = upd.emergency_contact_phone;
      payment_preference = upd.payment_preference;
    };
    workers.add(caller, updated);
    updated;
  };

  public func toggleAvailability(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    caller : Principal,
  ) : Bool {
    let existing = switch (workers.get(caller)) {
      case (?w) { w };
      case null { Runtime.trap("Worker not found") };
    };
    let newAvailability = not existing.is_available;
    let updated : WorkerTypes.WorkerProfile = { existing with is_available = newAvailability };
    workers.add(caller, updated);
    newAvailability;
  };

  public func getById(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    id : Principal,
  ) : ?WorkerTypes.WorkerProfile {
    workers.get(id);
  };

  public func haversineDistance(lat1 : Float, lng1 : Float, lat2 : Float, lng2 : Float) : Float {
    let r : Float = 6371.0;
    let dLat = (lat2 - lat1) * Float.pi / 180.0;
    let dLng = (lng2 - lng1) * Float.pi / 180.0;
    let a =
      Float.sin(dLat / 2.0) * Float.sin(dLat / 2.0) +
      Float.cos(lat1 * Float.pi / 180.0) * Float.cos(lat2 * Float.pi / 180.0) *
      Float.sin(dLng / 2.0) * Float.sin(dLng / 2.0);
    let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));
    r * c;
  };

  public func toPublic(w : WorkerTypes.WorkerProfile, dist : ?Float) : WorkerTypes.WorkerPublic {
    {
      id = w.id;
      name = w.name;
      phone = w.phone;
      profession = w.profession;
      profession_custom = w.profession_custom;
      availability = w.availability;
      location_lat = w.location_lat;
      location_lng = w.location_lng;
      location_address = w.location_address;
      hourly_rate = w.hourly_rate;
      skills = w.skills;
      profile_photo = w.profile_photo;
      verification_status = w.verification_status;
      approved_at = w.approved_at;
      is_available = w.is_available;
      distance_km = dist;
    };
  };

  func timeToMinutes(t : Text) : Nat {
    var h : Nat = 0;
    var m : Nat = 0;
    var seenColon = false;
    var part : Nat = 0;
    for (c in t.chars()) {
      if (c == ':') {
        h := part;
        part := 0;
        seenColon := true;
      } else {
        let digit : Nat = (c.toNat32() - ('0'.toNat32() : Nat32)).toNat();
        part := part * 10 + digit;
      };
    };
    if (seenColon) { m := part } else { h := part };
    h * 60 + m;
  };

  func availabilityOverlaps(worker : Common.WorkerAvailability, requestStart : Text, requestEnd : Text) : Bool {
    let wStart = timeToMinutes(worker.startTime);
    let wEnd = timeToMinutes(worker.endTime);
    let rStart = timeToMinutes(requestStart);
    let rEnd = timeToMinutes(requestEnd);
    wStart <= rEnd and rStart <= wEnd;
  };

  public func getNearby(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    lat : Float,
    lng : Float,
    radius_km : Float,
    profession : ?Common.Profession,
    availabilityFilter : ?{ startTime : Text; endTime : Text },
  ) : [WorkerTypes.WorkerPublic] {
    let results = List.empty<WorkerTypes.WorkerPublic>();
    label nextWorker for ((_id, w) in workers.entries()) {
      switch (w.verification_status) {
        case (#Verified) {};
        case (_) { continue nextWorker };
      };
      if (not w.is_available) { continue nextWorker };
      switch (profession) {
        case (?p) {
          if (w.profession != p) { continue nextWorker };
        };
        case null {};
      };
      switch (availabilityFilter) {
        case (?av) {
          if (not availabilityOverlaps(w.availability, av.startTime, av.endTime)) { continue nextWorker };
        };
        case null {};
      };
      let dist = haversineDistance(lat, lng, w.location_lat, w.location_lng);
      if (dist <= radius_km) {
        results.add(toPublic(w, ?dist));
      };
    };
    let arr = results.toArray();
    arr.sort<WorkerTypes.WorkerPublic>(func(a, b) {
      let da = switch (a.distance_km) { case (?d) d; case null 999999.0 };
      let db = switch (b.distance_km) { case (?d) d; case null 999999.0 };
      if (da < db) { #less } else if (da > db) { #greater } else { #equal };
    });
  };

  public func getRecentVerified(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    limit : Nat,
  ) : [WorkerTypes.WorkerPublic] {
    let results = List.empty<WorkerTypes.WorkerProfile>();
    for ((_id, w) in workers.entries()) {
      switch (w.verification_status) {
        case (#Verified) { results.add(w) };
        case (_) {};
      };
    };
    let arr = results.toArray();
    let sorted = arr.sort(func(a, b) {
      let ta = switch (a.approved_at) { case (?t) t; case null 0 };
      let tb = switch (b.approved_at) { case (?t) t; case null 0 };
      if (ta > tb) { #less } else if (ta < tb) { #greater } else { #equal };
    });
    let n = if (limit < sorted.size()) { limit } else { sorted.size() };
    Array.tabulate<WorkerTypes.WorkerPublic>(n, func(i) { toPublic(sorted[i], null) });
  };
  public func loginByEmail(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    email : Text,
    password : Text,
  ) : { #ok : { id : Text; name : Text; email : Text; profession : Text; verification_status : Text }; #err : Text } {
    var found : ?WorkerTypes.WorkerProfile = null;
    label search for ((_id, w) in workers.entries()) {
      if (w.email == email) { found := ?w; break search };
    };
    switch (found) {
      case null { #err("No account found with that email") };
      case (?w) {
        if (w.password != password) { return #err("Incorrect password") };
        let status = switch (w.verification_status) {
          case (#Pending) { "Pending" };
          case (#Verified) { "Verified" };
          case (#Rejected) { "Rejected" };
          case (#Removed) { "Removed" };
        };
        let prof = switch (w.profession) {
          case (#Mason) "Mason"; case (#Carpenter) "Carpenter"; case (#Electrician) "Electrician";
          case (#Plumber) "Plumber"; case (#Painter) "Painter"; case (#Welder) "Welder";
          case (#SteelFixer) "SteelFixer"; case (#TileLayer) "TileLayer"; case (#RoofWorker) "RoofWorker";
          case (#GlassFitter) "GlassFitter"; case (#ACTechnician) "ACTechnician"; case (#Scaffolding) "Scaffolding";
          case (#HeavyEquipmentOperator) "HeavyEquipmentOperator"; case (#RoadWorker) "RoadWorker";
          case (#DemolitionWorker) "DemolitionWorker"; case (#Cook) "Cook"; case (#Cleaner) "Cleaner";
          case (#Gardner) "Gardner"; case (#Driver) "Driver"; case (#SecurityGuard) "SecurityGuard";
          case (#Mechanic) "Mechanic"; case (#Helper) "Helper"; case (#DeliveryWorker) "DeliveryWorker";
          case (#Tailor) "Tailor"; case (#Barber) "Barber"; case (#Washer) "Washer";
          case (#Caretaker) "Caretaker"; case (#Peon) "Peon"; case (#Watchman) "Watchman";
          case (#Loader) "Loader"; case (#Sweeper) "Sweeper"; case (#PestControl) "PestControl";
          case (#EventHelper) "EventHelper"; case (#Mover) "Mover"; case (#Other) "Other";
        };
        #ok({ id = w.id.toText(); name = w.name; email = w.email; profession = prof; verification_status = status });
      };
    };
  };
};
