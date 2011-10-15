!function ($) {
	var fx = require('money'), reqwest
	$.ender({ forex: fx })
	try { reqwest = require('reqwest') } catch (e) {}
	fx.loadLatest = reqwest ? function(cb) {
		return reqwest({
			url: 'http://openexchangerates.org/latest.json'
			, type: 'json'
			, method: 'get'
			, crossOrigin: true
			, success: function(data) {
				data && data.rates && (fx.rates = data.rates)
					&& data.base && (fx.base = data.base)
					&& cb && cb()
			}
		})
	} : function() {
		throw new Error("loadLatest() is not available because Reqwest is not in this Ender build");
	}
}(ender);
