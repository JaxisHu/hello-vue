<template>
  <div class="yc-tabbar">
    <van-tabbar v-model="activeIdx" :active-color="tabbarTheme.activeColor"
                :inactive-color="tabbarTheme.inactiveColor">
      <van-tabbar-item v-for="(item, index) in tabbarItems" :key="index" :to="item.toPath" replace>
        <span>{{ item.name }}</span>
        <svg-icon slot="icon" slot-scope="props" :icon-class="props.active ? item.iconActive : item.iconNormal"/>
      </van-tabbar-item>
    </van-tabbar>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Tabbar extends Vue {
  // 可配置到config中,便于换主题
  private tabbarTheme: any = {
    activeColor: "#169BD5",
    inactiveColor: "#333333",
  };
  private tabbarItems: any = [
    {
      name: '首页',
      toPath: '/tabs/home',
      iconNormal: 'icon_home_normal',
      iconActive: 'icon_home_selected',
    },
    {
      name: '购物车',
      toPath: '/tabs/shopping-cart',
      iconNormal: 'icon_cart_normal',
      iconActive: 'icon_cart_selected',
    },
    {
      name: '订单',
      toPath: '/tabs/order',
      iconNormal: 'icon_order_normal',
      iconActive: 'icon_order_selected',
    },
    {
      name: '我的',
      toPath: '/tabs/mine',
      iconNormal: 'icon_mine_normal',
      iconActive: 'icon_mine_selected',
    }
  ];
  private activeIdx: number = 0;

  activated(){
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
