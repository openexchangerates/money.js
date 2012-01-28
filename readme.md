# money.js / fx() 

Dead simple and tiny JavaScript library for realtime currency conversion and exchange rate calculation, from any currency, to any currency.

Can be easily used with the free, hourly-updating exchange rates from the **[Open Source Exchange Rates API](http://josscrowcroft.github.com/open-exchange-rates/)** project, or with static/cached/approximate/justplainwrong exchange rates.

```javascript
// Simple syntax:
fx.convert(1000, {from: "GBP", to: "HKD"});

// With some chaining sugar:
fx(1.99).from("USD").to("AED");

// Basic parsing:
fx("$1.99 HKD").to("EUR");

// And simple setup, allowing this:
fx(1).convert();

// Oh yeah and nodeJS / AMD:
var fx = require('money');
require(["money"], function(fx) { /* ... */ });
```

Visit **[josscrowcroft.github.com/money.js](http://josscrowcroft.github.com/money.js/)** for more info, examples and full documentation.


## Changelog

**0.1.3** - Fix typo in nodeJS module definition

**0.1.2** - Strengthened up module definition similar to accounting.js

**0.1.1** - Add fallback in case base rate is not in rates object (e.g. `"USD": 1`) to avoid errors.

**0.1.0** - Unexciting version number bump. Oh yeah and it has a license now.

**0.0.2**

* Adds basic parsing to `fx()`, so that you can pass a formatted string, like so: `fx("$1.99 HKD").to("GBP")`
* Some cleanup and improved comments and docs

**0.0.1** - First release