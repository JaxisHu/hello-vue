import { Vue, Component, Provide } from "vue-property-decorator";
import { api } from '@A/index';
import utils from '@U/index';
import { setSession } from '@U/cache';
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

  // 微信授权，用户同意授权后，页面跳转至redirect_uri/?code=CODE&state=STATE
  // 后续将通过解析code换取网页授权access_token及openid（scope=snsapi_base时）
  @Provide()
  async WeChatUrlAuth(url: string, scope: string, state: string = '') {
    /**
     * url: 授权后重定向的回调链接地址
     * scope: 应用授权作用域，snsapi_base(不弹出授权页面，直接跳转，只能获取用户openid)，
     *       snsapi_userinfo(弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息)
     * state: 重定向后会带上state参数，可以填写a-zA-Z0-9的参数值，最多128字节，该值会被微信原样返回，我们可以将其进行比对，防止别人的攻击。
     */
    await this.getWeChatUrlAuth(url, scope, state);
  }

  // 微信授权，通过解析当前URI上的code，获取openid及其他用户信息
  @Provide()
  async WeChatUserInfo(callback: any = () => {}) {
    await this.getWeChatUserInfo(callback);
  }

  // 配置jsApiList，并调用公众号接口
  @Provide()
  async WeChatAPI(configJsApiList: any, callback: any = () => {}) {
    await this.getWeChatAPI(configJsApiList, callback);
  }

  async getWeChatUrlAuth(url: string, scope: string, state: string = '') {
    let result = await this.$ajax("GET", api.common.weChatJsApiConfig, {
      url: window.location.href.split('#')[0]
    });
    if (!!result) {
      const appId = result.appId;
      const redirectUri = encodeURIComponent(url);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
    }
  }

  async getWeChatUserInfo(callback: (res: any) => {}) {
    let result = await this.$ajax("GET", api.common.weChatGetUserInfo, {
      code: utils.parseUrlParams('code', 'search'),
      state: utils.parseUrlParams('state', 'search')
    });
    if (!!result) {
      setSession('wxAuthInfo', result); // 授权成功拿到的用户微信个人信息
      callback && callback(result);
    }
  }

  async getWeChatAPI(configJsApiList: any, callback: () => {}) {
    let result = await this.$ajax("GET", api.common.weChatJsApiConfig, {
      // url: window.location.href.split('#')[0]
      url: 'http://test.jyc.zhibankeji.com'
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

};
