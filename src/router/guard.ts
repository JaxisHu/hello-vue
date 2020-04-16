import router from './index';
import { Component } from "vue-property-decorator";
import { Dialog } from 'vant';
import utils from "../utils";

router.beforeEach((to: any, from: any, next: any) => {
  // 不是在手机微信端打开就抛异常并不加载页面
  let device = deviceIdentification();
  let permission = utils.parseUrlParams("admin");
  if ((device.mobile && device.weChat) || permission === 'hu') {
    setTitle(to);
    next();
  }
});

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

let setTitle: ISetTitle;
setTitle = (to: any) => {
  if (to.meta.title) {
    document.title = to.meta.title || "页面标题";
  }
};

interface ISetTitle {
  (x: any): void
}

function deviceIdentification() {
  const ua:any = navigator.userAgent;
  const browserVersions = { //移动终端浏览器版本信息
    trident: ua.indexOf('Trident') > -1, //IE内核
    presto: ua.indexOf('Presto') > -1, //opera内核
    webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
    iPhone: ua.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: ua.indexOf('iPad') > -1, //是否iPad
    webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
  };
  let device = {
    mobile: browserVersions.mobile,
    weChat: false
  };
  if (browserVersions.mobile) { //判断是否是移动设备打开。
    let uaLower = ua.toLowerCase();
    if (uaLower.match(/MicroMessenger/i) == "micromessenger") {
      //在微信中打开
      device.weChat = true;
    }
    if (uaLower.match(/WeiBo/i) == "weibo") {
      //在新浪微博客户端打开
    }
    if (uaLower.match(/QQ/i) == "qq") {
      //在QQ空间打开
    }
    if (browserVersions.ios) {
      //是否在IOS浏览器打开
    }
    if(browserVersions.android){
      //是否在安卓浏览器打开
    }
  } else {
    //否则就是PC浏览器打开
    Dialog.alert({
      title: '提示',
      message: '请使用手机微信打开页面'
    }).then(() => {
      // on close
    });
  }
  return device;
}