/* eslint-disable no-console */
/**
目前的Vue脚手架默认会携带一个registerServiceWorker的东西，这个东西是做什么的呢？
registerServiceWorker可以运用于主流框架(Vue,React...)，它只是为了简化缓存机制产生的js包，
这个文件可以视情况用或者不用，它是用来做离线缓存等任务的，实际上就是为Vue项目注册了一个service worker。
这样的话，如果在线上，只要访问过一次该网站，以后即使没有网络也可以访问（此时使用的是之前缓存的资源）。
只在生产环境中有效（process.env.NODE_ENV === ‘production’）
使用service worker的现象是什么呢？
他会在第一次访问该站点的时候，一次性请求加载所有资源，当然除了当前页面的资源是通过浏览器去获取的，
其他缓存资源都是通过service worker
*/

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      );
    },
    registered () {
      console.log('Service worker has been registered.');
    },
    cached () {
      console.log('Content has been cached for offline use.');
    },
    updatefound () {
      console.log('New content is downloading.');
    },
    updated () {
      console.log('New content is available; please refresh.');
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error (error) {
      console.error('Error during service worker registration:', error);
    }
  });
}
