<template>
  <div class="yc-layout">
    我的页面
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import Tabbar from "@C/Tabbar.vue";

@Component({
  name: "Mine",
  components: { Tabbar }
})

export default class YCMine extends Vue {
  activated() {

  }

}
</script>

<style lang="scss" scoped>
.yc-layout {

}
</style>
