import { createApp } from "vue";
import { createPinia } from "pinia";
import { createMetaManager, plugin as metaPlugin } from "vue-meta";


// theme & notification
import theme from "@/plugins/theme";
import Toast from "vue-toastification";
import { Calendar } from 'v-calendar';

// localization
import { setLocale } from "yup";
import * as id from "./utils/locale/id";

// axios
import installAxios from "./services/api";

// init app & router & mixin
import App from "./App.vue";
import router from "./router";
import mixin from "./mixins";

import "@/assets/vendor/toastifications.css";

const options = { containerClassName: "notification", timeout: 5000 };

setLocale(id);

const app = createApp(App);

app.mixin(mixin);
app.use(createPinia());
app.use(createMetaManager());
app.use(metaPlugin);
app.use(router);
app.use(theme);
app.use(Toast, options);
app.use(installAxios);
app.use(Calendar);

app.mount("#app");
