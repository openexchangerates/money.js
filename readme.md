# money.js / fx() 

Dead simple and tiny JavaScript library for realtime currency conversion and exchange rate calculation, from any currency, to any currency.

Can be easily used with the free, hourly-updating exchange rates from the **[Open Source Exchange Rates API](http://josscrowcroft.github.com/open-exchange-rates/)** project, or with static/cached/approximate/justplainwrong exchange rates.

```javascript
// Simple syntax:
fx.convert(1000, {from: "GBP", to: "HKD"});

// With some chaining sugar:
fx(1.99).from("USD").to("AED");

// And settings, allowing this:
fx(1).convert();

// Oh yeah and nodeJS / AMD:
var fx = require('money');
require(["money"], function(fx) { /* ... */ });
```

Visit **[josscrowcroft.github.com/money.js](http://josscrowcroft.github.com/money.js/)** for more info, examples and full documentation.

## Ender support

money.js is available as an [Ender](http://ender.no.de/) module, simply include 'money' in your Ender build command:

```
> ender build money
```

Then use it through the `$.forex` object.

```javascript
$.forex(100).from('AUD').to('USD');
```

If you include [Reqwest](http://github.com/ded/reqwest/) in your build you will be able to load currency data with the `$.forex.loadLatest()` function:

```
> ender build reqwest money
```

```javascript
$.forex.loadLatest()
// -> GET http://openexchangerates.org/latest.json
// results will be made available to $.forex() once received

// Or, provide a callback to be executed once we have the data:
$.forex.loadLatest(function() { console.log($.forex(1).from('AUD').to('USD')) });
```

## Changelog

### 0.0.1
* First release
