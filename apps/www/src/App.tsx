import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { LandingPage } from "@/routes/index";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import TermsOfServicePage from "@/pages/terms-of-service";

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms-of-service",
  component: TermsOfServicePage,
});

// Build route tree
const routeTree = rootRoute.addChildren([indexRoute, privacyRoute, termsRoute]);

// Create router
const router = createRouter({ routeTree });

// Type-safe router declaration
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
