import { ApiHtml } from './apiHtml';

export function checkBooleanAndConvert(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}

export function getFilterValues(data, key) {
  return [...new Set(data.map(api => api[key]))];
}

export function filterApiArray() {
  const { filters } = window.dataStore;
  let apiArray = window.dataStore.fullApiArray.slice();
  Object.entries(filters).map(([key, value]) => {
    if (value !== '') {
      apiArray = apiArray.filter(api => api[key] === value);
    }
  });
  window.dataStore.currentApiArray = apiArray;
}

export function loadAndPrepareData() {
  const { filterArrays, filters } = window.dataStore;
  window
    .fetchData()
    .then(data => {
      if (Object.keys(data).length !== 0) {
        window.dataStore.fullApiArray = data.map(api => {
          if (api.Auth === '') api.Auth = 'none';
          api.HTML = ApiHtml(api);
          return api;
        });
        window.dataStore.currentApiArray = window.dataStore.fullApiArray;
        window.dataStore.apiCount = window.dataStore.currentApiArray.length;
        window.dataStore.isDataLoading = false;
        Object.keys(filters).map(key => {
          filterArrays[key] = window.getFilterValues(data, key);
        });
      }
    })
    .finally(window.renderApp);
}

export function reloadApp() {
  window.clearFilters(false);
  window.loadAndPrepareData();
}

export function setFilter(key, value, id) {
  if (value === 'All' || value === '') {
    window.dataStore.filters[key] = '';
  } else {
    window.dataStore.filters[key] = checkBooleanAndConvert(value);
  }
  window.filterApiArray();
  window.dataStore.activeInputId = id;
  window.renderApp();
}

function setRandom() {
  window.clearFilters(false);
  const apiArray = window.dataStore.currentApiArray.slice();
  window.dataStore.currentApiArray = [apiArray[Math.floor(Math.random() * apiArray.length)]];
  window.renderApp();
}

function clearFilters(render = true) {
  let { filters } = window.dataStore;
  Object.keys(filters).map(key => {
    window.dataStore.filters[key] = '';
  });
  window.filterApiArray();
  if (render) window.renderApp();
}
