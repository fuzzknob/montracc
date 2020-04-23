const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'NPR',
})

export function formatCurrency(num) {
  return formatter.format(num).split('.').filter((splitted) => splitted !== '00').join('.')
    .replace('NPR', 'Rs')
}
