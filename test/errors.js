/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var voa = require('../index')

test('should throw TypeError if `fn` not function', function (done) {
  function fixture () {
    voa(123)()
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `val` to be promise, stream, child process or sync, async, generator function/)
  done()
})

test('should returned error be passed to completion callback as `err`', function (done) {
  voa(function () {
    return new Error('foo bar baz')
  }).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.equal(err.message, 'foo bar baz')
    done()
  })
})

test('should mute all errors and pass them to completion callback', function (done) {
  voa(function () {
    foobar // eslint-disable-line no-undef
    return 123
  }).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.equal(err.name, 'ReferenceError')
    done()
  })
})
