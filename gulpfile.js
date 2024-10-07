const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const XEUtils = require('xe-utils')
const del = require('del')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const merge = require('merge-stream')
const pack = require('./package.json')
const ts = require('gulp-typescript')
const tsconfig = require('./tsconfig.json')

const tsSettings = {
  ...tsconfig.compilerOptions,
  target: 'es2015'
}

const exportModuleName = 'VxeCore'
const esmOutDir = 'es'
const commOutDir = 'lib'

gulp.task('build_escode', function () {
  return gulp.src([
    'packages_temp/**.ts',
    'packages_temp/**/*.ts',
    '!packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(gulp.dest(esmOutDir))
})

gulp.task('build_esjs', gulp.series('build_escode', function () {
  return gulp.src([
    'packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(rename({
      basename: 'index',
      extname: '.esm.js'
    }))
    .pipe(gulp.dest(esmOutDir))
}))

gulp.task('build_es_all', gulp.series('build_esjs'))

gulp.task('build_commoncode', function () {
  return gulp.src([
    'packages_temp/**.ts',
    'packages_temp/**/*.ts',
    '!packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(commOutDir))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(gulp.dest(commOutDir))
})

gulp.task('build_commonjs', gulp.series('build_commoncode', function () {
  return gulp.src([
    'packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({
      basename: 'index',
      extname: '.common.js'
    }))
    .pipe(gulp.dest(commOutDir))
}))

gulp.task('build_common_all', gulp.series('build_commonjs'))

gulp.task('build_umdjs', () => {
  return gulp.src('lib_temp/index.umd.js')
    .pipe(gulp.dest('lib'))
    .pipe(uglify())
    .pipe(rename({
      basename: 'index',
      extname: '.umd.min.js'
    }))
    .pipe(gulp.dest('lib'))
})

gulp.task('build_umd_all', gulp.parallel('build_umdjs'))

gulp.task('copy_pack', () => {
  return gulp.src('packages/**')
    .pipe(gulp.dest('packages_temp'))
})

gulp.task('clear', () => {
  return del([
    commOutDir,
    esmOutDir,
    'packages_temp'
  ])
})

gulp.task('build_all', gulp.parallel('build_es_all', 'build_common_all', 'build_umd_all'))

gulp.task('build', gulp.series('clear', 'copy_pack', 'build_all', () => {
  return del([
    'lib_temp',
    'packages_temp'
  ])
}))
