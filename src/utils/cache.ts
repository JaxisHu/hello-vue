/**
 * 操作 localStorage, sessionStorage 封装
 */
const prefix = process.env.NODE_ENV + '_';

/**
 * ============ localStorage ============
 */

export const setStore = function(key:string, value:any) {
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

export const getStore = function(key:string, type: any = 'str') {
  key = prefix + key;
  const store: any = localStorage.getItem(key);
  if(type === 'obj') {
    return JSON.parse(store) || null;
  }
  return store || null;
};

export const removeStore = function(key:string) {
  key = prefix + key;
  return localStorage.removeItem(key);
};

export const clearStore = function() {
  return localStorage.clear();
};

/**
 * ============ sessionStorage ============
 */

export const setSession = function(key:string, value:any) {
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

export const getSession = function(key:string, type: any = 'str') {
  key = prefix + key;
  const sess: any = sessionStorage.getItem(key);
  if(type === 'obj') {
    return JSON.parse(sess) || null;
  }
  return sess || null;
};

export const removeSession = function(key:string) {
  key = prefix + key;
  return sessionStorage.removeItem(key);
};

export const clearSession = function() {
  return sessionStorage.clear();
};

/** 缓存 */
export const setOpenId = function(value: any) {
  return setStore('MEIXI_OPEN_ID', value);
};

export const getOpenId = function(value: any = '') {
  return getStore('MEIXI_OPEN_ID') || value;
};

export const setUserId = function(value: any) {
  return setSession('MEIXI_USER_ID', value);
};

export const getUserId = function(value: any = '') {
  return getSession('MEIXI_USER_ID') || value;
};

export const setWechatUserInfo = function(value: any) {
  return setStore('MEIXI_WECHAT_USER_INFO', value);
};

export const getWechatUserInfo = function(value: any = '') {
  return getStore('MEIXI_WECHAT_USER_INFO', 'obj') || value;
};

export const isSoleAgent = function() {
  return getSession('userInfo','obj')? getSession('userInfo','obj').sole_agent : false;
};
