import { AvailabilitySelect } from "@/components/AvailabilitySelect";
import { ProfessionSelect } from "@/components/ProfessionSelect";
import ShramikLogo from "@/components/ShramikLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { useRegisterWorker } from "@/hooks/useWorker";
import { DEFAULT_AVAILABILITY } from "@/types";
import type { Profession, WorkerAvailability } from "@/types";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  HardHat,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone);
}

const STEP_LABELS = [
  "Personal Info",
  "Professional Details",
  "Additional Info",
];

const LANGUAGE_OPTIONS = [
  "Hindi",
  "English",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Tamil",
  "Telugu",
];

const PAYMENT_OPTIONS = [
  { value: "UPI", label: "UPI (PhonePe, GPay, Paytm)" },
  { value: "Bank Transfer", label: "Bank Transfer / NEFT" },
  { value: "Cash", label: "Cash in Hand" },
];

interface FieldErrorProps {
  message?: string;
  ocid: string;
}
function FieldError({ message, ocid }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p className="text-xs text-destructive mt-1" data-ocid={ocid}>
      {message}
    </p>
  );
}

export function RegisterWorkerPage() {
  const { t } = useGlobalTranslation();
  const router = useRouter();
  const { mutateAsync, isPending } = useRegisterWorker();

  const [step, setStep] = useState(1);
  const [registered, setRegistered] = useState(false);

  // Step 1: Personal Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(
    undefined,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  // Step 2: Professional Details
  const [profession, setProfession] = useState<Profession | "">(
    "".trim() as "",
  );
  const [customProfession, setCustomProfession] = useState("");
  const [availability, setAvailability] =
    useState<WorkerAvailability>(DEFAULT_AVAILABILITY);
  const [hourlyRate, setHourlyRate] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [skills, setSkills] = useState("");

  // Step 3: Additional Info
  const [bio, setBio] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState<string[]>([]);
  const [paymentPreference, setPaymentPreference] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number>(19.076);
  const [lng, setLng] = useState<number>(72.877);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearErr = (field: string) => {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
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
    const e: Record<string, string> = {};
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
    const e: Record<string, string> = {};
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
        toast.success("Location detected successfully!");
      },
      () => {
        setLocationLoading(false);
        toast.error(
          "Could not detect location. Please enter address manually.",
        );
      },
      { timeout: 8000 },
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Photo must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const toggleLanguage = (lang: string) => {
    setLanguagesSpoken((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
    clearErr("languagesSpoken");
  };

  const handleNext = (fromStep: number) => {
    if (fromStep === 1 && validateStep1()) {
      setErrors({});
      setStep(2);
    }
    if (fromStep === 2 && validateStep2()) {
      setErrors({});
      setStep(3);
    }
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateStep3()) return;
    if (!profession) return;
    try {
      await mutateAsync({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        profession: profession as Profession,
        profession_custom:
          profession === "Other" ? customProfession.trim() : undefined,
        availability,
        location_lat: lat,
        location_lng: lng,
        location_address: address.trim(),
        hourly_rate: Number(hourlyRate),
        skills: skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        profile_photo: profilePhoto,
        bio: bio.trim() || undefined,
        years_of_experience:
          yearsOfExperience !== "" ? Number(yearsOfExperience) : undefined,
        languages_spoken:
          languagesSpoken.length > 0 ? languagesSpoken : undefined,
        payment_preference: paymentPreference || undefined,
        emergency_contact_name: emergencyContactName.trim() || undefined,
        emergency_contact_phone: emergencyContactPhone.trim() || undefined,
      });
      toast.success(t("worker.registrationSuccess"));
      setRegistered(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("common.error"));
    }
  };

  // Success Screen
  if (registered) {
    return (
      <div
        className="min-h-[80vh] flex items-center justify-center bg-muted/30 py-12 px-4"
        data-ocid="register_worker.success_state"
      >
        <div className="w-full max-w-md">
          <Card className="border-border shadow-elevated">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-10 h-10 text-secondary" />
                </div>
                <h2 className="text-display-md text-foreground mb-2">
                  Registration Submitted!
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Welcome,{" "}
                  <span className="font-semibold text-foreground">{name}</span>!
                  Your profile has been submitted for review. Our admin team
                  will verify it within 24 hours. You can log in once approved.
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 mb-6 space-y-3">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  What happens next?
                </p>
                {[
                  { text: "Admin reviews your profile and documents" },
                  { text: "You get a verified badge once approved" },
                  { text: "Seekers can find you by location and profession" },
                ].map(({ text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{text}</span>
                  </div>
                ))}
              </div>

              <div className="border border-border rounded-xl p-4 mb-6">
                <p className="text-xs font-semibold text-foreground mb-3">
                  Contact Admin
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:shramik@gmail.com"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                    data-ocid="register_worker.admin_email_link"
                  >
                    <Mail className="w-4 h-4" />
                    shramik@gmail.com
                  </a>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    Typically responds within 24 hours
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => router.navigate({ to: "/login" })}
                  data-ocid="register_worker.goto_login_button"
                >
                  Go to Login Page
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.navigate({ to: "/" })}
                  data-ocid="register_worker.goto_home_button"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progressPct = step === 1 ? "33%" : step === 2 ? "66%" : "100%";

  return (
    <div
      className="min-h-[85vh] bg-muted/30 py-12 px-4"
      data-ocid="register_worker.page"
    >
      <div className="container mx-auto max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ShramikLogo size="lg" showText={false} />
          </div>
          <h1 className="text-display-md text-foreground">
            {t("worker.register")}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Join thousands of skilled workers on Shramik
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8" data-ocid="register_worker.step_indicator">
          <div className="flex items-center justify-between mb-3">
            {STEP_LABELS.map((label, idx) => {
              const s = idx + 1;
              const active = step === s;
              const done = step > s;
              return (
                <div key={s} className="flex items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-smooth ${
                      done
                        ? "bg-secondary text-secondary-foreground"
                        : active
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {done ? <CheckCircle2 className="w-4 h-4" /> : s}
                  </div>
                  <span
                    className={`text-xs hidden sm:block ${
                      active
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                  {s < STEP_LABELS.length && (
                    <div
                      className={`h-0.5 w-10 sm:w-16 mx-1 transition-smooth ${
                        step > s ? "bg-secondary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-smooth"
              style={{ width: progressPct }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 text-right">
            Step {step} of {STEP_LABELS.length}
          </p>
        </div>

        <Card className="border-border shadow-card">
          <CardContent className="pt-6">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4" data-ocid="register_worker.step1">
                <div className="flex flex-col items-center gap-3 pb-2">
                  <button
                    type="button"
                    className="relative w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-dashed border-border cursor-pointer hover:border-primary transition-smooth"
                    onClick={() => fileRef.current?.click()}
                    aria-label="Upload profile photo"
                    data-ocid="register_worker.photo_upload"
                  >
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                        <Camera className="w-6 h-6 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">
                          Photo
                        </span>
                      </div>
                    )}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                    data-ocid="register_worker.photo_file_input"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("worker.profilePhoto")}{" "}
                    <span className="text-muted-foreground/60">
                      ({t("common.optional")})
                    </span>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rw-name">
                    <User className="w-3.5 h-3.5 inline mr-1 mb-0.5" />
                    {t("auth.name")} *
                  </Label>
                  <Input
                    id="rw-name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearErr("name");
                    }}
                    onBlur={(e) => {
                      if (!e.target.value.trim())
                        setErrors((p) => ({
                          ...p,
                          name: t("common.required"),
                        }));
                    }}
                    placeholder="Ramesh Kumar"
                    className={errors.name ? "border-destructive" : ""}
                    data-ocid="register_worker.name_input"
                  />
                  <FieldError
                    message={errors.name}
                    ocid="register_worker.name_field_error"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rw-email">
                    <Mail className="w-3.5 h-3.5 inline mr-1 mb-0.5" />
                    {t("auth.email")} *
                  </Label>
                  <Input
                    id="rw-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearErr("email");
                    }}
                    onBlur={(e) => {
                      if (!e.target.value.trim())
                        setErrors((p) => ({
                          ...p,
                          email: t("common.required"),
                        }));
                      else if (!validateEmail(e.target.value))
                        setErrors((p) => ({
                          ...p,
                          email: "Enter a valid email address",
                        }));
                    }}
                    placeholder="ramesh@example.com"
                    className={errors.email ? "border-destructive" : ""}
                    data-ocid="register_worker.email_input"
                  />
                  <FieldError
                    message={errors.email}
                    ocid="register_worker.email_field_error"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rw-phone">
                    <Phone className="w-3.5 h-3.5 inline mr-1 mb-0.5" />
                    {t("auth.phone")} *
                  </Label>
                  <Input
                    id="rw-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      clearErr("phone");
                    }}
                    onBlur={(e) => {
                      if (!e.target.value.trim())
                        setErrors((p) => ({
                          ...p,
                          phone: t("common.required"),
                        }));
                      else if (!validatePhone(e.target.value))
                        setErrors((p) => ({
                          ...p,
                          phone: "Enter a valid 10-digit mobile number",
                        }));
                    }}
                    placeholder="9876543210"
                    maxLength={10}
                    className={errors.phone ? "border-destructive" : ""}
                    data-ocid="register_worker.phone_input"
                  />
                  <FieldError
                    message={errors.phone}
                    ocid="register_worker.phone_field_error"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rw-password">{t("auth.password")} *</Label>
                  <div className="relative">
                    <Input
                      id="rw-password"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearErr("password");
                      }}
                      onBlur={(e) => {
                        if (!e.target.value.trim())
                          setErrors((p) => ({
                            ...p,
                            password: t("common.required"),
                          }));
                        else if (e.target.value.length < 6)
                          setErrors((p) => ({
                            ...p,
                            password: "Password must be at least 6 characters",
                          }));
                      }}
                      placeholder="Min. 6 characters"
                      className={
                        errors.password ? "border-destructive pr-10" : "pr-10"
                      }
                      data-ocid="register_worker.password_input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <FieldError
                    message={errors.password}
                    ocid="register_worker.password_field_error"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rw-confirm-password">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="rw-confirm-password"
                      type={showConfirmPw ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        clearErr("confirmPassword");
                      }}
                      onBlur={(e) => {
                        if (!e.target.value.trim())
                          setErrors((p) => ({
                            ...p,
                            confirmPassword: t("common.required"),
                          }));
                        else if (e.target.value !== password)
                          setErrors((p) => ({
                            ...p,
                            confirmPassword: "Passwords do not match",
                          }));
                      }}
                      placeholder="Re-enter your password"
                      className={
                        errors.confirmPassword
                          ? "border-destructive pr-10"
                          : "pr-10"
                      }
                      data-ocid="register_worker.confirm_password_input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={
                        showConfirmPw ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPw ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <FieldError
                    message={errors.confirmPassword}
                    ocid="register_worker.confirm_password_field_error"
                  />
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleNext(1)}
                  data-ocid="register_worker.next_button"
                >
                  Continue: Professional Details →
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {t("auth.haveAccount")}{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-medium"
                    data-ocid="register_worker.login_link"
                  >
                    {t("auth.login")}
                  </Link>
                </p>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5" data-ocid="register_worker.step2">
                <div className="space-y-1.5">
                  <Label>{t("worker.profession")} *</Label>
                  <ProfessionSelect
                    value={profession}
                    onChange={(v) => {
                      setProfession(v);
                      clearErr("profession");
                    }}
                    customValue={customProfession}
                    onCustomChange={(v) => {
                      setCustomProfession(v);
                      clearErr("customProfession");
                    }}
                    error={errors.profession || errors.customProfession}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>{t("worker.availability")} *</Label>
                  <AvailabilitySelect
                    value={availability}
                    onChange={(v) => {
                      setAvailability(v);
                      clearErr("availability");
                    }}
                    error={errors.availability}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="rw-rate">{t("worker.hourlyRate")} *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        id="rw-rate"
                        type="number"
                        min="1"
                        value={hourlyRate}
                        onChange={(e) => {
                          setHourlyRate(e.target.value);
                          clearErr("hourlyRate");
                        }}
                        onBlur={() => {
                          if (!hourlyRate)
                            setErrors((p) => ({
                              ...p,
                              hourlyRate: t("common.required"),
                            }));
                          else if (
                            Number.isNaN(Number(hourlyRate)) ||
                            Number(hourlyRate) <= 0
                          )
                            setErrors((p) => ({
                              ...p,
                              hourlyRate: "Enter a valid positive rate",
                            }));
                        }}
                        placeholder="400"
                        className={`pl-7 ${errors.hourlyRate ? "border-destructive" : ""}`}
                        data-ocid="register_worker.rate_input"
                      />
                    </div>
                    <FieldError
                      message={errors.hourlyRate}
                      ocid="register_worker.rate_field_error"
                    />
                    <p className="text-xs text-muted-foreground">
                      Per hour charge
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="rw-experience">Years of Experience *</Label>
                    <Input
                      id="rw-experience"
                      type="number"
                      min="0"
                      max="50"
                      value={yearsOfExperience}
                      onChange={(e) => {
                        setYearsOfExperience(e.target.value);
                        clearErr("yearsOfExperience");
                      }}
                      onBlur={() => {
                        if (yearsOfExperience === "")
                          setErrors((p) => ({
                            ...p,
                            yearsOfExperience: t("common.required"),
                          }));
                        else if (
                          Number(yearsOfExperience) < 0 ||
                          Number(yearsOfExperience) > 50
                        )
                          setErrors((p) => ({
                            ...p,
                            yearsOfExperience: "Enter 0–50 years",
                          }));
                      }}
                      placeholder="5"
                      className={
                        errors.yearsOfExperience ? "border-destructive" : ""
                      }
                      data-ocid="register_worker.experience_input"
                    />
                    <FieldError
                      message={errors.yearsOfExperience}
                      ocid="register_worker.experience_field_error"
                    />
                    <p className="text-xs text-muted-foreground">
                      Total years in field
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rw-skills">
                    {t("worker.skills")}{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      ({t("common.optional")})
                    </span>
                  </Label>
                  <Input
                    id="rw-skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder={t("worker.skillsPlaceholder")}
                    data-ocid="register_worker.skills_input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated e.g. plastering, waterproofing
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setStep(1);
                      setErrors({});
                    }}
                    data-ocid="register_worker.back_to_step1_button"
                  >
                    ← {t("common.back")}
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={() => handleNext(2)}
                    data-ocid="register_worker.next_to_step3_button"
                  >
                    Continue: Additional Info →
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                data-ocid="register_worker.step3"
              >
                <div className="space-y-2">
                  <Label>Languages Spoken *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <label
                        key={lang}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-smooth text-sm ${
                          languagesSpoken.includes(lang)
                            ? "border-primary bg-primary/5 text-foreground font-medium"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                        data-ocid={`register_worker.lang_${lang.toLowerCase()}`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={languagesSpoken.includes(lang)}
                          onChange={() => toggleLanguage(lang)}
                        />
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${languagesSpoken.includes(lang) ? "border-primary bg-primary" : "border-border"}`}
                        >
                          {languagesSpoken.includes(lang) && (
                            <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        {lang}
                      </label>
                    ))}
                  </div>
                  <FieldError
                    message={errors.languagesSpoken}
                    ocid="register_worker.languages_field_error"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rw-payment">Payment Preference *</Label>
                  <select
                    id="rw-payment"
                    value={paymentPreference}
                    onChange={(e) => {
                      setPaymentPreference(e.target.value);
                      clearErr("paymentPreference");
                    }}
                    className={`w-full h-10 rounded-md border bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.paymentPreference ? "border-destructive" : "border-input"}`}
                    data-ocid="register_worker.payment_select"
                  >
                    <option value="">Select payment method...</option>
                    {PAYMENT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <FieldError
                    message={errors.paymentPreference}
                    ocid="register_worker.payment_field_error"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rw-bio">
                      About You{" "}
                      <span className="text-muted-foreground text-xs font-normal">
                        ({t("common.optional")})
                      </span>
                    </Label>
                    <span
                      className={`text-xs ${bio.length > 280 ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {bio.length}/300
                    </span>
                  </div>
                  <textarea
                    id="rw-bio"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                      clearErr("bio");
                    }}
                    placeholder="Tell seekers about your experience, work quality, and what makes you the best choice..."
                    rows={3}
                    className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none ${errors.bio ? "border-destructive" : "border-input"}`}
                    data-ocid="register_worker.bio_textarea"
                  />
                  <FieldError
                    message={errors.bio}
                    ocid="register_worker.bio_field_error"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rw-address">
                    {t("worker.locationAddress")} *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="rw-address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        clearErr("address");
                      }}
                      onBlur={() => {
                        if (!address.trim())
                          setErrors((p) => ({
                            ...p,
                            address: t("common.required"),
                          }));
                      }}
                      placeholder="Andheri East, Mumbai"
                      className={`flex-1 ${errors.address ? "border-destructive" : ""}`}
                      data-ocid="register_worker.address_input"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleDetectLocation}
                      disabled={locationLoading}
                      title="Detect my location"
                      className={
                        locationDetected
                          ? "border-secondary text-secondary"
                          : ""
                      }
                      data-ocid="register_worker.detect_location_button"
                    >
                      {locationLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <MapPin
                          className={`w-4 h-4 ${locationDetected ? "text-secondary" : ""}`}
                        />
                      )}
                    </Button>
                  </div>
                  {locationDetected && (
                    <p className="text-xs text-secondary flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> GPS coordinates
                      captured
                    </p>
                  )}
                  <FieldError
                    message={errors.address}
                    ocid="register_worker.address_field_error"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use the pin button to detect your GPS location
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">
                    Emergency Contact{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      ({t("common.optional")})
                    </span>
                  </Label>
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                    <div className="space-y-1">
                      <Label htmlFor="rw-ec-name" className="text-xs">
                        Contact Name
                      </Label>
                      <Input
                        id="rw-ec-name"
                        value={emergencyContactName}
                        onChange={(e) =>
                          setEmergencyContactName(e.target.value)
                        }
                        placeholder="Suresh Kumar"
                        className="h-9 text-sm"
                        data-ocid="register_worker.ec_name_input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="rw-ec-phone" className="text-xs">
                        Contact Phone
                      </Label>
                      <Input
                        id="rw-ec-phone"
                        type="tel"
                        value={emergencyContactPhone}
                        onChange={(e) => {
                          setEmergencyContactPhone(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          );
                          clearErr("emergencyContactPhone");
                        }}
                        placeholder="9876543210"
                        maxLength={10}
                        className={`h-9 text-sm ${errors.emergencyContactPhone ? "border-destructive" : ""}`}
                        data-ocid="register_worker.ec_phone_input"
                      />
                      <FieldError
                        message={errors.emergencyContactPhone}
                        ocid="register_worker.ec_phone_field_error"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setStep(2);
                      setErrors({});
                    }}
                    data-ocid="register_worker.back_to_step2_button"
                  >
                    ← {t("common.back")}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-accent text-accent-foreground hover:opacity-90"
                    disabled={isPending}
                    data-ocid="register_worker.submit_button"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("common.loading")}
                      </span>
                    ) : (
                      "Register Now ✓"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
