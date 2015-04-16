var countryCodeVar = new ReactiveVar();
var dialCodeVar = new ReactiveVar();

Template.InternationalPhoneInput.helpers({
  dialCode: function () {
    return dialCodeVar.get();
  },
  exampleCountryNumber: function () {
    var country = countryCodeVar.get();
    if (!country) return '';

    var exampleNumber = Phone.exampleMobileNumber(country);
    var intlNumber = Phone.formatInternational(country, exampleNumber);

    return intlNumber.replace(/[0-9]/g, 'X');
  }
});

Template.InternationalPhoneInput.events({
  'input .dial-code': function (event) {
    var currentValue = event.currentTarget.value;

    // Ensure that the dial code starts with a '+'
    if (currentValue.substring(0, 1) !== '+') currentValue = '+' + currentValue;

    dialCodeVar.set(currentValue);

    var country = COUNTRY_CODE_MAP[Phone.dialCodeToName(currentValue)];
    if (!country) return;

    // Update country code var if a country exists for the current dial code
    countryCodeVar.set(country.code);

    // Trigger phone number input to apply formatting to current phone number
    $('.phone-number').trigger('input');
  },
  'input .phone-number': function (event) {
    var currentValue = event.currentTarget.value;

    var country = countryCodeVar.get();

    var exampleNumber = Phone.exampleMobileNumber(country);
    var cleanPhone = Phone.cleanPhone(currentValue);

    // Limit the length of a phone number to the length of an example number from that country
    if (cleanPhone.length > exampleNumber.length) {
      currentValue = cleanPhone.substring(0, exampleNumber.length);
    }

    event.currentTarget.value = Phone.formatInternational(country, currentValue);
  }
});

Template.InternationalPhoneInput.created = function () {
  Phone._getCountryForIp(function (countryCode) {
    countryCodeVar.set(countryCode);

    var countryName = Phone.countryCodeToName(countryCode);

    var countryInfo = COUNTRY_CODE_MAP[countryName];
    dialCodeVar.set(countryInfo.dial_code);
  });
};

Template.InternationalPhoneInput.dialCode = function (newDialCode) {
  // Set the dial code input value and trigger the input event
  // to apply the correct mask to the phone number input
  if (newDialCode) $('.dial-code').val(newDialCode).trigger('input');

  var dialCode = dialCodeVar.get();
  if (!dialCode) return;

  if (dialCode.indexOf('+') === -1) dialCode = '+' + dialCode;

  return dialCode;
};

Template.InternationalPhoneInput.phoneNumber = function (newPhoneNumber) {
  // Set the phone number input value and trigger the input event to apply the correct mask
  if (newPhoneNumber) $('.phone-number').val(newPhoneNumber).trigger('input');

  var phoneNumber = $('.phone-number').val();

  phoneNumber = Phone.cleanPhone(phoneNumber);

  return phoneNumber;
};

Template.InternationalPhoneInput.value = function () {
  var dialCode = Template.InternationalPhoneInput.dialCode();
  var phoneNumber = Template.InternationalPhoneInput.phoneNumber();

  return dialCode + phoneNumber;
};