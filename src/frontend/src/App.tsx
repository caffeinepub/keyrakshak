import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AddKeyPage = lazy(() => import("./pages/AddKeyPage"));
const KeyDetailPage = lazy(() => import("./pages/KeyDetailPage"));
const FinderPage = lazy(() => import("./pages/FinderPage"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const KeyLookupPage = lazy(() => import("./pages/KeyLookupPage"));
const FranchisePage = lazy(() => import("./pages/FranchisePage"));
const TrackingPage = lazy(() => import("./pages/TrackingPage"));

function PageLoader() {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-center" richColors />
    </>
  ),
});

// Routes
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const addKeyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/keys/new",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AddKeyPage />
    </Suspense>
  ),
});

const keyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/keys/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <KeyDetailPage />
    </Suspense>
  ),
});

const keysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/keys",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const finderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/found/$keyId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FinderPage />
    </Suspense>
  ),
});

const messagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messages",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MessagesPage />
    </Suspense>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfilePage />
    </Suspense>
  ),
});

const keyLookupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/key",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <KeyLookupPage />
    </Suspense>
  ),
});

const franchiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/franchise",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FranchisePage />
    </Suspense>
  ),
});

const trackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/track/$keyId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TrackingPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  addKeyRoute,
  keyDetailRoute,
  keysRoute,
  finderRoute,
  messagesRoute,
  profileRoute,
  keyLookupRoute,
  franchiseRoute,
  trackingRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
