import { Vue, Component, Provide } from "vue-property-decorator";
import { api } from '@A/index';
import utils from '@U/index';
import { Dialog } from 'vant';
import gConfig from '@/config/index';

@Component({
  name: "appMixins"
})
export default class appMixins extends Vue {
  public $ajax: any;

  // 修复ios焦点 bug
  @Provide()
  fixiOSFocus(self: any, ref: string): void {
    self.$refs[ref].blur();
    self.$refs[ref].focus();
  };

  // 微信JS-API鉴权能力
  @Provide()
  async WeChatAPI(configJsApiList: any, callback: any = () => {}) {
    await this.getWeChatAPI(configJsApiList, callback);
  }

  // 微信授权，获取code
  @Provide()
  async WeChatUrlAuth(url: string, type: string, state: string = '') {
    /**
     * url: 授权后重定向的回调链接地址
     * type: scope应用授权作用域，snsapi_base(不弹出授权页面，直接跳转，只能获取用户openid)，
     *       snsapi_userinfo(弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息)
     * state: 重定向后会带上state参数，可以填写a-zA-Z0-9的参数值，最多128字节，该值会被微信原样返回，我们可以将其进行比对，防止别人的攻击。
     */
    await this.getWeChatUrlAuth(url, type, state);
  }

  // 微信授权回调，获取openId等用户信息
  @Provide()
  async WeChatUserInfo(callback: any = () => {}) {
    await this.getWeChatUserInfo(callback);
  }

  async getWeChatAPI(configJsApiList: any, callback: () => {}) {
    let result = await this.$ajax("GET", api.common.weChatJsApiConfig, {
      url: window.location.href.split('#')[0]
    });
    if (!!result) {
      wx.config({
        debug: gConfig.wxDebugModeOpen,
        appId: result.appId,
        timestamp: result.timestamp,
        nonceStr: result.nonceStr,
        signature: result.signature,
        jsApiList: configJsApiList
      });

      wx.ready(() => {
        wx.checkJsApi({
          jsApiList: configJsApiList,
          success: (res: any) => {
            // console.log(JSON.stringify(res));
            callback && callback();
          }
        });
      });

      wx.error(function(res: any) {
        Dialog.alert({ message: "微信JS-API调用错误" + JSON.stringify(res) });
      });
    }
  }

  async getWeChatUrlAuth(url: string, type: string, state: string = '') {
    let result = await this.$ajax("GET", api.common.weChatJsApiConfig, {
      url: window.location.href.split('#')[0]
    });
    if (!!result) {
      const appId = result.appId;
      const redirect_uri = encodeURIComponent(url);
      const wx_uri = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${type}&state=${state}#wechat_redirect`;
      window.location.replace(wx_uri);
    }
  }

  async getWeChatUserInfo(callback: (res: any) => {}) {
    let result = await this.$ajax("GET", api.common.weChatGetUserInfo, {
      code: utils.parseUrlParams('code', 'search'),
      state: utils.parseUrlParams('state', 'search')
    });
    if (!!result) {
      // 存储用户的openid信息
      callback && callback(result);
    }
  }

};
