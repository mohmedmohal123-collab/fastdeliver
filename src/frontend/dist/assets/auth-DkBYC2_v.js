import { l as create, p as persist } from "./index-DzhgL1zh.js";
const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAdmin: false,
      adminToken: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      adminLogin: (adminToken) => set({ isAdmin: true, adminToken }),
      adminLogout: () => set({ isAdmin: false, adminToken: null })
    }),
    {
      name: "fastdeliver-auth"
    }
  )
);
export {
  useAuthStore as u
};
