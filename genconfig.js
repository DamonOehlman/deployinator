var fs = require('fs');
var path = require('path');
var dot = require('dot');
var template = dot.template(fs.readFileSync(__dirname + '/templates/config.yaml', 'utf8'), {
  strip: false
});
var configFile = path.resolve(__dirname, 'config.yaml');

// initialise template data
var data = {};

fs.exists(configFile, function(exists) {
  if (exists) {
    return process.exit(0);
  }

  fs.writeFile(configFile, template(data), 'utf8', function(err) {
    process.exit(err ? 1 : 0);
  });
});

