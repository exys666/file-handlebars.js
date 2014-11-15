var expect = require('chai').expect;
var file = require('./filesTestUtils');

var FileHandlebars = require('../src/main');

describe('partials', function () {

    beforeEach(function () {
        file.clean();
    });

    it('should load partial from file', function () {
        // given
        file.create('part.tmpl', '<h1>{{test}}</h1>')
        file.create('test.tmpl', '<body>{{> part}}</body>');

        // when
        FileHandlebars.registerPartial('part', file.path('part.tmpl'));

        // then
        var template = FileHandlebars.compile(file.path('test.tmpl'));
        expect(template({ test: 'ABC' })).to.equal('<body><h1>ABC</h1></body>');
    });

    it('should watch partial', function (done) {
        // given
        file.create('part.tmpl', '<h1>{{test}}</h1>')
        file.create('test.tmpl', '<body>{{> part}}</body>');

        // when
        FileHandlebars.registerPartial('part', file.path('part.tmpl'), { watch: true, interval: 50 });

        // then
        var template = FileHandlebars.compile(file.path('test.tmpl'));
        expect(template({ test: 'ABC' })).to.equal('<body><h1>ABC</h1></body>');

        // when
        file.create('part.tmpl', '<h2>{{test}}</h2>');

                // then
        setTimeout(function () {
            expect(template({ test: 'ABC' })).to.equal('<body><h2>ABC</h2></body>');
            done();
        }, 250);

    });

    afterEach(function () {
        file.clean();
    });

});
