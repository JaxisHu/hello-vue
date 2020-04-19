/**
 * 操作 cookie, localStorage, sessionStorage 封装
 */
import Cookies from 'js-cookie';

const prefix = process.env.NODE_ENV + '_';

/**
 * 判断值是否为null或者undefined或者''或者'undefined'
 * @param val value
 */
function isEmpty (val: any) {
  if (val === null || val === 'undefined' || val === '') {
    return true;
  }
  return false;
}

/**
 * ============ Cookie ============
 */
export function quc (name: string) {
  let val: any = Cookies.get(prefix + name);
  return val || null;
}

export function cunc (name: string, value: any, params= {}): void {
  if (isEmpty(value)) return;
  Cookies.set(prefix + name, value, params);
}

export function shanc (name: string, params= {}): void {
  Cookies.remove(prefix + name, params);
}

/**
 * ============ localStorage ============
 */

export const cun = function(key:string, value:any) {
  key = prefix + key;
  if (typeof value == "undefined") {
    return;
  } else if (typeof value == 'string') {
    return localStorage.setItem(key, value);
  } else if (typeof value == 'number') {
    return localStorage.setItem(key, value.toString());
  } else if (typeof value == 'object') {
    return localStorage.setItem(key, JSON.stringify(value));
  }
};

export const qu = function(key:string) {
  key = prefix + key;
  return localStorage.getItem(key) || null;
};

export const quObj = function(key:string) {
  key = prefix + key;
  const jsonStr: any = localStorage.getItem(key);
  return JSON.parse(jsonStr) || null;
};

export const shan = function(key:string) {
  key = prefix + key;
  return localStorage.removeItem(key);
};

export const shanAll = function() {
  return localStorage.clear();
};

/**
 * ============ sessionStorage ============
 */

export const cuns = function(key:string, value:any) {
  key = prefix + key;
  if (typeof value == "undefined") {
    return;
  } else if (typeof value == 'string') {
    return sessionStorage.setItem(key, value);
  } else if (typeof value == 'number') {
    return sessionStorage.setItem(key, value.toString());
  } else if (typeof value == 'object') {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const qus = function(key:string) {
  key = prefix + key;
  return sessionStorage.getItem(key) || null;
};

export const qusObj = function(key:string) {
  key = prefix + key;
  const jsonStr: any = sessionStorage.getItem(key);
  return JSON.parse(jsonStr) || null;
};

export const shans = function(key:string) {
  key = prefix + key;
  return sessionStorage.removeItem(key);
};

export const shansAll = function() {
  return sessionStorage.clear();
};
