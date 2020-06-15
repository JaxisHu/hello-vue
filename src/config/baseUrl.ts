import Vue from 'vue';
import { IBaseUrl, IType } from '@T/config/index';

const env: string = process.env.NODE_ENV;

/** Java后台接口域名配置 */
let baseUrl = {
  development: "//test.jadmin.you.zhibankeji.com",
  // development: "//127.0.0.1:8001",
  test: "//127.0.0.1:8001",
  uat: "//127.0.0.1:8001",
  production: "//127.0.0.1:8001",
};

/** Nodejs请求转发域名配置 */
let nodeUrl = {
  development: "//127.0.0.1:8001",
  test: "//127.0.0.1:8001",
  uat: "//127.0.0.1:8001",
  production: "//127.0.0.1:8001",
};

Vue.use({
  install(Vue){
    Vue.prototype.$config = {
      baseUrl: (baseUrl as IType)[env],
      nodeUrl: (nodeUrl as IType)[env],
    };
  }
});
