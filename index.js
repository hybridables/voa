/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var voa = module.exports = function voa (val) {
  var args = require('sliced')(arguments, 1)
  return require('always-promise').call(this, val, voa.promise).apply(this, args)
}

// just for 100% `co@4` comaptibility
// not needed really, because `voa` accept
// everything, on the fly, by default
voa.wrap = function voaWrap (val) {
  function createPromise () {
    var args = require('sliced')(arguments)
    return voa.apply(this, [val].concat(args))
  }
  createPromise.__generatorFunction__ = val
  return createPromise
}
