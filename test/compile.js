var expect = require('chai').expect;
var file = require('./filesTestUtils');

var FileHandlebars = require('../src/main');

describe('compile()', function () {

    beforeEach(function () {
        file.clean();
    });

    it('should compile template from file', function () {
        // given
        file.create('test.tmpl', '<h1>{{test}}</h1>');

        // when
        var template = FileHandlebars.compile(file.path('test.tmpl'));

        // then
        expect(template({ test: 'ABC' })).to.equal('<h1>ABC</h1>');
    });

    it('should watch template', function (done) {
        // given
        file.create('test.tmpl', '<h1>{{test}}</h1>');

        // when
        var template = FileHandlebars.compile(file.path('test.tmpl'), { watch: true, interval: 50 });

        // then
        expect(template({ test: 'ABC' })).to.equal('<h1>ABC</h1>');

        // when
        file.create('test.tmpl', '<h2>{{test}}</h2>');

        // then
        setTimeout(function () {
            expect(template({ test: 'ABC' })).to.equal('<h2>ABC</h2>');
            done();
        }, 250);
    });

    it('should pass options to Handlebars', function () {
        // given
        file.create('test.tmpl', '<h1>{{test}}</h1>');

        // when
        var template = FileHandlebars.compile(file.path('test.tmpl'), { noEscape: true });

        // then
        expect(template({ test: '<span>ABC</span>' })).to.equal('<h1><span>ABC</span></h1>');

    });

    afterEach(function () {
        file.clean();
    });

});
