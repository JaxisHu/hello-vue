<template>
  <div class="yc-tabs-order">
    订单页面
    <!--<order-list></order-list>-->
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import BizFn from "@U/bizFn";
  import Tabbar from "@C/Tabbar.vue";
  // import OrderList from "../order-system/order-list/Index.vue";

  @Component({
    name: "ycTabsOrder",
    components: { Tabbar }
  })
  export default class ycTabsOrder extends Vue {

    activated() {
      BizFn.setUrlWithHash();
    }
  }
</script>


<style lang="scss" scoped>

</style>
