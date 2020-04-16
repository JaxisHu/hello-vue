import Vue from 'vue';
import App from './App.vue';
// 全局引入，自动装载
import '@S/index.scss';
import "@C/vant";
import "@U/ajax";
import "@/icons";
import "@/config";
import "./router/guard";
import './registerServiceWorker';
import router from './router/index';
import store from './store/index';
import hjComponent from '@C/index';
import filters from './filters/index';


Vue.use(hjComponent);

Object.keys(filters).forEach((key: any) => {
  // @ts-ignore
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
