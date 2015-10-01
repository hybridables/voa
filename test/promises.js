/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('mz/fs')
var test = require('assertit')
var isPromise = require('is-promise')
var Bluebird = require('bluebird')
var voa = require('../index')

function resolvedPromise () {
  return Bluebird.resolve(123)
}

function rejectedPromise () {
  return Bluebird.reject(new Error('promise error'))
}

function successReadFile () {
  return fs.readFile('package.json', 'utf-8')
}

function failReadFile () {
  return fs.readFile('foo-bar')
}

test('should handle a resolved promise', function (done) {
  voa(resolvedPromise).then(function (res) {
    test.strictEqual(res, 123)
    done()
  }, done)
})

test('should handle a rejected promise', function (done) {
  voa(rejectedPromise).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    done()
  })
})

test('should handle result of promised fs.readFile', function (done) {
  voa(successReadFile).then(function (res) {
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  }, done)
})

test('should handle error of promised fs.readFile', function (done) {
  voa(failReadFile).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    done()
  })
})

test('should return promise', function (done) {
  var promise = voa(function (cb) {
    cb(null, 123)
  })
  promise.then(function (res) {
    test.strictEqual(res, 123)
    test.strictEqual(isPromise(promise), true)
    done()
  }, done)
})
