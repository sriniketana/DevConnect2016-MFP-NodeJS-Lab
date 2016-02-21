#!/usr/bin/env node

/**
 * Install all plugins listed in package.json
 *
**/
var exec = require('child_process').exec;
var path = require('path');

var packageJSON = null;

try {
  packageJSON = require('../../package.json');
} catch(ex) {
  console.log('\nThere was an error fetching your package.json file.')
  console.log('\nPlease ensure a valid package.json is in the root of this project\n')
}

packageJSON.cordovaPlugins = packageJSON.cordovaPlugins || [];
var i = 0;
var command =""
packageJSON.cordovaPlugins.forEach(function (plugin) {
  if (command === ""){
    command += 'mfp cordova plugin add ' + plugin;
  } else {
    command += ' && mfp cordova plugin add ' + plugin;
  }
}); 
console.log(command);
exec(command, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    if (error !== null) {
      console.log('exec error: ' + error + stderr);
    }
});