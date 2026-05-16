import { c as createLucideIcon, u as useGlobalTranslation, b as useAuth, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, G as Globe, k as User, C as Clock, i as ue } from "./index-D4yy3BhY.js";
import { B as Badge } from "./badge-gXH7trBI.js";
import { C as Card, a as CardContent } from "./card-CPR4qmTf.js";
import { S as Skeleton } from "./skeleton-CyfHYuxG.js";
import { c as useWorkerProfile, e as useUpdateWorkerProfile } from "./useWorker-TE3Va5_T.js";
import { P as PROFESSIONS } from "./index-D3QYH2aj.js";
import { C as ChevronLeft } from "./chevron-left-Dg_NGvNA.js";
import { P as Pencil } from "./pencil-BxicoJji.js";
import { C as Camera } from "./camera-DcSMCwFz.js";
import { B as BadgeCheck } from "./badge-check-CCQv5C2K.js";
import { M as MapPin } from "./map-pin-BxJaMctR.js";
import { I as IndianRupee } from "./indian-rupee-4DL0qXIY.js";
import { P as Phone } from "./phone-Gf2viXky.js";
import { P as PhoneCall } from "./phone-call-yDeEdHpw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode);
const PROF_ICONS = {
  Mason: "🧱",
  Carpenter: "🪚",
  Electrician: "⚡",
  Plumber: "🔧",
  Painter: "🖌️",
  Welder: "🔥",
  SteelFixer: "🔩",
  TileLayer: "🪣",
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
  Mechanic: "🔨",
  Helper: "🤝",
  DeliveryWorker: "📦",
  Tailor: "✂️",
  Barber: "💈",
  Washer: "👕",
  Caretaker: "👴",
  Peon: "📋",
  Watchman: "👁️",
  Loader: "💪",
  Sweeper: "🧺",
  PestControl: "🐛",
  EventHelper: "🎉",
  Mover: "📦",
  Other: "💼"
};
function WorkerProfilePage() {
  var _a, _b;
  const { t } = useGlobalTranslation();
  const { userId } = useAuth();
  const { data: profile, isLoading } = useWorkerProfile();
  const { mutateAsync: updateWorker, isPending: isSavingPhoto } = useUpdateWorkerProfile();
  const [showPhone, setShowPhone] = reactExports.useState(false);
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const handlePhotoChange = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Photo must be under 5MB");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a3;
      return setPhotoPreview((_a3 = ev.target) == null ? void 0 : _a3.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSavePhoto = async () => {
    if (!profile || !photoPreview) return;
    try {
      await updateWorker({ id: profile.id, profile_photo: photoPreview });
      ue.success("Profile photo updated! 📸");
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch {
      ue.error("Could not save photo. Try again.");
    }
  };
  const handleCancelPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 min-h-screen py-8",
        "data-ocid": "worker_profile.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-card overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 bg-primary/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-24 h-24 rounded-full -mt-12 mb-4 border-4 border-card" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-48 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
          ] })
        ] }) })
      }
    );
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 min-h-[70vh] flex items-center justify-center",
        "data-ocid": "worker_profile.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "👷" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "No Profile Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Register to create your profile." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "bg-primary hover:opacity-90", children: "Register Now" }) })
        ] })
      }
    );
  }
  const professionLabel = ((_a = PROFESSIONS.find((p) => p.value === profile.profession)) == null ? void 0 : _a.label) ?? profile.profession;
  const profIcon = PROF_ICONS[profile.profession] ?? "💼";
  const displayPhoto = photoPreview ?? profile.profile_photo;
  const initials = profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-muted/30 min-h-screen py-8",
      "data-ocid": "worker_profile.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              className: "gap-1 text-muted-foreground",
              "data-ocid": "worker_profile.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                " Dashboard"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/edit", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "gap-1.5 bg-primary hover:opacity-90",
              "data-ocid": "worker_profile.edit_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                " ",
                t("worker.editProfile")
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "border-border shadow-elevated overflow-hidden",
            "data-ocid": "worker_profile.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 opacity-20",
                  style: {
                    backgroundImage: "radial-gradient(circle at 20% 80%, oklch(0.55 0.2 263 / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.6 0.15 142 / 0.3) 0%, transparent 50%)"
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-6 -mt-12", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
                    displayPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: displayPhoto,
                        alt: profile.name,
                        className: "w-24 h-24 rounded-full object-cover border-4 border-card shadow-md"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-primary/15 border-4 border-card shadow-md flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-2xl", children: initials }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          var _a2;
                          return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                        },
                        className: "absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-smooth",
                        "aria-label": "Change profile photo",
                        "data-ocid": "worker_profile.photo_upload_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: fileInputRef,
                        type: "file",
                        accept: "image/*",
                        onChange: handlePhotoChange,
                        className: "hidden",
                        "data-ocid": "worker_profile.photo_input"
                      }
                    )
                  ] }),
                  photoFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        className: "bg-primary hover:opacity-90 h-8 text-xs",
                        onClick: handleSavePhoto,
                        disabled: isSavingPhoto,
                        "data-ocid": "worker_profile.save_photo_button",
                        children: isSavingPhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }) : "Save Photo"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        size: "sm",
                        variant: "outline",
                        className: "h-8 text-xs",
                        onClick: handleCancelPhoto,
                        "data-ocid": "worker_profile.cancel_photo_button",
                        children: "Cancel"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs text-muted-foreground mb-3 cursor-pointer hover:text-primary transition-smooth bg-transparent border-0 p-0",
                    onClick: () => {
                      var _a2;
                      return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                    },
                    children: profile.profile_photo ? "Change photo" : "Upload photo"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: profile.name }),
                  profile.verification_status === "Verified" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "w-4 h-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: "Verified" })
                  ] }),
                  profile.verification_status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Pending Approval" }),
                  profile.verification_status === "Rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "text-xs", children: "Rejected" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: profIcon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: professionLabel }),
                  profile.profession === "Other" && profile.profession_custom && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "— ",
                    profile.profession_custom
                  ] })
                ] }),
                profile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground/80 leading-relaxed", children: profile.bio }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: profile.location_address })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm font-semibold text-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      profile.hourly_rate,
                      "/hour"
                    ] })
                  ] })
                ] }),
                (profile.availability.startTime || profile.availability.endTime) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-secondary/15 text-secondary border-secondary/20 gap-1", children: [
                    "🕐 ",
                    profile.availability.startTime,
                    " –",
                    " ",
                    profile.availability.endTime
                  ] }),
                  profile.years_of_experience !== void 0 && profile.years_of_experience > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
                    profile.years_of_experience,
                    " yr",
                    profile.years_of_experience !== 1 ? "s" : "",
                    " exp"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${profile.is_available ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`,
                    "data-ocid": "worker_profile.availability_badge",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `w-2 h-2 rounded-full ${profile.is_available ? "bg-success animate-pulse" : "bg-muted-foreground"}`
                        }
                      ),
                      profile.is_available ? t("worker.available") : t("worker.unavailable")
                    ]
                  }
                ) })
              ] })
            ]
          }
        ),
        (((_b = profile.languages_spoken) == null ? void 0 : _b.length) || profile.payment_preference || profile.years_of_experience !== void 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground mb-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-primary" }),
            " Profile Details"
          ] }),
          profile.years_of_experience !== void 0 && profile.years_of_experience > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Experience:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              profile.years_of_experience,
              " year",
              profile.years_of_experience !== 1 ? "s" : ""
            ] })
          ] }),
          profile.languages_spoken && profile.languages_spoken.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-muted-foreground mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Languages:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: profile.languages_spoken.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs",
                children: lang
              },
              lang
            )) })
          ] }),
          profile.payment_preference && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: profile.payment_preference })
          ] })
        ] }) }),
        profile.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }),
            " Skills & Expertise"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: profile.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-sm", children: skill }, skill)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-border shadow-card mt-4",
            "data-ocid": "worker_profile.contact_card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-primary" }),
                " Contact"
              ] }),
              showPhone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${profile.phone}`,
                  className: "flex items-center gap-2 bg-success/10 text-success border border-success/30 rounded-lg px-4 py-2.5 font-semibold text-sm transition-smooth hover:bg-success/20",
                  "data-ocid": "worker_profile.phone_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                    profile.phone
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: () => setShowPhone(true),
                  className: "w-full bg-accent text-accent-foreground hover:opacity-90 gap-2",
                  "data-ocid": "worker_profile.show_phone_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                    t("worker.contactWorker")
                  ]
                }
              ),
              profile.emergency_contact_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Emergency Contact" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-4 h-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: profile.emergency_contact_name }),
                  profile.emergency_contact_phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `tel:${profile.emergency_contact_phone}`,
                      className: "text-primary hover:underline",
                      children: profile.emergency_contact_phone
                    }
                  )
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
            " ",
            t("worker.availability")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-primary/10 text-primary font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🕐" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
              profile.availability.startTime,
              " –",
              " ",
              profile.availability.endTime
            ] })
          ] }) })
        ] }) })
      ] })
    }
  );
}
export {
  WorkerProfilePage
};
