!function ($) {
	var url = 'http://openexchangerates.org/latest.json'
		, fx = require('money')
		, reqwest
		, jquery

	function success(cb) {
		return function(data) {
			data && data.rates && data.base
			&& (fx.rates = data.rates) && (fx.base = data.base)
			&& cb && cb()
		}
	}
	$.ender({ forex: fx })
	fx.loadLatest = function(cb) {
		try { reqwest = require('reqwest') } catch (e) {}
		try { !reqwest && (jquery = require('jQuery')) } catch (e) {}
		if (!reqwest && !jquery)
			throw new Error("loadLatest() is not available because neither Reqwest nor jQuery are inclued in this Ender build");
		return reqwest ? reqwest({
			url: url
			, type: 'json'
			, method: 'get'
			, crossOrigin: true
			, success: success(cb)
		}) : jquery.getJSON(url, success(cb))
	}
}(ender);
