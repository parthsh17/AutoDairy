export function formatNumber(value: number, locale = 'en-IN') {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatCurrency(value: number, currency = 'INR', locale = 'en-IN') {
  return new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits: 2,
    style: 'currency',
  }).format(value)
}
