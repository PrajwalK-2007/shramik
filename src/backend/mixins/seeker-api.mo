import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import SeekerTypes "../types/seeker";
import SeekerLib "../lib/seeker";

mixin (
  accessControlState : AccessControl.AccessControlState,
  seekers : Map.Map<Principal, SeekerTypes.SeekerProfile>,
) {
  public shared ({ caller }) func registerSeeker(reg : SeekerTypes.SeekerRegistration) : async SeekerTypes.SeekerProfile {
    SeekerLib.register(seekers, caller, reg);
  };

  public query ({ caller }) func getSeekerProfile() : async ?SeekerTypes.SeekerProfile {
    SeekerLib.getById(seekers, caller);
  };

  public query func seekerLogin(email : Text, password : Text) : async { #ok : { id : Text; name : Text; email : Text }; #err : Text } {
    SeekerLib.loginByEmail(seekers, email, password);
  };
};
