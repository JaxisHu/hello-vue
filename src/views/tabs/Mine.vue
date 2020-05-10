<template>
  <div class="yc-layout" v-show="showCtn">
    我的页面
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import Tabbar from "@C/Tabbar.vue";

@Component({
  name: "Mine",
  components: { Tabbar }
})
export default class YCMine extends Vue {
  // private $ajax: any;
  private showCtn: boolean = false;

  activated() {
    // 修正页面进来不带?的情况
    const search: string = window.location.search;
    if (!search) {
      const newUrl: string = `${window.location.origin}${window.location.pathname}?${window.location.hash}`;
      if (window.location.href !== newUrl) {
        window.location.href = newUrl;
        return false;
      }
    }

    this.showCtn = true; // 重定向页面体验优化
  }

}
</script>

<style lang="scss" scoped>
.yc-layout {

}
</style>
