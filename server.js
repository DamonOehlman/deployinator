var async = require('async');
var fs = require('fs');
var sinopia = require('sinopia/lib/index');
var logger = require('sinopia/lib/logger');
var yaml = require('js-yaml');
var port = process.env.PORT || 3000;

function runServer(callback) {
  var config;

  // Get document, or throw exception on error
  try {
    config = yaml.safeLoad(fs.readFileSync(__dirname + '/config.yaml', 'utf8'));
  }
  catch (e) {
    return callback(e);
  }

  logger.setup(config.logs);
  sinopia(config).listen(port, callback);
}

function ready(err) {
  if (err) {
    return console.error(err);
  }

  console.log('server running @ http://localhost:' + port + '/');
}

async.series([
  require('./genconfig.js'),
  runServer
], ready);
