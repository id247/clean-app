'use strict';

const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.WEBPACK_ENV || process.env.NODE_ENV || 'development';

let configId;
let server;

switch(NODE_ENV){
	case 'dnevnik':
		configId = 'production';
		server = 'dnevnik';
		break;
	case 'mosreg':
		configId = 'production';
		server = 'mosreg';
		break;
	case 'staging':
		configId = 'staging';
		server = 'staging';
		break;
	default:
		configId = 'development';
		server = 'local';
}

const appSettings = path.join(__dirname, '/src/js/settings/settings-' + server + '.js');

const resolve = {
	modulesDirectories: ['node_modules'],
	extentions: ['', '.js'],
	alias: {
		appSettings: appSettings,
		'react-redux': configId === 'production' 
						? path.join(__dirname, '/node_modules/react-redux/dist/react-redux.min')
						: path.join(__dirname, '/node_modules/react-redux/dist/react-redux'),
	}
};

const loaders = {
	babel: {   
		test: /\.js$/, 
		loader: 'babel',
		include: [
			__dirname + '/src/js',
		], 
		query: {
			cacheDirectory: true,
			presets: ['es2015', 'react', 'stage-2']
		}
	},
	reactHot:{
		test: /\.js$/,
		loader: 'react-hot',
		include: __dirname + '/src/js',
	},
	strip: {
		test: /\.js$/, 
		include: [
			__dirname + '/src/js',
		], 
		loader: 'strip-loader?strip[]=console.log' 
	}
};

const plugins = {
	env: new webpack.DefinePlugin({
		'process.env': { 
			NODE_ENV : JSON.stringify('production'), 
		}
	}),
	uglifyJs: new webpack.optimize.UglifyJsPlugin({
		minimize: true,
		output: {
			comments: false
		},
		compress: {
			warnings: false
		}
	}),
	promise: new webpack.ProvidePlugin({
        'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
};

const config = {

	development: {
		cache: true,
		entry: {
			[server]: [
				'webpack-dev-server/client?http://localhost:3000',
				'webpack/hot/only-dev-server',
				'./src/js',
			],
		},
		devtool: '#inline-source-map',
		output: {
			path: __dirname + '/development',
			filename: '[name].min.js',
			publicPath: 'http://localhost:3000/assets/js/',
			pathinfo: true
		},

		resolve: resolve,

		module: {
			loaders: [
				loaders.reactHot,
				loaders.babel,
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			plugins.promise,
		],
	},

	staging: {
		cache: true,
		entry: {
			[server]: [
				'./src/js',
			],
		},
		//devtool: '#inline-source-map',
		output: {
			path: __dirname + '/production/assets/js',
			filename: '[name].min.js',
			publicPath: __dirname + '/production/assets/js',
			pathinfo: true
		},

		resolve: resolve,

		module: {
			loaders: [
				loaders.babel,
				//loaders.strip,				
			]
		},
		plugins: [  
			//plugins.env,		
			plugins.promise,
			//plugins.uglifyJs,
		]
	},

	production: {
		cache: true,
		entry: {
			[server]: [
				'./src/js',
			],
		},
		output: {
			path: __dirname + '/production/assets/js',
			filename: '[name].min.js',
			publicPath: __dirname + '/production/assets/js',
			pathinfo: true
		},

		resolve: resolve,

		module: {
			loaders: [
				loaders.babel,
				loaders.strip,				
			]
		},
		plugins: [  
			plugins.env,			
			plugins.promise,
			plugins.uglifyJs,
		]
	}
};

module.exports = config[configId];
