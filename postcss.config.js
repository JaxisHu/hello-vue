// 使用postcss或package.json 配置 autoprefixer
module.exports = {
  plugins: {
    'autoprefixer': {
		overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    },
	'postcss-pxtorem': {
		rootValue: 16,
		propList: ['*']
	}
  }
};
