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
    
}
