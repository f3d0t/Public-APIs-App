import { ApiHtml } from './ApiHtml/ApiHtml';
import { renderApp } from '../framework/render';
import { fetchData } from './fetchData';

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
  fetchData()
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
          filterArrays[key] = getFilterValues(data, key);
        });
      }
    })
    .finally(renderApp);
}

export function reloadApp() {
  clearFilters(false);
  loadAndPrepareData();
}

export function setFilter(key, value, id) {
  if (value === 'All' || value === '') {
    window.dataStore.filters[key] = '';
  } else {
    window.dataStore.filters[key] = checkBooleanAndConvert(value);
  }
  filterApiArray();
  window.dataStore.activeInputId = id;
  renderApp();
}

export function setRandom() {
  clearFilters(false);
  const apiArray = window.dataStore.currentApiArray.slice();
  window.dataStore.currentApiArray = [apiArray[Math.floor(Math.random() * apiArray.length)]];
  renderApp();
}

export function clearFilters(render = true) {
  let { filters } = window.dataStore;
  Object.keys(filters).map(key => {
    window.dataStore.filters[key] = '';
  });
  filterApiArray();
  if (render) renderApp();
}
