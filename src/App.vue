<template>
  <div id="app">
    <keep-alive :include="cachedViews">
      <router-view></router-view>
    </keep-alive>

    <van-popup class="confirm border5 fs-16 txtC"
               v-model="confirmInfo.show"
               :close-on-click-overlay="false">
      <p class="title mgt20 fw-600">{{ confirmInfo.title }}</p>
      <div :class="['message', 'color-main', 'fs-14', 'pd15', confirmInfo.messageClass]"><pre>{{ confirmInfo.message }}</pre></div>
      <div class="footer flex-row justify-around">
        <p :class="['cancel-btn', 'color-vice', confirmInfo.cancelButtonClass]"
           v-show="confirmInfo.showCancelButton" @click="handleCancel">{{ confirmInfo.cancelButtonText }}</p>
        <p :class="['confirm-btn', 'color-assist', confirmInfo.confirmButtonClass]"
           v-show="confirmInfo.showConfirmButton" @click="handleConfirm">{{ confirmInfo.confirmButtonText }}</p>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Watch, Provide, Mixins } from "vue-property-decorator";
  import { Action } from "vuex-class";
  import app from "./app";
  import { qusObj } from "@U/cache";
  // import { api } from './api';

  @Component({
    // mounted() {
    //   // 刷新页面时全局请求vuex
    //   if (!!qusObj("userInfo")) {
    //     (this as any).loadVuex();
    //   }
    // }
  })
  export default class App extends Mixins(app) {
    @Action("actionSetHistory") public setHistory!: any;

    @Provide()
    async getVuex(): Promise<any> {
      await this.loadVuex();
    }

    private cachedViews: string[] = [];
    private history: string[] = [];
    private confirmInfo = {
      show: false,
      title: "",
      message: "",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      messageClass: "",
      cancelButtonClass: "",
      confirmButtonClass: "",
      callback: () => {}
    };

    @Watch("$route")
    onRouteChange(to: any) {
      const componentName =
          to.matched[to.matched.length - 1].components.default.extendOptions.name || "";
      const history = this.history;
      if (to) {
        if (to.path === history[history.length - 2]) {
          this.cachedViews.splice(history.length - 1, 1);
          this.history.splice(history.length - 1, 1);
        } else {
          this.cachedViews.push(componentName);
          this.history.push(to.path);
        }
      }
      this.setHistory({ history: this.history.length, name: this.cachedViews });
    }

    loadVuex() {

    }

    navigatorUserAgent() {
      const ua = navigator.userAgent.toLowerCase();
      return (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    }

    handleCancel() {
      this.confirmInfo.show = false;
    }

    handleConfirm() {
      this.confirmInfo.show = false;
      this.confirmInfo.callback();
    }

  }
</script>

<style scoped lang="scss">
  /deep/ .confirm {
    width: 85%;
    top: 40%;
    .title {}
    .message {
      padding: 10px 25px 25px;
      word-break: break-word;
      line-height: 1.5;
      border-bottom: 1px solid #F2F2F2;
    }
    pre {
      font-size: 16px;
      white-space: pre-wrap;
    }
    .footer {
      .confirm-btn {
        flex: 1;
        padding: 15px;
      }
      .cancel-btn {
        flex: 1;
        padding: 15px;
        border-right: 1px solid #F2F2F2;
      }
    }
  }
</style>
