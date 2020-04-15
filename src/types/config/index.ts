/**
 *  IBaseUrl 基础请求url
 *  @development: dev环境
 *  @test: 测试环境
 *  @uat: uat环境
 *  @production: 生产环境
 */
export interface IBaseUrl {
  development: string;
  test: string;
  uat: string;
  production: string;
}

/**
 *  通过类型强转解决
 *  #bug: Element implicitly has an 'any' type because type '{0}' has no index signature.
 *  对象类型的索引签名隐式地含有 "any" 类型
 */
export interface IType {
  [key: string]: string
}
