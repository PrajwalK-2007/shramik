import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserApproval "mo:caffeineai-user-approval/approval";
import WorkerTypes "../types/worker";
import Common "../types/common";
import WorkerLib "../lib/worker";

mixin (
  accessControlState : AccessControl.AccessControlState,
  approvalState : UserApproval.UserApprovalState,
  workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
  workerState : { var nextWorkerId : Nat },
) {
  public shared ({ caller }) func registerWorker(reg : WorkerTypes.WorkerRegistration) : async WorkerTypes.WorkerProfile {
    let profile = WorkerLib.register(workers, workerState, caller, reg);
    UserApproval.requestApproval(approvalState, caller);
    profile;
  };

  public shared ({ caller }) func updateWorkerProfile(upd : WorkerTypes.WorkerUpdate) : async WorkerTypes.WorkerProfile {
    if (caller.isAnonymous()) { Runtime.trap("Must be logged in") };
    WorkerLib.update(workers, caller, upd);
  };

  public shared ({ caller }) func toggleAvailability() : async Bool {
    if (caller.isAnonymous()) { Runtime.trap("Must be logged in") };
    WorkerLib.toggleAvailability(workers, caller);
  };

  public query ({ caller }) func getMyWorkerProfile() : async ?WorkerTypes.WorkerProfile {
    WorkerLib.getById(workers, caller);
  };

  public query func getWorkerById(id : Principal) : async ?WorkerTypes.WorkerPublic {
    switch (WorkerLib.getById(workers, id)) {
      case (?w) { ?WorkerLib.toPublic(w, null) };
      case null { null };
    };
  };

  public query func workerLogin(email : Text, password : Text) : async { #ok : { id : Text; name : Text; email : Text; profession : Text; verification_status : Text }; #err : Text } {
    WorkerLib.loginByEmail(workers, email, password);
  };

  public query func getNearbyWorkers(
    lat : Float,
    lng : Float,
    radius_km : Float,
    profession : ?Common.Profession,
    availabilityFilter : ?{ startTime : Text; endTime : Text },
  ) : async [WorkerTypes.WorkerPublic] {
    WorkerLib.getNearby(workers, lat, lng, radius_km, profession, availabilityFilter);
  };

  public query func getRecentVerifiedWorkers(limit : Nat) : async [WorkerTypes.WorkerPublic] {
    WorkerLib.getRecentVerified(workers, limit);
  };
};
