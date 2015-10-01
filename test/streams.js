/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var path = require('path')
var test = require('assertit')
var through2 = require('through2')
var voa = require('../index')

var exists = path.join(__dirname, '../.gitignore')
var notExists = path.join(__dirname, '../not_exists')

var EndStream = through2.ctor(function (chunk, enc, cb) {
  this.push(chunk)
  cb()
}, function (cb) {
  this.emit('end', 2)
  cb()
})

function success () {
  var read = fs.createReadStream(exists)
  return read.pipe(new EndStream())
}

function failure () {
  var read = fs.createReadStream(notExists)
  return read.pipe(new EndStream())
}

function unpiped () {
  return fs.createReadStream(exists)
}

function unpipedFailure () {
  return fs.createReadStream(notExists)
}

test('should handle a successful stream', function (done) {
  voa(success).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})

test('should handle a successful stream and call the callback once', function (done) {
  voa(function (cb) {
    return success().on('end', function () { cb(null, 3) })
  }).then(function (res) {
    test.strictEqual(res, 3)
    done()
  }, done)
})

test('should handle an errored stream', function (done) {
  voa(failure).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.code, 'ENOENT')
    done()
  })
})

test('should handle an error unpiped readable stream', function (done) {
  voa(unpipedFailure).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.code, 'ENOENT')
    done()
  })
})

test('should consume an unpiped readable stream', function (done) {
  voa(unpiped).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})
