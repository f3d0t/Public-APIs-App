export function filterApiArray(apiArray, filters, random) {
  Object.entries(filters).map(([key, value]) => {
    if (value !== '') {
      apiArray = apiArray.filter(api => api[key] === value);
    }
  });
  if (random === true && apiArray.length !== 0) {
    apiArray = [apiArray[Math.floor(Math.random() * apiArray.length)]];
  }
  return apiArray;
}
