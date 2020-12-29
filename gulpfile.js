"use strict";
// Load plugins
const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  connect = require('gulp-connect'),
  //concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  //htmlreplace = require('gulp-html-replace'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  //urlAdjuster = require('gulp-css-url-adjuster'),
  jsfiles = ['src/js/*.js'],
  sassfiles = ['src/sass/*.scss'];
  
  
/******** CSS TASKS *********/
function projectCSS() {
  return gulp
    .src(sassfiles)
    .pipe(sass({outputStyle: 'expanded', includePaths: 'src/sass'}).on('error', sass.logError))
    .pipe(autoprefixer())
  //   .pipe(urlAdjuster({
  //     prepend: '../img/'
  // }))
    .pipe(gulp.dest('src/css/'))
    // .pipe(urlAdjuster({
    //   //replace: ['../img', 'https://interactives.stuff.co.nz/path/to/image/']
    //   replace: ['../img', '../img']
    // }))
    .pipe(gulp.dest('build/css/'))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
}

/********* JS TASKS  ************/
function projectJS(cb) {
  gulp
    .src(jsfiles)
    .pipe(babel({
      presets: ['@babel/env']
  }))
    .pipe(gulp.dest('build/js/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js/'))
    .pipe(connect.reload());
  cb();
}

/********* HTML TASKS ***********/
function html(done) {
  gulp.src('src/*.html')
  //   .pipe(htmlreplace({
  //     'css': ['css/sweetspot.min.css'],
  //     'js': ['js/sweetspot.min.js'],
  // }))

  .pipe(gulp.dest('build/'))
  .pipe(connect.reload());
  done();
}


/************ CONTINUOUS TASKS *************/
function serveDev(cb) {
  connect.server({
    root: 'src/',
    host: '0.0.0.0', // required for connection via network
    livereload: true,
    port: 8888
  });
  cb();
}

function serveBuild(cb) {
  connect.server({
    root: 'build/',
    host: '0.0.0.0', // required for connection via network
    livereload: true,
    port: 8000
  });
  cb();
}

function watchFiles(cb) {
  gulp.watch(sassfiles, projectCSS);
  gulp.watch(jsfiles, projectJS);
  gulp.watch('src/*.html', html);
  cb();
}

/*********** BUILD TASKS **************/
let build_css = gulp.parallel(projectCSS),
  build_js = gulp.parallel(projectJS),
  build_html = gulp.parallel(html);

/********* COMPLEX TASKS *********/
const defaultTask = gulp.parallel(watchFiles, serveDev, serveBuild);
const build = gulp.parallel(build_js, build_css, build_html);


/********* EXPORT TASKS *********/
exports.default = defaultTask;
exports.build_js = build_js;
exports.build_css = build_css;
exports.build_html = build_html;
exports.build = build;
