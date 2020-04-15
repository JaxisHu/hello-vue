import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/index';
import store from './store/index';
import ycComponent from '@C/index';
import filters from './filters/index';


Vue.use(ycComponent);

Object.keys(filters).forEach((key: any) => {
  // @ts-ignore
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() { Vue.prototype.$init(this) },
  render: h => h(App)
}).$mount("#app");
