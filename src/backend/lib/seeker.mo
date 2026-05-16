import Map "mo:core/Map";
import Principal "mo:core/Principal";
import SeekerTypes "../types/seeker";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

module {
  public func register(
    seekers : Map.Map<Principal, SeekerTypes.SeekerProfile>,
    caller : Principal,
    reg : SeekerTypes.SeekerRegistration,
  ) : SeekerTypes.SeekerProfile {
    if (seekers.containsKey(caller)) {
      Runtime.trap("Seeker already registered");
    };
    let profile : SeekerTypes.SeekerProfile = {
      id = caller;
      name = reg.name;
      email = reg.email;
      phone = reg.phone;
      password = reg.password;
      created_at = Time.now();
      is_active = true;
    };
    seekers.add(caller, profile);
    profile;
  };

  public func getById(
    seekers : Map.Map<Principal, SeekerTypes.SeekerProfile>,
    id : Principal,
  ) : ?SeekerTypes.SeekerProfile {
    seekers.get(id);
  };
  public func loginByEmail(
    seekers : Map.Map<Principal, SeekerTypes.SeekerProfile>,
    email : Text,
    password : Text,
  ) : { #ok : { id : Text; name : Text; email : Text }; #err : Text } {
    var found : ?SeekerTypes.SeekerProfile = null;
    label search for ((_id, s) in seekers.entries()) {
      if (s.email == email) { found := ?s; break search };
    };
    switch (found) {
      case null { #err("No account found with that email") };
      case (?s) {
        if (s.password != password) { return #err("Incorrect password") };
        #ok({ id = s.id.toText(); name = s.name; email = s.email });
      };
    };
  };
};
