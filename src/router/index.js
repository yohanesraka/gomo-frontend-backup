import { createRouter, createWebHistory } from "vue-router";
import { certDetail } from "@/utils/cookies";

import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  base: import.meta.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { role } = certDetail();

  if (to.matched.some(({ meta }) => meta.requiresAuth) && !role) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
