import { useAuth } from "@/hooks/useAuth";
import { Outlet, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  requireWorker?: boolean;
  requireSeeker?: boolean;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  requireAdmin = false,
  requireWorker = false,
  requireSeeker = false,
  requireAuth = false,
}: ProtectedRouteProps) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth state is missing from localStorage (session expired/cleared), force to login
    const stored = localStorage.getItem("shramik_auth");
    const hasSession = stored !== null;

    if (!hasSession) {
      if (requireAdmin || requireWorker || requireSeeker || requireAuth) {
        router.navigate({ to: requireAdmin ? "/admin/login" : "/login" });
        return;
      }
    }

    if (requireAdmin && !auth.isAdmin) {
      router.navigate({ to: "/admin/login" });
      return;
    }
    if (requireWorker && !auth.isWorker) {
      router.navigate({ to: "/login" });
      return;
    }
    if (requireSeeker && !auth.isSeeker) {
      router.navigate({ to: "/login" });
      return;
    }
    if (requireAuth && !auth.isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [auth, requireAdmin, requireWorker, requireSeeker, requireAuth, router]);

  if (requireAdmin && !auth.isAdmin) return null;
  if (requireWorker && !auth.isWorker) return null;
  if (requireSeeker && !auth.isSeeker) return null;
  if (requireAuth && !auth.isAuthenticated) return null;

  return <Outlet />;
}
