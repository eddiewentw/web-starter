import webpack from 'webpack';
import styleLintPlugin from 'stylelint-webpack-plugin';
import base from './webpack.config.babel';
import dev from './devConfig.json';

const webpackDevConfig = {
	entry: [
		`webpack-dev-server/client?http://localhost:${dev.port}`,
		'webpack/hot/dev-server',
		base.entry,
	],
	output: base.output,
	module: {
		rules: base.module.rules.concat([
			Object.assign(base.module.cssRule, {
				use: [
					base.module.cssRule.use.style,
					base.module.cssRule.use.css,
					base.module.cssRule.use.postcss,
				],
			}),
			{
				enforce: 'pre',
				test: /\.js$/,
				include: /src/,
				loader: 'eslint-loader',
				options: {
					configFile: '.eslintrc.json',
				},
			},
		]),
	},
	plugins: [
		base.plugins.htmlWebpakcPlugin,
		base.plugins.loaderOptionsPlugin,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new styleLintPlugin({
			configFile: '.stylelintrc.json',
			files: [
				'src/css/*.css',
				'src/css/**/*.css'
			],
		}),
	],
	devtool: 'eval',
};

export default webpackDevConfig;
