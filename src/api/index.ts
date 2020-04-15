/**
 * 配置所有接口URL
 */
import Vue from "vue";
import userApis from '@A/user';

/** Java后台接口 */
export const api = {
  user: userApis,
};

/** Node转发接口 */
const nodeHost = Vue.prototype.$config.nodeUrl;
export const nodeApis = {
  nodeUser: nodeHost + userApis.user,
};