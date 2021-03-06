/** 全局公共函数 */
export default class Utils {
  // 组装URL Params
  static obj2params(obj: any = {}) {
    let dataStr = '';
    Object.keys(obj).forEach((key) => {
      dataStr += `${key}=${obj[key]}&`;
    });
    const idx = dataStr.lastIndexOf('&');
    return idx > -1? '?' + dataStr.slice(0, idx) : '';
  }

  // yyyy-MM-dd => yyyy/MM/dd
  static replaceSlash(data: string): string {
    data = data.replace(/-/g, "/");
    return data;
  }

  // 日期时间格式化
  static formatDate(date: any, format?: any) {
    if (!date) return '-';
    if (!(date instanceof Date)) {
      date = new Date(Utils.replaceSlash(date));
    }
    var paddNum = function(num: any) {
      num += "";
      return num.replace(/^(\d)$/, "0$1");
    };
    //指定格式字符
    var cfg: any = {
      yyyy: date.getFullYear(), //年 : 4位
      yy: date.getFullYear().toString().substring(2), //年 : 2位
      M: date.getMonth() + 1, //月 : 如果1位的时候不补0
      MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
      d: date.getDate(), //日 : 如果1位的时候不补0=
      dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
      hh: paddNum(date.getHours()), //时
      mm: paddNum(date.getMinutes()), //分
      ss: paddNum(date.getSeconds()) //秒
    };
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function(m: any) {
      return cfg[m];
    });
  }

  static getUrlParams(param: string) {
    const reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    const tmp = window.location.hash.split("?");
    if (tmp.length <= 1) {
      return null;
    }
    const r = tmp[tmp.length - 1].match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }

  // mode: hash, vue路由后带的参数
  // mode: search, 针对获取微信授权页面的code和state
  static parseUrlParams(param: string, mode: any = 'hash') {
    const reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    const tmp = mode === 'search'? window.location.search.split("?") : window.location.hash.split("?");
    if (tmp.length <= 1) {
      return null;
    }
    const r = tmp[tmp.length - 1].match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }

  // 判断开始时间必须小于结束时间
  static isTimeDuration(startTime: string, endTime: string) {
    // undefined 只有一个值（可以赋值）,  true：开始时间大于结束时间了（tips），false（可以赋值）
    if (startTime && endTime) {
      return new Date(startTime).getTime() >= new Date(endTime).getTime();
    }
  }

  // 获取时间差
  static timeFromNow(endTime: string): any {
    if (endTime) {
      // let end = Utils.replaceSlash(Utils.formatDate(endTime));
      return new Date(endTime).getTime() - new Date().getTime();
    }
  }

  // 修复iOS设备从模板消息进来无法上传图片的bug
  static fixIOSUploadImgFromTemplate() {
    // 修正iOS设备从模板消息进来search带?&scene=0的情况，需要强制删除&。
    // 从模板消息链接进来，域名search和vue路由后面肯定都会带有search参数，检测域名search后面是否带有&，理应判断length为3。
    const searchDNSArr: any[] = window.location.search.split('?&') || [];
    const searchArr: any[] = window.location.href.split('?') || [];
    if (searchArr.length === 3 && searchDNSArr.length === 2) {
      window.location.replace(`${ window.location.origin }${ window.location.pathname }?${ searchDNSArr[1] }${ window.location.hash }`);
      return false;
    } else {
      return true;
    }
  }
}
