let Promise = require('bluebird')

let gulp = require('gulp')
let logger = require('plugin-log')

let decision = Promise.promisify(require('conventional-recommended-bump'))
let bump = require('gulp-bump')
let releaseType = 'patch'

let changelog = require('gulp-conventional-changelog')
let fs = require('fs')
let jsdoc2md = require('jsdoc-to-markdown')

let git = require('gulp-git')

let newline = require('gulp-convert-newline')
let eol = require('eol')

function detect () {
  return decision({ preset: 'angular' }).then(rc => {
    let reason = rc.reason.split(' ')
    let change = parseInt(reason[2]) !== 0
    let feature = parseInt(reason[6]) !== 0
    if (change) {
      logger('There is ' + logger.colors.red('BREAKING CHANGE'))
    } else if (feature) {
      logger('There is ' + logger.colors.cyan('feature') + ' added')
    } else {
      logger(
        'There is no ' +
          logger.colors.red('BREAKING CHANGE') +
          ' nor ' +
          logger.colors.cyan('feature') +
          ' added'
      )
    }
    logger('Selected type is ' + logger.colors.cyan(rc.releaseType))
    releaseType = rc.releaseType
  })
}

function jump () {
  return gulp
    .src(['./package.json', './package-lock.json'])
    .pipe(bump({ type: releaseType }))
    .pipe(
      newline({
        newline: 'crlf'
      })
    )
    .pipe(gulp.dest('./'))
}

function log () {
  return gulp
    .src('CHANGELOG.md')
    .pipe(
      changelog({
        preset: 'angular',
        releaseCount: 0
      })
    )
    .pipe(
      newline({
        newline: 'crlf'
      })
    )
    .pipe(gulp.dest('./'))
}

function api () {
  return jsdoc2md
    .render({ files: 'index.js' })
    .then(output => fs.writeFileSync('API.md', eol.crlf(output)))
}

function commit () {
  let newVersion = require('./package.json').version
  return gulp
    .src('./!(node_modules)')
    .pipe(git.add())
    .pipe(git.commit(() => `chore: bump to version ${newVersion}`))
}

function push (cb) {
  git.push('origin', 'master', function (err) {
    if (err) throw err
    cb()
  })
}

let docs = gulp.parallel(log, api)

exports.ver = gulp.series(detect, jump)
exports.docs = docs
exports.release = gulp.series(docs, commit, push)
