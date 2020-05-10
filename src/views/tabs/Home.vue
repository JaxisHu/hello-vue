<template>
  <div class="yc-tabs-home-page" v-show="showCtn">
    <home-page></home-page>
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BizFn from "@U/bizFn";
import Tabbar from "@C/Tabbar.vue";
import HomePage from "../home/Index.vue";

@Component({
  name: "Home",
  components: { Tabbar, HomePage }
})
export default class Home extends Vue {
  private showCtn: boolean = false;

  activated() {
    const bizFn = new BizFn();
    bizFn.setUrlWithHash();
    this.showCtn = true; // 重定向页面体验优化
  }

}
</script>

<style lang="scss" scoped></style>
