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
import { setSession, setStore, getStore } from "@U/cache";
import _ from "lodash";

@Component({
  name: "Home",
  components: {}
})
export default class Home extends Vue {
  @Inject() WeChatAPI: any;
  private $ajax: any;
  private users: any = [];

  mounted(): void {
    console.log("mounted run");
  }

  async activated() {
    console.log("activated run");
    const config = ["chooseImage", "uploadImage", "getLocalImgData"];
    this.WeChatAPI(config, () => {
      console.log("微信鉴权成功");
      this.login();
    });
  }

  async login() {
    setStore("userInfoOpenId", "oE5sO6Ha3SPZpCvWZ60Ko3qtbQLg");
    const rst = await this.$ajax("POST", `${ api.common.loginOpenId }/${ getStore("userInfoOpenId") }`);
    if(rst) {
      console.log("rst", rst);
    }
  }

  deactivated(): void {
    console.log("deactivated run");
  }
}
</script>
