'use strict';

var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var md5File = require('md5-file');
var replace = require('gulp-replace');

var newer = require('gulp-newer');
var notify = require('gulp-notify');

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var modifyCssUrls = require("gulp-modify-css-urls");
var cssImageDimensions = require("gulp-css-image-dimensions");

var watch = require('gulp-watch');
var server = require('gulp-server-livereload');

var htmlmin = require('gulp-htmlmin');
var fileinclude = require('gulp-file-include');

var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

var isDevelopment = process.env.NODE_ENV !== 'production' ? true : false;

gulp.task('clean', function() {
	return del('public');
});

// STYLES
gulp.task('sass', function () {

	const date = new Date().getTime();

	return gulp.src('src/sass/style.scss')
		.pipe(gulpIf(isDevelopment, sourcemaps.init())) 
		.pipe(sass({outputStyle: 'expanded'})) 
		.on('error', notify.onError())
		.pipe(autoprefixer({
			browsers: ['> 1%'],
			cascade: false
		}))
		.pipe(cssImageDimensions())
		.pipe(gulpIf(isDevelopment, sourcemaps.write())) 
		.pipe(gulp.dest('public/assets/css'));  
});

// image urls
gulp.task('modifyCssUrls', function () {
	const date = Math.round(new Date().getTime()/1000.0);

	return gulp.src('public/assets/css/style.css')
		.pipe(modifyCssUrls({
			append: '?_v=' + date
		}))		
		.pipe(minifyCss({compatibility: 'ie8'}))
    	.pipe(gulp.dest('public/assets/css'));

});


// ASSETS
gulp.task('assets-files', function(){
	return gulp.src('src/assets/{images,fonts}', {since: gulp.lastRun('assets-files')})
		.pipe(newer('public/assets'))
		.pipe(gulp.dest('public/assets'))
});


gulp.task('assets-favicon', function(){
	return gulp.src('src/assets/favicon.ico', {since: gulp.lastRun('assets-favicon')})
		.pipe(newer('public'))
		.pipe(gulp.dest('public'))
});

gulp.task('sprite', function(callback) {
	var spriteData = 
		gulp.src('src/assets/sprite/*.png') // путь, откуда берем картинки для спрайта
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprites.scss',
			imgPath: '../images/sprite.png' 
		}))
		.on('error', notify.onError());

	spriteData.img.pipe(gulp.dest('public/assets/images/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('src/sass/'));

	callback();
});


gulp.task('assets', gulp.parallel('assets-files', 'assets-favicon', 'sprite'));



// HTML
gulp.task('html', function() {

	return gulp.src(['src/html/{local,dnevnik,mosreg}/*.html', 'src/html/oauth.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.on('error', notify.onError())
		.pipe(gulpIf(function(file){ //if not local - htmlmin it
				return file.path.indexOf('/local/') === -1;
			}, htmlmin({collapseWhitespace: true}))
		)
		.pipe(gulp.dest('public'));
});





//set new css and js versions
gulp.task('vers', function(){

	var cssVer =  fs.existsSync('public/assets/css/style.css') && md5File('public/assets/css/style.css');
	var dnevnikVer =  fs.existsSync('public/assets/js/dnevnik.js') && md5File('public/assets/js/dnevnik.js');
	var mosregVer =  fs.existsSync('public/assets/js/mosreg.js') && md5File('public/assets/js/mosreg.js');

	return gulp.src(['public/{dnevnik,mosreg}/*.html'])
		.pipe(gulpIf(!!cssVer, replace( /style\.css(\S*)\"/g, 'style.css?_v=' + cssVer + '"' )))
		.pipe(gulpIf(!!dnevnikVer, replace( /dnevnik\.js(\S*)\"/g, 'dnevnik.js?_v=' + dnevnikVer + '"' )))
		.pipe(gulpIf(!!mosregVer, replace( /mosreg\.js(\S*)\"/g, 'mosreg.js?_v=' + mosregVer + '"' )))
		.pipe(gulpIf(!!cssVer, replace( /\.png(\S*)\"/g, '.png?_v=' + cssVer + '"')))
		.pipe(gulpIf(!!cssVer, replace( /\.jpg(\S*)\"/g, '.jpg?_v=' + cssVer + '"')))
		.pipe(gulpIf(!!cssVer, replace( /\.gif(\S*)\"/g, '.gif?_v=' + cssVer + '"')))
		.on('error', notify.onError())
		.pipe(gulp.dest('public'));

});



gulp.task("webpack", function(callback) {
    
    var myConfig = Object.create(webpackConfig);

    if (isDevelopment){

	    myConfig.devtool = 'eval';
	    
	    myConfig.plugins = [      
	        new webpack.DefinePlugin({
	            "process.env": { 
	                NODE_ENV : JSON.stringify("development") 
	            }
	        })
	    ];

    }else{

	    myConfig.plugins = [      
	        new webpack.DefinePlugin({
	            "process.env": { 
	                NODE_ENV : JSON.stringify("production") 
	            }
	        }),
	        new webpack.optimize.UglifyJsPlugin({
	            minimize: true,
	            compress: {
	                warnings: false
	            }
	        })
	    ];

    }

    webpack(myConfig, 
    function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});



// BUILD


gulp.task('server', function () {
	gulp.src('public')
	.pipe(server({
		livereload: true,
		directoryListing: false,
		open: false,
		port: 9000
	}));
})

gulp.task('watch', function(){
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('src/assets/**/*.*', gulp.series('assets'));
	gulp.watch('src/js/**/*.js', gulp.series('webpack'));
	gulp.watch('src/html/**/*.html', gulp.series('html'));
});

gulp.task('build', 
	gulp.series(
		'clean', 
		gulp.parallel('assets', 'sass', 'html', 'webpack')
	)
);

gulp.task('prod', gulp.series('build', 'modifyCssUrls', 'vers'));

gulp.task('default', gulp.parallel('server', 'watch'));



