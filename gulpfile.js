const { src, dest, watch, series } = require('gulp');
const concat = require('gulp-concat');
const rimraf = require('rimraf');
const gulpTemplateCache = require('gulp-angular-templatecache');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpBabel = require('gulp-babel');
const gulpUglify = require('gulp-uglify');
const Path = require('path');
const SOURCE_ROOT = Path.resolve('.', 'public/js');
const DEPLOY_PATH = Path.resolve(SOURCE_ROOT, 'dist');

function clean(callback) {
    console.log('Updating Front-End...');
    rimraf.sync(DEPLOY_PATH);
    callback();
}

function templates(callback) {
    src(`${SOURCE_ROOT}/default/**/*.html`)
        .pipe(gulpTemplateCache('AppUI.tpl.js', {
            module: 'ZumisWorldApp'
        }))
        .pipe(dest(DEPLOY_PATH))
        .on('end', callback);
}

function build(callback) {
    src(`${SOURCE_ROOT}/default/**/*.js`)
        .pipe(src(`${SOURCE_ROOT}/dist/AppUI.tpl.js`))
        .pipe(gulpSourcemaps.init())
        .pipe(gulpBabel({
            presets: ['@babel/env'],
            plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-object-assign'
            ]
        }))
        .pipe(concat('AppUI.js'))
        .pipe(gulpSourcemaps.write('.'))
        .pipe(dest(`${DEPLOY_PATH}`))
        .on('end', callback);
}

exports.default = series(series(clean, templates), build);
