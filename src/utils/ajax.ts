import Vue from "vue";
import Axios from "axios";
import { Dialog, Toast } from 'vant';
import { qus } from "@U/cache";
import Utils from '@U/index';

const ajax = Axios.create({
  timeout: 60000,
  headers: { "Content-Type": "application/json" }
});

/**
 * @param method 请求方式
 * @param url 请求域名
 * @param data  请求参数 默认为payload
 * @param config  可配置headers、parmas
 * @constructor
 */
const httpRequest = async (method: string = 'GET', url: string, data: any = {}, config: any = {}): Promise<any> => {
    try {
      // 如果没有域名默认配置baseUrl
      if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
        url = Vue.prototype.$config.baseUrl + url;
      }
      // 从缓存中读取Token信息，加到header里面
      const token = qus('token');
      ajax.defaults.headers.token = token;

      // POST请求时，支持表单提交，在config中配置contentType，
      // 如application/x-www-data-urlencoded, multipart/form-data
      ajax.defaults.headers['Content-Type'] = config.contentType || "application/json";

      // 全局loading
      Toast.loading({duration: 0, forbidClick: true, message: '加载中...'});

      let result: any = null;
      switch (method) {
        case "POST":
          result = await ajax.post(url, data, config);
          break;
        case "PUT":
          result = await ajax.put(url, data, config);
          break;
        case "GET":
          let dataStr = Utils.obj2params(data);  // "?a=1&b=2"
          if (dataStr) {
            url = url + dataStr;
          }
          result = await ajax.get(url, config);
          break;
        case "DELETE":
          result = await ajax.delete(url, config);
          break;
        default:
          Toast.clear();
          Toast('请求接口协议错误！');
          return false;
      }
      // 对result做处理
      setTimeout(() => {
        Toast.clear();
      }, 300);

      // console.log("result", result);
      if (result.status === 200) {
        const res = result.data;
        const errCodeList = [1001, 1002, 1003]; // 需要通过错误码做进一步确认操作的情况
        if(res.code === 1000) {
          return res.data || true;
        } else if (errCodeList.includes(res.code)) {
          return res; // 页面上会根据res.code二次确认后做相应处理
        } else {
          Dialog.alert({ message: res.msg });
          return false;
        }
      } else {
        Dialog.alert({ message: result.data.message });
        return false;
      }
    } catch (e) {
      Toast.clear();
      Toast('网络异常，请重新连接');
      throw new Error(e);
    }
};

Vue.use({
  install(Vue) {
    Vue.prototype.$ajax = httpRequest;
  }
});
