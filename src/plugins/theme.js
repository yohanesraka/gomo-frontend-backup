import SidebarPlugin from "@/components/SidebarPlugin";

import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";

import HighchartsVue from "highcharts-vue";

import "@/assets/sass/argon.scss";

import "@/assets/vendor/multiselect/vue-multiselect.min.css";
import "@/assets/vendor/flatpickr/style.css";
import "@/assets/vendor/flatpickr/monthStyle.css";

import "bootstrap/dist/js/bootstrap.min";

import 'v-calendar/style.css';

export default {
  install(app) {
    app.use(SidebarPlugin);
    app.use(GlobalComponents);
    app.use(GlobalDirectives);
    app.use(HighchartsVue);
  },
};
