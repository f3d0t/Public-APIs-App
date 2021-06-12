export function fetchData() {
  const url = `https://api.publicapis.org/entries`;
  return fetch(url).then(response => response.json());
}
