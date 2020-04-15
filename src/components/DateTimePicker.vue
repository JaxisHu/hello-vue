<template>
	<div class="yc-date-time-picker">
		<van-popup v-model="showPopup" :position="position" :close-on-click-overlay="closeMask">
			<van-datetime-picker
				v-model="dateTimeValue"
				:type="dateType"
				:confirm-button-text="confirmText"
				:cancel-button-text="cancelText"
				:min-date="minDate"
				:max-date="maxDate"
				@confirm="confirmDateTime"
				@cancel="cancelDateTime"
			></van-datetime-picker>
		</van-popup>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator';
	
	@Component({
		name: 'DateTimePicker',
	})
	export default class DateTimePicker extends Vue {
	  // popup —— STR
		@Prop({ type: Boolean, default: false })
		showDateTimePicker!: boolean;
		@Prop({ type: String, default: "bottom" })
		position!: string;
		@Prop({ type: Boolean, default: false })	// 重改UI组件库默认值，改为默认点击不关闭
		closeMask!: boolean;
    // popup —— END
		
		// datetime-picker —— STR
		@Prop({ type: String, default: 'date' })
		dateType!: string;
		@Prop({ type: String, default: '确认' })
    confirmText!: string;
		@Prop({ type: String, default: '取消' })
    cancelText!: string;
		@Prop()
		minDate: any;
		@Prop()
		maxDate: any;
    // datetime-picker —— END
		
		get showPopup() {
		 return this.showDateTimePicker;
		}
		set showPopup(val: any) {
		 this.$emit('closeDateTimePicker', val);
		}
		
		private dateTimeValue: any = new Date();	// 当天时间值

    confirmDateTime(val: any) {
    	this.$emit('confirmDateTime', val);
		}
    cancelDateTime() {
      this.showPopup = false;
		}
	};
</script>

<style scoped lang="scss">

</style>