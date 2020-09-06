<template>
  <div class="yc-tabs-home-page">
    <home-page></home-page>
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Tabbar from "@C/Tabbar.vue";
import HomePage from "../home/Index.vue";

@Component({
  name: "Home",
  components: { Tabbar, HomePage }
})
export default class Home extends Vue {

  activated() {
  }

}
</script>

<style lang="scss" scoped></style>
