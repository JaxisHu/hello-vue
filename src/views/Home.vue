<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <svg-icon class="svg" icon-class="wechat"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from '@C/HelloWorld.vue'

@Component({
  name: "home",
  components: { HelloWorld }
})
export default class Home extends Vue {
  activated(): void {
    console.log(`${process.env.BASE_URL}service-worker.js`);
    console.log("activated run");
  }

  deactivated(): void {
    console.log("deactivated run");
  }
}
</script>
