/** 与业务相关的全局方法 */
export default class BizFn {
  // 修正页面进来不带?的情况
  static setUrlWithHash() {
    console.log('run setUrlWithHash');
    const search: string = window.location.search;
    if (!search) {
      window.location.href = `${ window.location.origin }${ window.location.pathname }?${ window.location.hash }`;
    }
  }
}
