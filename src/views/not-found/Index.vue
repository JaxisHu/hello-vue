<template>
	<div class="not-find-page-index txtC pd15 bgcolor-white">
		<span class="color-main fs-16">请您关注我的Git项目，并通过微信二维码添加好友。</span>
		<img src="@/assets/qrcode.jpg" alt="HJ">
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
	.not-find-page-index {
		height: 100%;
		padding-top: 100px;
	}
</style>