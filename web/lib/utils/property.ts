export function getPropertyFullLocation(property: any): string {
  const parts = [property.address, property.neighborhood, property.city, property.country].filter(Boolean);
  return parts.join(', ');
}

export function getFormattedPrice(price: number, currency: string = 'USD'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
}
