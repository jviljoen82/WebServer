const { src, dest, watch, series } = require('gulp');
const concat = require('gulp-concat');
const rimraf = require('rimraf');
const gulpTemplateCache = require('gulp-angular-templatecache');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpBabel = require('gulp-babel');
const Path = require('path');
const SOURCE_ROOT = Path.resolve('.', 'public/js');
const DEPLOY_PATH = Path.resolve(SOURCE_ROOT, 'dist');

/***********************************
 * Windows IIS deploy folders
 */
const WIN_DEPLOY_PATH = Path.resolve('','C:/inetpub/wwwroot');
const FULL_SOURCE_PATH = Path.resolve('.','public');
/***********************************/

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

function winDeploy (callback){
    rimraf.sync(WIN_DEPLOY_PATH);
    src(`${FULL_SOURCE_PATH}/**/*.*`)
        .pipe(dest(`${WIN_DEPLOY_PATH}/public`))
        .on('end', callback);
}

function winServer(callback) {
    src('./backServer.js')
        .pipe(src('./*.json'))
        .pipe(dest(WIN_DEPLOY_PATH))
        .on('end', callback);
}

exports.default = series(series(clean, templates), build);
exports.win = series(series(series(clean, templates), build), winDeploy);
exports.winServer = series(winServer);
