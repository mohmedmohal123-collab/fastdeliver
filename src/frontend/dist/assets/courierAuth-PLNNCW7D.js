import { l as create, p as persist } from "./index-DzhgL1zh.js";
const useCourierAuthStore = create()(
  persist(
    (set) => ({
      courier: null,
      token: null,
      setCourier: (courier, token) => set({ courier, token }),
      logout: () => set({ courier: null, token: null })
    }),
    {
      name: "fastdeliver-courier-auth"
    }
  )
);
export {
  useCourierAuthStore as u
};
