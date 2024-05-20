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
  target: 'es2016'
}

const exportModuleName = 'VxeCore'
const esmOutDir = 'es'
const commOutDir = 'lib'

const languages = [
  'zh-CN',
  'zh-TC',
  'zh-HK',
  'zh-MO',
  'zh-TW',
  'en-US',
  'ja-JP',
  'es-ES',
  'pt-BR'
]

gulp.task('build_escode', function () {
  return gulp.src([
    'packages_temp/**.ts',
    'packages_temp/**/*.ts',
    '!packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(gulp.dest(esmOutDir))
})

gulp.task('build_esjs', gulp.series('build_escode', function () {
  return gulp.src([
    'packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_ENV', 'process.env.NODE_ENV'))
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
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_ENV', 'process.env.NODE_ENV'))
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
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_ENV', 'process.env.NODE_ENV'))
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

gulp.task('build_i18n', () => {
  languages.forEach(code => {
    fs.writeFileSync(`lib/language/${code}.d.ts`, 'declare const langMsgs: { [key: string]: any }\nexport default langMsgs')
    fs.writeFileSync(`es/language/${code}.d.ts`, 'declare const langMsgs: { [key: string]: any }\nexport default langMsgs')
  })
  const rest = languages.map(code => {
    const name = XEUtils.camelCase(code).replace(/^[a-z]/, firstChat => firstChat.toUpperCase())
    const isZHTC = ['zh-HK', 'zh-MO', 'zh-TW'].includes(code)
    return gulp.src(`packages_temp/language/${isZHTC ? 'zh-TC' : code}.ts`)
      .pipe(ts(tsSettings))
      .pipe(babel({
        moduleId: `vxe-language.${code}`,
        presets: ['@babel/env'],
        plugins: [
          ['@babel/transform-modules-umd', {
            globals: {
              [`vxe-language.${code}`]: `VxeLanguage${name}`
            },
            exactGlobals: true
          }]
        ]
      }))
      .pipe(rename({
        basename: code,
        suffix: '.umd',
        extname: '.js'
      }))
      .pipe(gulp.dest('lib/language'))
      .pipe(uglify())
      .pipe(rename({
        basename: code,
        suffix: '.min',
        extname: '.js'
      }))
      .pipe(gulp.dest('lib/language'))
  })
  return merge(...rest)
})

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

gulp.task('build', gulp.series('clear', 'copy_pack', 'build_all', 'build_i18n', () => {
  return del([
    'lib_temp',
    'packages_temp'
  ])
}))
