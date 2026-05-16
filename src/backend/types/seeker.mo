import Common "common";

module {
  public type SeekerProfile = {
    id : Common.SeekerId;
    name : Text;
    email : Text;
    phone : Text;
    password : Text;
    created_at : Common.Timestamp;
    is_active : Bool;
  };

  public type SeekerRegistration = {
    name : Text;
    email : Text;
    phone : Text;
    password : Text;
  };
};
