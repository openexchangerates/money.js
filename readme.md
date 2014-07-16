# money.js / fx() 

Simple and tiny JavaScript library for realtime currency conversion and exchange rate calculation, from any currency, to any currency. 

**money.js** is lightweight, has no dependencies, and works great client-side or server-side. Use standalone or as a nodeJS/npm and AMD/requireJS module.

Designed for seamless integration with the **[Open Exchange Rates API](https://openexchangerates.org "Free reliable exchange rates/currency conversion data API")**, but can be integrated with any source of currency data or with static/cached/approximate exchange rates.

Visit the plugin homepage for demos and documentation: **http://openexchangerates.github.io/money.js/**


## Quick Examples:

```javascript
// Simple syntax:
fx.convert(1000, {from: "GBP", to: "HKD"});

// Method chaining:
fx(1.99).from("USD").to("AED");

// Basic parsing:
fx("$1.99 HKD").to("EUR");

// Default parameters:
fx(5318008).convert();

// Supports nodeJS / AMD:
var fx = require('money');
require(["money"], function(fx) { /* ... */ });
```

## Changelog

**0.2**
* Now maintained by Open Exchange Rates
* Improved documentation

**0.1.3** - Fixed typo in nodeJS module definition

**0.1.2** - Strengthened up module definition similar to accounting.js

**0.1.1** - Added fallback when base rate is not in rates object (e.g. `"USD": 1`) to avoid errors

**0.1.0** - Added license; bumped version

**0.0.2**
* Adds basic parsing to `fx()`, so that you can pass a formatted string, like so: `fx("$1.99 HKD").to("GBP")`
* Some cleanup and improved comments and docs

**0.0.1** - First release
