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
import { api } from "@/api";
import { setSession, setStore } from "@U/cache";
import _ from "lodash";

@Component({
  name: "Home",
  components: {}
})
export default class Home extends Vue {
  private $ajax: any;
  private users: any = [];

  mounted(): void {
    console.log("mounted run");
  }

  async activated() {
    console.log("activated run");
    // const rst = await this.$ajax("GET", api.user.users);
    // if(rst) {
    //   console.log("rst", rst, _.isArray(rst));
    //   this.users = rst;
    //   setStore('token', 'HuJie Big shuai b!');
    //   setSession('users', rst);
    // }
  }

  deactivated(): void {
    console.log("deactivated run");
  }
}
</script>
