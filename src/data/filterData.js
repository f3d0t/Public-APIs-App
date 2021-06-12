export function filterApiArray(apiArray, filters, random, search = '') {
  let newArray = apiArray;
  if (search.length > 0) {
    newArray = newArray.filter(api =>
      [api['API'], api['Description']].join(' ').toLowerCase().includes(search.toLowerCase()),
    );
  }
  Object.entries(filters).map(([key, value]) => {
    if (value !== '') {
      newArray = newArray.filter(api => api[key] === value);
    }
  });
  if (random && newArray.length !== 0) {
    newArray = [newArray[Math.floor(Math.random() * newArray.length)]];
  }
  return newArray;
}
