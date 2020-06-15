/** 全局配置项 */
export default {
  wxDebugModeOpen: true, // WeChat API是否开启debug模式，生产环境务必改为 false
  tabbarTheme: { // 可配置到config中,便于换主题
    activeColor: "#169BD5",
    inactiveColor: "#333333",
  },
  tabbarItems: [
    {
      name: '首页',
      toPath: '/tabs/home',
      iconNormal: 'icon_home_normal',
      iconActive: 'icon_home_selected',
      activeIdx: 0
    },
    {
      name: '购物车',
      toPath: '/tabs/shopping-cart',
      iconNormal: 'icon_cart_normal',
      iconActive: 'icon_cart_selected',
      activeIdx: 1
    },
    {
      name: '订单',
      toPath: '/tabs/order',
      iconNormal: 'icon_order_normal',
      iconActive: 'icon_order_selected',
      activeIdx: 2
    },
    {
      name: '我的',
      toPath: '/tabs/mine',
      iconNormal: 'icon_mine_normal',
      iconActive: 'icon_mine_selected',
      activeIdx: 3
    }
  ]
};