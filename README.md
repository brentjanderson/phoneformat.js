meteor phoneformat.js
==============

Javascript phone number formatter for meteor.

##Usage
`meteor add dispatch:phoneformat.js`

```
// Returns: +18646978257
Phone.formatE164('US', '8646978257');

// Returns: US
Phone.countryForE164Number('+18646978257');

// Returns: +1 (864) 697-8257
Phone.formatInternational('US', '8646978257');

// Returns: (864) 697-8257
Phone.formatLocal('US', '8646978257');

// Returns: United States
Phone.countryCodeToName('US');

// Returns: +18646978257
Phone.cleanPhone('+1 (864) 697-8257');
```

<br>

##Template
`{{> InternationalPhoneInput}}`

This provides a template for a split input field for both an international dial code and the national phone format.

```
// Get the value from the dial code and phone number inputs
// Ex. +15555555555
Template.InternationalPhoneInput.value();

// Get just the value of the phone number input
// Ex. 5555555555
Template.InternationalPhoneInput.value(true);
```

<br>

##Credits
This repo was originally forked from [albeebe/phoneformat.js](https://github.com/albeebe/phoneformat.js).
