import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, token } = useAuthStore();

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export function AdminProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAdmin, adminToken } = useAuthStore();

  if (!isAdmin || !adminToken) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
}
