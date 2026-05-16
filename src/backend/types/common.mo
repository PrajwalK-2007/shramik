import Time "mo:core/Time";

module {
  public type WorkerId = Principal;
  public type SeekerId = Principal;
  public type Timestamp = Time.Time;

  public type Profession = {
    #Mason;
    #Carpenter;
    #Electrician;
    #Plumber;
    #Painter;
    #Welder;
    #SteelFixer;
    #TileLayer;
    #RoofWorker;
    #GlassFitter;
    #ACTechnician;
    #Scaffolding;
    #HeavyEquipmentOperator;
    #RoadWorker;
    #DemolitionWorker;
    #Cook;
    #Cleaner;
    #Gardner;
    #Driver;
    #SecurityGuard;
    #Mechanic;
    #Helper;
    #DeliveryWorker;
    #Tailor;
    #Barber;
    #Washer;
    #Caretaker;
    #Peon;
    #Watchman;
    #Loader;
    #Sweeper;
    #PestControl;
    #EventHelper;
    #Mover;
    #Other;
  };

  public type WorkerAvailability = {
    startTime : Text;
    endTime : Text;
  };

  public type VerificationStatus = {
    #Pending;
    #Verified;
    #Rejected;
    #Removed;
  };
};
