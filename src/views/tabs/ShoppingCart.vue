<template>
  <div class="yc-tabs-shopping-cart" v-show="showCtn">
    购物车页面
    <!--<shopping-cart></shopping-cart>-->
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabbar from "@C/Tabbar.vue";
// import shoppingCart from "../goods-system/shopping-cart/Index.vue";

@Component({
  name: "ycTabsShoppingCart",
  components: { Tabbar }
})
export default class ycTabsShoppingCart extends Vue {
  
  private showCtn: boolean = false;

  activated() {
    // 修正页面进来不带?的情况
    const search: string = window.location.search;
    if (!search) {
      const newUrl: string = `${ window.location.origin }${ window.location.pathname }?${ window.location.hash }`;
      if (window.location.href !== newUrl) {
        window.location.href = newUrl;
        return false;
      }
    }
    this.showCtn = true;
  }
}
</script>

<style lang="scss" scoped>
</style>
