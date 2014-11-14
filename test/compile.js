var expect = require('chai').expect;
var file = require('./filesTestUtils');

var HF = require('../src/handlebars-files');

describe('compile()', function () {

    beforeEach(function () {
        file.clean();
    });

    it('should compile template from file', function () {
        // given
        file.create('test.tmpl', '<h1>{{test}}</h1>');

        // when
        var template = HF.compile(file.path('test.tmpl'));

        // then
        expect(template({ test: 'ABC' })).to.equal('<h1>ABC</h1>');
    });

    it('should watch template', function () {
        // given
        file.create('test.tmpl', '<h1>{{test}}</h1>');

        // when
        var template = HF.compile(file.path('test.tmpl'), { watch: true });

        // then
        expect(template({ test: 'ABC' })).to.equal('<h1>ABC</h1>');

        // when
        file.create('test.tmpl', '<h2>{{test}}</h2>');

        // then
        expect(template({ test: 'ABC' })).to.equal('<h2>ABC</h2>');
    });

    afterEach(function () {
        file.clean();
    });

});
