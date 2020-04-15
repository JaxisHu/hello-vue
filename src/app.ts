import { Vue, Component, Provide } from "vue-property-decorator";
// import { api } from './api';
// import utils from '@U/index';
// import { qusObj } from "@U/cache";

@Component({
  name: "appMixins"
})
export default class appMixins extends Vue {
  // 修复ios焦点 bug
  @Provide()
  fixiOSFocus(self: any, ref: string): void {
    self.$refs[ref].blur();
    self.$refs[ref].focus();
  };

};
