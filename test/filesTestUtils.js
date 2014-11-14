var fs = require('fs');

var path = function (file) {
    return __dirname + "/data/" + file;
};

var createDir = function (file) {
    var dir = file.substring(0, file.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

var createFile = function (file, content) {
    var p = path(file);
    createDir(p);

    if (fs.existsSync(p)) {
        fs.unlinkSync(p);
    }
    fs.writeFileSync(p, content);
};

var clean = function () {
    if (fs.existsSync(path(""))) {
        var files = fs.readdirSync(path(""));

        for(var f in files) {
            fs.unlinkSync(path(files[f]));
        }

        fs.rmdirSync(path(""));
    }
};

module.exports = {
    path: path,
    create: createFile,
    clean: clean
};
