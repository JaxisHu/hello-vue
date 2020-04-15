/**
 *  Vant-UI 按需加载UI组件
 *  import 组件，再Vue.use使用
 */
import Vue from "vue";
import { NavBar, Icon, Button, Dialog, Toast, Picker, Popup, List, Area,
  Field, Cell, CellGroup, Checkbox, CheckboxGroup, RadioGroup, Radio, PullRefresh,
  DatetimePicker, Search, Step, Steps,Swipe, SwipeItem, Lazyload, Tabbar, TabbarItem,
  Skeleton, ImagePreview, Uploader, AddressList, AddressEdit, Stepper, SubmitBar, NoticeBar, Tab, Tabs, CountDown  } from "vant";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(List);
Vue.use(Area);
Vue.use(PullRefresh);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Radio).use(RadioGroup);
Vue.use(DatetimePicker);
Vue.use(Search);
Vue.use(Step).use(Steps);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Skeleton);
Vue.use(ImagePreview);
Vue.use(Uploader);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(Stepper);
Vue.use(SubmitBar);
Vue.use(NoticeBar);
Vue.use(Tab).use(Tabs);
Vue.use(CountDown);
