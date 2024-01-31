import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import axios from "axios";

Vue.config.devtools = false;
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://192.168.195.67:8000/api'

new Vue({
  vuetify,
  axios,
  render: h => h(App),
}).$mount('#app')
