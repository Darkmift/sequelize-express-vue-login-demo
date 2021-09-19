import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VueToast from './plugins/vueToast';
Vue.use(VueToast);

import axiosInstance from './api'
Vue.prototype.$http = axiosInstance

Vue.config.productionTip = false

Vue.filter("capitalize", function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("removeUnderscore", function (value) {
  if (!value) return '';
  return value.replace(/_/g, " ")
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
