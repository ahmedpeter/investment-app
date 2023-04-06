const numberFormat = (value) =>
new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(value);


export default numberFormat;