var fs = require('fs');
var path = require('path');
var dot = require('dot');
var defaults = require('cog/defaults');
var template = dot.template(fs.readFileSync(__dirname + '/templates/config.yaml', 'utf8'), defaults({
  strip: false
}, dot.templateSettings));

var configFile = path.resolve(__dirname, 'config.yaml');
var namespaces = process.env.PKG_NAMESPACES;

// initialise template data
var data = {
  namespaces: (namespaces && namespaces.split(/\s+/)) || [],
  repository: process.env.PKG_UPSTREAM || 'https://registry.npmjs.org/'
};

module.exports = function(callback) {
  fs.writeFile(configFile, template(data), 'utf8', callback);
};
