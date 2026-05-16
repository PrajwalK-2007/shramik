import { u as useGlobalTranslation, b as useAuth, h as useRouter, r as reactExports, j as jsxRuntimeExports, B as Button, X, i as ue } from "./index-D4yy3BhY.js";
import { P as ProfessionSelect, A as AvailabilitySelect } from "./ProfessionSelect-DXjTJVDw.js";
import { C as Card, a as CardContent } from "./card-CPR4qmTf.js";
import { C as Checkbox } from "./checkbox-BmMCNrW8.js";
import { I as Input } from "./input-DxOaIX0x.js";
import { L as Label } from "./label-BaD6ci6U.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as Check } from "./select-DOkryjF-.js";
import { S as Separator } from "./index-DYUwcsMR.js";
import { S as Skeleton } from "./skeleton-CyfHYuxG.js";
import { T as Textarea } from "./textarea-Bo00sZbn.js";
import { c as useWorkerProfile, e as useUpdateWorkerProfile } from "./useWorker-TE3Va5_T.js";
import { D as DEFAULT_AVAILABILITY } from "./index-D3QYH2aj.js";
import { C as ChevronLeft } from "./chevron-left-Dg_NGvNA.js";
import { C as Camera } from "./camera-DcSMCwFz.js";
import { M as MapPin } from "./map-pin-BxJaMctR.js";
import "./chevron-down-D6yoZGjh.js";
import "./search-BxA_JzXm.js";
import "./index-BxqwsFjM.js";
const LANGUAGE_OPTIONS = [
  "Hindi",
  "English",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Tamil",
  "Telugu"
];
const PAYMENT_OPTIONS = ["UPI", "Bank Transfer", "Cash"];
function WorkerEditPage() {
  const { t } = useGlobalTranslation();
  const { userId } = useAuth();
  const router = useRouter();
  const { data: profile, isLoading } = useWorkerProfile();
  const { mutateAsync, isPending } = useUpdateWorkerProfile();
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [profession, setProfession] = reactExports.useState("");
  const [customProfession, setCustomProfession] = reactExports.useState("");
  const [availability, setAvailability] = reactExports.useState(DEFAULT_AVAILABILITY);
  const [hourlyRate, setHourlyRate] = reactExports.useState("");
  const [skillInput, setSkillInput] = reactExports.useState("");
  const [skillTags, setSkillTags] = reactExports.useState([]);
  const [address, setAddress] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [yearsExp, setYearsExp] = reactExports.useState("");
  const [languages, setLanguages] = reactExports.useState([]);
  const [paymentPref, setPaymentPref] = reactExports.useState("");
  const [emergencyName, setEmergencyName] = reactExports.useState("");
  const [emergencyPhone, setEmergencyPhone] = reactExports.useState("");
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [locationLoading, setLocationLoading] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name);
      setPhone(profile.phone);
      setEmail(profile.email ?? "");
      setProfession(profile.profession);
      setCustomProfession(profile.profession_custom ?? "");
      setAvailability(profile.availability);
      setHourlyRate(String(profile.hourly_rate));
      setSkillTags(profile.skills);
      setAddress(profile.location_address);
      setBio(profile.bio ?? "");
      setYearsExp(
        profile.years_of_experience != null ? String(profile.years_of_experience) : ""
      );
      setLanguages(profile.languages_spoken ?? []);
      setPaymentPref(profile.payment_preference ?? "");
      setEmergencyName(profile.emergency_contact_name ?? "");
      setEmergencyPhone(profile.emergency_contact_phone ?? "");
      if (profile.profile_photo) setPhotoPreview(profile.profile_photo);
    }
  }, [profile]);
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || skillTags.includes(trimmed)) return;
    setSkillTags([...skillTags, trimmed]);
    setSkillInput("");
  };
  const removeSkill = (skill) => {
    setSkillTags(skillTags.filter((s) => s !== skill));
  };
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };
  const toggleLanguage = (lang) => {
    setLanguages(
      (prev) => prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };
  const handlePhotoChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Photo must be under 5MB");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return setPhotoPreview((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
  };
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      ue.error("Geolocation not supported on this device");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationLoading(false);
        ue.success("Location detected! Please type your area name.");
      },
      () => {
        setLocationLoading(false);
        ue.error("Could not detect location. Enter address manually.");
      }
    );
  };
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = t("common.required");
    if (!phone.trim()) e.phone = t("common.required");
    if (!profession) e.profession = t("common.required");
    if (!availability.startTime || !availability.endTime)
      e.availability = "Please set work start and end time";
    else if (availability.startTime >= availability.endTime)
      e.availability = "End time must be after start time";
    if (!hourlyRate || Number.isNaN(Number(hourlyRate)) || Number(hourlyRate) < 0)
      e.hourlyRate = "Enter a valid hourly rate";
    if (!address.trim()) e.address = t("common.required");
    if (bio.length > 300) e.bio = "Bio must be 300 characters or less";
    if (yearsExp && (Number.isNaN(Number(yearsExp)) || Number(yearsExp) < 0 || Number(yearsExp) > 50))
      e.yearsExp = "Enter a number between 0 and 50";
    if ((emergencyPhone == null ? void 0 : emergencyPhone.trim()) && !/^[0-9+\-\s]{7,15}$/.test(emergencyPhone.trim()))
      e.emergencyPhone = "Enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) return;
    if (!validate()) {
      ue.error("Please fix the errors below");
      return;
    }
    try {
      const photoUrl = photoFile ? photoPreview ?? profile.profile_photo : profile.profile_photo;
      await mutateAsync({
        id: profile.id,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        profession: profession || profile.profession,
        profession_custom: profession === "Other" ? customProfession : void 0,
        availability,
        hourly_rate: Number(hourlyRate),
        skills: skillTags,
        location_address: address.trim(),
        location_lat: profile.location_lat,
        location_lng: profile.location_lng,
        // Extended fields
        bio: bio.trim() || void 0,
        years_of_experience: yearsExp ? Number(yearsExp) : void 0,
        languages_spoken: languages.length > 0 ? languages : void 0,
        payment_preference: paymentPref || void 0,
        emergency_contact_name: emergencyName.trim() || void 0,
        emergency_contact_phone: emergencyPhone.trim() || void 0,
        ...photoUrl ? { profile_photo: photoUrl } : {}
      });
      ue.success("Profile updated successfully! 🎉");
      router.navigate({ to: "/worker/profile" });
    } catch {
      ue.error(t("common.error"));
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 min-h-screen py-8",
        "data-ocid": "worker_edit.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-xl space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" })
        ] })
      }
    );
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 min-h-[70vh] flex items-center justify-center",
        "data-ocid": "worker_edit.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No profile to edit. Please register first." })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 min-h-screen py-8", "data-ocid": "worker_edit.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => router.navigate({ to: "/worker/dashboard" }),
          className: "p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground",
          "data-ocid": "worker_edit.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: t("worker.editProfile") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-4", children: t("worker.profilePhoto") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
            photoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: photoPreview,
                alt: "Preview",
                className: "w-24 h-24 rounded-full object-cover border-2 border-primary/30"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-xl", children: name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "?" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: "absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-smooth",
                "aria-label": "Upload photo",
                "data-ocid": "worker_edit.photo_upload_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Upload a clear photo of yourself. JPG or PNG, max 5MB." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                onChange: handlePhotoChange,
                className: "hidden",
                "data-ocid": "worker_edit.photo_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                "data-ocid": "worker_edit.choose_photo_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3.5 h-3.5 mr-1.5" }),
                  photoPreview ? "Change Photo" : "Choose Photo"
                ]
              }
            ),
            photoFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-success mt-1.5", children: "✓ Photo selected — will save with profile" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Personal Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-name", children: [
            t("auth.name"),
            " *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Ramesh Kumar",
              "data-ocid": "worker_edit.name_input"
            }
          ),
          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "worker_edit.name_field_error",
              children: errors.name
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-phone", children: [
            t("auth.phone"),
            " *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-phone",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "9876543210",
              "data-ocid": "worker_edit.phone_input"
            }
          ),
          errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "worker_edit.phone_field_error",
              children: errors.phone
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-email", children: [
            t("auth.email"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
              "(",
              t("common.optional"),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "ramesh@example.com",
              "data-ocid": "worker_edit.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-bio", children: [
            "About / Bio",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
              "(",
              t("common.optional"),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "edit-bio",
              value: bio,
              onChange: (e) => setBio(e.target.value),
              placeholder: "Tell seekers about your experience and expertise...",
              rows: 3,
              maxLength: 320,
              className: "resize-none",
              "data-ocid": "worker_edit.bio_textarea"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            errors.bio ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "worker_edit.bio_field_error",
                children: errors.bio
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-xs ${bio.length > 290 ? "text-destructive" : "text-muted-foreground"}`,
                children: [
                  bio.length,
                  "/300"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-years-exp", children: [
            "Years of Experience",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
              "(",
              t("common.optional"),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-years-exp",
              type: "number",
              min: "0",
              max: "50",
              value: yearsExp,
              onChange: (e) => setYearsExp(e.target.value),
              placeholder: "e.g. 5",
              "data-ocid": "worker_edit.years_exp_input"
            }
          ),
          errors.yearsExp && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "worker_edit.years_exp_field_error",
              children: errors.yearsExp
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            "Languages Spoken",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
              "(",
              t("common.optional"),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: LANGUAGE_OPTIONS.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2",
              "data-ocid": `worker_edit.language_${lang.toLowerCase()}_checkbox`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: `lang-${lang}`,
                    checked: languages.includes(lang),
                    onCheckedChange: () => toggleLanguage(lang)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: `lang-${lang}`,
                    className: "font-normal cursor-pointer",
                    children: lang
                  }
                )
              ]
            },
            lang
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-payment", children: [
            "Payment Preference",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
              "(",
              t("common.optional"),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: paymentPref, onValueChange: setPaymentPref, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "edit-payment",
                "data-ocid": "worker_edit.payment_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select payment method" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAYMENT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt, children: opt }, opt)) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground", children: [
          "Emergency Contact",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-normal", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-emergency-name", children: "Contact Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-emergency-name",
              value: emergencyName,
              onChange: (e) => setEmergencyName(e.target.value),
              placeholder: "Parent / Spouse name",
              "data-ocid": "worker_edit.emergency_name_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-emergency-phone", children: "Contact Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "edit-emergency-phone",
              type: "tel",
              value: emergencyPhone,
              onChange: (e) => setEmergencyPhone(e.target.value),
              placeholder: "9876543210",
              "data-ocid": "worker_edit.emergency_phone_input"
            }
          ),
          errors.emergencyPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "worker_edit.emergency_phone_field_error",
              children: errors.emergencyPhone
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Profession & Skills" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            t("worker.profession"),
            " *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfessionSelect,
            {
              value: profession,
              onChange: setProfession,
              customValue: customProfession,
              onCustomChange: setCustomProfession,
              error: errors.profession
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            t("worker.hourlyRate"),
            " *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium", children: "₹" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                value: hourlyRate,
                onChange: (e) => setHourlyRate(e.target.value),
                placeholder: "400",
                className: "pl-7",
                "data-ocid": "worker_edit.rate_input"
              }
            )
          ] }),
          errors.hourlyRate && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "worker_edit.rate_field_error",
              children: errors.hourlyRate
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
            t("worker.skills"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
              "(",
              t("common.optional"),
              ")"
            ] })
          ] }),
          skillTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-2", children: skillTags.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 bg-primary/10 text-primary text-sm px-2.5 py-1 rounded-full",
              children: [
                skill,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeSkill(skill),
                    className: "hover:text-destructive transition-smooth",
                    "aria-label": `Remove ${skill}`,
                    "data-ocid": "worker_edit.skill_remove_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            skill
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: skillInput,
                onChange: (e) => setSkillInput(e.target.value),
                onKeyDown: handleSkillKeyDown,
                placeholder: t("worker.skillsPlaceholder"),
                className: "flex-1",
                "data-ocid": "worker_edit.skill_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "icon",
                onClick: addSkill,
                disabled: !skillInput.trim(),
                "aria-label": "Add skill",
                "data-ocid": "worker_edit.skill_add_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Press Enter or comma to add a skill" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground", children: [
          t("worker.availability"),
          " *"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AvailabilitySelect,
          {
            value: availability,
            onChange: setAvailability,
            error: errors.availability
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground", children: [
          t("worker.location"),
          " *"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-address", children: t("worker.locationAddress") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-address",
                value: address,
                onChange: (e) => setAddress(e.target.value),
                placeholder: "Andheri East, Mumbai",
                className: "flex-1",
                "data-ocid": "worker_edit.address_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "icon",
                onClick: handleDetectLocation,
                disabled: locationLoading,
                title: "Detect my location",
                "aria-label": "Detect location",
                "data-ocid": "worker_edit.detect_location_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MapPin,
                  {
                    className: `w-4 h-4 ${locationLoading ? "animate-pulse" : ""}`
                  }
                )
              }
            )
          ] }),
          errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-destructive",
              "data-ocid": "worker_edit.address_field_error",
              children: errors.address
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "flex-1",
            onClick: () => router.navigate({ to: "/worker/dashboard" }),
            "data-ocid": "worker_edit.cancel_button",
            children: t("common.cancel")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "flex-1 bg-primary hover:opacity-90 gap-2",
            disabled: isPending,
            "data-ocid": "worker_edit.save_button",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }),
              t("common.loading")
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
              t("common.save")
            ] })
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  WorkerEditPage
};
