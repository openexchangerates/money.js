var fx = require('../money.js');
var util = require('util');
var chai = require('chai');

var expect = chai.expect;
var should = chai.should();

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

	describe('Multiple instance of fx()', function () {
		var money = fx.factory();

		money.rates = util._extend({}, fx.rates);
		money.base = "" + fx.base;
		money.settings = util._extend({}, fx.settings);
		money.rates.EUR = 0.5;
		money.rates.GBP = 0.6;

		it('shoud be a same instance', function () {
			var copyMoney = require('../money.js');
			copyMoney.should.be.equal(fx);
		});

		it('should be a new instance if called with factory()', function () {
			fx.factory().should.not.be.equal(fx);
		})

		it('should be correctly convert without currencies', function () {
			fx.convert(100).should.be.equal(42);
			money.convert(100).should.be.equal(50);
		});

		it('should be correctly convert with from currency on second argument', function () {
			fx.convert(100, {from: 'GBP'}).should.be.equal(182.6086956521739);
  		money.convert(100, {from: 'GBP'}).should.be.equal(83.33333333333334);
		});

		it('should be correctly convert with to currency on second argument', function () {
			fx.convert(100, {to: 'GBP'}).should.be.equal(23);
			money.convert(100, {to: 'GBP'}).should.be.equal(60);
		});

		it('should be correctly convert with to & from currency on second argument', function () {
			fx.convert(100, {from: 'EUR', to: 'USD'}).should.be.equal(238.0952380952381);
			money.convert(100, {from: 'EUR', to: 'USD'}).should.be.equal(200);
		});

		it('should be correctly convert with to currency chained', function () {
			fx(100).to('GBP').should.be.equal(23);
			money(100).to('GBP').should.be.equal(60);
		});

		it('should be correctly convert with to & from currency chained', function () {
			fx(100).from('EUR').to('USD').should.be.equal(238.0952380952381);
			money(100).from('EUR').to('USD').should.be.equal(200);
		});
	});

  describe('fx.getRate(to, from)', function () {
		it('should give default rate if compare with base', function () {
			fx.getRate('EUR', 'USD').should.be.equal(0.42);
			fx.getRate('GBP', 'USD').should.be.equal(0.23);
		});
		it('should give reversed rate if compare from base', function () {
			fx.getRate('USD', 'EUR').should.be.equal(2.380952380952381);
			fx.getRate('USD', 'GBP').should.be.equal(4.3478260869565215);
		});
  });
});
