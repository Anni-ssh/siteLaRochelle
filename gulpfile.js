"use strict";

const { dest, src, parallel, series } = require("gulp");
const gulp = require("gulp");

const autoprefixer = require("gulp-autoprefixer");
const rmComments = require("gulp-strip-css-comments");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const uglifi = require("gulp-uglify-es").default;
const plumber = require("gulp-plumber");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const rigger = require("gulp-rigger");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

// const ccsbeautify = require("gulp-cssbeautify");
// const rename = require("gulp-rename");

const srcPath = "src/";
const distPath = "dist/";

const path = {
  build: {
    html: distPath,
    css: distPath + "assets/scss/",
    js: distPath + "assets/js/",
    images: distPath + "assets/images/",
    fonts: distPath + "assets/fonts/",
  },

  src: {
    html: srcPath + "*.html",
    css: srcPath + "assets/scss/*.scss",
    js: srcPath + "assets/js/*.js",
    images: srcPath + "assets/images/**/*.{jpeg,jpg,png,svg,git,ico,xml,json}",
    fonts: srcPath + "assets/images/**/*.{eot,woff,woff2,ttf,svg}",
  },

  watch: {
    html: srcPath + "*.html",
    css: srcPath + "assets/scss/**/*.scss",
    js: srcPath + "assets/js/**/*.js",
    images: srcPath + "assets/images/**/*.{jpeg,jpg,png,svg,git,ico,xml,json}",
    fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
  },
  clean: "./" + distPath,
};

function serv() {
  browserSync.init({
    server: {
      baseDir: "./" + distPath,
    },
  });
}

function html() {
  return (
    src(path.src.html, { base: srcPath })
      .pipe(plumber())
      // .pipe(
      //   panini({
      //     root: srcPath,
      //     layouts: srcPath + "tpl/layouts/",
      //     partials: srcPath + "tpl/partials/",
      //   })
      // )
      .pipe(dest(path.build.html))
      .pipe(browserSync.reload({ stream: true }))
  );
}

function css() {
  return src(path.src.css, { base: srcPath + "assets/scss/" })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "SCSS Error",
            message: "Error:<%= error.message %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(sass(sass({ outputStyle: "compressed" })))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 version"], grid: true })
    )
    .pipe(
      cssnano({
        zindex: false,
        opacity: false,
        distcardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));
}

function js() {
  return src(path.src.js, { base: srcPath + "assets/js/" })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "JS Error",
            message: "Error:<%= error.message %>",
          })(err);
          this.emit("end");
        },
      })
    )
    .pipe(rigger())
    .pipe(uglifi())
    .pipe(rmComments())
    .pipe(concat("main.min.js"))
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return src(path.src.images, { base: srcPath + "assets/img" })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 85, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return src(path.src.fonts, { base: srcPath + "assets/fonts/" })
    .pipe(plumber())
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, fonts, images));
const watch = gulp.parallel(build, watchFiles, serv);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
