import { createActor } from "@/backend";
import { HomeWorkerMap } from "@/components/HomeWorkerMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useGlobalTranslation } from "@/hooks/useTranslation";
import { useRecentVerifiedWorkers } from "@/hooks/useWorker";
import { PROFESSIONS } from "@/types";
import type { WorkerPublic } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  Globe,
  HardHat,
  Home as HomeIcon,
  MapPin,
  PartyPopper,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Truck,
  UserCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Animated counter hook ────────────────────────────────────────────────
function useCounter(target: number, duration = 1800) {
  const [displayCount, setDisplayCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  const targetRef = useRef(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (targetRef.current !== target) {
      targetRef.current = target;
      started.current = false;
      setDisplayCount(0);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current && target > 0) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setDisplayCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count: displayCount, ref };
}

function StatCard({
  target,
  label,
  suffix = "+",
  icon: Icon,
  color,
}: {
  target: number;
  label: string;
  suffix?: string;
  icon: React.ElementType;
  color: string;
}) {
  const { count, ref } = useCounter(target);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-elevated transition-smooth group"
      data-ocid="home.stat_card"
    >
      <div
        className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-smooth`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span
        ref={ref}
        className="block text-4xl md:text-5xl font-display font-bold text-foreground"
      >
        {count.toLocaleString()}
        {suffix}
      </span>
      <p className="mt-1.5 text-sm text-muted-foreground font-medium">
        {label}
      </p>
    </motion.div>
  );
}

// ─── Recent worker card ─────────────────────────────────────────────────────
const PROFESSION_ICONS: Record<string, string> = {
  Mason: "🧱",
  Carpenter: "🪚",
  Electrician: "⚡",
  Plumber: "🔧",
  Painter: "🎨",
  Welder: "🔥",
  Cook: "🍳",
  Cleaner: "🧹",
  Driver: "🚗",
  Gardner: "🌱",
  Mechanic: "🔩",
  Helper: "🤝",
  SecurityGuard: "🛡️",
  Tailor: "🧵",
  Barber: "✂️",
  SteelFixer: "⚙️",
  TileLayer: "⬜",
  RoofWorker: "🏠",
  Other: "🔨",
};

const COLOR_POOL = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-accent-foreground",
];

function RecentWorkerCard({
  worker,
  index,
}: { worker: WorkerPublic; index: number }) {
  const professionLabel =
    worker.profession === "Other" && worker.profession_custom
      ? worker.profession_custom
      : (PROFESSIONS.find((p) => p.value === worker.profession)?.label ??
        worker.profession);
  const icon = PROFESSION_ICONS[worker.profession] ?? "🔨";
  const colorClass = COLOR_POOL[index % COLOR_POOL.length];
  const initials = worker.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-elevated transition-smooth group"
      data-ocid={`home.recent_worker.${index + 1}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          {worker.profile_photo ? (
            <img
              src={worker.profile_photo}
              alt={worker.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-border"
            />
          ) : (
            <div
              className={`w-14 h-14 rounded-2xl ${colorClass} font-bold text-lg flex items-center justify-center group-hover:scale-105 transition-smooth`}
            >
              {initials}
            </div>
          )}
          {worker.is_available && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="font-semibold text-foreground truncate text-sm">
              {worker.name}
            </h3>
            {worker.verification_status === "Verified" && (
              <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {icon} {professionLabel}
          </p>
          {worker.location_address && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{worker.location_address}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Hourly Rate</span>
          <span className="text-sm font-bold text-foreground">
            ₹{worker.hourly_rate}/hr
          </span>
        </div>
        {worker.availability.startTime && (
          <div className="flex items-center gap-1 flex-wrap">
            <Badge variant="secondary" className="text-xs gap-1 px-2 py-0.5">
              <Clock className="w-2.5 h-2.5" />
              {worker.availability.startTime} – {worker.availability.endTime}
            </Badge>
          </div>
        )}
        {worker.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {worker.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-border">
        <a href={`tel:${worker.phone}`}>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="w-full gap-1.5 hover:border-primary/50 hover:text-primary transition-smooth"
            data-ocid={`home.recent_worker_contact.${index + 1}`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Contact Worker
          </Button>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Static data ───────────────────────────────────────────────────────────
const PROFESSION_CATEGORIES = [
  {
    icon: Wrench,
    label: "Construction",
    count: "820+",
    bg: "bg-primary/10",
    color: "text-primary",
    key: "construction",
  },
  {
    icon: Truck,
    label: "Transport",
    count: "340+",
    bg: "bg-secondary/10",
    color: "text-secondary",
    key: "transport",
  },
  {
    icon: HomeIcon,
    label: "Household",
    count: "560+",
    bg: "bg-accent/10",
    color: "text-accent",
    key: "household",
  },
  {
    icon: PartyPopper,
    label: "Events",
    count: "210+",
    bg: "bg-primary/10",
    color: "text-primary",
    key: "events",
  },
];

const PROFESSIONS_GRID = [
  { icon: "🧱", name: "Mason", count: "240+" },
  { icon: "⚡", name: "Electrician", count: "180+" },
  { icon: "🔧", name: "Plumber", count: "160+" },
  { icon: "🍳", name: "Cook", count: "220+" },
  { icon: "🧹", name: "Cleaner", count: "190+" },
  { icon: "🚗", name: "Driver", count: "210+" },
  { icon: "🎨", name: "Painter", count: "140+" },
  { icon: "🪚", name: "Carpenter", count: "170+" },
];

// Photo-based profession cards
const PROFESSION_PHOTO_CARDS = [
  {
    name: "Carpenter",
    img: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400&auto=format&fit=crop",
    profession: "Carpenter",
  },
  {
    name: "Electrician",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop",
    profession: "Electrician",
  },
  {
    name: "Plumber",
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&auto=format&fit=crop",
    profession: "Plumber",
  },
  {
    name: "Painter",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&auto=format&fit=crop",
    profession: "Painter",
  },
  {
    name: "Mason",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&auto=format&fit=crop",
    profession: "Mason",
  },
  {
    name: "Driver",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
    profession: "Driver",
  },
  {
    name: "Housekeeper",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&auto=format&fit=crop",
    profession: "Cleaner",
  },
  {
    name: "Cook",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop",
    profession: "Cook",
  },
  {
    name: "Welder",
    img: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=400&q=80",
    profession: "Welder",
  },
  {
    name: "Security Guard",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
    profession: "SecurityGuard",
  },
  {
    name: "Gardener",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    profession: "Gardner",
  },
  {
    name: "Tailor",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    profession: "Tailor",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: UserCheck,
    titleKey: "home.step1.title",
    descKey: "home.step1.desc",
    color: "bg-primary/10 text-primary",
  },
  {
    step: 2,
    icon: ShieldCheck,
    titleKey: "home.step2.title",
    descKey: "home.step2.desc",
    color: "bg-secondary/10 text-secondary",
  },
  {
    step: 3,
    icon: MapPin,
    titleKey: "home.step3.title",
    descKey: "home.step3.desc",
    color: "bg-accent/10 text-accent",
  },
  {
    step: 4,
    icon: PhoneCall,
    titleKey: "home.step4.title",
    descKey: "home.step4.desc",
    color: "bg-primary/10 text-primary",
  },
];

function useLiveStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["home", "stats"],
    queryFn: async () => {
      if (!actor) return null;
      const s = await actor.getStats();
      return {
        total_workers: Number(s.total_workers),
        verified_workers: Number(s.verified_workers),
        avg_hourly_rate: Number(s.avg_hourly_rate),
      };
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export function HomePage() {
  const { t } = useGlobalTranslation();
  const auth = useAuth();
  const { data: stats, isLoading: statsLoading } = useLiveStats();
  const { data: recentWorkers = [], isLoading: recentLoading } =
    useRecentVerifiedWorkers(3);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const totalWorkers = statsLoading ? 0 : (stats?.total_workers ?? 0);
  const verifiedWorkers = statsLoading ? 0 : (stats?.verified_workers ?? 0);
  const avgRate = statsLoading ? 0 : (stats?.avg_hourly_rate ?? 0);

  const scrollToMap = () => {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      {/* ── Worker Logout Banner ───────────────────────────────────────────── */}
      {auth.isAuthenticated && auth.isWorker && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-bold">
                  {auth.userName?.charAt(0)?.toUpperCase() || "W"}
                </span>
              </div>
              <span className="font-medium text-sm">
                Welcome back,{" "}
                <span className="font-bold">{auth.userName || "Worker"}</span>!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/worker/dashboard"
                className="text-xs text-white/80 hover:text-white underline mr-2"
              >
                My Dashboard
              </a>
              <button
                type="button"
                onClick={() => auth.logout()}
                className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  role="img"
                  aria-label="Logout"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── Hero Section — real photo background ─────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[720px] flex items-center"
        data-ocid="home.hero_section"
      >
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')",
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 pointer-events-none" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text side */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <Badge className="mb-5 bg-white/15 text-white border-white/25 backdrop-blur-sm text-sm">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Connecting Workers & Families Across India
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold text-white leading-tight mb-5">
                  {t("home.hero.title")}
                </h1>
                <p className="text-lg text-white/85 mb-8 max-w-lg leading-relaxed">
                  {t("home.hero.subtitle")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                {/* Orange CTA — Sign Up as Worker */}
                <Link to="/register" data-ocid="home.hero_register_button">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="button"
                      size="lg"
                      className="w-full sm:w-auto gap-2 text-base font-semibold shadow-lg bg-amber-500 hover:bg-amber-600 text-foreground"
                    >
                      <HardHat className="w-5 h-5" />
                      {t("home.hero.registerCta")}
                    </Button>
                  </motion.div>
                </Link>
                {/* Outline CTA — Find Workers */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={scrollToMap}
                    className="w-full sm:w-auto gap-2 text-base font-semibold border-2 border-white/60 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                    data-ocid="home.hero_find_workers_button"
                  >
                    <MapPin className="w-5 h-5" />
                    {t("home.hero.cta")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-4"
              >
                {[
                  { icon: ShieldCheck, text: "Admin Verified" },
                  { icon: MapPin, text: "Location Based" },
                  { icon: Globe, text: "Hindi · English · Marathi" },
                ].map(({ icon: I, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 text-sm text-white/80"
                  >
                    <I className="w-4 h-4 text-white/60" />
                    {text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image side — floating card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-3xl bg-primary/30" />
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
                  alt="Skilled workers on Shramik platform"
                  className="rounded-3xl shadow-2xl w-full object-cover"
                  style={{ maxHeight: "420px" }}
                />
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl shadow-elevated p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Verified Workers
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {verifiedWorkers > 0
                        ? `${verifiedWorkers}+ active`
                        : "Growing daily"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Section ────────────────────────────────────────────────────── */}
      <section
        className="bg-muted/40 border-b border-border py-14"
        data-ocid="home.stats_section"
      >
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8"
          >
            Platform at a Glance
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <StatCard
              target={totalWorkers}
              label={t("home.stats.workers")}
              suffix={statsLoading ? "" : "+"}
              icon={Users}
              color="bg-primary/10 text-primary"
            />
            <StatCard
              target={verifiedWorkers}
              label={t("home.stats.verified")}
              suffix={statsLoading ? "" : "+"}
              icon={ShieldCheck}
              color="bg-secondary/10 text-secondary"
            />
            <StatCard
              target={avgRate}
              label="Avg. Hourly Rate (₹)"
              suffix={statsLoading ? "" : "/hr"}
              icon={Zap}
              color="bg-accent/10 text-accent"
            />
          </div>
        </div>
      </section>

      {/* ── Browse by Profession (photo cards) ───────────────────────────────── */}
      <section
        className="bg-background py-16"
        data-ocid="home.browse_profession_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-display-lg text-foreground mb-2 font-bold">
              Browse by Profession
            </h2>
            <p className="text-muted-foreground">
              Find the right worker for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {PROFESSION_PHOTO_CARDS.map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                data-ocid={`home.profession_photo_card.${i + 1}`}
              >
                <Link
                  to="/discover"
                  className="block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-medium text-sm text-foreground">
                      {card.name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GPS Map Section ──────────────────────────────────────────────────── */}
      <motion.section
        ref={mapSectionRef}
        id="find-workers-map"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="bg-muted/30 border-y border-border py-16"
        data-ocid="home.map_section"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-display-lg text-foreground mb-2">
              Find Workers Near You
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Discover admin-verified workers in your area. Click any pin to see
              their full profile and contact details.
            </p>
          </div>
          <HomeWorkerMap />
        </div>
      </motion.section>

      {/* ── Recent Verified Workers ───────────────────────────────────────────── */}
      <section
        className="bg-background border-b border-border py-16"
        data-ocid="home.recent_workers_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-display-lg text-foreground mb-2">
              Recently Verified Workers
            </h2>
            <p className="text-muted-foreground">
              Latest admin-approved workers ready to connect
            </p>
          </motion.div>

          {recentLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-2xl p-6 animate-pulse"
                  data-ocid="home.recent_worker_skeleton"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentWorkers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-card border border-dashed border-border rounded-2xl"
              data-ocid="home.recent_workers_empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HardHat className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Be the first verified worker in your area!
              </h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                Register now and get admin-verified to appear here for thousands
                of people looking for skilled workers.
              </p>
              <Link to="/register" data-ocid="home.empty_state_register_button">
                <Button type="button" className="gap-2">
                  <HardHat className="w-4 h-4" />
                  Register as Worker
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentWorkers.map((worker, i) => (
                <RecentWorkerCard key={worker.id} worker={worker} index={i} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/discover" data-ocid="home.view_all_workers_button">
              <Button type="button" variant="outline" className="gap-2">
                <Users className="w-4 h-4" />
                View All Workers
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 border-b border-border py-16"
        data-ocid="home.how_it_works_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-lg text-foreground mb-2">
              {t("home.howItWorks")}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Simple steps to connect workers and seekers across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-elevated transition-smooth group">
                  <div
                    className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
                {i < 3 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-5 h-5 text-muted-foreground" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Profession Categories ─────────────────────────────────────────── */}
      <section
        className="bg-background py-16"
        data-ocid="home.professions_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-display-lg text-foreground mb-2">
              {t("home.featured")}
            </h2>
            <p className="text-muted-foreground">
              Browse workers by category or profession
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {PROFESSION_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <Link
                  to="/discover"
                  className="flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-elevated transition-smooth group"
                  data-ocid={`home.category_card.${i + 1}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center group-hover:scale-110 transition-smooth`}
                  >
                    <cat.icon className={`w-7 h-7 ${cat.color}`} />
                  </div>
                  <span className="font-semibold text-foreground text-center text-sm">
                    {cat.label}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {cat.count} workers
                  </Badge>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PROFESSIONS_GRID.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to="/discover"
                  className="flex flex-col items-center gap-2 p-3.5 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-card transition-smooth group"
                  data-ocid={`home.profession_card.${i + 1}`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-smooth">
                    {p.icon}
                  </span>
                  <span className="text-xs font-medium text-foreground text-center">
                    {p.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {p.count}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Shramik ────────────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 border-y border-border py-16"
        data-ocid="home.why_us_section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-lg text-foreground mb-2">
              {t("home.whyUs")}
            </h2>
            <p className="text-muted-foreground">
              Built for the workers and the people who need them
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShieldCheck,
                titleKey: "home.trust.verified",
                descKey: "home.trust.verifiedDesc",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                icon: MapPin,
                titleKey: "home.trust.location",
                descKey: "home.trust.locationDesc",
                color: "text-secondary",
                bg: "bg-secondary/10",
              },
              {
                icon: Zap,
                titleKey: "home.trust.free",
                descKey: "home.trust.freeDesc",
                color: "text-accent",
                bg: "bg-accent/10",
              },
              {
                icon: Globe,
                titleKey: "home.trust.multilingual",
                descKey: "home.trust.multilingualDesc",
                color: "text-primary",
                bg: "bg-primary/10",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-elevated transition-smooth group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.48 0.18 263) 0%, oklch(0.55 0.15 190) 50%, oklch(0.6 0.15 142) 100%)",
        }}
        data-ocid="home.cta_section"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-display-lg text-white mb-3">
              Ready to Find Workers or Get Hired?
            </h2>
            <p className="text-white/80 mb-8 text-body-lg max-w-lg mx-auto">
              Join the Shramik platform — connecting skilled workers with
              families across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register" data-ocid="home.cta_register_button">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="button"
                    size="lg"
                    className="gap-2 font-semibold shadow-lg"
                    style={{
                      background: "oklch(0.7 0.21 65)",
                      color: "oklch(0.12 0 0)",
                    }}
                  >
                    <HardHat className="w-5 h-5" />
                    Register as Worker
                  </Button>
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={scrollToMap}
                  className="gap-2 font-semibold border-2 border-white/60 text-white bg-white/10 hover:bg-white/20"
                  data-ocid="home.cta_find_workers_button"
                >
                  <MapPin className="w-5 h-5" />
                  Find Workers Near Me
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
