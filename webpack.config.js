const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
	{
		context: path.resolve(__dirname, 'src/js'),
		entry: {
			app: './app.js',
		},
		output: {
			path: path.resolve(__dirname, 'public/js'),
			filename: '[name].js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['es2015']
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: ['*', '.js'],
			modules: [ path.resolve(__dirname, 'src/js'), 'node_modules' ]
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			}),
			new webpack.optimize.UglifyJsPlugin({
				beautify: false,
				mangle: {
					screw_ie8: true,
					keep_fnames: true
				},
				compress: {
					warnings: false,
					screw_ie8: true
				},
				comments: false
			})
		]
	},
	{
		context: path.resolve(__dirname, 'src/css'),
		entry: {
			style: './style.scss'
		},
		output: {
			path: path.resolve(__dirname, 'public/css'),
			filename: '[name].css'
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									minimize: true
								}
							},
							{
								loader:'postcss-loader',
								options: {
									plugins: [
										autoprefixer({ browsers: ['last 3 version', 'Android >= 4.2'] })
									]
								}
							},
							'sass-loader'
						]
					})
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('style.css')
		],
	},
];