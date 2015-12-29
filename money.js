/*!
 * money.js / fx() v0.3
 * Copyright 2014 Open Exchange Rates
 *
 * JavaScript library for realtime currency conversion and exchange rate calculation.
 *
 * Freely distributable under the MIT license.
 * Portions of money.js are inspired by or borrowed from underscore.js
 *
 * For details, examples and documentation:
 * http://openexchangerates.github.io/money.js/
 */
(function(root, undefined) {
	var factory = function() {
		// Create a safe reference to the money.js object for use below.
		var fx = function(obj) {
			return new fxWrapper(obj);
		};

		// Current version.
		fx.version = '0.3.0';


		/* --- Setup --- */

		// fxSetup can be defined before loading money.js, to set the exchange rates and the base
		// (and default from/to) currencies - or the rates can be loaded in later if needed.
		var fxSetup = root.fxSetup || {
			rates : {},
			base : ""
		};

		// Object containing exchange rates relative to the fx.base currency, eg { "GBP" : "0.64" }
		fx.rates = fxSetup.rates;

		// Default exchange rate base currency (eg "USD"), which all the exchange rates are relative to
		fx.base = fxSetup.base;

		// Default from / to currencies for conversion via fx.convert():
		fx.settings = {
			from : fxSetup.from || fx.base,
			to : fxSetup.to || fx.base
		};


		/* --- Conversion --- */

		// The base function of the library: converts a value from one currency to another
		var convert = fx.convert = function(val, opts) {
			// Convert arrays recursively
			if (typeof val === 'object' && val.length) {
				for (var i = 0; i< val.length; i++ ) {
					val[i] = convert(val[i], opts);
				}
				return val;
			}

			// Make sure we gots some opts
			opts = opts || {};

			// We need to know the `from` and `to` currencies
			if( !opts.from ) opts.from = fx.settings.from;
			if( !opts.to ) opts.to = fx.settings.to;

			// Multiple the value by the exchange rate
			if ( !!opts.rates ) {
				return val * getRatesCustom( opts.to, opts.from, opts.rates );
			}
			return val * getRate( opts.to, opts.from );
		};

		// Returns the exchange rate to `target` currency from `base` currency
		var getRate = fx.getRate = function(to, from) {
			// Save bytes in minified version
			var rates = fx.rates;

			// Make sure the base rate is in the rates object:
			rates[fx.base] = 1;

			// Throw an error if either rate isn't in the rates array
			if ( !rates[to] || !rates[from] ) {
				var msg = 'Cannot convert ' + from + ' to ' + to + ': ';

				if ( !rates[to] && !rates[from] ) {
					msg += 'exhange rates for both currencies are missing';
				} else if ( !rates[to] ) {
					msg += 'exhange rate for ' + to + ' is missing';
				} else if ( !rates[from] ) {
					msg += 'exhange rate for ' + from + ' is missing';
				}

				throw new Error( msg );
			}

			// If `from` currency === fx.base, return the basic exchange rate for the `to` currency
			if ( from === fx.base ) {
				return rates[to];
			}

			// If `to` currency === fx.base, return the basic inverse rate of the `from` currency
			if ( to === fx.base ) {
				return 1 / rates[from];
			}

			// Otherwise, return the `to` rate multipled by the inverse of the `from` rate to get the
			// relative exchange rate between the two currencies
			return rates[to] * (1 / rates[from]);
		};


		/* --- OOP wrapper and chaining --- */

		// If fx(val) is called as a function, it returns a wrapped object that can be used OO-style
		var fxWrapper = function(val) {
			// Experimental: parse strings to pull out currency code and value:
			if ( typeof	val === "string" ) {
				this._v = parseFloat(val.replace(/[^0-9-.]/g, ""));
				this._fx = val.replace(/([^A-Za-z])/g, "");
			} else {
				this._v = val;
			}
		};

		// Expose `wrapper.prototype` as `fx.prototype`
		var fxProto = fx.prototype = fxWrapper.prototype;

		// fx(val).convert(opts) does the same thing as fx.convert(val, opts)
		fxProto.convert = function() {
			var args = Array.prototype.slice.call(arguments);
			if (typeof this._v !== 'undefined') {
				args.unshift(this._v);
			}
			return convert.apply(fx, args);
		};

		// fx(val).from(currency) returns a wrapped `fx` where the value has been converted from
		// `currency` to the `fx.base` currency. Should be followed by `.to(otherCurrency)`
		fxProto.from = function(currency) {
			var wrapped = fx(convert(this._v, {from: currency, to: fx.base}));
			wrapped._fx = fx.base;
			return wrapped;
		};

		// fx(val).to(currency) returns the value, converted from `fx.base` to `currency`
		fxProto.to = function(currency) {
			return convert(this._v, {from: this._fx ? this._fx : fx.settings.from, to: currency});
		};

		return fx;
	};
	/* --- Module Definition --- */

	// Export the fx object for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `fx` to the global object
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = factory();
		}
		exports.factory = factory;
	} else if (typeof define === 'function' && define.amd) {
		// Return the library as an AMD module:
		define([], function() {
			return factory();
		});
	} else {
		// Use fx.noConflict to restore `fx` back to its original value before money.js loaded.
		// Returns a reference to the library's `fx` object; e.g. `var money = fx.noConflict();`
		fx.noConflict = (function(previousFx) {
			return function() {
				// Reset the value of the root's `fx` variable:
				root.fx = previousFx;
				// Delete the noConflict function:
				fx.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return fx;
			};
		})(root.fx);

		// Declare `fx` on the root (global/window) object:
		root['fx'] = factory();
	}

	// Root will be `window` in browser or `global` on the server:
}(this));
