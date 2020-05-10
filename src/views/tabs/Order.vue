<template>
  <div class="yc-tabs-order" v-show="showCtn">
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
