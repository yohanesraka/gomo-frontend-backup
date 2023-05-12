const verifyRoutes = {
  path: "/verify",
  name: "Verify",
  redirect: { name: "Cek Email" },
  children: [
    {
      path: "cek-email",
      name: "Cek Email",
      component: () => import("@/views/Auth/VerifyView.vue"),
    },
    {
      path: "success-verify",
      name: "Success",
      component: () => import("@/views/Auth/SuccessVerify.vue"),
    },
    {
      path: "failed-verify",
      name: "Failed",
      component: () => import("@/views/Auth/FailedVerify.vue"),
    },
  ],
};

export default verifyRoutes;
