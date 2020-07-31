<template>
  <div class="yc-layout">
    我的页面
    <tabbar></tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import utils from '@U/index';
import BizFn from "@U/bizFn";
import Tabbar from "@C/Tabbar.vue";

@Component({
  name: "Mine",
  components: { Tabbar }
})

export default class YCMine extends Vue {
  @Inject() WeChatUrlAuth: any;
  @Inject() WeChatUserInfo: any;
  // private $ajax: any;

  activated() {
    BizFn.setUrlWithHash();

    // 如果用户同意授权，当前页面uri为 redirect_uri/?code=CODE&state=STATE。
    if (utils.parseUrlParams("code", "search")) {
      this.WeChatUserInfo();
    } else {
      // 重定向获取code和state
      this.WeChatUrlAuth(window.location.href, "snsapi_userinfo", "");
      // const redirect = 'http://test.jyc.zhibankeji.com/yc/index.html#/yc-tabs/home';
      // this.WeChatUrlAuth(redirect, "snsapi_userinfo", "");
    }
  }

}
</script>

<style lang="scss" scoped>
.yc-layout {

}
</style>
