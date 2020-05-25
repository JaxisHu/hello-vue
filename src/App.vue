<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
  import { Component, Watch, Provide, Mixins } from "vue-property-decorator";
  import { Action } from "vuex-class";
  import app from "./app";
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

    @Watch("$route")
    onRouteChange(to: any) {
      if (to) {
        // console.log('history to>>>', to);
      }
    }

    loadVuex() {

    }

  }
</script>

<style scoped lang="scss">

</style>
