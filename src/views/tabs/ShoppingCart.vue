<template>
  <div class="yc-tabs-shopping-cart">
    <div class="row-wrap align-self-center p-node">
      <div class="wp-100">123</div>
      <div class="wp-100">456</div>
      <div class="align-self-end wp-100">789</div>
    </div>
    <!--<shopping-cart></shopping-cart>-->
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabbar from "@C/Tabbar.vue";

@Component({
  name: "ycTabsShoppingCart",
  components: { Tabbar }
})
export default class ycTabsShoppingCart extends Vue {

  activated() {
  }
}
</script>

<style lang="scss" scoped>
  .p-node{
    height: 100vh;
    >div:last-child {
      margin-bottom: 60px;
    }
  }
</style>
