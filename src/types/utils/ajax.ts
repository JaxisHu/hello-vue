/**
 *  请求参数接口
 *  @param url   Request Url
 *  @param data  Request Params
 *  @param config   Request additional parameters, e.g： headers callback   etc...
 */
export interface IParams {
  url: string;
  data?: any;
  config?: any;
}

