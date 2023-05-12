import { certDetail } from "@/utils/cookies";

const superadminRoutes = {
  path: "/superadmin",
  name: "Superadmin",
  component: () => import("@/views/Superadmin/Peternakan.vue"),
  beforeEnter: (to, from, next) => {
    const { role } = certDetail();
    if (role !== "superadmin") {
      next({ name: "Login" });
    } else {
      next();
    }
  },
  meta: { requiresAuth: true },
};

export default superadminRoutes;
