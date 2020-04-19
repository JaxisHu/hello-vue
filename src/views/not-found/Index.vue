<template>
	<div class="flex-col tc pd-15 pdt-50 bg-white">
		<p class="color-main fs-16 mgb-15 fw-600">404了哦！请扫描下方微信二维码了解更多。</p>
		<div><img class="wp-100" src="@/assets/qrcode.jpg" alt="HJ"></div>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	
	@Component({
		name: "NotFound"
	})
	export default class NotFound extends Vue {
	
	}
</script>

<style scoped lang="scss">

</style>