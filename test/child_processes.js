/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var cp = require('child_process')
var test = require('assertit')
var voa = require('../index')

function execSuccess () {
  return cp.exec('echo hello world')
}

function execFail () {
  return cp.exec('foo-bar-baz hello world')
}

function spawnSuccess () {
  return cp.spawn('echo', ['hello world'])
}

function spawnFail () {
  return cp.spawn('foo-bar-baz', ['hello world'])
}

test('should handle successful exec', function (done) {
  voa(execSuccess).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})

test('should handle failing exec', function (done) {
  voa(execFail).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.message, 'exited with error code: 127')
    done()
  })
})

test('should handle successful spawn', function (done) {
  voa(spawnSuccess).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})

test('should handle failing spawn', function (done) {
  voa(spawnFail).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.code, 'ENOENT')
    done()
  })
})
