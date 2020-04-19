<template>
	<svg :class="svgClass" aria-hidden="true">
		<use :xlink:href="iconName"/>
	</svg>
</template>

<script>
	export default {
		name: 'SvgIcon',
		props: {
			iconClass: {
				type: String,
				required: true,
			},
			className: {
				type: String,
				default: '',
			},
		},
		computed: {
			iconName () {
				return `#icon-${this.iconClass}`;
			},
			svgClass () {
				return this.className? 'svg-icon ' + this.className : 'svg-icon';
			},
		},
	};
</script>

<style scoped>
	.svg-icon {
		width: 1rem;
		height: 1rem;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
</style>
