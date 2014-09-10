var fs = require('fs');
var path = require('path');
var dot = require('dot');
var template = dot.template(fs.readFileSync(__dirname + '/templates/config.yaml', 'utf8'), {
  strip: false
});
var configFile = path.resolve(__dirname, 'config.yaml');

// initialise template data
var data = {};

module.exports = function(callback) {
  fs.exists(configFile, function(exists) {
    if (exists) {
      return callback(err);
    }

    fs.writeFile(configFile, template(data), 'utf8', callback);
  });
};
