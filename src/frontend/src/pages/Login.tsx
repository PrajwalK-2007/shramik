import ShramikLogo from "@/components/ShramikLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Clock,
  Eye,
  EyeOff,
  HardHat,
  Info,
  Loader2,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LoginPage() {
  const { t } = useGlobalTranslation();
  const auth = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [pendingApproval, setPendingApproval] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = t("common.required");
    else if (!validateEmail(email)) e.email = "Enter a valid email address";
    if (!password.trim()) e.password = t("common.required");
    else if (password.length < 4)
      e.password = "Password must be at least 4 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitError("");
    setPendingApproval(false);
    if (!validate()) return;
    setLoading(true);
    setConnecting(true);

    const result = await auth.loginAsWorker(email, password, rememberMe);
    setConnecting(false);
    if (result.success) {
      toast.success(t("auth.loginSuccess"));
      router.navigate({ to: "/worker/dashboard" });
    } else {
      const isPending = result.error?.toLowerCase().includes("pending");
      if (isPending) setPendingApproval(true);
      setSubmitError(result.error ?? t("auth.invalidCredentials"));
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center bg-muted/30 py-12 px-4"
      data-ocid="login.page"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ShramikLogo size="lg" showText={false} />
          </div>
          <h1 className="text-display-md text-foreground">
            {t("auth.loginAsWorker")}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Welcome back to Shramik — Worker Portal
          </p>
        </div>

        {/* Info banner */}
        <div className="mb-4 rounded-lg bg-primary/8 border border-primary/20 px-4 py-3 flex gap-3 items-start">
          <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground/80 leading-relaxed">
            <span className="font-semibold text-foreground">New here?</span>{" "}
            Register as a worker to start getting hired. Your account will be
            activated after admin review within 24 hours.
          </p>
        </div>

        <Card className="border-border shadow-card">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="email">{t("auth.email")} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  onBlur={() => {
                    if (!email.trim())
                      setErrors((p) => ({ ...p, email: t("common.required") }));
                    else if (!validateEmail(email))
                      setErrors((p) => ({
                        ...p,
                        email: "Enter a valid email address",
                      }));
                  }}
                  placeholder="your@email.com"
                  className={errors.email ? "border-destructive" : ""}
                  data-ocid="login.email_input"
                />
                {errors.email && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="login.email_field_error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("auth.password")} *</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                    data-ocid="login.forgot_password_link"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: "" }));
                    }}
                    onBlur={() => {
                      if (!password.trim())
                        setErrors((p) => ({
                          ...p,
                          password: t("common.required"),
                        }));
                    }}
                    placeholder="••••••"
                    className={
                      errors.password ? "border-destructive pr-10" : "pr-10"
                    }
                    data-ocid="login.password_input"
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
                    data-ocid="login.password_field_error"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-primary cursor-pointer"
                  data-ocid="login.remember_me_checkbox"
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm text-muted-foreground cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>

              {/* Connecting state */}
              {connecting && (
                <div
                  className="rounded-lg bg-primary/8 border border-primary/20 px-3 py-2.5 flex items-center gap-2"
                  data-ocid="login.loading_state"
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
                  data-ocid="login.error_state"
                >
                  {pendingApproval && (
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <p className="text-xs font-semibold text-amber-600">
                        Pending Admin Approval
                      </p>
                    </div>
                  )}
                  <p className="text-sm text-destructive">{submitError}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                data-ocid="login.submit_button"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />{" "}
                    {connecting ? "Connecting…" : t("common.loading")}
                  </span>
                ) : (
                  t("auth.login")
                )}
              </Button>
            </form>

            <div className="mt-5 space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                {t("auth.noAccount")}{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-medium"
                  data-ocid="login.register_worker_link"
                >
                  {t("nav.register")}
                </Link>
              </p>
              <div className="border-t border-border pt-3">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth"
                  data-ocid="login.admin_link"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t("auth.adminLogin")}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
