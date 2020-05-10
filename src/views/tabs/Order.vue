<template>
  <div class="yc-tabs-order" v-show="showCtn">
    订单页面
    <!--<order-list></order-list>-->
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Tabbar from "@C/Tabbar.vue";
  // import OrderList from "../order-system/order-list/Index.vue";

  @Component({
    name: "ycTabsOrder",
    components: { Tabbar }
  })
  export default class ycTabsOrder extends Vue {

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
