'use strict';

var webpack = require('webpack');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.js');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.js');

module.exports = {
	cache: true,
	devtool: '#inline-source-map',
	debug: true,
	entry: {
		local: [
			'webpack-dev-server/client?http://localhost:8080/',
			//'webpack-hot-middleware/client',
			'./src/js/local',
		]
	},
	output: {
		path: __dirname + '/dev/assets/js/',
		filename: '[name].js',
		publicPath: '/assets/js/',
		pathinfo: true
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extentions: ['', '.js'],
		alias: {
		  	//'react': pathToReact,
		  	//'react-dom': pathToReactDOM
		}
	},

	module: {
		noParse: [
		   pathToReact,
		],
		loaders: [
			{   test: /\.js$/, 
				loaders: ['react-hot', 'babel-loader'],
				include: [
					__dirname + '/src/js'
				],
				plugins: ['transform-runtime'],
			}
		]
	},
	plugins: [
    	new webpack.optimize.OccurenceOrderPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin()
    ]
};

