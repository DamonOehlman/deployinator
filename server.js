var async = require('async');
var sinopia = require('sinopia');

function runServer(callback) {
  var config;

  // Get document, or throw exception on error
  try {
    config = yaml.safeLoad(fs.readFileSync(__dirname + '/config.yaml', 'utf8'));
  }
  catch (e) {
    return callback(e);
  }

  sinopia(config).listen(port, callback);
}

function ready(err) {
  if (err) {
    return process.exit(1);
  }

  console.log('server running');
}

async.series([
  require('./genconfig.js'),
  runServer
], ready);
