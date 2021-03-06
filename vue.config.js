/**
 * 该文件会被 @vue/cli-service 自动加载
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const production = process.env.NODE_ENV === "production";
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
	publicPath: process.env.VUE_APP_PUBLIC_PATH,
	devServer: {
		open: true, // 自启动
		historyApiFallback: true, // 针对H5 API
		compress: true, // 为所服务的一切启用gzip压缩
		host: "0.0.0.0",
		port: 3001,
		https: false,
		hot: true,
		inline: true,
		watchOptions: {
			poll: true
		}
	},

	configureWebpack: config => {
		// 开发生产共同配置
		Object.assign(config, {
			// webpack配置文件后缀和别名
			resolve: {
				extensions: ['.js', '.ts', '.vue', '.json'],
				alias: {
					'@': path.resolve(__dirname, './src'),
					'@C': path.resolve(__dirname, './src/components'),
					'@U': path.resolve(__dirname, './src/utils'),
					'@T': path.resolve(__dirname, './src/types'),
					'@S': path.resolve(__dirname, './src/styles'),
					'@A': path.resolve(__dirname, './src/api')
				}
			}
		});
	},

	chainWebpack: config => {
		// svg rule loader
		const svgRule = config.module.rule('svg');
		svgRule.uses.clear();
		svgRule.exclude.add(/node_modules/);
		svgRule
			.test(/\.svg$/)
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			});

		const imagesRule = config.module.rule('images');
		imagesRule.exclude.add(path.join(__dirname, './src/icons'));
		imagesRule.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
		// if (production) {
		// 	config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
		// 	//生产环境才开启 不然开发时lodash函数不起作用 也不报错
		// }

	},

	// css相关配置
	css: {
		// css预设器配置项
		loaderOptions: {
			css: {
				// 这里的选项会传递给 css-loader
			},
			sass: {
				// 旧data  新prependData
				prependData: `@import "@S/variables.scss";@import "@S/mixin.scss";`
			}
		}
	},

	lintOnSave: 'error'
};
