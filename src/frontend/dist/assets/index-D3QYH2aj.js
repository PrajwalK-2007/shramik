const PROFESSIONS = [
  // Construction
  { value: "Mason", label: "Mason (Raj Mistri)", group: "construction" },
  { value: "Carpenter", label: "Carpenter (Badhiya)", group: "construction" },
  { value: "Electrician", label: "Electrician", group: "construction" },
  { value: "Plumber", label: "Plumber", group: "construction" },
  { value: "Painter", label: "Painter", group: "construction" },
  { value: "Welder", label: "Welder", group: "construction" },
  { value: "SteelFixer", label: "Steel Fixer / Sariya", group: "construction" },
  { value: "TileLayer", label: "Tile Layer", group: "construction" },
  { value: "RoofWorker", label: "Roof Worker", group: "construction" },
  { value: "GlassFitter", label: "Glass Fitter", group: "construction" },
  { value: "ACTechnician", label: "AC Technician", group: "construction" },
  { value: "Scaffolding", label: "Scaffolding Worker", group: "construction" },
  {
    value: "HeavyEquipmentOperator",
    label: "Heavy Equipment Operator",
    group: "construction"
  },
  { value: "RoadWorker", label: "Road Worker", group: "construction" },
  {
    value: "DemolitionWorker",
    label: "Demolition Worker",
    group: "construction"
  },
  // Non-Construction
  { value: "Cook", label: "Cook (Bawarchi)", group: "non-construction" },
  {
    value: "Cleaner",
    label: "Cleaner / Housekeeping",
    group: "non-construction"
  },
  { value: "Gardner", label: "Gardner (Mali)", group: "non-construction" },
  { value: "Driver", label: "Driver", group: "non-construction" },
  {
    value: "SecurityGuard",
    label: "Security Guard",
    group: "non-construction"
  },
  { value: "Mechanic", label: "Mechanic", group: "non-construction" },
  { value: "Helper", label: "General Helper", group: "non-construction" },
  {
    value: "DeliveryWorker",
    label: "Delivery Worker",
    group: "non-construction"
  },
  { value: "Tailor", label: "Tailor (Darzi)", group: "non-construction" },
  { value: "Barber", label: "Barber (Nai)", group: "non-construction" },
  {
    value: "Washer",
    label: "Washer / Laundry (Dhobi)",
    group: "non-construction"
  },
  { value: "Caretaker", label: "Caretaker / Nanny", group: "non-construction" },
  { value: "Peon", label: "Peon / Office Boy", group: "non-construction" },
  {
    value: "Watchman",
    label: "Watchman (Chowkidar)",
    group: "non-construction"
  },
  { value: "Loader", label: "Loader / Labour", group: "non-construction" },
  {
    value: "Sweeper",
    label: "Sweeper / Safai Karmachari",
    group: "non-construction"
  },
  { value: "PestControl", label: "Pest Control", group: "non-construction" },
  { value: "EventHelper", label: "Event Helper", group: "non-construction" },
  { value: "Mover", label: "Mover / Packers", group: "non-construction" },
  { value: "Other", label: "Other (specify)", group: "non-construction" }
];
const DEFAULT_AVAILABILITY = {
  startTime: "09:00",
  endTime: "17:00"
};
export {
  DEFAULT_AVAILABILITY as D,
  PROFESSIONS as P
};
