const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'NPR',
})

export function formatCurrency(num) {
  return formatter.format(num).split('.')[0].replace('NPR', 'Rs')
}
