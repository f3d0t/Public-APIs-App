export function checkBooleanAndConvert(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}

export function getUniqueValuesArray(data, key) {
  return [...new Set(data.map(api => api[key]))];
}
