const { series, parallel, src, dest, watch } = require('gulp');
const sass          = require('gulp-sass');
sass.compiler       = require('node-sass');
const del           = require('del');
const glob          = require('glob');
const sourcemaps    = require('gulp-sourcemaps');
const fileInclude   = require('gulp-file-include');
const autoprefixer  = require('gulp-autoprefixer');
const cleanCSS      = require('gulp-clean-css');
const browserify    = require('browserify');
const babelify      = require('babelify');
const source        = require('vinyl-source-stream');
const uglify        = require('gulp-uglify');
const concat        = require('gulp-concat');
const buffer        = require('vinyl-buffer');
const browserSync   = require('browser-sync').create();
const reload        = browserSync.reload;


// Configuration
const config = {
	dir: {
		src: {
			html: './src/pages/**/*.html',
			pages: './src/pages/*.html',
			fonts: './src/fonts/*',
			images: './src/images/*',
			scss: './src/scss/**/*.scss',
			mainScss: './src/scss/styles.scss',
			js: './src/js/**/*.js',
			mainJs: './src/js/app.js',
			vendor: './src/js/vendor/**/*.js'
		},
		dist: {
			html: './dist',
			all: './dist/**/*.*',
			fonts: './dist/fonts',
			images: './dist/images',
			css: './dist/css',
			sourcemaps: '/maps',
			js: './dist/js',
			vendor: './dist/js/vendor'
		}
	}
};

function clean() {
	return del([config.dir.dist.all]);
}

function renderHTMLPages() {
	// Make Pages array
	const pages = glob.sync(config.dir.src.pages);
	
	// Make a Promise to return stream end
	return new Promise(function(resolve, reject){
		pages.forEach(function(page,index) {
			return src(page)
				.pipe(fileInclude({
					prefix: '@@',
					configpath: '@file'
				}))
				.pipe(dest(config.dir.dist.html));
		});
		resolve();
	});
}

function fonts() {
	return src(config.dir.src.fonts)
		.pipe(dest(config.dir.dist.fonts));
}

function images() {
	return src(config.dir.src.images)
		.pipe(dest(config.dir.dist.images));
}

function compileSass() {
	return src(config.dir.src.mainScss)
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(dest(config.dir.dist.css))
		.pipe(browserSync.stream());
}

function compileSassDev() {
	return src(config.dir.src.mainScss)
		.pipe(sourcemaps.init())
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(sourcemaps.write(config.dir.dist.sourcemaps))
		.pipe(dest(config.dir.dist.css))
		.pipe(browserSync.stream());
}

function prefixCSS() {
	return src(config.dir.dist.css + '/*.css')
		// .pipe(sourcemaps.init())
		.pipe(autoprefixer())
		// .pipe(sourcemaps.write(config.dir.dist.sourcemaps + '/css'))
		.pipe(dest(config.dir.dist.css));
}

function uglifyCSS() {
	return src(config.dir.dist.css + '/*.css')
		.pipe(cleanCSS({compatibility: 'ie11'}))
		.pipe(dest(config.dir.dist.css));
}

function vendors() {
	return src(config.dir.src.vendor)
		.pipe(concat('vendors.js'))
		.pipe(dest(config.dir.dist.vendor));
}

function javascriptDev() {
	return browserify(config.dir.src.mainJs)
		.transform('babelify', { presets: ["@babel/preset-env"] })
		.bundle()
		.pipe(source('app.js'))
		.pipe(dest(config.dir.dist.js));
}

function javascript() {
	return browserify(config.dir.src.mainJs)
		.transform('babelify', { presets: ["@babel/preset-env"] })
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		// .pipe(sourcemaps.init())
		.pipe(uglify())
		// .pipe(sourcemaps.write('./maps'))
		.pipe(dest(config.dir.dist.js));
}

function watchChanges() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: config.dir.dist
		}
	});
	watch(config.dir.src.scss).on('change', series(compileSass, reload));
	watch(config.dir.src.html).on('change', series(renderHTMLPages, reload));
	watch(config.dir.src.js).on('change', series(vendors, javascript, reload));
}

exports.renderHTMLPages = renderHTMLPages;
exports.fonts = fonts;
exports.images = images;
exports.compileSass = compileSass;
exports.compileSassDev = compileSassDev;
exports.prefixCSS = prefixCSS;
exports.uglifyCSS = uglifyCSS;
exports.javascriptDev = javascriptDev;
exports.javascript = javascript;
exports.vendors = vendors;
exports.watch = watchChanges;


exports.build = series(
	clean,
	parallel(
		renderHTMLPages,
		fonts,
		images,
	),
	compileSass,
	prefixCSS,
	uglifyCSS,
	vendors,
	javascript,
);

exports.dev = series(
	clean,
	parallel(
		renderHTMLPages,
		fonts,
		images,
	),
	compileSassDev,
	vendors,
	javascriptDev,
	watchChanges
);

exports.dev = series(
	clean,
	parallel(
		renderHTMLPages,
		fonts,
		images,
	),
	compileSass,
	prefixCSS,
	uglifyCSS,
	vendors,
	javascript,
	watchChanges
);
