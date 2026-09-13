export const COUNTRY_PHONE_OPTIONS = [
  { value: 'India', label: 'India', dialCode: '+91', minLength: 10, maxLength: 10 },
  { value: 'Germany', label: 'Germany', dialCode: '+49', minLength: 10, maxLength: 11 },
  { value: 'France', label: 'France', dialCode: '+33', minLength: 9, maxLength: 9 },
  { value: 'United States', label: 'United States', dialCode: '+1', minLength: 10, maxLength: 10 },
  { value: 'United Kingdom', label: 'United Kingdom', dialCode: '+44', minLength: 10, maxLength: 10 },
  { value: 'United Arab Emirates', label: 'United Arab Emirates', dialCode: '+971', minLength: 9, maxLength: 9 },
  { value: 'Italy', label: 'Italy', dialCode: '+39', minLength: 9, maxLength: 10 },
  { value: 'Spain', label: 'Spain', dialCode: '+34', minLength: 9, maxLength: 9 }
];

export const getCountryPhoneRule = (country) => (
  COUNTRY_PHONE_OPTIONS.find(option => option.value === country)
  || { dialCode: '+', minLength: 7, maxLength: 15 }
);

export const getPhonePattern = ({ minLength, maxLength }) => (
  minLength === maxLength
    ? `[0-9]{${minLength}}`
    : `[0-9]{${minLength},${maxLength}}`
);

export const getFullPhoneNumber = (country, localNumber) => {
  const digits = String(localNumber || '').replace(/\D/g, '');
  return `${getCountryPhoneRule(country).dialCode}${digits}`;
};
