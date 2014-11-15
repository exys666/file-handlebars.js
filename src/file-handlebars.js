var fs = require('fs');

module.exports = function (Handlebars) {

    var templates = [];

    var read = function (path) {
        return fs.readFileSync(path, {encoding: 'utf8', flag: 'r'});
    };

    this.compile = function (path, options) {
        if (options && options.watch) {
            templates[path] = Handlebars.compile(read(path), options);

            var watchOptions = options.interval ? { interval: options.interval } : {};

            fs.watchFile(path, watchOptions, function (curr, prev) {
                if (curr.mtime !== prev.mtime) {
                    templates[path] = Handlebars.compile(read(path), options);
                }
            });

            return function (context) {
                return templates[path](context);
            };
        }

        return Handlebars.compile(read(path), options);
    };

    this.createFrame = function (data) {
        return Handlebars.createFrame(data);
    };

    this.escapeExpression = function (string) {
        return Handlebars.escapeExpression(string);
    };

    this.log = function (level, message) {
        return Handlebars.log(level, message);
    };

    this.registerHelper = function (name, helper) {
        return Handlebars.registerHelper(name, helper);
    };

    this.unregisterHelper = function (name) {
        return Handlebars.unregisterHelper(name);
    };
    
}
