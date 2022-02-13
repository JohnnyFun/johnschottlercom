// based on https://github.com/sveltejs/template-webpack
// no babel, so only works in modern browsers, which is fine
const mode = process.env.NODE_ENV || 'development'
const isProd = mode === 'production'
console.log(`----------------------\nBuilding client in ${mode} mode\n----------------------`)
const prod = mode === 'production'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin') // not sure why won't work without this...but whatever

module.exports = {
	mode,
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'public/webpack-assets'),
		publicPath: '/',
		filename: '[name].[hash].js' // : 'bundle.js', // dev server doesn't cache and doesn't add the hash, so we don't need it. But prod should send new hash so client doesn't need full reload to break cache
	},
  resolve: {
		extensions: ['.mjs', '.js', '.svelte'],
		fallback: {
			// so ammo.js works: https://doc.babylonjs.com/divingDeeper/developWithBjs/treeShaking#ammo
			'fs': false,
			'path': false,
		},
    mainFields: ['svelte', 'browser', 'module', 'main'],
    modules: [
			path.resolve(__dirname, 'src'),
			'node_modules',
		]
  },
  module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: false
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					// MiniCssExtractPlugin doesn't support HMR. For developing, use 'style-loader' instead.
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
			{
        test: /\.txt$/i,
        use: 'raw-loader',
      },
		]
	},
  plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css'
		}),
		new HtmlWebpackPlugin({
			// https://github.com/jantimon/html-webpack-plugin#options
			template: path.resolve(__dirname, './src/index-template.html'),
			filename: path.resolve(__dirname, './public/index.html'),
			alwaysWriteToDisk: true,
		}),
		new HtmlWebpackHarddiskPlugin(), // not sure why won't work without this...but whatever
	],
	devServer: {
		https: true,
		port: 3000,
		// always send index.html for client-side routes
		historyApiFallback: true,
		static: {
			directory: path.resolve(__dirname, 'public'), // tells webpack to serve from the public folder
		},
	}
}