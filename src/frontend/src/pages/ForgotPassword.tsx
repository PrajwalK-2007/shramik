import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";

export function ForgotPasswordPage() {
  return (
    <div
      className="min-h-[85vh] flex items-center justify-center bg-muted/30 py-12 px-4"
      data-ocid="forgot_password.page"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-display-md text-foreground">Forgot Password?</h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xs mx-auto">
            Password reset is coming soon. Please contact the admin for help
            with your account.
          </p>
        </div>

        <Card className="border-border shadow-card">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="rounded-lg bg-muted/60 border border-border px-4 py-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                For account recovery, please reach out to the platform admin at{" "}
                <a
                  href="mailto:shramik@gmail.com"
                  className="text-primary hover:underline font-medium"
                >
                  shramik@gmail.com
                </a>
              </p>
            </div>
            <Link to="/login">
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                data-ocid="forgot_password.back_button"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
