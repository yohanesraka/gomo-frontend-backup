import dashboardRoutes from "./dashboard";
import authRoutes from "./auth";
import superadminRoutes from "./superadmin";
import verifyRoutes from "./verify";

const routes = [...dashboardRoutes, authRoutes, superadminRoutes, verifyRoutes];

export default routes;
