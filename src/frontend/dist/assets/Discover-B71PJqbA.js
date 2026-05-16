import { c as createLucideIcon, u as useGlobalTranslation, j as jsxRuntimeExports, C as Clock, B as Button, r as reactExports, a as clientExports, X, l as cn, m as useComposedRefs } from "./index-d2ZIbWtv.js";
import { B as Badge } from "./badge-CJNWQMd1.js";
import { C as Card, a as CardContent } from "./card-BSq67iTX.js";
import { P as PROFESSIONS } from "./index-D3QYH2aj.js";
import { B as BadgeCheck } from "./badge-check-AelCqrWZ.js";
import { M as MapPin } from "./map-pin-CsdTdaem.js";
import { P as Phone } from "./phone-DTDbO0uo.js";
import { L, N as Navigation } from "./leaflet-BAjIFDh3.js";
import { I as Input } from "./input-a85NbTV6.js";
import { L as Label } from "./label-C1APETMy.js";
import { u as useControllableState, P as Primitive, c as composeEventHandlers, a as createContextScope, S as Separator } from "./index-rPu1xOIZ.js";
import { R as Root$1, T as Trigger, C as Content, a as Close, b as Title, P as Portal, O as Overlay } from "./index-RB5EQEPO.js";
import { S as Skeleton } from "./skeleton-BpQ4vWwW.js";
import { u as usePrevious, a as useSize } from "./index-DCQEehHx.js";
import { u as useNearbyWorkers } from "./useWorker-ogW08bik.js";
import { S as Search } from "./search-uHOcnKQN.js";
import { F as Funnel } from "./funnel-jJrAKUyg.js";
import { E as EyeOff } from "./eye-off-BTfPF-ax.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["path", { d: "M14 4h7", key: "3xa0d5" }],
  ["path", { d: "M14 9h7", key: "1icrd9" }],
  ["path", { d: "M14 15h7", key: "1mj8o2" }],
  ["path", { d: "M14 20h7", key: "11slyb" }]
];
const LayoutList = createLucideIcon("layout-list", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const LocateFixed = createLucideIcon("locate-fixed", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const PROFESSION_ICONS$1 = {
  Mason: "🧱",
  Carpenter: "🪚",
  Electrician: "⚡",
  Plumber: "🔧",
  Painter: "🎨",
  Welder: "🔥",
  SteelFixer: "⚙️",
  TileLayer: "⬜",
  RoofWorker: "🏠",
  GlassFitter: "🪟",
  ACTechnician: "❄️",
  Scaffolding: "🏗️",
  HeavyEquipmentOperator: "🚜",
  RoadWorker: "🛣️",
  DemolitionWorker: "⛏️",
  Cook: "🍳",
  Cleaner: "🧹",
  Gardner: "🌱",
  Driver: "🚗",
  SecurityGuard: "🛡️",
  Mechanic: "🔩",
  Helper: "🤝",
  DeliveryWorker: "📦",
  Tailor: "🧵",
  Barber: "✂️",
  Washer: "🫧",
  Caretaker: "💛",
  Peon: "📋",
  Watchman: "👁️",
  Loader: "💪",
  Sweeper: "🧺",
  PestControl: "🐛",
  EventHelper: "🎪",
  Mover: "📦",
  Other: "🔨"
};
function getInitials$1(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function WorkerCard({ worker, index = 0 }) {
  var _a;
  const { t } = useGlobalTranslation();
  const professionLabel = worker.profession === "Other" && worker.profession_custom ? worker.profession_custom : ((_a = PROFESSIONS.find((p) => p.value === worker.profession)) == null ? void 0 : _a.label) ?? worker.profession;
  const professionIcon = PROFESSION_ICONS$1[worker.profession] ?? "🔨";
  const handleContact = () => {
    window.open(`tel:${worker.phone}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "card-hover overflow-hidden border-border",
      "data-ocid": `worker_card.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-1.5 w-full ${worker.is_available ? "bg-success" : "bg-muted-foreground/30"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
              worker.profile_photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: worker.profile_photo,
                  alt: worker.name,
                  className: "w-12 h-12 rounded-full object-cover border-2 border-border"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-sm", children: getInitials$1(worker.name) }) }),
              worker.is_available && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm truncate", children: worker.name }),
                worker.verification_status === "Verified" && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-4 h-4 text-primary flex-shrink-0" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: professionIcon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: professionLabel })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-sm", children: [
                "₹",
                worker.hourly_rate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("worker.perHour") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: worker.location_address }),
            worker.distance_km != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-shrink-0 text-primary font-medium", children: [
              "· ",
              worker.distance_km.toFixed(1),
              " ",
              t("worker.kmAway")
            ] })
          ] }),
          worker.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            worker.skills.slice(0, 3).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground",
                children: skill
              },
              skill
            )),
            worker.skills.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground", children: [
              "+",
              worker.skills.length - 3
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: worker.availability.startTime && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs px-2 py-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
            worker.availability.startTime,
            " – ",
            worker.availability.endTime
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: worker.is_available ? "default" : "secondary",
                className: `text-xs ${worker.is_available ? "bg-success/10 text-success border-success/30" : "bg-muted text-muted-foreground"}`,
                children: worker.is_available ? t("worker.available") : t("worker.unavailable")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                onClick: handleContact,
                className: "bg-accent text-accent-foreground hover:opacity-90 text-xs px-3 gap-1",
                "data-ocid": `worker_card.contact_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                  t("worker.contactWorker")
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
L.Icon.Default.prototype._getIconUrl = void 0;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});
const CONSTRUCTION_PROFESSIONS = [
  "Mason",
  "Carpenter",
  "Electrician",
  "Plumber",
  "Painter",
  "Welder",
  "SteelFixer",
  "TileLayer",
  "RoofWorker",
  "GlassFitter",
  "ACTechnician",
  "Scaffolding",
  "HeavyEquipmentOperator",
  "RoadWorker",
  "DemolitionWorker"
];
function getPinColor(profession) {
  if (CONSTRUCTION_PROFESSIONS.includes(profession)) return "#f97316";
  if (["Cook", "Cleaner", "Caretaker", "Gardner", "Washer"].includes(profession))
    return "#22c55e";
  return "#3b82f6";
}
function createWorkerIcon(profession, isAvailable) {
  const color = getPinColor(profession);
  const opacity = isAvailable ? 1 : 0.55;
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:32px;height:40px;opacity:${opacity}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="32" height="40">
        <path d="M16 0C9.373 0 4 5.373 4 12c0 8 12 28 12 28s12-20 12-28C28 5.373 22.627 0 16 0z" fill="${color}" />
        <circle cx="16" cy="12" r="6" fill="white"/>
      </svg>
    </div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -42]
  });
}
function createUserIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="width:20px;height:20px;border-radius:50%;background:#6366f1;border:3px solid white;box-shadow:0 0 0 3px rgba(99,102,241,0.35)"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -14]
  });
}
function getProfessionLabel(profession) {
  var _a;
  return ((_a = PROFESSIONS.find((p) => p.value === profession)) == null ? void 0 : _a.label) ?? profession;
}
function WorkerMap({
  workers,
  userLat,
  userLng,
  onWorkerSelect
}) {
  const mapRef = reactExports.useRef(null);
  const mapContainerRef = reactExports.useRef(null);
  const markersRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: [userLat, userLng],
      zoom: 13,
      zoomControl: true
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);
    L.marker([userLat, userLng], { icon: createUserIcon() }).addTo(map).bindPopup("<strong>Your Location</strong>");
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [userLat, userLng]);
  reactExports.useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const m of markersRef.current) {
      m.remove();
    }
    markersRef.current = [];
    for (const worker of workers) {
      if (!worker.location_lat || !worker.location_lng) continue;
      const professionLabel = getProfessionLabel(worker.profession);
      const distText = worker.distance_km != null ? `${worker.distance_km.toFixed(1)} km away` : "";
      const popupNode = document.createElement("div");
      const root = clientExports.createRoot(popupNode);
      root.render(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WorkerPopupContent,
          {
            worker,
            professionLabel,
            distText,
            onViewProfile: () => {
              onWorkerSelect(worker);
              map.closePopup();
            }
          }
        )
      );
      const marker = L.marker([worker.location_lat, worker.location_lng], {
        icon: createWorkerIcon(worker.profession, worker.is_available)
      }).bindPopup(
        L.popup({ maxWidth: 260, className: "worker-map-popup" }).setContent(
          popupNode
        )
      ).addTo(map);
      markersRef.current.push(marker);
    }
  }, [workers, onWorkerSelect]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: mapContainerRef,
      className: "w-full rounded-xl overflow-hidden border border-border shadow-sm",
      style: { height: 400 },
      "data-ocid": "discover.map_container"
    }
  );
}
function WorkerPopupContent({
  worker,
  professionLabel,
  distText,
  onViewProfile
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: "inherit", minWidth: 200 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 6
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#e0e7ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                color: "#4f46e5",
                flexShrink: 0
              },
              children: worker.name.charAt(0).toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { fontSize: 13, color: "#111" }, children: worker.name }),
              worker.verification_status === "Verified" && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { style: { width: 14, height: 14, color: "#4f46e5" } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#666" }, children: professionLabel })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: { display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                background: "#f0fdf4",
                color: "#16a34a",
                border: "1px solid #bbf7d0",
                borderRadius: 999,
                padding: "2px 8px",
                fontSize: 11,
                fontWeight: 500
              },
              children: [
                "₹",
                Number(worker.hourly_rate),
                "/hr"
              ]
            }
          ),
          distText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: {
                background: "#eff6ff",
                color: "#2563eb",
                border: "1px solid #bfdbfe",
                borderRadius: 999,
                padding: "2px 8px",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 3
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { style: { width: 10, height: 10 } }),
                distText
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              style: {
                background: worker.is_available ? "#f0fdf4" : "#f9fafb",
                color: worker.is_available ? "#16a34a" : "#9ca3af",
                border: `1px solid ${worker.is_available ? "#bbf7d0" : "#e5e7eb"}`,
                borderRadius: 999,
                padding: "2px 8px",
                fontSize: 11
              },
              children: worker.is_available ? "✓ Available" : "Unavailable"
            }
          )
        ]
      }
    ),
    worker.skills.slice(0, 3).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: { display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 },
        children: worker.skills.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              background: "#f5f3ff",
              color: "#7c3aed",
              borderRadius: 4,
              padding: "1px 6px",
              fontSize: 10
            },
            children: s
          },
          s
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onViewProfile,
          style: {
            flex: 1,
            padding: "6px 10px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer"
          },
          children: "View Profile"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `tel:${worker.phone}`,
          style: {
            padding: "6px 10px",
            background: "#f0fdf4",
            color: "#16a34a",
            border: "1px solid #bbf7d0",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 4
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { style: { width: 12, height: 12 } }),
            " Call"
          ]
        }
      )
    ] })
  ] });
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const RADIUS_OPTIONS = [5, 10, 25, 50];
const PROFESSION_ICONS = {
  Mason: "🧱",
  Carpenter: "🪚",
  Electrician: "⚡",
  Plumber: "🔧",
  Painter: "🎨",
  Welder: "🔥",
  SteelFixer: "⚙️",
  TileLayer: "⬜",
  RoofWorker: "🏠",
  GlassFitter: "🪟",
  ACTechnician: "❄️",
  Scaffolding: "🏗️",
  HeavyEquipmentOperator: "🚜",
  RoadWorker: "🛣️",
  DemolitionWorker: "⛏️",
  Cook: "🍳",
  Cleaner: "🧹",
  Gardner: "🌱",
  Driver: "🚗",
  SecurityGuard: "🛡️",
  Mechanic: "🔩",
  Helper: "🤝",
  DeliveryWorker: "📦",
  Tailor: "🧵",
  Barber: "✂️",
  Washer: "🫧",
  Caretaker: "💛",
  Peon: "📋",
  Watchman: "👁️",
  Loader: "💪",
  Sweeper: "🧺",
  PestControl: "🐛",
  EventHelper: "🎪",
  Mover: "📦",
  Other: "🔨"
};
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function LocationPermissionScreen({
  onGrant,
  onSkip,
  loading,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4",
      "data-ocid": "discover.location_permission_screen",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto mb-8 w-32 h-32", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-4 rounded-full bg-primary/15 animate-ping opacity-30",
              style: { animationDelay: "0.3s" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-14 h-14 text-primary", strokeWidth: 1.5 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-3", children: t("discovery.locationPermission.title", "Enable Your Location") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-body-sm mb-2", children: t(
          "discovery.locationPermission.desc",
          "We use your location to show workers closest to you first — making it quick and easy to find help nearby."
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mb-8", children: t(
          "discovery.locationPermission.privacy",
          "Your location is only used for search and is never stored or shared."
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "lg",
              onClick: onGrant,
              disabled: loading,
              className: "w-full gap-2 bg-primary text-primary-foreground hover:opacity-90",
              "data-ocid": "discover.enable_location_button",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }),
                " ",
                "Detecting location..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LocateFixed, { className: "w-4 h-4" }),
                " ",
                t("discovery.enableLocation", "Enable Location")
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: onSkip,
              className: "text-muted-foreground hover:text-foreground text-xs",
              "data-ocid": "discover.skip_location_button",
              children: t("discovery.locationPermission.skip", "Skip — show all workers")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-3.5 h-3.5 text-success" }),
            " Verified Workers"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-primary" }),
            " Location-Based"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1", children: "🔒 Private" })
        ] })
      ] })
    }
  );
}
function WorkerProfileModal({
  worker,
  onClose,
  t
}) {
  var _a;
  const [phoneRevealed, setPhoneRevealed] = reactExports.useState(false);
  const professionLabel = worker.profession === "Other" && worker.profession_custom ? worker.profession_custom : ((_a = PROFESSIONS.find((p) => p.value === worker.profession)) == null ? void 0 : _a.label) ?? worker.profession;
  const professionIcon = PROFESSION_ICONS[worker.profession] ?? "🔨";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
      "data-ocid": "worker_profile.dialog",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      role: "presentation",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => {
              if (e.key === "Escape") onClose();
            },
            role: "presentation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl shadow-elevated overflow-hidden max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Close",
                className: "absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-smooth",
                "data-ocid": "worker_profile.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute bottom-0 left-0 right-0 h-1 ${worker.is_available ? "bg-success" : "bg-muted-foreground/30"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mt-10 mb-4 flex items-end justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                worker.profile_photo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: worker.profile_photo,
                    alt: worker.name,
                    className: "w-20 h-20 rounded-2xl object-cover border-4 border-card shadow-card"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/15 border-4 border-card shadow-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary", children: getInitials(worker.name) }) }),
                worker.is_available && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success border-2 border-card" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: worker.is_available ? "default" : "secondary",
                  className: `text-xs ${worker.is_available ? "bg-success/10 text-success border-success/30" : ""}`,
                  children: worker.is_available ? t("worker.available") : t("worker.unavailable")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: worker.name }),
                worker.verification_status === "Verified" && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-5 h-5 text-primary" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground flex items-center gap-1.5 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: professionIcon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: professionLabel })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground", children: [
                  "₹",
                  worker.hourly_rate
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("worker.perHour", "/hr") })
              ] }),
              worker.distance_km != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: worker.distance_km.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("worker.kmAway", "km away") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: worker.skills.length }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Skills" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: worker.location_address })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Availability" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: worker.availability.startTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary", children: [
                "🕐 ",
                worker.availability.startTime,
                " –",
                " ",
                worker.availability.endTime
              ] }) })
            ] }),
            worker.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Skills & Expertise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: worker.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-muted text-foreground",
                  children: skill
                },
                skill
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              !phoneRevealed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "w-full gap-2 border-primary/30 text-primary hover:bg-primary/5",
                  onClick: () => setPhoneRevealed(true),
                  "data-ocid": "worker_profile.show_phone_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }),
                    "Show Phone Number"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between bg-success/5 border border-success/20 rounded-lg px-4 py-3",
                  "data-ocid": "worker_profile.phone_revealed",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-success" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: worker.phone })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        onClick: () => window.open(`tel:${worker.phone}`),
                        className: "bg-success text-success-foreground hover:opacity-90 text-xs gap-1",
                        "data-ocid": "worker_profile.call_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                          " Call Now"
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "lg",
                  className: "w-full gap-2 bg-accent text-accent-foreground hover:opacity-90",
                  onClick: () => window.open(`tel:${worker.phone}`),
                  "data-ocid": "worker_profile.contact_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                    " ",
                    t("worker.contactWorker")
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function FilterPanel({
  professionFilter,
  setProfessionFilter,
  availFilters: _availFilters,
  setAvailFilters: _setAvailFilters,
  radiusKm,
  setRadiusKm,
  availableNow,
  setAvailableNow,
  sortBy,
  setSortBy,
  t,
  onClose
}) {
  const constructionProfessions = PROFESSIONS.filter(
    (p) => p.group === "construction"
  );
  const nonConstructionProfessions = PROFESSIONS.filter(
    (p) => p.group === "non-construction"
  );
  const hasActiveFilters = professionFilter !== "all" || availableNow || radiusKm !== 25;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 p-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Filters" }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-accent" })
      ] }),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setProfessionFilter("all");
            setAvailableNow(false);
            setRadiusKm(25);
          },
          className: "text-xs text-muted-foreground hover:text-destructive transition-smooth",
          "data-ocid": "discover.clear_filters_button",
          children: "Clear all"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-success/5 border border-success/20 rounded-lg px-3 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Label,
        {
          htmlFor: "avail-now-toggle",
          className: "text-sm font-medium text-foreground cursor-pointer",
          children: "✅ Available Now"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          id: "avail-now-toggle",
          checked: availableNow,
          onCheckedChange: setAvailableNow,
          "data-ocid": "discover.available_now_toggle"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5", children: "Distance Radius" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: RADIUS_OPTIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setRadiusKm(r),
          className: `flex-1 py-1.5 rounded-lg text-xs font-medium border transition-smooth ${radiusKm === r ? "border-primary bg-primary/10 text-primary" : "border-input bg-card text-muted-foreground hover:border-primary/40"}`,
          "data-ocid": `discover.radius_${r}km_button`,
          children: [
            r,
            "km"
          ]
        },
        r
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5", children: t("discovery.filterProfession") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-48 overflow-y-auto space-y-0.5 rounded-lg border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setProfessionFilter("all"),
            className: `w-full text-left px-3 py-2 text-sm transition-smooth ${professionFilter === "all" ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"}`,
            "data-ocid": "discover.profession_filter.all",
            children: "All Professions"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-1 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0", children: [
          "🏗️ ",
          t("worker.group.construction")
        ] }),
        constructionProfessions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setProfessionFilter(p.value),
            className: `w-full text-left px-4 py-1.5 text-sm transition-smooth ${professionFilter === p.value ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"}`,
            "data-ocid": `discover.profession_filter.${p.value.toLowerCase()}`,
            children: p.label
          },
          p.value
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-1 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0", children: [
          "🛠️ ",
          t("worker.group.non-construction")
        ] }),
        nonConstructionProfessions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setProfessionFilter(p.value),
            className: `w-full text-left px-4 py-1.5 text-sm transition-smooth ${professionFilter === p.value ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"}`,
            "data-ocid": `discover.profession_filter.${p.value.toLowerCase()}`,
            children: p.label
          },
          p.value
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5", children: t("discovery.sortBy") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: ["distance", "rate", "name"].map((opt) => {
        const labels = {
          distance: t("discovery.sortDistance"),
          rate: t("discovery.sortRate"),
          name: t("discovery.sortName")
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSortBy(opt),
            className: `w-full text-left px-3 py-2 rounded-lg text-sm transition-smooth ${sortBy === opt ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"}`,
            "data-ocid": `discover.sort_${opt}_button`,
            children: labels[opt]
          },
          opt
        );
      }) })
    ] }),
    onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        className: "w-full",
        onClick: onClose,
        "data-ocid": "discover.apply_filters_button",
        children: "Apply Filters"
      }
    )
  ] });
}
function WorkerCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-full flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-8" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 rounded-md" })
      ] })
    ] })
  ] });
}
function DiscoverPage() {
  var _a;
  const { t } = useGlobalTranslation();
  const [lat, setLat] = reactExports.useState();
  const [lng, setLng] = reactExports.useState();
  const [locationGranted, setLocationGranted] = reactExports.useState(false);
  const [locationLoading, setLocationLoading] = reactExports.useState(false);
  const [locationName, setLocationName] = reactExports.useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [professionFilter, setProfessionFilter] = reactExports.useState(
    "all"
  );
  const availFilters = [];
  const [radiusKm, setRadiusKm] = reactExports.useState(25);
  const [availableNow, setAvailableNow] = reactExports.useState(false);
  const [sortBy, setSortBy] = reactExports.useState(
    "distance"
  );
  const [viewMode, setViewMode] = reactExports.useState("map");
  const [filterSheetOpen, setFilterSheetOpen] = reactExports.useState(false);
  const [selectedWorker, setSelectedWorker] = reactExports.useState(
    null
  );
  const { data: workers, isLoading } = useNearbyWorkers(
    lat,
    lng,
    radiusKm,
    professionFilter !== "all" ? professionFilter : null
  );
  const reverseGeocode = reactExports.useCallback(
    async (latitude, longitude) => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const addr = data.address ?? {};
          const area = addr.suburb ?? addr.city ?? addr.town ?? addr.village ?? addr.state ?? null;
          setLocationName(area);
        }
      } catch {
      }
    },
    []
  );
  const requestLocation = reactExports.useCallback(() => {
    setLocationLoading(true);
    if (!navigator.geolocation) {
      setLat(19.076);
      setLng(72.877);
      setLocationGranted(true);
      setShowLocationPrompt(false);
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        setLocationGranted(true);
        setShowLocationPrompt(false);
        setLocationLoading(false);
        reverseGeocode(latitude, longitude);
      },
      () => {
        setLat(19.076);
        setLng(72.877);
        setLocationGranted(false);
        setShowLocationPrompt(false);
        setLocationLoading(false);
      }
    );
  }, [reverseGeocode]);
  const filtered = (workers ?? []).filter((w) => {
    const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) || w.profession.toLowerCase().includes(search.toLowerCase());
    const matchProfession = professionFilter === "all" || w.profession === professionFilter;
    const matchAvail = true;
    const matchAvailNow = !availableNow || w.is_available;
    const matchRadius = w.distance_km == null || w.distance_km <= radiusKm;
    return matchSearch && matchProfession && matchAvail && matchAvailNow && matchRadius;
  });
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "distance")
      return (a.distance_km ?? 99) - (b.distance_km ?? 99);
    if (sortBy === "rate") return a.hourly_rate - b.hourly_rate;
    return a.name.localeCompare(b.name);
  });
  const activeFilterCount = (professionFilter !== "all" ? 1 : 0) + (availableNow ? 1 : 0) + (radiusKm !== 25 ? 1 : 0);
  const skipLocation = reactExports.useCallback(() => {
    setLat(19.076);
    setLng(72.877);
    setLocationGranted(true);
    setShowLocationPrompt(false);
  }, []);
  if (showLocationPrompt) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      LocationPermissionScreen,
      {
        onGrant: requestLocation,
        onSkip: skipLocation,
        loading: locationLoading,
        t
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "discover.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-16 z-40 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: t("discovery.searchPlaceholder"),
            className: "pl-9 pr-8 bg-background",
            "data-ocid": "discover.search_input"
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearch(""),
            className: "absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1 flex-shrink-0",
          "data-ocid": "discover.view_toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setViewMode("map"),
                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${viewMode === "map" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                "data-ocid": "discover.map_view_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "w-3.5 h-3.5" }),
                  " Map"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setViewMode("list"),
                className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${viewMode === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                "data-ocid": "discover.list_view_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "w-3.5 h-3.5" }),
                  " List"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: filterSheetOpen, onOpenChange: setFilterSheetOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: `lg:hidden gap-1.5 flex-shrink-0 ${activeFilterCount > 0 ? "border-primary text-primary" : ""}`,
            "data-ocid": "discover.filter_sheet_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
              "Filters",
              activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center", children: activeFilterCount })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SheetContent,
          {
            side: "bottom",
            className: "max-h-[80vh] overflow-y-auto rounded-t-2xl",
            "data-ocid": "discover.filter_sheet",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Filters & Sort" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FilterPanel,
                {
                  professionFilter,
                  setProfessionFilter,
                  availFilters,
                  setAvailFilters: () => {
                  },
                  radiusKm,
                  setRadiusKm,
                  availableNow,
                  setAvailableNow,
                  sortBy,
                  setSortBy,
                  t,
                  onClose: () => setFilterSheetOpen(false)
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "avail-now-desktop",
            checked: availableNow,
            onCheckedChange: setAvailableNow,
            "data-ocid": "discover.available_now_toggle_desktop"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "avail-now-desktop",
            className: "text-sm text-foreground cursor-pointer whitespace-nowrap",
            children: "✅ Available Now"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-64 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border p-4 sticky top-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FilterPanel,
        {
          professionFilter,
          setProfessionFilter,
          availFilters,
          setAvailFilters: () => {
          },
          radiusKm,
          setRadiusKm,
          availableNow,
          setAvailableNow,
          sortBy,
          setSortBy,
          t
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between mb-4 bg-primary/5 border border-primary/15 rounded-xl px-4 py-2.5",
            "data-ocid": "discover.location_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                locationGranted ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: locationName ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: locationName }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "— workers sorted by distance" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("discovery.showingNearby") }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t("discovery.locationRequired") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs font-medium", children: [
                  sorted.length,
                  " found"
                ] }),
                !locationGranted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    onClick: requestLocation,
                    disabled: locationLoading,
                    className: "gap-1 text-xs border-primary/30 text-primary hover:bg-primary/5",
                    "data-ocid": "discover.retry_location_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LocateFixed, { className: "w-3.5 h-3.5" }),
                      t("discovery.enableLocation")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex sm:hidden items-center gap-1 bg-muted rounded-lg p-0.5",
                    "data-ocid": "discover.view_toggle_mobile",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setViewMode("map"),
                          className: `p-1.5 rounded-md transition-smooth ${viewMode === "map" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`,
                          "aria-label": "Map view",
                          "data-ocid": "discover.map_view_button_mobile",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setViewMode("list"),
                          className: `p-1.5 rounded-md transition-smooth ${viewMode === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`,
                          "aria-label": "List view",
                          "data-ocid": "discover.list_view_button_mobile",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-wrap gap-2 mb-4",
            "data-ocid": "discover.active_filters",
            children: [
              professionFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setProfessionFilter("all"),
                  className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-smooth",
                  "data-ocid": "discover.filter_chip.profession",
                  children: [
                    (_a = PROFESSIONS.find((p) => p.value === professionFilter)) == null ? void 0 : _a.label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  ]
                }
              ),
              availFilters.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-secondary/10 text-secondary border border-secondary/20",
                  children: a
                },
                a
              )),
              availableNow && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setAvailableNow(false),
                  className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-success/10 text-success border border-success/20 hover:bg-success/20 transition-smooth",
                  "data-ocid": "discover.filter_chip.available_now",
                  children: [
                    "✅ Available Now ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  ]
                }
              ),
              radiusKm !== 25 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setRadiusKm(25),
                  className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-smooth",
                  "data-ocid": "discover.filter_chip.radius",
                  children: [
                    "📍 ",
                    radiusKm,
                    "km ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  ]
                }
              )
            ]
          }
        ),
        viewMode === "map" && lat && lng && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", "data-ocid": "discover.map_section", children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full rounded-xl bg-muted animate-pulse flex items-center justify-center text-muted-foreground text-sm",
              style: { height: 400 },
              "data-ocid": "discover.map_loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-8 h-8 opacity-40" }),
                "Loading map..."
              ] })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            WorkerMap,
            {
              workers: sorted,
              userLat: lat,
              userLng: lng,
              onWorkerSelect: setSelectedWorker
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-2 px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-orange-500 inline-block" }),
              "Construction"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-green-500 inline-block" }),
              "Domestic"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-blue-500 inline-block" }),
              "Other"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-indigo-500 inline-block" }),
              "You"
            ] })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4",
            "data-ocid": "discover.loading_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCardSkeleton, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCardSkeleton, {})
            ]
          }
        ) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-16 bg-card rounded-2xl border border-border",
            "data-ocid": "discover.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-lg mb-2", children: t("discovery.noWorkers") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs mx-auto", children: "Try expanding your search radius or changing your filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => setRadiusKm(50),
                    "data-ocid": "discover.expand_radius_button",
                    children: "📍 Expand to 50km"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      setProfessionFilter("all");
                      setAvailableNow(false);
                      setRadiusKm(25);
                      setSearch("");
                    },
                    "data-ocid": "discover.clear_all_filters_button",
                    children: "Clear All Filters"
                  }
                )
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4",
            "data-ocid": "discover.worker_list",
            children: sorted.map((worker, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedWorker(worker),
                className: "cursor-pointer w-full text-left",
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSelectedWorker(worker);
                },
                "aria-label": `View ${worker.name}'s profile`,
                "data-ocid": `discover.worker_card.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCard, { worker, index: i })
              },
              worker.id
            ))
          }
        )
      ] })
    ] }) }),
    selectedWorker && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkerProfileModal,
      {
        worker: selectedWorker,
        onClose: () => setSelectedWorker(null),
        t
      }
    )
  ] });
}
export {
  DiscoverPage
};
