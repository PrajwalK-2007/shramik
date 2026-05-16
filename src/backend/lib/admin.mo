import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import WorkerTypes "../types/worker";
import Common "../types/common";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

module {
  public let ADMIN_EMAIL : Text = "shramik@gmail.com";
  public let ADMIN_PASSWORD : Text = "shramik!@#123";

  public func adminLogin(email : Text, password : Text) : { #ok : { name : Text; email : Text }; #err : Text } {
    if (email == ADMIN_EMAIL and password == ADMIN_PASSWORD) {
      #ok({ name = "Admin"; email = ADMIN_EMAIL });
    } else {
      #err("Invalid admin credentials");
    };
  };

  public func approveWorker(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    workerId : Principal,
  ) : () {
    let w = switch (workers.get(workerId)) {
      case (?w) { w };
      case null { Runtime.trap("Worker not found") };
    };
    let updated : WorkerTypes.WorkerProfile = {
      w with
      verification_status = #Verified;
      approved_at = ?Time.now();
      rejection_reason = null;
    };
    workers.add(workerId, updated);
  };

  public func rejectWorker(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    workerId : Principal,
    reason : Text,
  ) : () {
    let w = switch (workers.get(workerId)) {
      case (?w) { w };
      case null { Runtime.trap("Worker not found") };
    };
    let updated : WorkerTypes.WorkerProfile = {
      w with
      verification_status = #Rejected;
      rejection_reason = ?reason;
    };
    workers.add(workerId, updated);
  };

  public func removeWorker(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    workerId : Principal,
    reason : Text,
  ) : () {
    let w = switch (workers.get(workerId)) {
      case (?w) { w };
      case null { Runtime.trap("Worker not found") };
    };
    let updated : WorkerTypes.WorkerProfile = {
      w with
      verification_status = #Removed;
      admin_notes = ?reason;
    };
    workers.add(workerId, updated);
  };

  public func restoreWorker(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    workerId : Principal,
  ) : () {
    let w = switch (workers.get(workerId)) {
      case (?w) { w };
      case null { Runtime.trap("Worker not found") };
    };
    let updated : WorkerTypes.WorkerProfile = { w with verification_status = #Pending };
    workers.add(workerId, updated);
  };

  public func updateAdminNotes(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    workerId : Principal,
    notes : Text,
  ) : () {
    let w = switch (workers.get(workerId)) {
      case (?w) { w };
      case null { Runtime.trap("Worker not found") };
    };
    let updated : WorkerTypes.WorkerProfile = { w with admin_notes = ?notes };
    workers.add(workerId, updated);
  };

  public func getByStatus(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    status : Common.VerificationStatus,
  ) : [WorkerTypes.WorkerProfile] {
    let results = List.empty<WorkerTypes.WorkerProfile>();
    for ((_id, w) in workers.entries()) {
      switch (w.verification_status, status) {
        case (#Pending, #Pending) { results.add(w) };
        case (#Verified, #Verified) { results.add(w) };
        case (#Rejected, #Rejected) { results.add(w) };
        case (#Removed, #Removed) { results.add(w) };
        case _ {};
      };
    };
    results.toArray();
  };
};
