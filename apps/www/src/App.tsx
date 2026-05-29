import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { LandingPage } from "@/routes/index";

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Index route — the landing page
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

// Build route tree
const routeTree = rootRoute.addChildren([indexRoute]);

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
