export function fetchData() {
  window.dataStore.isDataLoading = true;
  window.renderApp();
  window.dataStore.error = null;
  const url = `https://api.publicapis.org/entries`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        return data.entries;
      }
    })
    .catch(error => {
      window.dataStore.error = error;
      return Promise.resolve({});
    });
}
