var test = require('tape'),
    fs = require('fs'),
    path = require('path'),
    jsx_manifest = require('../jsx_manifest');

var manifest = path.resolve(__dirname+'/../examples/manifest.js');
var locals = {
  "b": "var _b = \"THIS IS B\"",
  "c": {
    "name": "test name",
    "path": "test path"
  }
};

test('function arguments',function(t){
  t.test('give collect arguments',function(ts){
    ts.plan(2);
    jsx_manifest(manifest,locals).on('build',function(data){
      ts.equal(typeof data, 'string');
      ts.notEqual(data,'');
    });
  });
});





