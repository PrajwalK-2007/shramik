import Map "mo:core/Map";
import Principal "mo:core/Principal";
import WorkerTypes "../types/worker";
import SeekerTypes "../types/seeker";
import StatsTypes "../types/stats";
import AdminLib "../lib/admin";
import StatsLib "../lib/stats";

mixin (
  workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
  seekers : Map.Map<Principal, SeekerTypes.SeekerProfile>,
) {
  public shared func adminLogin(email : Text, password : Text) : async { #ok : { name : Text; email : Text }; #err : Text } {
    AdminLib.adminLogin(email, password);
  };

  public shared func approveWorker(workerId : Principal) : async () {
    AdminLib.approveWorker(workers, workerId);
  };

  public shared func rejectWorker(workerId : Principal, reason : Text) : async () {
    AdminLib.rejectWorker(workers, workerId, reason);
  };

  public shared func removeWorker(workerId : Principal, reason : Text) : async () {
    AdminLib.removeWorker(workers, workerId, reason);
  };

  public shared func restoreWorker(workerId : Principal) : async () {
    AdminLib.restoreWorker(workers, workerId);
  };

  public shared func updateAdminNotes(workerId : Principal, notes : Text) : async () {
    AdminLib.updateAdminNotes(workers, workerId, notes);
  };

  public query func getPendingWorkers() : async [WorkerTypes.WorkerProfile] {
    AdminLib.getByStatus(workers, #Pending);
  };

  public query func getVerifiedWorkers() : async [WorkerTypes.WorkerProfile] {
    AdminLib.getByStatus(workers, #Verified);
  };

  public query func getRemovedWorkers() : async [WorkerTypes.WorkerProfile] {
    AdminLib.getByStatus(workers, #Removed);
  };

  public query func getStats() : async StatsTypes.PlatformStats {
    StatsLib.computeStats(workers, seekers);
  };
};
