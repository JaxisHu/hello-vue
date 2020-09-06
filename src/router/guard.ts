import router from './index';
import { Component } from "vue-property-decorator";
import utils from "../utils";
import { isWechatDevice } from '@/utils/device';
import { checkOpenId } from '@/utils/auth';

router.beforeEach(async (to: any, from: any, next: any) => {
  // 不是在手机微信端打开就抛异常并不加载页面
  let permission = utils.parseUrlParams("admin");
  if (isWechatDevice() || permission === 'hu') {
    await checkOpenId(to, from);
    setTitle(to);
    next();
  }
});

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

let setTitle: ISetTitle;
setTitle = (to: any) => {
  if (to.meta.title) {
    document.title = to.meta.title || '美希下单系统';
  }
};

interface ISetTitle {
  (x: any): void;
}
