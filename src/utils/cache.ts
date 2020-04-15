// 参考 https://www.jb51.net/article/150337.htm
/**
 * 操作 cookie, localStorage, sessionStorage 封装
 */
// import Cookies from 'js-cookie'
// import { isNil } from 'lodash'
//
// const prefix = process.env.VUE_APP_PREFIX;
// let debug = false;  // if(debug && value == null) Toast


export const cun = function(key:string, value:any) {
  if (typeof value == 'string') {
    return localStorage.setItem(key, value);
  } else if (typeof value == "undefined") {
    return localStorage.setItem(key, '');
  } else if (typeof value == 'number') {
    return localStorage.setItem(key, value.toString());
  } else if (typeof value == 'object') {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};

export const qu = function(key:string) {
  return localStorage.getItem(key);
};

export const quObj = function(key:string) {
  let jsonData: any = localStorage.getItem(key);
  return JSON.parse(jsonData) || null;
};

export const shan = function(key:string) {
  return localStorage.removeItem(key);
};

export const shanAll = function() {
  return localStorage.clear();
};

export const cuns = function(key:string, value:any) {
  if (typeof value == 'string') {
    return sessionStorage.setItem(key, value);
  } else if (typeof value == "undefined") {
    return sessionStorage.setItem(key, '');
  } else if (typeof value == 'number') {
    return sessionStorage.setItem(key, value.toString());
  } else if (typeof value == 'object') {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const qus = function(key:string) {
  return sessionStorage.getItem(key);
};

export const qusObj = function(key:string) {
  let jsonData: any = sessionStorage.getItem(key);
  return JSON.parse(jsonData) || null;
};

export const shans = function(key:string) {
  return sessionStorage.removeItem(key);
};

export const shansAll = function() {
  return sessionStorage.clear();
};
