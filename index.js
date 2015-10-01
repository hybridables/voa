/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

module.exports = function voa (val) {
  var args = require('sliced')(arguments, 1)
  return require('always-promise').call(this, val, voa.promise).apply(this, args)
}
