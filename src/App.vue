<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch, Provide } from "vue-property-decorator";
  // import { Action } from "vuex-class";
  // import { api } from './api';

  @Component({
    mounted() {
      // 刷新页面时全局请求vuex
      (this as any).loadVuex();
    }
  })
  export default class App extends Vue {
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
      console.log("process.env", process.env);
    }

  }
</script>

<style scoped lang="scss">

</style>
