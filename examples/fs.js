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
 * fs.readFileSync
 */

voa(fs.readFileSync, filepath, 'utf-8').then(function (data) {
  console.log(JSON.parse(data).name) // => 'voa'
}, console.error)

/**
 * fs.readFile
 */

voa(fs.readFile, filepath, 'utf-8').then(function (data) {
  console.log(data.indexOf('"license": "MIT"') !== -1) // => true
}, console.error)

/**
 * fs.stat
 */

voa(fs.stat, filepath).then(function (stats) {
  console.log(stats.isFile()) // => true
}, console.error)
