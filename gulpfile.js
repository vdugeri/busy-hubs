'use strict';

const gulp = require('gulp');
const models = require('./server/models');
const exit = require('gulp-exit');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const coveralls = require('gulp-coveralls');
const fs = require('fs');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');


const paths = {
  serverTest: './tests/server/**/*.js',
  serverFiles: './server/**/*.js',
  js: ['./server/**/*.js']
};

gulp.task('coverage-setup', () => {
  return gulp.src(paths.serverFiles)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('db:sync', () => {
  return models.sequelize.sync().then(exit());
});

gulp.task('server:test',['db:sync', 'coverage-setup'], function () {
  process.env.NODE_ENV = 'test';
  process.env.APP_KEY='7kaVAaNj4ON1xbt6MQkki4ILzzMaKaVD';

  return gulp.src(paths.serverTest)
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      dir: './tests/coverage',
    }))
    .pipe(exit());
});

gulp.task('coveralls', () => {
  return gulp.src('./tests/coverage/lcov.info')
    .pipe(coveralls());
});

gulp.task('nodemon', () => {
  nodemon({ script: 'server.js', ext: 'js', ignore: ['node_modules/*.*']})
    .on('restart', () => {
      console.log('>>> server restart');
    });
});


gulp.task('default', ['nodemon']);
gulp.task('test', ['server:test', 'coveralls']);
