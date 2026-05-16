import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const LoginPage = lazy(() =>
  import("@/pages/Login").then((m) => ({ default: m.LoginPage })),
);
const RegisterWorkerPage = lazy(() =>
  import("@/pages/RegisterWorker").then((m) => ({
    default: m.RegisterWorkerPage,
  })),
);
const RegisterSeekerPage = lazy(() =>
  import("@/pages/RegisterSeeker").then((m) => ({
    default: m.RegisterSeekerPage,
  })),
);
const DiscoverPage = lazy(() =>
  import("@/pages/Discover").then((m) => ({ default: m.DiscoverPage })),
);
const WorkerDashboardPage = lazy(() =>
  import("@/pages/worker/Dashboard").then((m) => ({
    default: m.WorkerDashboardPage,
  })),
);
const WorkerProfilePage = lazy(() =>
  import("@/pages/worker/Profile").then((m) => ({
    default: m.WorkerProfilePage,
  })),
);
const WorkerEditPage = lazy(() =>
  import("@/pages/worker/Edit").then((m) => ({ default: m.WorkerEditPage })),
);
const ForgotPasswordPage = lazy(() =>
  import("@/pages/ForgotPassword").then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
const AdminLoginPage = lazy(() =>
  import("@/pages/admin/AdminLogin").then((m) => ({
    default: m.AdminLoginPage,
  })),
);
const AdminDashboardPage = lazy(() =>
  import("@/pages/admin/AdminDashboard").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const AdminPendingPage = lazy(() =>
  import("@/pages/admin/AdminPending").then((m) => ({
    default: m.AdminPendingPage,
  })),
);
const AdminUsersPage = lazy(() =>
  import("@/pages/admin/AdminUsers").then((m) => ({
    default: m.AdminUsersPage,
  })),
);
const DeployGuidePage = lazy(() =>
  import("@/pages/DeployGuide").then((m) => ({ default: m.DeployGuidePage })),
);
const AdminStatsPage = lazy(() =>
  import("@/pages/admin/AdminStats").then((m) => ({
    default: m.AdminStatsPage,
  })),
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

// --- Route Tree ---
const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Wrap>
      <HomePage />
    </Wrap>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Wrap>
      <LoginPage />
    </Wrap>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <Wrap>
      <RegisterWorkerPage />
    </Wrap>
  ),
});

const registerSeekerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register-seeker",
  component: () => (
    <Wrap>
      <RegisterSeekerPage />
    </Wrap>
  ),
});

const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover",
  component: () => (
    <Wrap>
      <DiscoverPage />
    </Wrap>
  ),
});

// Worker protected routes
const workerParentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/worker",
  component: () => <ProtectedRoute requireWorker />,
});

const workerDashboardRoute = createRoute({
  getParentRoute: () => workerParentRoute,
  path: "/dashboard",
  component: () => (
    <Wrap>
      <WorkerDashboardPage />
    </Wrap>
  ),
});

const workerProfileRoute = createRoute({
  getParentRoute: () => workerParentRoute,
  path: "/profile",
  component: () => (
    <Wrap>
      <WorkerProfilePage />
    </Wrap>
  ),
});

const workerEditRoute = createRoute({
  getParentRoute: () => workerParentRoute,
  path: "/edit",
  component: () => (
    <Wrap>
      <WorkerEditPage />
    </Wrap>
  ),
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: () => (
    <Wrap>
      <ForgotPasswordPage />
    </Wrap>
  ),
});

// Admin routes
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Wrap>
      <AdminLoginPage />
    </Wrap>
  ),
});

const adminParentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <ProtectedRoute requireAdmin />,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => adminParentRoute,
  id: "admin-layout",
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/dashboard",
  component: () => (
    <Wrap>
      <AdminDashboardPage />
    </Wrap>
  ),
});

const adminPendingRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/pending",
  component: () => (
    <Wrap>
      <AdminPendingPage />
    </Wrap>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/users",
  component: () => (
    <Wrap>
      <AdminUsersPage />
    </Wrap>
  ),
});

const adminStatsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/stats",
  component: () => (
    <Wrap>
      <AdminStatsPage />
    </Wrap>
  ),
});

const deployGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/deploy-guide",
  component: () => (
    <Wrap>
      <DeployGuidePage />
    </Wrap>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  registerSeekerRoute,
  discoverRoute,
  forgotPasswordRoute,
  deployGuideRoute,
  adminLoginRoute,
  workerParentRoute.addChildren([
    workerDashboardRoute,
    workerProfileRoute,
    workerEditRoute,
  ]),
  adminParentRoute.addChildren([
    adminLayoutRoute.addChildren([
      adminDashboardRoute,
      adminPendingRoute,
      adminUsersRoute,
      adminStatsRoute,
    ]),
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
