<template>
  <div class="yc-layout">
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

  activated() {
    BizFn.setUrlWithHash();
    this.$toast.success("成功了哦成功了哦成功了哦成功了哦成功了哦成功了哦成功了哦成功了哦");
  }

}
</script>

<style lang="scss" scoped>
.yc-layout {

}
</style>
