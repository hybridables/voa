/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var Observable = require('rx').Observable
var voa = require('../index')

function success () {
  return Observable.empty()
}

function successValue () {
  return Observable.return([1, 2, 3])
}

function failure () {
  return Observable.throw(new Error('observable error'))
}

test('should handle a finished empty observable', function (done) {
  voa(success).then(function (res) {
    test.strictEqual(res, undefined)
    done()
  }, done)
})

test('should handle a finished observable with value', function (done) {
  voa(successValue).then(function (res) {
    test.deepEqual(res, [1, 2, 3])
    done()
  }, done)
})

test('should handle an errored observable', function (done) {
  voa(failure).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    done()
  })
})
