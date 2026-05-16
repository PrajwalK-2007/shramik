import ShramikLogo from "@/components/ShramikLogo";
import { Button } from "@/components/ui/button";
import { usePendingWorkers } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronRight,
  Clock,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldAlert,
  Users,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

const NAV_ITEMS: Array<{
  to: "/admin/dashboard" | "/admin/pending" | "/admin/users" | "/admin/stats";
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  badge?: boolean;
}> = [
  {
    to: "/admin/dashboard",
    icon: LayoutDashboard,
    labelKey: "admin.dashboard",
  },
  {
    to: "/admin/pending",
    icon: Clock,
    labelKey: "admin.pendingApprovals",
    badge: true,
  },
  { to: "/admin/users", icon: Users, labelKey: "admin.users" },
  { to: "/admin/stats", icon: BarChart3, labelKey: "admin.stats" },
];

function useCurrentPath() {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

export function AdminLayout() {
  const { t } = useGlobalTranslation();
  const auth = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: pending } = usePendingWorkers();
  const currentPath = useCurrentPath();

  const handleLogout = () => {
    auth.logout();
    toast.success(t("auth.logoutSuccess"));
    router.navigate({ to: "/admin/login" });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-5 py-5 border-b border-border">
        <ShramikLogo size="sm" showText={true} />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ to, icon: Icon, labelKey, badge }) => {
          const isActive =
            currentPath === to || currentPath.startsWith(to.concat("/"));
          const pendingCount = badge ? (pending?.length ?? 0) : 0;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              data-ocid={`admin_nav.${to.split("/").pop()}_link`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{t(labelKey)}</span>
              {pendingCount > 0 && (
                <span
                  className={`text-xs rounded-full px-2 py-0.5 font-semibold ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-warning/20 text-warning"
                  }`}
                >
                  {pendingCount}
                </span>
              )}
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: user info + logout */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-2.5 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-xs font-bold">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {auth.userName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {auth.userEmail}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          data-ocid="admin_nav.logout_button"
        >
          <LogOut className="w-4 h-4" />
          {t("nav.logout")}
        </Button>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex bg-muted/20"
      data-ocid="admin_layout.page"
    >
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-card border-r border-border flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSidebarOpen(false);
            }}
            role="presentation"
          />
          <aside className="relative flex flex-col w-64 bg-card border-r border-border z-10">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            data-ocid="admin_layout.menu_button"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <ShieldAlert className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm text-foreground">
              Shramik Admin
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
