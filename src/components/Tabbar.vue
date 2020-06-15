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
import gConfig from '@/config/index';

@Component
export default class Tabbar extends Vue {
  private tabbarTheme:any = gConfig.tabbarTheme;
  private tabbarItems:any = gConfig.tabbarItems;
  private activeIdx: number = 0;

  activated(){
    this.activeIdx = this.tabbarItems.filter((item: any) => item.toPath === this.$route.path)[0].activeIdx;
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
