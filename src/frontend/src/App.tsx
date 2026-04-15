import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy, useEffect } from "react";
import { useLangStore } from "./store/lang";

// Lazy pages
const SplashPage = lazy(() => import("./pages/SplashPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const NewOrderPage = lazy(() => import("./pages/NewOrderPage"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetailPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminOrdersPage = lazy(() => import("./pages/AdminOrdersPage"));
const AdminUsersPage = lazy(() => import("./pages/AdminUsersPage"));
const AdminProductsPage = lazy(() => import("./pages/AdminProductsPage"));
const AdminCompaniesPage = lazy(() => import("./pages/AdminCompaniesPage"));
const AdminOffersPage = lazy(() => import("./pages/AdminOffersPage"));
const AdminBroadcastPage = lazy(() => import("./pages/AdminBroadcastPage"));
const AdminPaymentSettingsPage = lazy(
  () => import("./pages/AdminPaymentSettingsPage"),
);
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const BrowsePage = lazy(() => import("./pages/BrowsePage"));

// Courier pages
const CourierLoginPage = lazy(() => import("./pages/CourierLoginPage"));
const CourierRegisterPage = lazy(() => import("./pages/CourierRegisterPage"));
const CourierHomePage = lazy(() => import("./pages/CourierHomePage"));
const CourierOrderDetailPage = lazy(
  () => import("./pages/CourierOrderDetailPage"),
);
const CourierProfilePage = lazy(() => import("./pages/CourierProfilePage"));

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

// Full-screen loader for splash
function SplashLoader() {
  return (
    <div className="fixed inset-0 gradient-splash flex items-center justify-center">
      <div
        className="w-16 h-16 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.7 0.28 35), oklch(0.74 0.25 85))",
          animation:
            "splash-scale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      />
    </div>
  );
}

function AppRoot() {
  const { lang } = useLangStore();

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  return (
    <div className="page-transition">
      <Outlet />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({ component: AppRoot });

// Splash at root
const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<SplashLoader />}>
      <SplashPage />
    </Suspense>
  ),
});

// Auth routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SignupPage />
    </Suspense>
  ),
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminLoginPage />
    </Suspense>
  ),
});

// User routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OrdersPage />
    </Suspense>
  ),
});

const newOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/new",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NewOrderPage />
    </Suspense>
  ),
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$orderId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OrderDetailPage />
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

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SettingsPage />
    </Suspense>
  ),
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BrowsePage />
    </Suspense>
  ),
});

// Admin routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminOrdersPage />
    </Suspense>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminUsersPage />
    </Suspense>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminProductsPage />
    </Suspense>
  ),
});

const adminCompaniesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/companies",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminCompaniesPage />
    </Suspense>
  ),
});

const adminOffersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/offers",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminOffersPage />
    </Suspense>
  ),
});

const adminBroadcastRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/broadcast",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminBroadcastPage />
    </Suspense>
  ),
});

const adminPaymentSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/payment-settings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPaymentSettingsPage />
    </Suspense>
  ),
});

const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$orderId/payment",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PaymentPage />
    </Suspense>
  ),
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NotificationsPage />
    </Suspense>
  ),
});

// Courier routes
const courierLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courier/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CourierLoginPage />
    </Suspense>
  ),
});

const courierRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courier/register",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CourierRegisterPage />
    </Suspense>
  ),
});

const courierHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courier",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CourierHomePage />
    </Suspense>
  ),
});

const courierOrderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courier/orders/$orderId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CourierOrderDetailPage />
    </Suspense>
  ),
});

const courierProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courier/profile",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CourierProfilePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  loginRoute,
  signupRoute,
  adminLoginRoute,
  homeRoute,
  ordersRoute,
  newOrderRoute,
  orderDetailRoute,
  profileRoute,
  settingsRoute,
  browseRoute,
  adminDashboardRoute,
  adminOrdersRoute,
  adminUsersRoute,
  adminProductsRoute,
  adminCompaniesRoute,
  adminOffersRoute,
  adminBroadcastRoute,
  adminPaymentSettingsRoute,
  notificationsRoute,
  paymentRoute,
  courierLoginRoute,
  courierRegisterRoute,
  courierHomeRoute,
  courierOrderDetailRoute,
  courierProfileRoute,
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
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
