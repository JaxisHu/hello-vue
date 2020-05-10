<template>
  <div class="yc-tabbar">
    <van-tabbar v-model="activeIdx" active-color="#169BD5" inactive-color="#333">
      <van-tabbar-item to="/tabs/home" replace>
        <span>首页</span>
        <svg-icon slot="icon" slot-scope="props" :icon-class="props.active ? icon.home.active : icon.home.normal"/>
      </van-tabbar-item>
      <van-tabbar-item to="/tabs/shopping-cart" replace>
        <span>购物车</span>
        <svg-icon slot="icon" slot-scope="props" :icon-class="props.active ? icon.cart.active : icon.cart.normal"/>
      </van-tabbar-item>
      <van-tabbar-item to="/tabs/order" replace>
        <span>订单</span>
        <svg-icon slot="icon" slot-scope="props" :icon-class="props.active ? icon.order.active : icon.order.normal"/>
      </van-tabbar-item>
      <van-tabbar-item to="/tabs/mine" replace>
        <span>我的</span>
        <svg-icon slot="icon" slot-scope="props" :icon-class="props.active ? icon.mine.active : icon.mine.normal"/>
      </van-tabbar-item>
    </van-tabbar>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Tabbar extends Vue {
  private icon:any = {
    // 日常普通皮肤
    home: {normal: 'icon_home_normal', active: 'icon_home_selected'},
    cart: {normal: 'icon_cart_normal', active: 'icon_cart_selected'},
    order: {normal: 'icon_order_normal', active: 'icon_order_selected'},
    mine: {normal: 'icon_mine_normal', active: 'icon_mine_selected'},

    // 春节皮肤
    // home: {normal: 'icon_home_normal-new-year', active: 'icon_home_selected-new-year'},
    // cart: {normal: 'icon_cart_normal-new-year', active: 'icon_cart_selected-new-year'},
    // order: {normal: 'icon_order_normal-new-year', active: 'icon_order_selected-new-year'},
    // mine: {normal: 'icon_mine_normal-new-year', active: 'icon_mine_selected-new-year'},
  };
  private activeIdx: number = 0;

  created(){
    this.upactive();
  }

  updated(){
    this.upactive();
  }

  upactive(){
    switch (this.$route.path) {
      case '/tabs/home':
        this.activeIdx = 0;break;
      case '/tabs/shopping-cart':
        this.activeIdx = 1;break;
      case '/tabs/order':
        this.activeIdx = 2;break;
      case '/tabs/mine':
        this.activeIdx = 3;break;
      default:
        this.activeIdx = 999;break;
    }
  }

}
</script>

<style lang="scss" scoped>
  .yc-tabbar /deep/ .van-tabbar{
    height: 60px;
    border-top: 1px solid #F2F2F2;
  }
  .yc-tabbar /deep/ .svg-icon {
    width: 20px;
    height:20px;
  }
</style>
