'use strict';

var webpack = require('webpack');
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.js');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.js');

var appSettings = path.resolve(__dirname, 'src/js/settings/local.js');

module.exports = {
	cache: true,
	entry: ['./src/js'],
	devtool: '#inline-source-map',
	output: {
		path: __dirname + '/dev/assets/js',
		filename: 'local.js',
		publicPath: __dirname + '/dev/assets/js',
		pathinfo: true
	},

	resolve: {
		modulesDirectories: ['node_modules', 'my_modules'],
		extentions: ['', '.js'],
		alias: {
		  'react': pathToReact,
		  'react-dom': pathToReactDOM,
          'appSettings': appSettings
		}
	},

	module: {
		noParse: [
		   pathToReact,
		],
		loaders: [
			{   test: /\.js$/, 
				loader: 'babel',
				include: [
					__dirname + '/src/js',
					__dirname + '/my_modules',
				], 
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react', 'stage-2']
				}
			}
		]
	},
	plugins: []
};

