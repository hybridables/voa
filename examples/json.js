/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var voa = require('../index')

/**
 * JSON.stringify without identation
 */

voa(JSON.stringify, {foo: 'bar'}).then(function (data) {
  console.log(data) // => {"foo":"bar"}
}, console.error)

/**
 * JSON.stringify with identation
 */

voa(JSON.stringify, {foo: 'bar'}, null, 2).then(function (data) {
  console.log(data)
  // =>
  // {
  //   "foo": "bar"
  // }
}, console.error)

/**
 * JSON.parse
 */

voa(JSON.parse, '{"foo":"bar"}').then(function (data) {
  console.log(data.foo) // => 'bar'
}, console.error)
