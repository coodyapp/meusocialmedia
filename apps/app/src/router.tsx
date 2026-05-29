import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
  Outlet,
} from '@tanstack/react-router';
import { AppLayout } from '@/components/layout/app-layout';
import { AuthLayout } from '@/components/layout/auth-layout';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import ForgotPasswordPage from '@/pages/forgot-password';
import VerifyOTPPage from '@/pages/verify-otp';
import { DashboardPage } from '@/pages/dashboard';
import { PostsPage } from '@/pages/posts';
import { NewPostPage } from '@/pages/new-post';
import { AnalyticsPage } from '@/pages/analytics';
import { AccountsPage } from '@/pages/accounts';
import { SettingsPage } from '@/pages/settings';
import ChatPage from '@/pages/chat';
import AudioGalleryPage from '@/pages/gallery/audio';
import ImageGalleryPage from '@/pages/gallery/images';

// Simple auth check — real app would use a token store / context
function isAuthenticated(): boolean {
  return document.cookie.includes('session=') || localStorage.getItem('auth') === 'true';
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// ── Auth routes ──────────────────────────────────────────────
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/login',
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/signup',
  component: SignupPage,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/forgot-password',
  component: ForgotPasswordPage,
});

const verifyOtpRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/verify-otp',
  component: VerifyOTPPage,
});

// ── Protected routes ─────────────────────────────────────────
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/dashboard' });
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const postsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/posts',
  component: PostsPage,
});

const newPostRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/posts/new',
  component: NewPostPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/analytics',
  component: AnalyticsPage,
});

const accountsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/accounts',
  component: AccountsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/settings',
  component: SettingsPage,
});

const chatRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/chat',
  component: ChatPage,
});

const galleryAudioRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/gallery/audio',
  component: AudioGalleryPage,
});

const galleryImagesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/gallery/images',
  component: ImageGalleryPage,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([loginRoute, signupRoute, forgotPasswordRoute, verifyOtpRoute]),
  protectedRoute.addChildren([
    indexRoute,
    dashboardRoute,
    postsRoute,
    newPostRoute,
    analyticsRoute,
    accountsRoute,
    settingsRoute,
    chatRoute,
    galleryAudioRoute,
    galleryImagesRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
