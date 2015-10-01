/*!
 * voa <https://github.com/hybridables/voa>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var voa = require('../index')
var simpleGet = require('simple-get')

/**
 * readFile
 */

function read (fp) {
  return function (done) {
    fs.readFile(fp, 'utf8', done)
  }
}

voa(function * () {
  var data = yield read('package.json')
  return JSON.parse(data)
}).then(function (json) {
  console.log(json.name) // => 'voa'
}, console.error)

/**
 * http request
 */

function get (url) {
  return function (done) {
    simpleGet.concat(url, done)
  }
}

voa(function * () {
  var res = yield get('http://www.tunnckocore.tk')
  var buf = res[0]
  // var httpResponse = res[1]
  return buf.toString()
}).then(function (res) {
  console.log(res.indexOf('<title>') !== -1) // => true
}, console.error)
