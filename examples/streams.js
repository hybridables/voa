/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var path = require('path')
var voa = require('../index')
var filepath = path.join(path.dirname(__dirname), 'package.json')

/**
 * sync function which accept arguments and retun
 * successful fs.createReadStream
 * @todo in merz/always-done/always-callback to read the stream contents
 */

voa(function (fp) {
  return fs.createReadStream(fp)
}, filepath).then(function (res) {
  console.log(res) // => undefined
}, console.error)

/**
 * pure sync function that return
 * successful fs.createReadStream
 * @todo in merz/always-done/always-callback to read the stream contents
 */

voa(function () {
  return fs.createReadStream(filepath)
}).then(function (res) {
  console.log(res) // => undefined
}, console.error)

/**
 * directly passed stream to voa function
 * using the fs.createReadStream
 */

voa(fs.createReadStream(filepath)).then(function (res) {
  console.log(res) // => undefined
}, console.error)

/**
 * failing stream
 * just giving `fs.createReadStream` function
 * to voa function
 */

voa(fs.createReadStream, 'foobar.json').catch(function (err) {
  console.error(err.code) // => 'ENOENT'
})

/**
 * voa `fs.createReadStream` function
 */

voa(fs.createReadStream, filepath).then(function (res) {
  console.log(res) // => undefined
}, console.error)
