<template>
  <div class="yc-tabs-shopping-cart">
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

  activated() {
    BizFn.setUrlWithHash();
  }
}
</script>

<style lang="scss" scoped>
</style>
