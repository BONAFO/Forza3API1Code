
import 'bootstrap/dist/css/bootstrap.min.css' // Importa los estilos CSS de Bootstrap
import store from './vuex'


import PrimeVue from 'primevue/config';



export function registerPlugins(app) {
app.use(store)
app.use(PrimeVue);
}



