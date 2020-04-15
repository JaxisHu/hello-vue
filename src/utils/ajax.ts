import Vue from "vue";
import Axios from "axios";
import { Dialog, Toast } from 'vant';
import { qusObj } from "@U/cache";

const ajax = Axios.create({
  // baseURL: "",
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
const httpRequest: (method: string, url: string, data: any, config: any, cb: any) => Promise<any> =
  async (method: string, url: string, data: any = {}, config: any = {}, cb:any = ()=>{}): Promise<any> => {
    try {
      // 如果没有域名默认配置baseUrl
      if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
        url = Vue.prototype.$config.baseUrl + url;
      }
      const userInfo = qusObj('userInfo');
      if(!!userInfo) {
        ajax.defaults.headers.token = userInfo.token;
        // 统一添加上user_id (Java系统接口需要)
        if (method !== 'GET') {
          data["user_id"] = userInfo.id;
        }
      }
      // 修改Content-Type，支持表单提交，如application/x-www-data-urlencoded, multipart/form-data
      ajax.defaults.headers.post['Content-Type'] = config.contentType || "application/json";
      // console.log("config.contentType", config.contentType, ajax.defaults.headers.post['Content-Type']);

      // 全局loading
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...'
      });

      let result: any = null;
      switch (method) {
        case "POST":
          result = await ajax.post(url, data, config);
          break;
        case "PUT":
          result = await ajax.put(url, data, config);
          break;
        case "GET":
          // @拼接url
          let dataStr = '';
          Object.keys(data).forEach((key) => {
            dataStr += `${key}=${data[key]}&`;
          });
          if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
            url = `${url}?${dataStr}`;
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
      // console.log(result);
      setTimeout(() => {
        Toast.clear();
      }, 300);
      if (result.status === 200) {
        const res = result.data;
        // 20016：本人的快递单已存在， 301：openId登录未与任何手机号绑定,  302: // 账号未注册
        const errCodeList = [20016, 301, 302]; // 需要通过错误码做进一步确认操作的情况
        // 后台错误码判断 (不能和status非200一起处理，语义化不一样)
        if (res.code === 0) {
          // 异步方式回调返回数据
          cb(res.data);
          // Java后端框架，有成功的操作返回null，做兼容处理return true
          if (res.data === null) {
            return true;
          } else {
            return res.data;
          }
        } else if(errCodeList.indexOf(res.code) > -1) {
          return res;
        } else if (res.code === -4) {
          // 需要登录
          _this.$router.push("/login");
          return false;
        } else {
          Dialog.alert({
            message: res.message
          });
          // 返回false作为报错标识
          return false;
        }
      } else {
        Dialog.alert({
          message: result.data.message
        });
        // 返回false作为报错标识
        return false;
      }
    } catch (e) {
      Toast.clear();
      Toast('网络连接错误');
      throw new Error(e);
    }
};

let _this: any = null;

const init: any = (el: any) => {
  _this = el;
};

Vue.use({
  install(Vue) {
    Vue.prototype.$ajax = httpRequest;
    Vue.prototype.$init = init;
  }
});
