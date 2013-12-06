#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    colors = require('colors'),
    argv = require('minimist')(process.argv.slice(2),{});

var pwd = process.env['PWD'];
var buildjsx = argv.o || argv.out || pwd+'/build.jsx';
var buildjsx_path = path.resolve(buildjsx);
var manifest_file = (argv._.length!=0)? argv._[0] : (fs.existsSync(pwd+'/manifest.jsx'))? pwd+'/manifest.jsx' : pwd+'/manifest.js';
var manifest_file_path = path.resolve(manifest_file);

var jsx_manifest = require('./jsx_manifest');

// for script bind
var locals = {};

if(argv.h || argv.help){
  return fs.createReadStream(__dirname+'/usage.txt').pipe(process.stdout);
}

if(argv.b || argv.bind){
  var bounds = (argv.b || argv.bind);
  var data_path = pwd+"/"+bounds;
  if(fs.existsSync(data_path)){
    locals = JSON.parse(fs.readFileSync(data_path));
  }else{
    console.log('[Error]: data file not found'.red);
    process.exit(1);
  }
}

fs.exists(manifest_file_path, function(exist){
  
  if(!exist){
    console.log('[Error]: manifest file not found'.red);
    process.exit(1);
  }

  jsx_manifest(manifest_file_path, locals).on('build',function(data){
    fs.writeFile(buildjsx_path, data, function(err){
      if(err){
        console.log(('[Error]: '+err).red);
        process.exit(1);
      }
      console.log(('[Done]: '+buildjsx_path+' created.').green);
      process.exit();
    });
  });
  
});
