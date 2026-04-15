import { j as jsxRuntimeExports, N as Navigate } from "./index-DzhgL1zh.js";
import { u as useAuthStore } from "./auth-DkBYC2_v.js";
function ProtectedRoute({ children }) {
  const { user, token } = useAuthStore();
  if (!user || !token) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function AdminProtectedRoute({ children }) {
  const { isAdmin, adminToken } = useAuthStore();
  if (!isAdmin || !adminToken) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/admin/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  AdminProtectedRoute as A,
  ProtectedRoute as P
};
