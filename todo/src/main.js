import Vue from 'vue';
import App from './App.vue';
import router from './router';
// 啟用 vuex
import store from './store';

import '@/assets/JS/axios';
import '@/assets/JS/loading';
import '@/assets/JS/bus'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
