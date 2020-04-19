<template>
  <div class="home flex-col">
    <div><img class="wp-100" alt="Vue logo" src="@/assets/logo.png"></div>
    <ul class="tc fs-18">
      <li v-for="(user, index) in users" :key="index">{{ user.user_name }}</li>
    </ul>
    <svg-icon class="svg" icon-class="wechat"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { api } from "@A/index";
import { cuns } from "@U/cache";

@Component({
  name: "Home",
  components: {}
})
export default class Home extends Vue {
  private users: any = "";
  private $ajax: any;

  mounted(): void {
    console.log("mounted run");
  }

  async activated() {
    console.log("activated run");
    const rst = await this.$ajax("GET", api.user.users);
    if(rst) {
      console.log("rst", rst);
      this.users = rst;
      cuns('token', 'HuJie Big shuai b!');
      cuns('users', rst);
    }
  }

  deactivated(): void {
    console.log("deactivated run");
  }
}
</script>
