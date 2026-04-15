import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { useCourierAuthStore } from "../store/courierAuth";

interface CourierProtectedRouteProps {
  children: ReactNode;
}

export function CourierProtectedRoute({
  children,
}: CourierProtectedRouteProps) {
  const { courier, token } = useCourierAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!courier || !token) {
      navigate({ to: "/courier/login" });
    }
  }, [courier, token, navigate]);

  if (!courier || !token) {
    return null;
  }

  return <>{children}</>;
}
