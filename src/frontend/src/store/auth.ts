import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  adminToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  adminLogin: (adminToken: string) => void;
  adminLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAdmin: false,
      adminToken: null,

      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      adminLogin: (adminToken) => set({ isAdmin: true, adminToken }),
      adminLogout: () => set({ isAdmin: false, adminToken: null }),
    }),
    {
      name: "fastdeliver-auth",
    },
  ),
);
