<template>
  <div class="yc-layout" v-show="showCtn">
    我的页面
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import BizFn from "@U/bizFn";
import Tabbar from "@C/Tabbar.vue";

@Component({
  name: "Mine",
  components: { Tabbar }
})
export default class YCMine extends Vue {
  // private $ajax: any;
  private showCtn: boolean = false;

  activated() {
    const bizFn = new BizFn();
    bizFn.setUrlWithHash();
    this.showCtn = true; // 重定向页面体验优化
  }

}
</script>

<style lang="scss" scoped>
.yc-layout {

}
</style>
