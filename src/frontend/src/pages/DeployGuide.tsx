import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckSquare,
  ChevronRight,
  Database,
  Download,
  FolderOpen,
  Globe,
  Printer,
  Server,
  Settings,
  Terminal,
  TriangleAlert,
  Upload,
} from "lucide-react";

const STEPS = [
  { icon: Database, label: "MongoDB Atlas", color: "bg-green-600" },
  { icon: Server, label: "Node.js Backend", color: "bg-blue-600" },
  { icon: Settings, label: "vercel.json", color: "bg-orange-600" },
  { icon: FolderOpen, label: ".gitignore", color: "bg-slate-600" },
  { icon: Globe, label: "Frontend Env", color: "bg-purple-600" },
  { icon: Upload, label: "Push to GitHub", color: "bg-rose-600" },
  { icon: Globe, label: "Deploy on Vercel", color: "bg-indigo-600" },
  { icon: Settings, label: "Set VITE_API_URL", color: "bg-teal-600" },
];

function StepBadge({ num, color }: { num: number; color: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white ${color} shrink-0`}
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
  return (
    <div className={`rounded-lg border p-4 my-4 text-sm ${styles[type]}`}>
      {children}
    </div>
  );
}

const FOLDER_STRUCTURE = `shramik/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── models/
│       ├── Worker.js
│       └── Seeker.js
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
├── vercel.json
├── .gitignore
└── README.md`;

const BACKEND_PACKAGE_JSON = `{
  "name": "shramik-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  }
}`;

const SERVER_JS = `require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ── Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB Error:', err));

const Worker = require('./models/Worker');
const Seeker = require('./models/Seeker');

// ── ADMIN ROUTES ──────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'shramik@gmail.com' && password === 'shramik!@#123') {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/api/admin/workers/pending', async (req, res) => {
  const workers = await Worker.find({ verification_status: 'pending' });
  res.json(workers);
});

app.get('/api/admin/workers/verified', async (req, res) => {
  const workers = await Worker.find({ verification_status: 'verified' });
  res.json(workers);
});

app.get('/api/admin/workers/removed', async (req, res) => {
  const workers = await Worker.find({ verification_status: 'removed' });
  res.json(workers);
});

app.put('/api/admin/workers/:id/approve', async (req, res) => {
  const w = await Worker.findByIdAndUpdate(req.params.id,
    { verification_status: 'verified', approved_at: new Date() }, { new: true });
  res.json(w);
});

app.put('/api/admin/workers/:id/reject', async (req, res) => {
  const w = await Worker.findByIdAndUpdate(req.params.id,
    { verification_status: 'rejected', rejection_reason: req.body.reason }, { new: true });
  res.json(w);
});

app.put('/api/admin/workers/:id/remove', async (req, res) => {
  const w = await Worker.findByIdAndUpdate(req.params.id,
    { verification_status: 'removed' }, { new: true });
  res.json(w);
});

app.put('/api/admin/workers/:id/restore', async (req, res) => {
  const w = await Worker.findByIdAndUpdate(req.params.id,
    { verification_status: 'pending' }, { new: true });
  res.json(w);
});

app.get('/api/admin/stats', async (req, res) => {
  const [total, pending, verified, removed] = await Promise.all([
    Worker.countDocuments(),
    Worker.countDocuments({ verification_status: 'pending' }),
    Worker.countDocuments({ verification_status: 'verified' }),
    Worker.countDocuments({ verification_status: 'removed' }),
  ]);
  res.json({ total, pending, verified, removed });
});

// ── WORKER ROUTES ─────────────────────────────────────────
app.post('/api/workers/register', async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const worker = await Worker.create({ ...req.body, password: hashed });
    res.json({ success: true, worker });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.post('/api/workers/login', async (req, res) => {
  const worker = await Worker.findOne({ email: req.body.email });
  if (!worker || !(await bcrypt.compare(req.body.password, worker.password)))
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  if (worker.verification_status !== 'verified')
    return res.status(403).json({ success: false, message: 'Account not yet approved by admin' });
  const token = jwt.sign(
    { id: worker._id, role: 'worker' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ success: true, token, worker });
});

app.get('/api/workers/recent', async (req, res) => {
  const workers = await Worker.find({ verification_status: 'verified' })
    .sort({ approved_at: -1 }).limit(12).select('-password');
  res.json(workers);
});

app.get('/api/workers/nearby', async (req, res) => {
  const { lat, lng, radius = 20, profession } = req.query;
  const query = { verification_status: 'verified' };
  if (profession && profession !== 'all') query.profession = profession;
  const workers = await Worker.find(query).select('-password');
  const R = 6371;
  const filtered = workers.filter(w => {
    if (!w.location_lat || !w.location_lng) return false;
    const dLat = (w.location_lat - lat) * Math.PI / 180;
    const dLng = (w.location_lng - lng) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 +
      Math.cos(Number(lat)*Math.PI/180) *
      Math.cos(w.location_lat*Math.PI/180) *
      Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) <= Number(radius);
  });
  res.json(filtered);
});

app.get('/api/workers/:id', async (req, res) => {
  const worker = await Worker.findById(req.params.id).select('-password');
  if (!worker) return res.status(404).json({ message: 'Worker not found' });
  res.json(worker);
});

// ── SEEKER ROUTES ─────────────────────────────────────────
app.post('/api/seekers/register', async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const seeker = await Seeker.create({ ...req.body, password: hashed });
    res.json({ success: true, seeker });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.post('/api/seekers/login', async (req, res) => {
  const seeker = await Seeker.findOne({ email: req.body.email });
  if (!seeker || !(await bcrypt.compare(req.body.password, seeker.password)))
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const token = jwt.sign(
    { id: seeker._id, role: 'seeker' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ success: true, token, seeker });
});

// ── START SERVER ──────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Shramik server running on port', PORT));`;

const WORKER_MODEL = `const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name:                    { type: String, required: true },
  email:                   { type: String, required: true, unique: true },
  phone:                   { type: String, required: true },
  password:                { type: String, required: true },
  profession:              { type: String, required: true },
  profession_custom:       String,
  availability: {
    startTime:             String,
    endTime:               String,
  },
  location_lat:            Number,
  location_lng:            Number,
  location_address:        String,
  hourly_rate:             Number,
  skills:                  [String],
  profile_photo:           String,
  bio:                     String,
  years_of_experience:     Number,
  languages_spoken:        [String],
  emergency_contact_name:  String,
  emergency_contact_phone: String,
  payment_preference: {
    type: String,
    enum: ['UPI', 'Bank Transfer', 'Cash'],
    default: 'Cash',
  },
  verification_status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'removed'],
    default: 'pending',
  },
  is_available:     { type: Boolean, default: true },
  rejection_reason: String,
  admin_notes:      String,
  approved_at:      Date,
  created_at:       { type: Date, default: Date.now },
});

module.exports = mongoose.model('Worker', workerSchema);`;

const SEEKER_MODEL = `const mongoose = require('mongoose');

const seekerSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  phone:      String,
  password:   { type: String, required: true },
  is_active:  { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Seeker', seekerSchema);`;

const BACKEND_ENV = `MONGODB_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/shramik
JWT_SECRET=shramik_secret_key_2024
PORT=3001`;

const VERCEL_JSON = `{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "backend/server.js" },
    { "handle": "filesystem" },
    { "src": "(.*)", "dest": "/index.html" }
  ]
}`;

const GITIGNORE_CONTENT = `node_modules/
backend/node_modules/
frontend/node_modules/
.env
backend/.env
frontend/.env
frontend/dist/
*.log
.DS_Store`;

const FRONTEND_API_CALL = `# frontend/.env
VITE_API_URL=https://your-project.vercel.app

// In your React components — replace actor calls with fetch:
const res = await fetch(\`\${import.meta.env.VITE_API_URL}/api/workers/recent\`);
const data = await res.json();

// Admin login
const res = await fetch(\`\${import.meta.env.VITE_API_URL}/api/admin/login\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

// Worker registration
const res = await fetch(\`\${import.meta.env.VITE_API_URL}/api/workers/register\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});`;

const GIT_COMMANDS = `cd shramik
git init
git add .
git commit -m "Initial Shramik app commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shramik.git
git push -u origin main`;

const CHECKLIST_ITEMS = [
  "Home page loads without blank screen",
  "GPS map shows on home page and discover page",
  "Worker registration form submits (3 steps)",
  "New worker appears in admin pending list",
  "Admin login works (shramik@gmail.com / shramik!@#123)",
  "Admin can approve worker — worker moves to verified list",
  "Approved worker appears in home page worker cards",
  "Worker can log in after approval",
  "Worker dashboard shows (profile, availability toggle, logout)",
  "Language switcher changes text (EN / HI / MR)",
  "Page refresh works — no 404 error",
];

const ERROR_TABLE: { error: string; cause: string; fix: string }[] = [
  {
    error: "Blank page on Vercel",
    cause: "Wrong output directory",
    fix: "Set Output Directory to frontend/dist in Vercel settings",
  },
  {
    error: "404 on page refresh",
    cause: "Missing SPA rewrite rule",
    fix: 'Add {handle:filesystem} + {src:"(.*)",dest:"/index.html"} to vercel.json routes',
  },
  {
    error: "Cannot connect to database",
    cause: "Wrong MONGODB_URI",
    fix: "Check Atlas connection string; ensure 0.0.0.0/0 is in Network Access",
  },
  {
    error: "Admin login fails",
    cause: "Missing env variables",
    fix: "Ensure MONGODB_URI and JWT_SECRET are saved in Vercel env vars and redeployed",
  },
  {
    error: "CORS error in browser",
    cause: "CORS not configured",
    fix: "Ensure cors() middleware appears before all routes in server.js",
  },
  {
    error: "Workers not showing",
    cause: "VITE_API_URL wrong",
    fix: "After first deploy, set VITE_API_URL to your live Vercel URL and redeploy",
  },
  {
    error: "Build failed on Vercel",
    cause: "Missing dependencies",
    fix: "Run npm install locally first to verify, then check package.json",
  },
];

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

      {/* Top nav bar */}
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
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">
              Deployment Guide
            </span>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-md hover:opacity-90 transition-smooth"
            data-ocid="deploy_guide.print_button"
          >
            <Printer className="w-4 h-4" />
            Print Guide
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Page hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            Option B — Full Vercel Deployment
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-3">
            Shramik — Full Deployment Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deploy to GitHub + Vercel with Node.js backend, MongoDB Atlas
            database, and React frontend — step by step, zero errors.
          </p>
        </div>

        {/* Step overview grid */}
        <div className="grid grid-cols-4 gap-3 mb-12 no-print">
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
          <ul className="grid grid-cols-2 gap-2 text-sm text-foreground">
            {[
              ["GitHub account", "github.com (free)"],
              ["MongoDB Atlas account", "mongodb.com/atlas (free)"],
              ["Vercel account", "vercel.com (free)"],
              ["Node.js 18+ installed", "nodejs.org"],
              ["Git installed", "git-scm.com"],
              ["VS Code or any editor", "code.visualstudio.com"],
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
        </section>

        {/* Folder structure */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-primary" />
            Project Folder Structure
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Create this exact structure on your computer:
          </p>
          <CodeBlock code={FOLDER_STRUCTURE} language="file tree" />
        </section>

        {/* Step 1 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={1}
            icon={Database}
            title="Set Up MongoDB Atlas (Free Database)"
            subtitle="Your app needs a database to store workers, seekers, and registration requests."
            color="bg-green-600"
          />
          <ol className="space-y-3 text-sm text-foreground list-none">
            {[
              'Go to mongodb.com/atlas → click "Try Free" → sign up with Google or email',
              'Click "Create" → choose the free M0 tier → select any region → click "Create Cluster"',
              'Click "Connect" on your cluster → choose "Connect your application"',
              "Copy the connection string: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shramik",
              'Under "Network Access" (left sidebar) → click "Add IP Address" → enter 0.0.0.0/0 → confirm',
              'Under "Database Access" → click "Add new database user" → create username and password → save both',
              "Replace <username> and <password> in your connection string with your credentials",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <InfoBox type="warning">
            <strong>Important:</strong> The 0.0.0.0/0 Network Access rule is
            required so Vercel servers can reach your database. Without it you
            will get "Cannot connect to database" errors.
          </InfoBox>
        </section>

        {/* Step 2 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6 page-break">
          <SectionHeader
            num={2}
            icon={Server}
            title="Create the Backend (Node.js + Express)"
            subtitle="Inside your shramik/backend/ folder, create these files:"
            color="bg-blue-600"
          />

          <h3 className="font-semibold text-foreground mb-1 mt-4">
            backend/package.json
          </h3>
          <CodeBlock code={BACKEND_PACKAGE_JSON} language="json" />

          <h3 className="font-semibold text-foreground mb-1 mt-6">
            backend/server.js{" "}
            <span className="text-xs font-normal text-muted-foreground">
              (complete file — all API routes)
            </span>
          </h3>
          <CodeBlock code={SERVER_JS} language="javascript" />

          <h3 className="font-semibold text-foreground mb-1 mt-6">
            backend/models/Worker.js
          </h3>
          <CodeBlock code={WORKER_MODEL} language="javascript" />

          <h3 className="font-semibold text-foreground mb-1 mt-6">
            backend/models/Seeker.js
          </h3>
          <CodeBlock code={SEEKER_MODEL} language="javascript" />

          <h3 className="font-semibold text-foreground mb-1 mt-6">
            backend/.env{" "}
            <span className="text-xs font-normal text-muted-foreground">
              (do NOT commit this file)
            </span>
          </h3>
          <CodeBlock code={BACKEND_ENV} language=".env" />

          <InfoBox type="info">
            <strong>
              Install backend dependencies — run in your terminal:
            </strong>
            <CodeBlock code="cd backend&#10;npm install" language="bash" />
          </InfoBox>
        </section>

        {/* Step 3 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={3}
            icon={Settings}
            title="Create vercel.json in the ROOT Folder"
            subtitle="This file tells Vercel how to build and route both the frontend and backend."
            color="bg-orange-600"
          />
          <CodeBlock code={VERCEL_JSON} language="json" />
          <InfoBox type="info">
            The{" "}
            <code className="bg-muted px-1 rounded text-xs font-mono">
              handle: filesystem
            </code>{" "}
            rule before the SPA catch-all prevents 404 errors on page refresh.
          </InfoBox>
        </section>

        {/* Step 4 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={4}
            icon={FolderOpen}
            title="Create .gitignore in the Root Folder"
            subtitle="Prevents secrets and build artifacts from being pushed to GitHub."
            color="bg-slate-600"
          />
          <CodeBlock code={GITIGNORE_CONTENT} language=".gitignore" />
        </section>

        {/* Step 5 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={5}
            icon={Globe}
            title="Update Frontend to Use Vercel Backend"
            subtitle="Replace all ICP/Motoko actor calls with fetch() calls to your Vercel API."
            color="bg-purple-600"
          />
          <CodeBlock code={FRONTEND_API_CALL} language="javascript" />
          <InfoBox type="warning">
            <strong>Important:</strong> Every place in your frontend that calls{" "}
            <code className="bg-amber-100 px-1 rounded text-xs font-mono">
              actor.method()
            </code>{" "}
            must be replaced with a{" "}
            <code className="bg-amber-100 px-1 rounded text-xs font-mono">
              fetch()
            </code>{" "}
            call to the corresponding{" "}
            <code className="bg-amber-100 px-1 rounded text-xs font-mono">
              /api/...
            </code>{" "}
            endpoint. Check your Home, Register, Login, and AdminDashboard
            pages.
          </InfoBox>
        </section>

        {/* Step 6 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={6}
            icon={Upload}
            title="Push to GitHub"
            subtitle="Run these commands in your terminal from the shramik/ root folder:"
            color="bg-rose-600"
          />
          <CodeBlock code={GIT_COMMANDS} language="bash" />
          <InfoBox type="info">
            <strong>Before running these commands:</strong> Go to{" "}
            <strong>github.com</strong> → click <strong>New Repository</strong>{" "}
            → name it <strong>shramik</strong> → leave "Add README" and
            ".gitignore" <strong>unchecked</strong> → click Create Repository.
            Then copy the HTTPS URL and use it in the{" "}
            <code className="bg-blue-100 px-1 rounded text-xs font-mono">
              git remote add
            </code>{" "}
            command above.
          </InfoBox>
        </section>

        {/* Step 7 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6 page-break">
          <SectionHeader
            num={7}
            icon={Globe}
            title="Deploy on Vercel"
            subtitle="Connect your GitHub repo to Vercel and configure the build settings."
            color="bg-indigo-600"
          />
          <ol className="space-y-5 text-sm">
            {(
              [
                {
                  title: "Sign in to Vercel",
                  detail:
                    'Go to vercel.com → click "Sign Up" (or Log In) → choose "Continue with GitHub"',
                },
                {
                  title: "Add New Project",
                  detail:
                    'Click "Add New Project" → find and select your shramik repo → click "Import"',
                },
                {
                  title: "Configure Build Settings",
                  detail: "Set these values manually:",
                  table: [
                    ["Framework Preset", "Other"],
                    [
                      "Root Directory",
                      "(leave blank — vercel.json is at root)",
                    ],
                    [
                      "Build Command",
                      "cd frontend && npm install && npm run build",
                    ],
                    ["Output Directory", "frontend/dist"],
                  ],
                },
                {
                  title: "Add Environment Variables",
                  detail: 'Click "Add" for each:',
                  table: [
                    ["MONGODB_URI", "your MongoDB Atlas connection string"],
                    ["JWT_SECRET", "shramik_secret_key_2024"],
                    ["VITE_API_URL", "(leave blank — set after first deploy)"],
                  ],
                },
                {
                  title: "Click Deploy",
                  detail:
                    'Click the blue "Deploy" button. Wait ~2 minutes. You will get a URL like https://shramik.vercel.app',
                },
              ] as { title: string; detail: string; table?: string[][] }[]
            ).map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="text-muted-foreground mt-0.5">{step.detail}</p>
                  {step.table && (
                    <table className="mt-2 w-full text-xs border border-border rounded-lg overflow-hidden">
                      <tbody>
                        {step.table.map(([k, v]) => (
                          <tr
                            key={k}
                            className="border-b border-border last:border-0"
                          >
                            <td className="px-3 py-2 font-mono bg-muted font-medium w-1/3">
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
        </section>

        {/* Step 8 */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <SectionHeader
            num={8}
            icon={Settings}
            title="After First Deploy — Set VITE_API_URL"
            subtitle="This step links your frontend to your live backend URL."
            color="bg-teal-600"
          />
          <ol className="space-y-2 text-sm text-foreground">
            {[
              "Copy your live URL from the Vercel dashboard (e.g. https://shramik.vercel.app)",
              "Go to Vercel → your project → Settings → Environment Variables",
              "Click Add → Name: VITE_API_URL → Value: https://shramik.vercel.app → Save",
              "Go to Deployments tab → find your latest deploy → click the ... menu → Redeploy",
              "Wait ~1 minute — your frontend now has the correct API URL baked in",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex-none w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Checklist */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-primary" />
            Post-Deployment Checklist
          </h2>
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
        </section>

        {/* Errors table */}
        <section className="mb-10 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
            <TriangleAlert className="w-5 h-5 text-amber-500" />
            Common Errors &amp; Fixes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
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
                    className={`border-t border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
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

        {/* Admin credentials */}
        <section className="mb-10 bg-primary/5 border-2 border-primary/20 rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Admin Login Credentials
          </h2>
          <div className="grid grid-cols-3 gap-4">
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
            These credentials are hardcoded in server.js. Change them before
            going public by editing the{" "}
            <code className="bg-muted px-1 rounded font-mono">
              /api/admin/login
            </code>{" "}
            route.
          </p>
        </section>

        {/* Print CTA */}
        <div className="text-center py-8 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-base hover:opacity-90 transition-smooth shadow-elevated"
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
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-semibold shadow-elevated hover:opacity-90 transition-smooth no-print"
        data-ocid="deploy_guide.floating_print_button"
      >
        <Printer className="w-4 h-4" />
        Print Guide
      </button>
    </div>
  );
}
