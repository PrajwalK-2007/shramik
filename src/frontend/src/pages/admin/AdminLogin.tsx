import ShramikLogo from "@/components/ShramikLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { Link, useRouter } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ADMIN_FEATURES = [
  { icon: Users, label: "Manage all workers & seekers" },
  { icon: CheckCircle, label: "Approve / reject registrations" },
  { icon: BarChart3, label: "View platform analytics" },
  { icon: Lock, label: "Full administrative control" },
];

export function AdminLoginPage() {
  const { t } = useGlobalTranslation();
  const auth = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = t("common.required");
    else if (!validateEmail(email)) e.email = "Enter a valid email address";
    if (!password.trim()) e.password = t("common.required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setLoading(true);
    setConnecting(true);
    const result = await auth.loginAsAdmin(email, password);
    setConnecting(false);
    if (result.success) {
      toast.success(t("auth.loginSuccess"));
      router.navigate({ to: "/admin/dashboard" });
    } else {
      setSubmitError(result.error ?? t("auth.invalidCredentials"));
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center py-12 px-4"
      data-ocid="admin_login.page"
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: branding panel */}
        <div className="hidden md:flex flex-col bg-card border border-border rounded-2xl p-8 h-full justify-between shadow-card">
          <div>
            <div className="mb-6">
              <ShramikLogo size="lg" showText={true} />
            </div>
            <h2 className="text-display-md text-foreground mb-2">
              Shramik Admin
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Central command for managing the Shramik platform. Verify workers,
              monitor activity, and keep the community safe.
            </p>
            <div className="space-y-4">
              {ADMIN_FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-foreground mb-1">
                Admin Credentials
              </p>
              <p className="text-xs text-muted-foreground">
                Email: shramik@gmail.com
              </p>
              <p className="text-xs text-muted-foreground">
                Authorized personnel only.
              </p>
            </div>
          </div>
        </div>

        {/* Right: login form */}
        <div className="w-full">
          <div className="text-center mb-8">
            {/* Mobile icon (hidden on md+) */}
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 md:hidden">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-display-md text-foreground">
              {t("auth.adminLogin")}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Shramik Administration Portal
            </p>
          </div>

          <Card className="border-border shadow-card">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="admin-email">{t("auth.email")} *</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                    }}
                    onBlur={() => {
                      if (!email.trim())
                        setErrors((p) => ({
                          ...p,
                          email: t("common.required"),
                        }));
                      else if (!validateEmail(email))
                        setErrors((p) => ({
                          ...p,
                          email: "Enter a valid email address",
                        }));
                    }}
                    placeholder="shramik@gmail.com"
                    className={errors.email ? "border-destructive" : ""}
                    autoComplete="username"
                    data-ocid="admin_login.email_input"
                  />
                  {errors.email && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="admin_login.email_field_error"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="admin-password">{t("auth.password")} *</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password)
                          setErrors((p) => ({ ...p, password: "" }));
                      }}
                      onBlur={() => {
                        if (!password.trim())
                          setErrors((p) => ({
                            ...p,
                            password: t("common.required"),
                          }));
                      }}
                      placeholder="••••••••"
                      className={
                        errors.password ? "border-destructive pr-10" : "pr-10"
                      }
                      autoComplete="current-password"
                      data-ocid="admin_login.password_input"
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
                  {errors.password && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="admin_login.password_field_error"
                    >
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Connecting state */}
                {connecting && (
                  <div
                    className="rounded-lg bg-primary/8 border border-primary/20 px-3 py-2.5 flex items-center gap-2"
                    data-ocid="admin_login.loading_state"
                  >
                    <Wifi className="w-4 h-4 text-primary animate-pulse flex-shrink-0" />
                    <p className="text-sm text-foreground/80">
                      Connecting to server, please wait…
                    </p>
                    <Loader2 className="w-4 h-4 text-primary animate-spin ml-auto flex-shrink-0" />
                  </div>
                )}

                {submitError && (
                  <div
                    className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5"
                    data-ocid="admin_login.error_state"
                  >
                    <p className="text-sm text-destructive">{submitError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  data-ocid="admin_login.submit_button"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {connecting ? "Connecting…" : "Authenticating…"}
                    </span>
                  ) : (
                    "Login to Admin Panel"
                  )}
                </Button>
              </form>

              <div className="mt-5 pt-4 border-t border-border text-center">
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                  data-ocid="admin_login.back_link"
                >
                  ← Back to Worker Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
