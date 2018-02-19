const webpack = require('webpack');
const config = require('sapper/webpack/config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isDev = config.dev;

module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.html']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						hydratable: true,
						emitCss: true, //!isDev,
						cascade: false,
						store: true
					}
				}
			},
			isDev && {
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
          { loader: 'postcss-loader', options: { config: { path: `${__dirname}/../postcss.config.js` } } },
				]
			},
			!isDev && {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
            { loader: 'css-loader', options: { sourceMap: isDev } },
            { loader: 'postcss-loader', options: { config: { path: `${__dirname}/../postcss.config.js` } } }
          ]
				})
			}
		].filter(Boolean)
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			minChunks: 2,
			async: false,
			children: true
		})
	].concat(isDev ? [
		new webpack.HotModuleReplacementPlugin()
	] : [
		new ExtractTextPlugin('main.css'),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new UglifyJSPlugin()
	]).filter(Boolean),
	devtool: isDev && 'inline-source-map'
};
