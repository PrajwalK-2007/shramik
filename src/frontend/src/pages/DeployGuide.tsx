import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckSquare,
  ChevronRight,
  Cloud,
  Download,
  Globe,
  Key,
  Printer,
  RefreshCw,
  Settings,
  Terminal,
  TriangleAlert,
  Upload,
} from "lucide-react";

// ─── Code Snippets ───────────────────────────────────────────────────────────

const GIT_COMMANDS_EXISTING = `# Your code is already on GitHub at:
https://github.com/PrajwalK-2007/shramik

# To pull the latest version to your computer (optional):
git clone https://github.com/PrajwalK-2007/shramik.git
cd shramik`;

const GIT_COMMANDS_NEW = `# Run these in your terminal from the project folder:
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Create a repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/shramik.git
git push -u origin main`;

const VERCEL_ENV_VARS = `VITE_CANISTER_ID_BACKEND = xxxxx-xxxxx-xxxxx-xxxxx-cai
VITE_DFX_NETWORK = ic`;

const VERCEL_JSON_CONTENT = `{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`;

const VERCEL_JSON_COMMIT = `# Create the file at: src/frontend/vercel.json
# Then commit and push:
git add .
git commit -m "Add vercel.json for SPA routing"
git push`;

// ─── Step Metadata ────────────────────────────────────────────────────────────

const STEPS = [
  { icon: Upload, label: "Code on GitHub", color: "bg-primary" },
  { icon: Key, label: "Get Canister ID", color: "bg-secondary" },
  { icon: Cloud, label: "Sign up Vercel", color: "bg-accent" },
  { icon: Globe, label: "Import Repo", color: "bg-primary" },
  { icon: Settings, label: "Env Variables", color: "bg-secondary" },
  { icon: RefreshCw, label: "Deploy", color: "bg-accent" },
  { icon: CheckSquare, label: "Test Live Site", color: "bg-primary" },
  { icon: TriangleAlert, label: "Fix Errors", color: "bg-secondary" },
  { icon: Terminal, label: "vercel.json", color: "bg-accent" },
];

const CHECKLIST_ITEMS = [
  "Home page loads without a blank screen",
  "GPS map shows on home page and discover page",
  "Worker registration form submits successfully (3 steps)",
  "New worker appears in admin pending list",
  "Admin login works (shramik@gmail.com / shramik!@#123)",
  "Admin can approve a worker — worker moves to verified list",
  "Approved worker appears in home page worker cards",
  "Worker can log in after admin approval",
  "Worker dashboard shows (profile, availability toggle, logout)",
  "Language switcher changes text (EN / HI / MR)",
  "Page refresh works — no 404 error",
];

const ERROR_TABLE: { error: string; cause: string; fix: string }[] = [
  {
    error: "Blank page on Vercel",
    cause: "Wrong Root Directory",
    fix: "Set Root Directory to src/frontend in Vercel import settings",
  },
  {
    error: "Admin login fails",
    cause: "Missing/wrong canister ID",
    fix: "Check VITE_CANISTER_ID_BACKEND is correct and VITE_DFX_NETWORK = ic",
  },
  {
    error: '"Cannot connect to backend"',
    cause: "ICP canister paused",
    fix: "Go to Caffeine platform → make sure your project is deployed and running",
  },
  {
    error: "404 on page refresh",
    cause: "Missing SPA rewrite rule",
    fix: "Add vercel.json to src/frontend/ — see Step 9 in this guide",
  },
  {
    error: "Build failed on Vercel",
    cause: "Wrong install command",
    fix: "Change Install Command to npm install instead of pnpm install in Vercel settings",
  },
  {
    error: "CORS error in browser",
    cause: "ICP canister not live",
    fix: "Make sure your Caffeine project is deployed; ICP handles CORS automatically",
  },
  {
    error: "Workers not showing",
    cause: "Wrong canister ID or network",
    fix: "Double-check VITE_CANISTER_ID_BACKEND and VITE_DFX_NETWORK = ic, then redeploy",
  },
];

// ─── Reusable Sub-Components ──────────────────────────────────────────────────

function StepBadge({ num, color }: { num: number; color: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold text-white ${color} shrink-0 shadow-sm`}
    >
      {num}
    </span>
  );
}

function SectionHeader({
  num,
  icon: Icon,
  title,
  subtitle,
  color,
}: {
  num: number;
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  color: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <StepBadge num={num} color={color} />
      <div>
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-bold text-foreground">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function CodeBlock({
  code,
  language = "bash",
}: { code: string; language?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border my-4">
      <div className="flex items-center gap-2 bg-[#1e1e2e] px-4 py-2 border-b border-[#313244]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-[#cdd6f4]/50 ml-2">{language}</span>
      </div>
      <pre className="bg-[#1e1e2e] text-[#cdd6f4] text-sm leading-relaxed p-5 overflow-x-auto font-mono whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

function InfoBox({
  children,
  type = "info",
}: { children: React.ReactNode; type?: "info" | "warning" | "success" }) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    success: "bg-green-50 border-green-200 text-green-900",
  };
  const icons = { info: "💡", warning: "⚠️", success: "✅" };
  return (
    <div className={`rounded-xl border p-4 my-4 text-sm ${styles[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}

export function DeployGuidePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background" data-ocid="deploy_guide.page">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-break { page-break-before: always; }
        }
      `}</style>

      {/* Sticky top nav */}
      <div className="sticky top-0 z-40 bg-card border-b border-border shadow-sm no-print">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="deploy_guide.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">
              Deployment Guide
            </span>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-md hover:opacity-90 transition-colors"
            data-ocid="deploy_guide.print_button"
          >
            <Printer className="w-4 h-4" />
            Print Guide
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            Option A — Frontend on Vercel + ICP Backend
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-3">
            Deploy Shramik on Vercel
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Keep your ICP backend live on Caffeine. Deploy the React frontend to
            Vercel for a free public URL — no Node.js or database setup
            required.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-muted rounded-lg text-xs text-muted-foreground">
            <Terminal className="w-3.5 h-3.5" />
            Last updated: Option A — Frontend on Vercel + ICP Backend
          </div>
        </div>

        {/* Step overview grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-12 no-print">
          {STEPS.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border text-center"
            >
              <span
                className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white ${s.color}`}
              >
                {i + 1}
              </span>
              <s.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* What you need */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-primary" />
            What You Need Before Starting
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-foreground">
            {[
              ["GitHub account", "github.com (free)"],
              ["Vercel account", "vercel.com (free)"],
              [
                "Caffeine project live",
                "Your Shramik ICP canister must be deployed",
              ],
              ["Git installed", "git-scm.com"],
            ].map(([name, url]) => (
              <li key={name} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <strong>{name}</strong>{" "}
                  <span className="text-muted-foreground text-xs">— {url}</span>
                </span>
              </li>
            ))}
          </ul>
          <InfoBox type="success">
            <strong>Good news:</strong> Because your backend runs on the
            Internet Computer (ICP), you do NOT need MongoDB, a Node.js server,
            or any separate hosting for the backend. Vercel hosts only your
            React UI.
          </InfoBox>
        </section>

        {/* Step 1 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={1}
            icon={Upload}
            title="Export Your Code to GitHub"
            subtitle="Your code is already exported. If you need to push fresh changes, follow the steps below."
            color="bg-primary"
          />
          <h3 className="font-semibold text-foreground mb-2 mt-2">
            ✅ Already on GitHub?
          </h3>
          <CodeBlock code={GIT_COMMANDS_EXISTING} language="bash" />
          <h3 className="font-semibold text-foreground mb-2 mt-4">
            🆕 Starting from scratch?
          </h3>
          <ol className="space-y-2 text-sm text-foreground mb-3">
            {[
              "Go to github.com → sign in or create a free account",
              "Click the '+' button → New repository → name it shramik",
              'Leave "Add README" and ".gitignore" UNCHECKED → click Create repository',
              "Copy the HTTPS URL shown on the next page",
              "Open your terminal in the project folder and run:",
            ].map((s, i) => (
              <li key={s.slice(0, 30)} className="flex gap-3">
                <span className="flex-none w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <CodeBlock code={GIT_COMMANDS_NEW} language="bash" />
        </section>

        {/* Step 2 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={2}
            icon={Key}
            title="Get Your ICP Canister ID"
            subtitle="The frontend needs this ID to know where to find the backend on the Internet Computer."
            color="bg-secondary"
          />
          <ol className="space-y-3 text-sm text-foreground">
            {[
              "Go to your Caffeine platform project dashboard",
              'Find the "Settings" or "Deployment" section of your Shramik project',
              'Look for "Backend Canister ID" — it looks like this:',
              "Copy that value — you will paste it into Vercel in Step 5",
            ].map((s, i) => (
              <li key={s.slice(0, 30)} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div className="my-4 px-4 py-3 bg-muted rounded-xl border border-border font-mono text-sm text-muted-foreground">
            xxxxx-xxxxx-xxxxx-xxxxx-cai
          </div>
          <InfoBox type="warning">
            <strong>This is NOT a code change.</strong> You are just copying a
            value from the Caffeine dashboard and pasting it into Vercel. No
            files need to be edited.
          </InfoBox>
        </section>

        {/* Step 3 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={3}
            icon={Cloud}
            title="Sign Up on Vercel"
            subtitle="Vercel is free and takes 2 minutes to set up."
            color="bg-accent"
          />
          <ol className="space-y-2 text-sm text-foreground">
            {[
              "Go to vercel.com",
              'Click "Sign Up" → choose "Continue with GitHub"',
              "Authorize Vercel to access your GitHub repositories",
              'You will be taken to the Vercel dashboard — click "Add New Project"',
            ].map((s, i) => (
              <li key={s.slice(0, 30)} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <InfoBox type="info">
            If you already have a Vercel account, just log in and go to your
            dashboard.
          </InfoBox>
        </section>

        {/* Step 4 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6 page-break">
          <SectionHeader
            num={4}
            icon={Globe}
            title="Import the GitHub Repository"
            subtitle="Connect your shramik repo to Vercel and configure the build settings."
            color="bg-primary"
          />
          <ol className="space-y-4 text-sm">
            {(
              [
                {
                  title: "Find your repo",
                  detail:
                    'On Vercel → Add New Project → find shramik in the list → click "Import"',
                },
                {
                  title: "Framework Preset",
                  detail: 'Vercel will auto-detect "Vite". Leave it as Vite.',
                },
                {
                  title: "Set Root Directory — CRITICAL",
                  detail:
                    'Click "Edit" next to Root Directory and type: src/frontend',
                  warning: true,
                },
                {
                  title: "Build & Output Settings",
                  detail: "Use these settings:",
                  table: [
                    ["Framework Preset", "Vite"],
                    ["Root Directory", "src/frontend"],
                    ["Build Command", "pnpm build (or npm run build)"],
                    ["Output Directory", "dist"],
                    ["Install Command", "pnpm install (or npm install)"],
                  ],
                },
              ] as {
                title: string;
                detail: string;
                warning?: boolean;
                table?: string[][];
              }[]
            ).map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p
                    className={`font-semibold ${step.warning ? "text-amber-700" : "text-foreground"}`}
                  >
                    {step.warning ? "⚠️ " : ""}
                    {step.title}
                  </p>
                  <p className="text-muted-foreground mt-0.5">{step.detail}</p>
                  {step.table && (
                    <table className="mt-2 w-full text-xs border border-border rounded-lg overflow-hidden">
                      <tbody>
                        {step.table.map(([k, v]) => (
                          <tr
                            key={k}
                            className="border-b border-border last:border-0"
                          >
                            <td className="px-3 py-2 font-mono bg-muted font-medium w-2/5">
                              {k}
                            </td>
                            <td className="px-3 py-2 text-muted-foreground">
                              {v}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <InfoBox type="warning">
            <strong>Root Directory is the most important setting.</strong> If
            you leave it blank, Vercel will not find the frontend and the build
            will fail or show a blank page. It must be set to{" "}
            <code className="bg-amber-100 px-1 rounded font-mono">
              src/frontend
            </code>
            .
          </InfoBox>
        </section>

        {/* Step 5 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={5}
            icon={Settings}
            title="Add Environment Variables on Vercel"
            subtitle="Before clicking Deploy, scroll down to the Environment Variables section and add these two values."
            color="bg-secondary"
          />
          <p className="text-sm text-foreground mb-2">
            Click <strong>Add</strong> for each variable:
          </p>
          <CodeBlock code={VERCEL_ENV_VARS} language="env" />
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden mb-4">
            <thead>
              <tr className="bg-muted">
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Variable
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  What it does
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-4 py-3 font-mono text-xs text-primary font-medium">
                  VITE_CANISTER_ID_BACKEND
                </td>
                <td className="px-4 py-3 text-muted-foreground text-sm">
                  Tells the React frontend which ICP canister to connect to.
                  Paste your canister ID from Step 2 here.
                </td>
              </tr>
              <tr className="border-t border-border bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-primary font-medium">
                  VITE_DFX_NETWORK
                </td>
                <td className="px-4 py-3 text-muted-foreground text-sm">
                  Tells the frontend to connect to the live Internet Computer
                  network. Always set this to{" "}
                  <code className="bg-muted px-1 rounded font-mono text-xs">
                    ic
                  </code>
                  .
                </td>
              </tr>
            </tbody>
          </table>
          <InfoBox type="warning">
            <strong>Do not skip this step.</strong> Without these variables, the
            frontend cannot find the backend. Admin login, worker registration,
            and the GPS map will all fail.
          </InfoBox>
        </section>

        {/* Step 6 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={6}
            icon={RefreshCw}
            title="Deploy!"
            subtitle="Click the Deploy button and wait for Vercel to build your site."
            color="bg-accent"
          />
          <ol className="space-y-2 text-sm text-foreground">
            {[
              'Click the blue "Deploy" button at the bottom of the page',
              "Vercel will install dependencies, build the React app, and publish it",
              "This takes 1–3 minutes",
              'When it finishes, you will see a green "Congratulations" screen',
              "Vercel gives you a live URL, for example: https://shramik.vercel.app",
              "Click the URL to open your live site",
            ].map((s, i) => (
              <li key={s.slice(0, 30)} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <InfoBox type="success">
            Every time you push new code to GitHub, Vercel will automatically
            rebuild and redeploy your site. No manual steps needed after the
            first setup.
          </InfoBox>
        </section>

        {/* Step 7 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={7}
            icon={CheckSquare}
            title="Test Your Live Site"
            subtitle="Open the Vercel URL and run through this checklist to confirm everything works."
            color="bg-primary"
          />
          <ul className="space-y-2">
            {CHECKLIST_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-foreground"
              >
                <span className="w-5 h-5 rounded border-2 border-border flex-none" />
                {item}
              </li>
            ))}
          </ul>
          <InfoBox type="info">
            Test on both desktop and mobile. Use browser DevTools → Console tab
            to spot any errors. Most problems are caused by a missing or
            incorrect environment variable — check Step 5 first.
          </InfoBox>
        </section>

        {/* Step 8 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={8}
            icon={TriangleAlert}
            title="Common Errors & Fixes"
            subtitle="If something is not working, find your error in this table."
            color="bg-secondary"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Error
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Cause
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Fix
                  </th>
                </tr>
              </thead>
              <tbody>
                {ERROR_TABLE.map((row, i) => (
                  <tr
                    key={row.error}
                    className={`border-t border-border ${
                      i % 2 === 0 ? "bg-background" : "bg-muted/30"
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-destructive font-medium">
                      {row.error}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.cause}
                    </td>
                    <td className="px-4 py-3 text-foreground">{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 9 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6 page-break">
          <SectionHeader
            num={9}
            icon={Terminal}
            title="Add vercel.json (Fixes 404 on Page Refresh)"
            subtitle="Without this file, refreshing any page on your Vercel site will show a 404 error."
            color="bg-accent"
          />
          <p className="text-sm text-foreground mb-1">
            Create a new file at{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
              src/frontend/vercel.json
            </code>{" "}
            with this content:
          </p>
          <CodeBlock code={VERCEL_JSON_CONTENT} language="json" />
          <p className="text-sm text-foreground mb-1">
            Then commit and push it to GitHub:
          </p>
          <CodeBlock code={VERCEL_JSON_COMMIT} language="bash" />
          <InfoBox type="info">
            Vercel will automatically redeploy when you push. The 404 issue will
            be fixed after the next deployment.
          </InfoBox>
        </section>

        {/* Bonus: Custom domain */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Bonus — Add a Custom Domain
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Replace the default{" "}
            <code className="bg-muted px-1 rounded font-mono text-xs">
              shramik.vercel.app
            </code>{" "}
            URL with your own domain (e.g. shramik.in).
          </p>
          <ol className="space-y-2 text-sm text-foreground">
            {[
              "Go to Vercel Dashboard → click your shramik project → Settings → Domains",
              "Type your domain (e.g. shramik.in) → click Add",
              "Vercel shows you DNS records (an A record and a CNAME)",
              "Log in to your domain registrar (GoDaddy, Namecheap, etc.)",
              "Go to DNS settings → add the A record and CNAME that Vercel gave you",
              "Wait up to 24 hours — Vercel will activate your domain automatically",
            ].map((s, i) => (
              <li key={s.slice(0, 30)} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <InfoBox type="info">
            Connecting a custom domain on Vercel is free. You only need to buy
            the domain from a registrar like GoDaddy or Namecheap (usually
            ₹500–₹1500/year for .in domains).
          </InfoBox>
        </section>

        {/* Admin credentials */}
        <section className="mb-10 bg-primary/5 border-2 border-primary/20 rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Admin Login Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Email", value: "shramik@gmail.com" },
              { label: "Password", value: "shramik!@#123" },
              { label: "Admin URL", value: "/admin/login" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-card border border-border rounded-xl p-4"
              >
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {label}
                </p>
                <p className="font-mono font-bold text-primary text-sm break-all">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            These credentials are stored in your ICP backend canister. They can
            be changed by updating the admin authentication logic in your Motoko
            canister.
          </p>
        </section>

        {/* Print CTA */}
        <div className="text-center py-8 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-base hover:opacity-90 transition-colors shadow-sm"
            data-ocid="deploy_guide.download_button"
          >
            <Download className="w-5 h-5" />
            Print / Save as PDF
          </button>
          <p className="text-sm text-muted-foreground mt-3">
            Use File &#x2192; Print &#x2192; Save as PDF in your browser.
          </p>
        </div>
      </div>

      {/* Floating print button */}
      <button
        type="button"
        onClick={() => window.print()}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition-colors no-print"
        data-ocid="deploy_guide.floating_print_button"
      >
        <Printer className="w-4 h-4" />
        Print Guide
      </button>
    </div>
  );
}
