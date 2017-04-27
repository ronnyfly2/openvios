var
	resources = {
		jade: '../resources/jade/',
		stylus: '../resources/stylus/',
		coffee: '../resources/coffee/',
		img: '../resources/assets/img/',
		sprite: '../resources/assets/sprites/',
		svg: '../resources/assets/svg/',
		fonts: '../resources/assets/fonts/'
	},
	publicPatch = {
		path: '../../public/',
		pathBack: '../../source/',
		html: '../../public/views/',
		css: '../../source/public/css/',
		//fonts : '../../public/css/fonts/',
		fonts: '../../source/public/css/fonts/',
		js: '../../source/public/js/',
		jsAfter: '../../source/public/js/modules/**/*.js',
		jsClean: '../../source/public/js/modules/',
		jsConcat: '../../source/public/js/dist/',
		img: '../../source/public/img/',
		brows: '../../source/public/'
	};

var
	gulp = require('gulp'),
	jade = require('gulp-jade'),
	coffee = require('gulp-coffee'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	stylus = require('gulp-stylus'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost'),
	concatRecursive = require('gulp-recursive-concat'),
	nib = require('nib'),
    jeet = require('jeet'),
	rupture = require('rupture'),
	plumber = require('gulp-plumber'),
	clean = require('gulp-clean'),
	cleanCss = require('gulp-clean-css'),
	runSequence = require('run-sequence'),
	spritesmith = require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin'),
	iconfont = require('gulp-iconfont'),
	rename = require("gulp-rename"),
	iconfontCss = require('gulp-iconfont-css'),
	svgicons2svgfont = require('gulp-svgicons2svgfont'),
	es = require('event-stream');
    //browserSync = require('browser-sync');

//var reload = browserSync.reload;


gulp.task('jade', function () {
	var app = gulp.src([
		resources.jade + '**/*.jade',
		'!' + resources.jade + '_**/*.jade'
	])
	// .pipe(plumber())
		.pipe(jade({
			pretty: true
		}).on('error', function(error) {
			console.log( error );
		}))
		.pipe(rename({extname: '.php'}))
		.pipe(gulp.dest(publicPatch.pathBack));
});



gulp.task('stylus', function () {
    return gulp.src([
        resources.stylus + '*.styl'
    ])
        .pipe(plumber())
        .pipe(stylus({
            use: [nib(), jeet(), rupture()],
            compress: false
        }))
        .pipe(cleanCss(
            {
                compatibility: 'ie8',
                advanced: true,
                aggressiveMerging: true,
                debug: true,
                keepSpecialComments: 0
            }, function (details) {
                console.log(details);
            }))
        .pipe(gulp.dest(publicPatch.css));
});

gulp.task('coffee',function () {
    return gulp.src([
        resources.coffee + '*.coffee',
        resources.coffee + '**/*.coffee'
    ])
        .pipe(plumber())
        .pipe(coffee({bare: true}).on('error', function (err) {
            console.log("____________________________________");
            console.log("File:" + err.filename);
            console.log("Location:" + JSON.stringify(err.location));
            console.log("Name:" + err.name);
            console.log("Message:" + err.message);
            console.log("____________________________________");
        }))
        // /*.pipe(uglify({
        //     mangle: true,
        //     compress: {
        //         sequences: true,
        //         dead_code: true,
        //         conditionals: true,
        //         booleans: true,
        //         unused: true,
        //         if_return: true,
        //         join_vars: true,
        //         drop_console: true
        //     }
        // }))*/
        .pipe(gulp.dest(publicPatch.js));
});

gulp.task('concat', ['coffee'],function () {
    return gulp.src(publicPatch.jsAfter)
        .pipe(plumber())
        //.pipe(uglify({compress: true}))
        .pipe(concatRecursive({extname: ".js"}))
        .pipe(gulp.dest(publicPatch.jsConcat));
});

gulp.task('clean', function () {
    return gulp.src(publicPatch.jsClean, {read: false})
        .pipe(clean({force: true}));
});


//gulp.task('browser-sync', function () {
//    browserSync({
//        port: 3000,
//        keepalive: true,
//        notify: true,
//        open: true,
//        //server:{
//        //	baseDir: "./src/",
//        //	directory : true,
//        //},
//        proxy: "local.upc-conectate",
//    });
//});

gulp.task('imagemin', function () {
    return gulp.src([
        resources.img + '*.jpg',
        resources.img + '*.png',
        resources.img + '*.gif'
    ])
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 4
        }))
        .pipe(gulp.dest(publicPatch.img));
});

gulp.task('iconfont', function () {
    return gulp.src([
        resources.svg + '*.svg'
    ])
        .pipe(plumber())
        .pipe(iconfontCss({
            fontName: 'icons',
            //path: '../../frontend/resources/stylus/base/_icons.styl',
            targetPath: '../../../../../frontend/resources/stylus/base/_icons.styl',
            fontPath: 'fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: 'icons',
            fontHeight: 1000,
            normalize: true,
            formats: ['svg', 'ttf', 'eot', 'woff'],
            centerHorizontally: true
        }))
        .on('glyphs', function (glyphs, options) {
            // CSS templating, e.g.
            console.log(glyphs, options);
        })
        .pipe(gulp.dest(publicPatch.css + 'fonts/icons'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src(resources.sprite + '*.png')
        .pipe(plumber())
        .pipe(spritesmith({
            imgPath: '../img/sprite.png',
            imgName: 'sprite.png',
            cssName: '_sprite.styl'
        }));
    spriteData.img
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(publicPatch.img));
    spriteData.css
        .pipe(plumber())
        .pipe(gulp.dest(resources.stylus + 'base/'));
});

gulp.task('fonts', ['iconfont'], function () {
    return gulp.src([
        resources.fonts + '*/*'
    ])
        .pipe(gulp.dest(publicPatch.fonts));
});


gulp.task('watch-jade', function () {
    gulp.watch([
        resources.jade + '**/*.jade',
        resources.jade + '**/**/*.jade'
    ], ['jade']);
});
gulp.task('watch-stylus', function () {
    gulp.watch([
        resources.stylus + '**/*.styl',
        resources.stylus + '**/**/*.styl'
    ], ['stylus']);

});

gulp.task('styles', function() {
  return gulp.src(publicPatch.css + '*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(publicPatch.css));
});

gulp.task('watch-styles', function () {
    gulp.watch([
        publicPatch.css + '*.css'
    ], ['styles']);
});

gulp.task('watch-coffee', function () {
    gulp.watch([
        resources.coffee + '*.coffee',
        resources.coffee + '**/*.coffee'
    ], ['concat']);
});

gulp.task('watch', function (cb) {
    runSequence('watch-jade', 'watch-stylus', 'watch-coffee', 'watch-styles');
});
gulp.task('default', function (cb) {
    runSequence('jade', 'stylus', 'coffee', 'concat', 'imagemin', 'fonts', 'sprite', 'iconfont', 'clean', 'styles');
});


gulp.task('server', function (cb) {
    runSequence('browser-sync', 'watch', cb);
});
