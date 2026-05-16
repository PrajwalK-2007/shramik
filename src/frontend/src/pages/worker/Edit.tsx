import { AvailabilitySelect } from "@/components/AvailabilitySelect";
import { ProfessionSelect } from "@/components/ProfessionSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { useUpdateWorkerProfile, useWorkerProfile } from "@/hooks/useWorker";
import type { Profession, WorkerAvailability } from "@/types";
import { DEFAULT_AVAILABILITY } from "@/types";
import { useRouter } from "@tanstack/react-router";
import { Camera, Check, ChevronLeft, MapPin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const LANGUAGE_OPTIONS = [
  "Hindi",
  "English",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Tamil",
  "Telugu",
];

const PAYMENT_OPTIONS = ["UPI", "Bank Transfer", "Cash"];

export function WorkerEditPage() {
  const { t } = useGlobalTranslation();
  const { userId } = useAuth();
  const router = useRouter();
  const { data: profile, isLoading } = useWorkerProfile(userId);
  const { mutateAsync, isPending } = useUpdateWorkerProfile();

  // Core fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState<Profession | "">("");
  const [customProfession, setCustomProfession] = useState("");
  const [availability, setAvailability] =
    useState<WorkerAvailability>(DEFAULT_AVAILABILITY);
  const [hourlyRate, setHourlyRate] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [address, setAddress] = useState("");

  // Extended fields
  const [bio, setBio] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [paymentPref, setPaymentPref] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Photo
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [locationLoading, setLocationLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate form on profile load
  useEffect(() => {
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
        profile.years_of_experience != null
          ? String(profile.years_of_experience)
          : "",
      );
      setLanguages(profile.languages_spoken ?? []);
      setPaymentPref(profile.payment_preference ?? "");
      setEmergencyName(profile.emergency_contact_name ?? "");
      setEmergencyPhone(profile.emergency_contact_phone ?? "");
      if (profile.profile_photo) setPhotoPreview(profile.profile_photo);
    }
  }, [profile]);

  // ── Skills tag helpers ───────────────────────────────────────────────────────────
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || skillTags.includes(trimmed)) return;
    setSkillTags([...skillTags, trimmed]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkillTags(skillTags.filter((s) => s !== skill));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  // ── Language toggle ────────────────────────────────────────────────────────────
  const toggleLanguage = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  // ── Photo handling ────────────────────────────────────────────────────────────
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo must be under 5MB");
      return;
    }
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // ── Location detection ───────────────────────────────────────────────────────
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported on this device");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationLoading(false);
        toast.success("Location detected! Please type your area name.");
      },
      () => {
        setLocationLoading(false);
        toast.error("Could not detect location. Enter address manually.");
      },
    );
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("common.required");
    if (!phone.trim()) e.phone = t("common.required");
    if (!profession) e.profession = t("common.required");
    if (!availability.startTime || !availability.endTime)
      e.availability = "Please set work start and end time";
    else if (availability.startTime >= availability.endTime)
      e.availability = "End time must be after start time";
    if (
      !hourlyRate ||
      Number.isNaN(Number(hourlyRate)) ||
      Number(hourlyRate) < 0
    )
      e.hourlyRate = "Enter a valid hourly rate";
    if (!address.trim()) e.address = t("common.required");
    if (bio.length > 300) e.bio = "Bio must be 300 characters or less";
    if (
      yearsExp &&
      (Number.isNaN(Number(yearsExp)) ||
        Number(yearsExp) < 0 ||
        Number(yearsExp) > 50)
    )
      e.yearsExp = "Enter a number between 0 and 50";
    if (
      emergencyPhone?.trim() &&
      !/^[0-9+\-\s]{7,15}$/.test(emergencyPhone.trim())
    )
      e.emergencyPhone = "Enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (!validate()) {
      toast.error("Please fix the errors below");
      return;
    }

    try {
      const photoUrl = photoFile
        ? (photoPreview ?? profile.profile_photo)
        : profile.profile_photo;

      await mutateAsync({
        id: profile.id,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        profession: (profession as Profession) || profile.profession,
        profession_custom:
          profession === "Other" ? customProfession : undefined,
        availability: availability,
        hourly_rate: Number(hourlyRate),
        skills: skillTags,
        location_address: address.trim(),
        location_lat: profile.location_lat,
        location_lng: profile.location_lng,
        // Extended fields
        bio: bio.trim() || undefined,
        years_of_experience: yearsExp ? Number(yearsExp) : undefined,
        languages_spoken: languages.length > 0 ? languages : undefined,
        payment_preference: paymentPref || undefined,
        emergency_contact_name: emergencyName.trim() || undefined,
        emergency_contact_phone: emergencyPhone.trim() || undefined,
        ...(photoUrl ? { profile_photo: photoUrl } : {}),
      });
      toast.success("Profile updated successfully! 🎉");
      router.navigate({ to: "/worker/profile" });
    } catch {
      toast.error(t("common.error"));
    }
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        className="bg-muted/30 min-h-screen py-8"
        data-ocid="worker_edit.loading_state"
      >
        <div className="container mx-auto px-4 max-w-xl space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="bg-muted/30 min-h-[70vh] flex items-center justify-center"
        data-ocid="worker_edit.empty_state"
      >
        <p className="text-muted-foreground">
          No profile to edit. Please register first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 min-h-screen py-8" data-ocid="worker_edit.page">
      <div className="container mx-auto px-4 max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => router.navigate({ to: "/worker/dashboard" })}
            className="p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground"
            data-ocid="worker_edit.back_button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-display-md text-foreground">
            {t("worker.editProfile")}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ── Profile Photo ─────────────────────────────────────────────── */}
          <Card className="border-border shadow-card">
            <CardContent className="pt-5 pb-5">
              <h2 className="font-semibold text-foreground mb-4">
                {t("worker.profilePhoto")}
              </h2>
              <div className="flex items-center gap-5">
                <div className="relative flex-shrink-0">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary/30"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">
                        {name
                          ? name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "?"}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-smooth"
                    aria-label="Upload photo"
                    data-ocid="worker_edit.photo_upload_button"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a clear photo of yourself. JPG or PNG, max 5MB.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    data-ocid="worker_edit.photo_input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    data-ocid="worker_edit.choose_photo_button"
                  >
                    <Camera className="w-3.5 h-3.5 mr-1.5" />
                    {photoPreview ? "Change Photo" : "Choose Photo"}
                  </Button>
                  {photoFile && (
                    <p className="text-xs text-success mt-1.5">
                      ✓ Photo selected — will save with profile
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Personal Info ─────────────────────────────────────────────── */}
          <Card className="border-border shadow-card">
            <CardContent className="pt-5 pb-5 space-y-4">
              <h2 className="font-semibold text-foreground">
                Personal Information
              </h2>

              <div className="space-y-1.5">
                <Label htmlFor="edit-name">{t("auth.name")} *</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ramesh Kumar"
                  data-ocid="worker_edit.name_input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="worker_edit.name_field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-phone">{t("auth.phone")} *</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  data-ocid="worker_edit.phone_input"
                />
                {errors.phone && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="worker_edit.phone_field_error"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-email">
                  {t("auth.email")}{" "}
                  <span className="text-muted-foreground text-xs">
                    ({t("common.optional")})
                  </span>
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@example.com"
                  data-ocid="worker_edit.email_input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-bio">
                  About / Bio{" "}
                  <span className="text-muted-foreground text-xs">
                    ({t("common.optional")})
                  </span>
                </Label>
                <Textarea
                  id="edit-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell seekers about your experience and expertise..."
                  rows={3}
                  maxLength={320}
                  className="resize-none"
                  data-ocid="worker_edit.bio_textarea"
                />
                <div className="flex justify-between">
                  {errors.bio ? (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="worker_edit.bio_field_error"
                    >
                      {errors.bio}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p
                    className={`text-xs ${
                      bio.length > 290
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {bio.length}/300
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-years-exp">
                  Years of Experience{" "}
                  <span className="text-muted-foreground text-xs">
                    ({t("common.optional")})
                  </span>
                </Label>
                <Input
                  id="edit-years-exp"
                  type="number"
                  min="0"
                  max="50"
                  value={yearsExp}
                  onChange={(e) => setYearsExp(e.target.value)}
                  placeholder="e.g. 5"
                  data-ocid="worker_edit.years_exp_input"
                />
                {errors.yearsExp && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="worker_edit.years_exp_field_error"
                  >
                    {errors.yearsExp}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  Languages Spoken{" "}
                  <span className="text-muted-foreground text-xs">
                    ({t("common.optional")})
                  </span>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <div
                      key={lang}
                      className="flex items-center gap-2"
                      data-ocid={`worker_edit.language_${lang.toLowerCase()}_checkbox`}
                    >
                      <Checkbox
                        id={`lang-${lang}`}
                        checked={languages.includes(lang)}
                        onCheckedChange={() => toggleLanguage(lang)}
                      />
                      <Label
                        htmlFor={`lang-${lang}`}
                        className="font-normal cursor-pointer"
                      >
                        {lang}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-payment">
                  Payment Preference{" "}
                  <span className="text-muted-foreground text-xs">
                    ({t("common.optional")})
                  </span>
                </Label>
                <Select value={paymentPref} onValueChange={setPaymentPref}>
                  <SelectTrigger
                    id="edit-payment"
                    data-ocid="worker_edit.payment_select"
                  >
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* ── Emergency Contact ─────────────────────────────────────────── */}
          <Card className="border-border shadow-card">
            <CardContent className="pt-5 pb-5 space-y-4">
              <h2 className="font-semibold text-foreground">
                Emergency Contact{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (optional)
                </span>
              </h2>

              <div className="space-y-1.5">
                <Label htmlFor="edit-emergency-name">Contact Name</Label>
                <Input
                  id="edit-emergency-name"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="Parent / Spouse name"
                  data-ocid="worker_edit.emergency_name_input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-emergency-phone">Contact Phone</Label>
                <Input
                  id="edit-emergency-phone"
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="9876543210"
                  data-ocid="worker_edit.emergency_phone_input"
                />
                {errors.emergencyPhone && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="worker_edit.emergency_phone_field_error"
                  >
                    {errors.emergencyPhone}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ── Profession & Skills ───────────────────────────────────────── */}
          <Card className="border-border shadow-card">
            <CardContent className="pt-5 pb-5 space-y-4">
              <h2 className="font-semibold text-foreground">
                Profession & Skills
              </h2>

              <div className="space-y-1.5">
                <Label>{t("worker.profession")} *</Label>
                <ProfessionSelect
                  value={profession}
                  onChange={setProfession}
                  customValue={customProfession}
                  onCustomChange={setCustomProfession}
                  error={errors.profession}
                />
              </div>

              <div className="space-y-1.5">
                <Label>{t("worker.hourlyRate")} *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    ₹
                  </span>
                  <Input
                    type="number"
                    min="0"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="400"
                    className="pl-7"
                    data-ocid="worker_edit.rate_input"
                  />
                </div>
                {errors.hourlyRate && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="worker_edit.rate_field_error"
                  >
                    {errors.hourlyRate}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>
                  {t("worker.skills")}{" "}
                  <span className="text-muted-foreground text-xs">
                    ({t("common.optional")})
                  </span>
                </Label>
                {skillTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {skillTags.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm px-2.5 py-1 rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-destructive transition-smooth"
                          aria-label={`Remove ${skill}`}
                          data-ocid="worker_edit.skill_remove_button"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder={t("worker.skillsPlaceholder")}
                    className="flex-1"
                    data-ocid="worker_edit.skill_input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addSkill}
                    disabled={!skillInput.trim()}
                    aria-label="Add skill"
                    data-ocid="worker_edit.skill_add_button"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Press Enter or comma to add a skill
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ── Availability ──────────────────────────────────────────────── */}
          <Card className="border-border shadow-card">
            <CardContent className="pt-5 pb-5 space-y-3">
              <h2 className="font-semibold text-foreground">
                {t("worker.availability")} *
              </h2>
              <AvailabilitySelect
                value={availability}
                onChange={setAvailability}
                error={errors.availability}
              />
            </CardContent>
          </Card>

          {/* ── Location ─────────────────────────────────────────────────── */}
          <Card className="border-border shadow-card">
            <CardContent className="pt-5 pb-5 space-y-3">
              <h2 className="font-semibold text-foreground">
                {t("worker.location")} *
              </h2>
              <div className="space-y-1.5">
                <Label htmlFor="edit-address">
                  {t("worker.locationAddress")}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Andheri East, Mumbai"
                    className="flex-1"
                    data-ocid="worker_edit.address_input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleDetectLocation}
                    disabled={locationLoading}
                    title="Detect my location"
                    aria-label="Detect location"
                    data-ocid="worker_edit.detect_location_button"
                  >
                    <MapPin
                      className={`w-4 h-4 ${
                        locationLoading ? "animate-pulse" : ""
                      }`}
                    />
                  </Button>
                </div>
                {errors.address && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="worker_edit.address_field_error"
                  >
                    {errors.address}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* ── Form Actions ─────────────────────────────────────────────── */}
          <div className="flex gap-3 pb-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.navigate({ to: "/worker/dashboard" })}
              data-ocid="worker_edit.cancel_button"
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:opacity-90 gap-2"
              disabled={isPending}
              data-ocid="worker_edit.save_button"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {t("common.save")}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
