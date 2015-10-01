/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var semver = require('semver')

test('errors', function (done) {
  require('./test/errors')
  done()
})

test('streams', function (done) {
  require('./test/streams')
  done()
})

test('promises', function (done) {
  require('./test/promises')
  done()
})

test('callbacks', function (done) {
  require('./test/callbacks')
  done()
})

test('observables', function (done) {
  require('./test/observables')
  done()
})

test('sync functions', function (done) {
  require('./test/sync')
  done()
})

test('child processes', function (done) {
  require('./test/child_processes')
  done()
})

if (semver.gte(process.version, '0.11.13')) {
  test('generators', function (done) {
    require('./test/generators')
    done()
  })
  test('co tests', function (done) {
    var fs = require('fs')
    var path = require('path')
    var dir = path.join(__dirname, 'test', 'co')
    fs.readdirSync(dir).forEach(function (filename) {
      require(path.join(dir, filename))
    })
    done()
  })
}
