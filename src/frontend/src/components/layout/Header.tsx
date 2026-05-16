import ShramikLogo from "@/components/ShramikLogo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import type { Language } from "@/types";
import { Link, useRouter } from "@tanstack/react-router";
import { Globe, HardHat, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";

const LANG_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "hi", label: "HI" },
  { value: "mr", label: "MR" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, language, setLanguage } = useGlobalTranslation();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    auth.logout();
    setMenuOpen(false);
    router.navigate({ to: "/" });
  };

  const navLinks = [
    { to: "/", label: t("nav.home"), always: true },
    { to: "/discover", label: t("nav.discover"), always: true },
    ...(!auth.isAuthenticated
      ? [{ to: "/register", label: t("nav.register"), always: false }]
      : []),
    ...(auth.isWorker
      ? [{ to: "/worker/dashboard", label: t("nav.dashboard"), always: false }]
      : []),
    ...(auth.isAdmin
      ? [{ to: "/admin/dashboard", label: t("admin.dashboard"), always: false }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.logo_link"
          >
            <ShramikLogo
              size="sm"
              showText={false}
              className="group-hover:scale-105 transition-smooth"
            />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-xl text-foreground">
                Shramik
              </span>
              <p className="text-xs text-muted-foreground leading-none -mt-0.5">
                {t("nav.tagline")}
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-smooth"
                activeProps={{
                  className:
                    "px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/10",
                }}
                data-ocid={`nav.${link.to.replace(/\//g, "").replace(/-/g, "_")}_link`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div
              className="flex items-center gap-0.5 bg-muted rounded-md p-0.5"
              data-ocid="header.language_selector"
            >
              <Globe className="w-3.5 h-3.5 text-muted-foreground ml-1" />
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLanguage(opt.value)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-smooth ${
                    language === opt.value
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`header.lang_${opt.value}_button`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Auth controls */}
            {auth.isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                  {auth.userName}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  data-ocid="header.logout_button"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" data-ocid="header.login_link">
                  <Button type="button" variant="ghost" size="sm">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/register" data-ocid="header.register_link">
                  <Button
                    type="button"
                    size="sm"
                    className="bg-accent text-accent-foreground hover:opacity-90"
                  >
                    {t("nav.register")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t("nav.menu")}
              data-ocid="header.menu_toggle"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-card border-t border-border shadow-lg"
          data-ocid="header.mobile_menu"
        >
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-smooth w-full"
                activeProps={{
                  className:
                    "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-primary bg-primary/10 w-full",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border">
              {auth.isAuthenticated ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-3 py-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {auth.userName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-smooth w-full"
                    data-ocid="header.mobile_logout_button"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("nav.logout")}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button type="button" variant="outline" className="w-full">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <Button
                      type="button"
                      className="w-full bg-accent text-accent-foreground hover:opacity-90"
                    >
                      {t("nav.register")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
