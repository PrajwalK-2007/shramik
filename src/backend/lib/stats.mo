import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import WorkerTypes "../types/worker";
import SeekerTypes "../types/seeker";
import StatsTypes "../types/stats";
import List "mo:core/List";
import Array "mo:core/Array";
import Common "../types/common";

module {
  public func computeStats(
    workers : Map.Map<Principal, WorkerTypes.WorkerProfile>,
    seekers : Map.Map<Principal, SeekerTypes.SeekerProfile>,
  ) : StatsTypes.PlatformStats {
    var totalWorkers = 0;
    var verifiedWorkers = 0;
    var pendingWorkers = 0;
    var removedWorkers = 0;
    var totalRate : Nat = 0;
    let profCounts = List.empty<(Common.Profession, Nat)>();

    for ((_id, w) in workers.entries()) {
      totalWorkers += 1;
      totalRate += w.hourly_rate;
      switch (w.verification_status) {
        case (#Verified) { verifiedWorkers += 1 };
        case (#Pending) { pendingWorkers += 1 };
        case (#Removed) { removedWorkers += 1 };
        case (#Rejected) {};
      };
      // Tally profession
      let found = profCounts.findIndex(func(entry : (Common.Profession, Nat)) : Bool {
        entry.0 == w.profession
      });
      switch (found) {
        case (?idx) {
          let entry = profCounts.at(idx);
          profCounts.put(idx, (entry.0, entry.1 + 1));
        };
        case null {
          profCounts.add((w.profession, 1));
        };
      };
    };

    let avgRate = if (totalWorkers == 0) { 0 } else { totalRate / totalWorkers };

    // Sort professions by count descending, take top 5
    let sortedProfs = profCounts.sort(func(a : (Common.Profession, Nat), b : (Common.Profession, Nat)) : Order.Order {
      if (a.1 > b.1) { #less } else if (a.1 < b.1) { #greater } else { #equal }
    });
    let top5 = sortedProfs.toArray();
    let topCount = if (top5.size() < 5) { top5.size() } else { 5 };
    let topProfessions = Array.tabulate(topCount, func(i : Nat) : StatsTypes.ProfessionCount {
      { profession = top5[i].0; count = top5[i].1 }
    });

    {
      total_workers = totalWorkers;
      total_seekers = seekers.size();
      verified_workers = verifiedWorkers;
      pending_workers = pendingWorkers;
      removed_workers = removedWorkers;
      top_professions = topProfessions;
      avg_hourly_rate = avgRate;
    };
  };
};
