import Common "common";

module {
  public type ProfessionCount = {
    profession : Common.Profession;
    count : Nat;
  };

  public type PlatformStats = {
    total_workers : Nat;
    total_seekers : Nat;
    verified_workers : Nat;
    pending_workers : Nat;
    removed_workers : Nat;
    top_professions : [ProfessionCount];
    avg_hourly_rate : Nat;
  };
};
