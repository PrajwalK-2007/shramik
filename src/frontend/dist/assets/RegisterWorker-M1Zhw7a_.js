import { u as useGlobalTranslation, h as useRouter, r as reactExports, j as jsxRuntimeExports, B as Button, S as ShramikLogo, k as User, L as Link, i as ue } from "./index-d2ZIbWtv.js";
import { P as ProfessionSelect, A as AvailabilitySelect } from "./ProfessionSelect-W0jbltDo.js";
import { C as Card, a as CardContent } from "./card-BSq67iTX.js";
import { I as Input } from "./input-a85NbTV6.js";
import { L as Label } from "./label-C1APETMy.js";
import { b as useRegisterWorker } from "./useWorker-ogW08bik.js";
import { D as DEFAULT_AVAILABILITY } from "./index-D3QYH2aj.js";
import { C as CircleCheck } from "./circle-check-DMWcVYWD.js";
import { M as Mail } from "./mail-Dol-fdn0.js";
import { P as Phone } from "./phone-DTDbO0uo.js";
import { C as Camera } from "./camera-CWOrp0j4.js";
import { E as EyeOff } from "./eye-off-BTfPF-ax.js";
import { E as Eye } from "./eye-KCp-AYUB.js";
import { L as LoaderCircle } from "./loader-circle-xO_pNUBT.js";
import { M as MapPin } from "./map-pin-CsdTdaem.js";
import "./chevron-down-Cf5OhcSo.js";
import "./search-uHOcnKQN.js";
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}
const STEP_LABELS = [
  "Personal Info",
  "Professional Details",
  "Additional Info"
];
const LANGUAGE_OPTIONS = [
  "Hindi",
  "English",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Tamil",
  "Telugu"
];
const PAYMENT_OPTIONS = [
  { value: "UPI", label: "UPI (PhonePe, GPay, Paytm)" },
  { value: "Bank Transfer", label: "Bank Transfer / NEFT" },
  { value: "Cash", label: "Cash in Hand" }
];
function FieldError({ message, ocid }) {
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive mt-1", "data-ocid": ocid, children: message });
}
function RegisterWorkerPage() {
  const { t } = useGlobalTranslation();
  const router = useRouter();
  const { mutateAsync, isPending } = useRegisterWorker();
  const [step, setStep] = reactExports.useState(1);
  const [registered, setRegistered] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirmPw, setShowConfirmPw] = reactExports.useState(false);
  const [profilePhoto, setProfilePhoto] = reactExports.useState(
    void 0
  );
  const fileRef = reactExports.useRef(null);
  const [profession, setProfession] = reactExports.useState(
    "".trim()
  );
  const [customProfession, setCustomProfession] = reactExports.useState("");
  const [availability, setAvailability] = reactExports.useState(DEFAULT_AVAILABILITY);
  const [hourlyRate, setHourlyRate] = reactExports.useState("");
  const [yearsOfExperience, setYearsOfExperience] = reactExports.useState("");
  const [skills, setSkills] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [languagesSpoken, setLanguagesSpoken] = reactExports.useState([]);
  const [paymentPreference, setPaymentPreference] = reactExports.useState("");
  const [emergencyContactName, setEmergencyContactName] = reactExports.useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [lat, setLat] = reactExports.useState(19.076);
  const [lng, setLng] = reactExports.useState(72.877);
  const [locationLoading, setLocationLoading] = reactExports.useState(false);
  const [locationDetected, setLocationDetected] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const clearErr = (field) => {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };
  const validateStep1 = () => {
    const e = {};
    if (!name.trim()) e.name = t("common.required");
    if (!email.trim()) e.email = t("common.required");
    else if (!validateEmail(email)) e.email = "Enter a valid email address";
    if (!phone.trim()) e.phone = t("common.required");
    else if (!validatePhone(phone))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!password.trim()) e.password = t("common.required");
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (!confirmPassword.trim()) e.confirmPassword = t("common.required");
    else if (confirmPassword !== password)
      e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e = {};
    if (!profession) e.profession = t("common.required");
    if (profession === "Other" && !customProfession.trim())
      e.customProfession = "Please specify your profession";
    if (!availability.startTime || !availability.endTime)
      e.availability = "Please select your work start and end time";
    else if (availability.startTime >= availability.endTime)
      e.availability = "End time must be after start time";
    if (!hourlyRate) e.hourlyRate = t("common.required");
    else if (Number.isNaN(Number(hourlyRate)) || Number(hourlyRate) <= 0)
      e.hourlyRate = "Enter a valid positive rate";
    if (yearsOfExperience === "") e.yearsOfExperience = t("common.required");
    else if (Number(yearsOfExperience) < 0 || Number(yearsOfExperience) > 50)
      e.yearsOfExperience = "Enter years between 0 and 50";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep3 = () => {
    const e = {};
    if (!address.trim()) e.address = t("common.required");
    if (languagesSpoken.length === 0)
      e.languagesSpoken = "Please select at least one language";
    if (!paymentPreference) e.paymentPreference = t("common.required");
    if (emergencyContactPhone && !validatePhone(emergencyContactPhone))
      e.emergencyContactPhone = "Enter a valid 10-digit number";
    if (bio.length > 300) e.bio = "Bio must be 300 characters or less";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleDetectLocation = () => {
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setLocationLoading(false);
        setLocationDetected(true);
        ue.success("Location detected successfully!");
      },
      () => {
        setLocationLoading(false);
        ue.error(
          "Could not detect location. Please enter address manually."
        );
      },
      { timeout: 8e3 }
    );
  };
  const handlePhotoChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      ue.error("Photo must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return setProfilePhoto((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
  };
  const toggleLanguage = (lang) => {
    setLanguagesSpoken(
      (prev) => prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
    clearErr("languagesSpoken");
  };
  const handleNext = (fromStep) => {
    if (fromStep === 1 && validateStep1()) {
      setErrors({});
      setStep(2);
    }
    if (fromStep === 2 && validateStep2()) {
      setErrors({});
      setStep(3);
    }
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateStep3()) return;
    if (!profession) return;
    try {
      await mutateAsync({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        profession,
        profession_custom: profession === "Other" ? customProfession.trim() : void 0,
        availability,
        location_lat: lat,
        location_lng: lng,
        location_address: address.trim(),
        hourly_rate: Number(hourlyRate),
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        profile_photo: profilePhoto,
        bio: bio.trim() || void 0,
        years_of_experience: yearsOfExperience !== "" ? Number(yearsOfExperience) : void 0,
        languages_spoken: languagesSpoken.length > 0 ? languagesSpoken : void 0,
        payment_preference: paymentPreference || void 0,
        emergency_contact_name: emergencyContactName.trim() || void 0,
        emergency_contact_phone: emergencyContactPhone.trim() || void 0
      });
      ue.success(t("worker.registrationSuccess"));
      setRegistered(true);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : t("common.error"));
    }
  };
  if (registered) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[80vh] flex items-center justify-center bg-muted/30 py-12 px-4",
        "data-ocid": "register_worker.success_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-2", children: "Registration Submitted!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
              "Welcome,",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: name }),
              "! Your profile has been submitted for review. Our admin team will verify it within 24 hours. You can log in once approved."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-xl p-4 mb-6 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground uppercase tracking-wide", children: "What happens next?" }),
            [
              { text: "Admin reviews your profile and documents" },
              { text: "You get a verified badge once approved" },
              { text: "Seekers can find you by location and profession" }
            ].map(({ text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-secondary mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: text })
            ] }, text))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-3", children: "Contact Admin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "mailto:shramik@gmail.com",
                  className: "flex items-center gap-2 text-sm text-primary hover:underline",
                  "data-ocid": "register_worker.admin_email_link",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
                    "shramik@gmail.com"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                "Typically responds within 24 hours"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "w-full",
                onClick: () => router.navigate({ to: "/login" }),
                "data-ocid": "register_worker.goto_login_button",
                children: "Go to Login Page"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "w-full",
                onClick: () => router.navigate({ to: "/" }),
                "data-ocid": "register_worker.goto_home_button",
                children: "Back to Home"
              }
            )
          ] })
        ] }) }) })
      }
    );
  }
  const progressPct = step === 1 ? "33%" : step === 2 ? "66%" : "100%";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[85vh] bg-muted/30 py-12 px-4",
      "data-ocid": "register_worker.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShramikLogo, { size: "lg", showText: false }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display-md text-foreground", children: t("worker.register") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Join thousands of skilled workers on Shramik" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", "data-ocid": "register_worker.step_indicator", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: STEP_LABELS.map((label, idx) => {
            const s = idx + 1;
            const active = step === s;
            const done = step > s;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${done ? "bg-secondary text-secondary-foreground" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border border-border"}`,
                  children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : s
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs hidden sm:block ${active ? "font-medium text-foreground" : "text-muted-foreground"}`,
                  children: label
                }
              ),
              s < STEP_LABELS.length && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-0.5 w-10 sm:w-16 mx-1 transition-smooth ${step > s ? "bg-secondary" : "bg-muted"}`
                }
              )
            ] }, s);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-primary h-1.5 rounded-full transition-smooth",
              style: { width: progressPct }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5 text-right", children: [
            "Step ",
            step,
            " of ",
            STEP_LABELS.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "register_worker.step1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "relative w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-dashed border-border cursor-pointer hover:border-primary transition-smooth",
                  onClick: () => {
                    var _a;
                    return (_a = fileRef.current) == null ? void 0 : _a.click();
                  },
                  "aria-label": "Upload profile photo",
                  "data-ocid": "register_worker.photo_upload",
                  children: profilePhoto ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: profilePhoto,
                      alt: "Profile",
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Photo" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handlePhotoChange,
                  "data-ocid": "register_worker.photo_file_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                t("worker.profilePhoto"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60", children: [
                  "(",
                  t("common.optional"),
                  ")"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-name", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 inline mr-1 mb-0.5" }),
                t("auth.name"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rw-name",
                  value: name,
                  onChange: (e) => {
                    setName(e.target.value);
                    clearErr("name");
                  },
                  onBlur: (e) => {
                    if (!e.target.value.trim())
                      setErrors((p) => ({
                        ...p,
                        name: t("common.required")
                      }));
                  },
                  placeholder: "Ramesh Kumar",
                  className: errors.name ? "border-destructive" : "",
                  "data-ocid": "register_worker.name_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldError,
                {
                  message: errors.name,
                  ocid: "register_worker.name_field_error"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-email", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 inline mr-1 mb-0.5" }),
                t("auth.email"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rw-email",
                  type: "email",
                  value: email,
                  onChange: (e) => {
                    setEmail(e.target.value);
                    clearErr("email");
                  },
                  onBlur: (e) => {
                    if (!e.target.value.trim())
                      setErrors((p) => ({
                        ...p,
                        email: t("common.required")
                      }));
                    else if (!validateEmail(e.target.value))
                      setErrors((p) => ({
                        ...p,
                        email: "Enter a valid email address"
                      }));
                  },
                  placeholder: "ramesh@example.com",
                  className: errors.email ? "border-destructive" : "",
                  "data-ocid": "register_worker.email_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldError,
                {
                  message: errors.email,
                  ocid: "register_worker.email_field_error"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-phone", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 inline mr-1 mb-0.5" }),
                t("auth.phone"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rw-phone",
                  type: "tel",
                  value: phone,
                  onChange: (e) => {
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                    clearErr("phone");
                  },
                  onBlur: (e) => {
                    if (!e.target.value.trim())
                      setErrors((p) => ({
                        ...p,
                        phone: t("common.required")
                      }));
                    else if (!validatePhone(e.target.value))
                      setErrors((p) => ({
                        ...p,
                        phone: "Enter a valid 10-digit mobile number"
                      }));
                  },
                  placeholder: "9876543210",
                  maxLength: 10,
                  className: errors.phone ? "border-destructive" : "",
                  "data-ocid": "register_worker.phone_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldError,
                {
                  message: errors.phone,
                  ocid: "register_worker.phone_field_error"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-password", children: [
                t("auth.password"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "rw-password",
                    type: showPw ? "text" : "password",
                    value: password,
                    onChange: (e) => {
                      setPassword(e.target.value);
                      clearErr("password");
                    },
                    onBlur: (e) => {
                      if (!e.target.value.trim())
                        setErrors((p) => ({
                          ...p,
                          password: t("common.required")
                        }));
                      else if (e.target.value.length < 6)
                        setErrors((p) => ({
                          ...p,
                          password: "Password must be at least 6 characters"
                        }));
                    },
                    placeholder: "Min. 6 characters",
                    className: errors.password ? "border-destructive pr-10" : "pr-10",
                    "data-ocid": "register_worker.password_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPw(!showPw),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                    "aria-label": showPw ? "Hide password" : "Show password",
                    children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldError,
                {
                  message: errors.password,
                  ocid: "register_worker.password_field_error"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw-confirm-password", children: "Confirm Password *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "rw-confirm-password",
                    type: showConfirmPw ? "text" : "password",
                    value: confirmPassword,
                    onChange: (e) => {
                      setConfirmPassword(e.target.value);
                      clearErr("confirmPassword");
                    },
                    onBlur: (e) => {
                      if (!e.target.value.trim())
                        setErrors((p) => ({
                          ...p,
                          confirmPassword: t("common.required")
                        }));
                      else if (e.target.value !== password)
                        setErrors((p) => ({
                          ...p,
                          confirmPassword: "Passwords do not match"
                        }));
                    },
                    placeholder: "Re-enter your password",
                    className: errors.confirmPassword ? "border-destructive pr-10" : "pr-10",
                    "data-ocid": "register_worker.confirm_password_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirmPw(!showConfirmPw),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                    "aria-label": showConfirmPw ? "Hide password" : "Show password",
                    children: showConfirmPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldError,
                {
                  message: errors.confirmPassword,
                  ocid: "register_worker.confirm_password_field_error"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "w-full",
                onClick: () => handleNext(1),
                "data-ocid": "register_worker.next_button",
                children: "Continue: Professional Details →"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
              t("auth.haveAccount"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "text-primary hover:underline font-medium",
                  "data-ocid": "register_worker.login_link",
                  children: t("auth.login")
                }
              )
            ] })
          ] }),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "register_worker.step2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                t("worker.profession"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfessionSelect,
                {
                  value: profession,
                  onChange: (v) => {
                    setProfession(v);
                    clearErr("profession");
                  },
                  customValue: customProfession,
                  onCustomChange: (v) => {
                    setCustomProfession(v);
                    clearErr("customProfession");
                  },
                  error: errors.profession || errors.customProfession
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
                t("worker.availability"),
                " *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvailabilitySelect,
                {
                  value: availability,
                  onChange: (v) => {
                    setAvailability(v);
                    clearErr("availability");
                  },
                  error: errors.availability
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-rate", children: [
                  t("worker.hourlyRate"),
                  " *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground", children: "₹" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "rw-rate",
                      type: "number",
                      min: "1",
                      value: hourlyRate,
                      onChange: (e) => {
                        setHourlyRate(e.target.value);
                        clearErr("hourlyRate");
                      },
                      onBlur: () => {
                        if (!hourlyRate)
                          setErrors((p) => ({
                            ...p,
                            hourlyRate: t("common.required")
                          }));
                        else if (Number.isNaN(Number(hourlyRate)) || Number(hourlyRate) <= 0)
                          setErrors((p) => ({
                            ...p,
                            hourlyRate: "Enter a valid positive rate"
                          }));
                      },
                      placeholder: "400",
                      className: `pl-7 ${errors.hourlyRate ? "border-destructive" : ""}`,
                      "data-ocid": "register_worker.rate_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    message: errors.hourlyRate,
                    ocid: "register_worker.rate_field_error"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Per hour charge" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw-experience", children: "Years of Experience *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "rw-experience",
                    type: "number",
                    min: "0",
                    max: "50",
                    value: yearsOfExperience,
                    onChange: (e) => {
                      setYearsOfExperience(e.target.value);
                      clearErr("yearsOfExperience");
                    },
                    onBlur: () => {
                      if (yearsOfExperience === "")
                        setErrors((p) => ({
                          ...p,
                          yearsOfExperience: t("common.required")
                        }));
                      else if (Number(yearsOfExperience) < 0 || Number(yearsOfExperience) > 50)
                        setErrors((p) => ({
                          ...p,
                          yearsOfExperience: "Enter 0–50 years"
                        }));
                    },
                    placeholder: "5",
                    className: errors.yearsOfExperience ? "border-destructive" : "",
                    "data-ocid": "register_worker.experience_input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FieldError,
                  {
                    message: errors.yearsOfExperience,
                    ocid: "register_worker.experience_field_error"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total years in field" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-skills", children: [
                t("worker.skills"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-normal", children: [
                  "(",
                  t("common.optional"),
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rw-skills",
                  value: skills,
                  onChange: (e) => setSkills(e.target.value),
                  placeholder: t("worker.skillsPlaceholder"),
                  "data-ocid": "register_worker.skills_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Comma-separated e.g. plastering, waterproofing" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => {
                    setStep(1);
                    setErrors({});
                  },
                  "data-ocid": "register_worker.back_to_step1_button",
                  children: [
                    "← ",
                    t("common.back")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  className: "flex-1",
                  onClick: () => handleNext(2),
                  "data-ocid": "register_worker.next_to_step3_button",
                  children: "Continue: Additional Info →"
                }
              )
            ] })
          ] }),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-5",
              noValidate: true,
              "data-ocid": "register_worker.step3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Languages Spoken *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: LANGUAGE_OPTIONS.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: `flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-smooth text-sm ${languagesSpoken.includes(lang) ? "border-primary bg-primary/5 text-foreground font-medium" : "border-border text-muted-foreground hover:border-primary/50"}`,
                      "data-ocid": `register_worker.lang_${lang.toLowerCase()}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            className: "sr-only",
                            checked: languagesSpoken.includes(lang),
                            onChange: () => toggleLanguage(lang)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${languagesSpoken.includes(lang) ? "border-primary bg-primary" : "border-border"}`,
                            children: languagesSpoken.includes(lang) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-primary-foreground" })
                          }
                        ),
                        lang
                      ]
                    },
                    lang
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FieldError,
                    {
                      message: errors.languagesSpoken,
                      ocid: "register_worker.languages_field_error"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw-payment", children: "Payment Preference *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "rw-payment",
                      value: paymentPreference,
                      onChange: (e) => {
                        setPaymentPreference(e.target.value);
                        clearErr("paymentPreference");
                      },
                      className: `w-full h-10 rounded-md border bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.paymentPreference ? "border-destructive" : "border-input"}`,
                      "data-ocid": "register_worker.payment_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select payment method..." }),
                        PAYMENT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FieldError,
                    {
                      message: errors.paymentPreference,
                      ocid: "register_worker.payment_field_error"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-bio", children: [
                      "About You",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-normal", children: [
                        "(",
                        t("common.optional"),
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-xs ${bio.length > 280 ? "text-destructive" : "text-muted-foreground"}`,
                        children: [
                          bio.length,
                          "/300"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "rw-bio",
                      value: bio,
                      onChange: (e) => {
                        setBio(e.target.value);
                        clearErr("bio");
                      },
                      placeholder: "Tell seekers about your experience, work quality, and what makes you the best choice...",
                      rows: 3,
                      className: `w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none ${errors.bio ? "border-destructive" : "border-input"}`,
                      "data-ocid": "register_worker.bio_textarea"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FieldError,
                    {
                      message: errors.bio,
                      ocid: "register_worker.bio_field_error"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rw-address", children: [
                    t("worker.locationAddress"),
                    " *"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "rw-address",
                        value: address,
                        onChange: (e) => {
                          setAddress(e.target.value);
                          clearErr("address");
                        },
                        onBlur: () => {
                          if (!address.trim())
                            setErrors((p) => ({
                              ...p,
                              address: t("common.required")
                            }));
                        },
                        placeholder: "Andheri East, Mumbai",
                        className: `flex-1 ${errors.address ? "border-destructive" : ""}`,
                        "data-ocid": "register_worker.address_input"
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
                        className: locationDetected ? "border-secondary text-secondary" : "",
                        "data-ocid": "register_worker.detect_location_button",
                        children: locationLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          MapPin,
                          {
                            className: `w-4 h-4 ${locationDetected ? "text-secondary" : ""}`
                          }
                        )
                      }
                    )
                  ] }),
                  locationDetected && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-secondary flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                    " GPS coordinates captured"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FieldError,
                    {
                      message: errors.address,
                      ocid: "register_worker.address_field_error"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Use the pin button to detect your GPS location" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold", children: [
                    "Emergency Contact",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-normal", children: [
                      "(",
                      t("common.optional"),
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 p-3 rounded-lg bg-muted/40 border border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw-ec-name", className: "text-xs", children: "Contact Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "rw-ec-name",
                          value: emergencyContactName,
                          onChange: (e) => setEmergencyContactName(e.target.value),
                          placeholder: "Suresh Kumar",
                          className: "h-9 text-sm",
                          "data-ocid": "register_worker.ec_name_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rw-ec-phone", className: "text-xs", children: "Contact Phone" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "rw-ec-phone",
                          type: "tel",
                          value: emergencyContactPhone,
                          onChange: (e) => {
                            setEmergencyContactPhone(
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            );
                            clearErr("emergencyContactPhone");
                          },
                          placeholder: "9876543210",
                          maxLength: 10,
                          className: `h-9 text-sm ${errors.emergencyContactPhone ? "border-destructive" : ""}`,
                          "data-ocid": "register_worker.ec_phone_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        FieldError,
                        {
                          message: errors.emergencyContactPhone,
                          ocid: "register_worker.ec_phone_field_error"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => {
                        setStep(2);
                        setErrors({});
                      },
                      "data-ocid": "register_worker.back_to_step2_button",
                      children: [
                        "← ",
                        t("common.back")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "flex-1 bg-accent text-accent-foreground hover:opacity-90",
                      disabled: isPending,
                      "data-ocid": "register_worker.submit_button",
                      children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                        t("common.loading")
                      ] }) : "Register Now ✓"
                    }
                  )
                ] })
              ]
            }
          )
        ] }) })
      ] })
    }
  );
}
export {
  RegisterWorkerPage
};
