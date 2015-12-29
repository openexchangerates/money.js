var fx = require('../money.js');

var chai = require('chai'),
expect = chai.expect,
should = chai.should();

describe('Main test', function () {
	fx.base = 'USD';
	fx.rates = {
		'EUR': 0.42,
		'GBP': 0.23,
		'USD': 1,
	};
	fx.settings = { from: 'USD', to: 'EUR' };

	describe('Basic settings', function () {
		it('Base should be correctly set', function () {
			fx.base.should.be.equal('USD');
		});

		it('Expect Rates to be an object', function () {
			expect(fx.rates).to.be.an('object');
		});

		it('Rates.EUR should Exist', function () {
			should.exist(fx.rates['EUR']);
		});

		it('Rates.EUR should be correctly setted', function () {
			fx.rates['EUR'].should.equal(0.42);
		});
	});

	describe('Basic Conversion', function () {
		it('should be correctly convert without currencies', function () {
			fx.convert(100).should.be.equal(42);
		});

		it('should be correctly convert with from currency on second argument', function () {
			fx.convert(100, {from: 'GBP'}).should.be.equal(182.6086956521739);
		});

		it('should be correctly convert with to currency on second argument', function () {
			fx.convert(100, {to: 'GBP'}).should.be.equal(23);
		});

		it('should be correctly convert with to & from currency on second argument', function () {
			fx.convert(100, {from: 'EUR', to: 'USD'}).should.be.equal(238.0952380952381);
		});

		it('should be correctly convert with to currency chained', function () {
			fx(100).to('GBP').should.be.equal(23);
		});

		it('should be correctly convert with to & from currency chained', function () {
			fx(100).from('EUR').to('USD').should.be.equal(238.0952380952381);
		});
	});

});
