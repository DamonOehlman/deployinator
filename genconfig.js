var fs = require('fs');
var path = require('path');
var dot = require('dot');
var defaults = require('cog/defaults');
var template = dot.template(fs.readFileSync(__dirname + '/templates/config.yaml', 'utf8'), defaults({
  strip: false
}, dot.templateSettings));
var configFile = path.resolve(__dirname, 'config.yaml');

// initialise template data
var data = {
  namespace: process.env.PKG_NAMESPACE || 'local',
  repository: process.env.PKG_UPSTREAM || 'https://registry.npmjs.org/'
};

module.exports = function(callback) {
  fs.exists(configFile, function(exists) {
    if (exists) {
      return callback();
    }

    fs.writeFile(configFile, template(data), 'utf8', callback);
  });
};
