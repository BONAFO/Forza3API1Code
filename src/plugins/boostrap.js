import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


const boostrap =()=>{
    Vue.use(BootstrapVue)
    Vue.use(IconsPlugin)
}



export default boostrap