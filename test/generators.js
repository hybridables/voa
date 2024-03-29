/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var mzfs = require('mz/fs')
var test = require('assertit')
var voa = require('../index')

function * success () {
  return yield mzfs.readFile('package.json', 'utf8')
}

function * failure () {
  return yield mzfs.readFile('foobar.json')
}

test('should handle successful generator function', function (done) {
  voa(success).then(function (res) {
    test.strictEqual(typeof res, 'string')
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  }, done)
})

test('should handle generator function errors', function (done) {
  voa(failure).catch(function (err) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.code, 'ENOENT')
    done()
  })
})
