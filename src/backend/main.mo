import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import UserApproval "mo:caffeineai-user-approval/approval";
import WorkerTypes "types/worker";
import SeekerTypes "types/seeker";
import WorkerMixin "mixins/worker-api";
import SeekerMixin "mixins/seeker-api";
import AdminMixin "mixins/admin-api";







actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();

  let approvalState = UserApproval.initState(accessControlState);

  let workers = Map.empty<Principal, WorkerTypes.WorkerProfile>();
  let seekers = Map.empty<Principal, SeekerTypes.SeekerProfile>();
  let workerState = { var nextWorkerId = 0 };

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  include WorkerMixin(accessControlState, approvalState, workers, workerState);
  include SeekerMixin(accessControlState, seekers);
  include AdminMixin(workers, seekers);
};
