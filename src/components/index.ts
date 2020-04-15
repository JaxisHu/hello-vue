/**
 * 注册全局组件
 */
import DateTimePicker from './DateTimePicker.vue';

const components: any = [
  DateTimePicker,
];

export default {
  install(Vue: any) {
    components.map((component: any) => {
      Vue.component('hj' + component.extendOptions.name, component);
    });
  }
};
