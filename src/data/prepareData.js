export function getFilterValues(data, key) {
  return [...new Set(data.map(api => api[key]))];
}
