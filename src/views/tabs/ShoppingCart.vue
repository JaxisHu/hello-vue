<template>
  <div class="yc-tabs-shopping-cart" v-show="showCtn">
    购物车页面
    <!--<shopping-cart></shopping-cart>-->
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BizFn from "@U/bizFn";
import Tabbar from "@C/Tabbar.vue";
// import shoppingCart from "../goods-system/shopping-cart/Index.vue";

@Component({
  name: "ycTabsShoppingCart",
  components: { Tabbar }
})
export default class ycTabsShoppingCart extends Vue {
  
  private showCtn: boolean = false;

  activated() {
    const bizFn = new BizFn();
    bizFn.setUrlWithHash();
    this.showCtn = true; // 重定向页面体验优化
  }
}
</script>

<style lang="scss" scoped>
</style>
