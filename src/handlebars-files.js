var fs = require('fs');
var Handlebars = require('handlebars');

var loadTemplate = function (path) {
    var template = fs.readFileSync(path, {encoding: 'utf8', flag: 'r'});
    return Handlebars.compile(template);
};

module.exports.compile = function (path, options) {
    if (options && options.watch) {
        return function (context) {
            return loadTemplate(path)(context);
        };
    }

    return loadTemplate(path);
};