import { registerPlugins } from '@/plugins'
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import "./assets/base.css"
import 'primevue/resources/themes/aura-light-green/theme.css'


const app = createApp(App);
app.use(router)
registerPlugins(app)
app.mount("#app")

