#!/usr/bin/env node

/**
 * Install all plugins listed in package.json
 *
**/
var path = require('path');
var exec = require('shelljs').exec;


var packageJSON = null;

try {
  packageJSON = require('../../package.json');
} catch(ex) {
  console.log('\nThere was an error fetching your package.json file.')
  console.log('\nPlease ensure a valid package.json is in the root of this project\n')
}

packageJSON.cordovaPlugins = packageJSON.cordovaPlugins || [];

packageJSON.cordovaPlugins.forEach(function (plugin) {
  var command = 'mfp cordova plugin add ' + plugin;
  console.log('Running command:'+command);
  exec(command,{'silent':true});
});
