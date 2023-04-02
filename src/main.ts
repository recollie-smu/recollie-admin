import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  VaButton,
  VaCard,
  VaCardTitle,
  VaCardContent,
  VaInput,
  VaSwitch,
  VaDataTable,
  VaNavbar,
  VaNavbarItem,
  VaDateInput,
  VaTimeInput,
  VaOptionList,
  VaFileUpload,
  VaSelect,
  VaDropdownPlugin,
  VaToast,
  VaToastPlugin,
  createVuesticEssential,
} from "vuestic-ui";

import App from "./App.vue";
import router from "./router";
import { config } from "../vuestic.config.js";

import "./assets/main.css";
import "vuestic-ui/css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(
  createVuesticEssential({
    components: {
      VaButton,
      VaCard,
      VaCardTitle,
      VaCardContent,
      VaInput,
      VaSwitch,
      VaDataTable,
      VaNavbar,
      VaNavbarItem,
      VaSelect,
      VaDateInput,
      VaTimeInput,
      VaOptionList,
      VaFileUpload,
      VaToast,
    },
    plugins: {
      VaDropdownPlugin,
      VaToastPlugin,
    },
    config,
  })
);

app.mount("#app");
