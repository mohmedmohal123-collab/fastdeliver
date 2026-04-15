import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CourierPublic } from "../backend";

interface CourierAuthState {
  courier: CourierPublic | null;
  token: string | null;
  setCourier: (courier: CourierPublic, token: string) => void;
  logout: () => void;
}

export const useCourierAuthStore = create<CourierAuthState>()(
  persist(
    (set) => ({
      courier: null,
      token: null,
      setCourier: (courier, token) => set({ courier, token }),
      logout: () => set({ courier: null, token: null }),
    }),
    {
      name: "fastdeliver-courier-auth",
    },
  ),
);
