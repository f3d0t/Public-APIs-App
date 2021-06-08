import { checkBooleanAndConvert } from './utils';
import { renderApp } from '../framework/render';

export function setFilter(key, value, activeInputId) {
  if (value === 'All' || value === '') {
    window.dataStore.filters[key] = '';
  } else {
    window.dataStore.filters[key] = checkBooleanAndConvert(value);
  }
  window.dataStore.displayRandom = false;
  window.dataStore.activeInputId = activeInputId;
  renderApp();
}

export function setRandom() {
  window.dataStore.displayRandom = true;
  renderApp();
}

export function clearFilters(render = true) {
  let { filters } = window.dataStore;
  Object.keys(filters).map(key => {
    window.dataStore.filters[key] = '';
  });
  window.dataStore.displayRandom = false;
  if (render) renderApp();
}

export function reloadApp() {
  clearFilters(false);
}

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
