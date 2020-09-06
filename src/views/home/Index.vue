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
import { Component, Vue, Inject } from "vue-property-decorator";
import { api } from "@/api";
import {setOpenId, getOpenId, setSession} from "@U/cache";

@Component({
  name: "Home",
  components: {}
})
export default class Home extends Vue {
  private $ajax: any;
  private users: any = [];

  async activated() {
    console.log("activated run");
    await this.login();
  }

  async login() {
    const payload = {
      mobile: "15360860953",
      verificationCode: "999999",
      "openid": getOpenId()
    };
    let rst = await this.$ajax('POST', api.common.loginVerifyCode, payload);
    if (!!rst) {
      setSession('MEIXI_USER_INFO', rst);
      setOpenId(rst.openid);
    }
  }

  deactivated(): void {
    console.log("deactivated run");
  }
}
</script>
