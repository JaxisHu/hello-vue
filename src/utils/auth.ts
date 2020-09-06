import { setOpenId, getOpenId, setWechatUserInfo, getWechatUserInfo } from '@/utils/cache';
import utils from '@U/index';
import { api } from '@/api';
import { httpRequest } from '@U/ajax';
import { isWechatDevice } from '@U/device';

/**
 * 验证是否存在openid，以拿微信授权openId
 * @param {RouterInfo} to
 * @param {RouterInfo} from
 *
 */
// console.log("process.env", process.env);
const DomainWithEnv: string = process.env.VUE_APP_DOMAIN;
const WxAppId: string = process.env.VUE_APP_WECHAT_APP_ID;

export const checkOpenId = (to: any, from: any) => {
  return new Promise(async (resolve, reject) => {
    const openId = utils.getUrlParams('openId') || getOpenId();
    if (openId) {
      setOpenId(openId);
      getWechatUserInfo(false) || updateWeChatAuthInfo(openId);
      resolve(true);
    } else {
      const apiUrl = `${ DomainWithEnv }${ api.common.weChatGetUserInfo }` || 'https://dev-be-mall.zhibankeji.com' + api.common.weChatGetUserInfo;
      const type = to.weChatScope || 'snsapi_userinfo';
      const appId = WxAppId || 'wx481fe2ca02775a81';
      let query = '';
      Object.keys(to.query).forEach((item) => {
        //判断如果是中文需要多加2层转义，不然会出现乱码
        var reg = /[\u4E00-\u9FA5]/g;
        let val = reg.test(to.query[item]) ? encodeURIComponent(encodeURIComponent(to.query[item])) : to.query[item];
        query += '&' + item + '=' + val;
      });
      const cusLocation = window.location.href.split('#')[0];
      const redirectHost = cusLocation.indexOf('index.html') > -1 ? cusLocation.replace('index', 'redirect') : cusLocation + 'redirect.html';
      const redirect_uri = apiUrl + '?front_url=' + encodeURIComponent(redirectHost + '?openId=${openId}' + `&path=${to.path}` + query);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${type}&state=meixi##wechat_redirect`;
    }
  });
};

export const updateWeChatAuthInfo = async (value: String) => {
  const openId = value || getOpenId();
  if (!openId) {
    return null;
  }
  const result = await httpRequest('GET', DomainWithEnv + api.common.getWechatUserInfo + openId);
  setWechatUserInfo(result);
  return result || null;
};

export const initWechatJsApi = async () => {
  if (!isWechatDevice()) {
    return false;
  }
  const result = await httpRequest('GET', DomainWithEnv + api.common.weChatJsApiConfig, {
    // url: process.env.NODE_ENV == 'development' ? 'http://dev-meixi-h5.zhibankeji.com/index.html ' : window.location.href.split('#')[0],
    url: window.location.href.split('#')[0],
  });
  if (!result) {
    return false;
  }
  const isReady = await configureApi(result);
  return isReady;
};
const configJsApiList = ['checkJsApi', 'updateAppMessageShareData',
  'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage',
  'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems',
  'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
  'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice',
  'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice',
  'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'getLocalImgData',
  'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow',
  'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard',
];

function configureApi(res: any) {
  return new Promise((resolve) => {
    wx.config({
      debug: false, // 切记正式发布的时候将此项设为false
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: configJsApiList,
    });
    wx.ready((e: any) => {
      resolve(true);
    });
    wx.error((e: any) => {
      resolve(false);
    });
  });
}
