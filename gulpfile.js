'use strict';

const { src, dest } = require('gulp');
const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const cssbeautify = require('gulp-cssbeautify');
const sass = require('gulp-sass')(require('sass'));

const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const flatten = require('gulp-flatten');
const notify = require('gulp-notify');

const panini = require('panini');
const browserSync = require('browser-sync').create();
const del = require('del');
const i18n = require('gulp-html-i18n');
const embedSvg = require('gulp-embed-svg');

/* Paths */
const srcPath = 'src/';
const distPath = 'dist/';

const path = {
  build: {
    html: distPath,
    js: distPath + 'assets/js/',
    jsLib: distPath + 'assets/js/lib',
    css: distPath + 'assets/css/',
    images: distPath + 'assets/images/',
    fonts: distPath + 'assets/fonts/',
  },
  src: {
    html: '/' + srcPath + 'pages/',
    js: '/' + srcPath + 'assets/js/',
    jsLib: '/' + 'assets/js/_lib/',
    css: '/' + srcPath + 'assets/scss/',
    images: '/' + srcPath + 'assets/images/',
    fonts: '/' + srcPath + 'assets/fonts/',
  },
  srcFile: {
    html: srcPath + 'pages/**/*.{html,hbs}',
    js: srcPath + 'assets/js/**/*.js',
    jsLib: srcPath + 'assets/js/_lib/**/*.js',
    css: srcPath + 'assets/scss/*.scss',
    images: srcPath + 'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
    fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
  },
  watch: {
    html: srcPath + '**/*.html',
    js: srcPath + 'assets/js/**/*.js',
    jsLib: srcPath + 'assets/js/_lib/**/*.js',
    css: srcPath + 'assets/scss/**/*.scss',
    images: srcPath + 'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
    fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
  },
  clean: './' + distPath,
};

const plumberError = (title) => plumber({
  errorHandler: function(err) {
    notify.onError({
      title: title,
      message: 'Error: <%= error.message %>',
    })(err);
    this.emit('end');
  },
});


/* Tasks */
function serve() {
  browserSync.init({
    server: { baseDir: './' + distPath },
    startPath: '/pages/',
  });
}

function html() {
  panini.refresh();

  return src(path.srcFile.html, { base: srcPath })
    .pipe(plumberError('HTML Error'))
    .pipe(i18n({
      langDir: srcPath + 'lang/',
      createLangDirs: true,
      renderEngine: 'regex',
      defaultLang: 'ru',
      delimiters: ['#{', '}'],
      langRegExp: /#{\s*([\w-.]+)\s*}/g,
    }))
    .pipe(panini({
      root: srcPath,
      pages: srcPath + 'pages/',
      layouts: srcPath + 'layouts/',
      partials: srcPath + 'partials/',
      helpers: srcPath + 'helpers/',
      data: srcPath + 'data/',
    }))
    .pipe(embedSvg({
      root: './dist/assets/images',
    }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return src(path.srcFile.css, { base: srcPath + 'assets/scss/' })
    .pipe(plumberError('SCSS Error'))
    .pipe(sass({ includePaths: './node_modules/' }))
    .pipe(autoprefixer({ cascade: true }))
    .pipe(cssnano({
      zindex: false,
      discardComments: { removeAll: true },
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));
}

function cssWatch() {
  return src(path.srcFile.css, { base: srcPath + 'assets/scss/' })
    .pipe(plumberError('SCSS Error'))
    .pipe(sass({ includePaths: './node_modules/' }))
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));
}


async function js() {
  return src([path.srcFile.js, '!' + path.srcFile.jsLib], { base: path.build.js })
    .pipe(concat('app.js'))
    .pipe(plumberError('JS Error'))
    .pipe(uglify()) // Обфускация и минификация
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }));
}


async function jsWatch() {
  return src([path.srcFile.js, '!' + path.srcFile.jsLib], { base: path.build.js })
    .pipe(concat('app.js'))
    .pipe(plumberError('JS Error'))
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }));
}

function jsLib() {
  return src(path.srcFile.jsLib)
    .pipe(dest(path.build.jsLib))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return src(path.srcFile.images)
    .pipe(flatten()) // Собирает все файлы в один каталог
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return src(path.srcFile.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], cssWatch);
  gulp.watch([path.watch.js], jsWatch);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
  gulp.watch([path.watch.fonts], jsLib);
}

const build = gulp.series(clean, images, gulp.parallel(html, css, js, jsLib, fonts));
const watch = gulp.series(build, gulp.parallel(watchFiles, serve));


/* Exports Tasks */
exports.build = build;
exports.watch = watch;
exports.default = watch;