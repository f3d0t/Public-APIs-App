import { renderApp } from './framework/render.js';
import { fetchData } from './data/fetchData.js';
import { dataStore } from './data/dataStore';
import {
  loadAndPrepareData,
  checkBooleanAndConvert,
  filterApiArray,
  setFilter,
  clearFilters,
  reloadApp,
  setRandom,
  getFilterValues,
} from './data/prepareData.js';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = dataStore;

window.renderApp = renderApp;
window.fetchData = fetchData;
window.loadAndPrepareData = loadAndPrepareData;
window.checkBooleanAndConvert = checkBooleanAndConvert;
window.filterApiArray = filterApiArray;
window.setFilter = setFilter;
window.clearFilters = clearFilters;
window.reloadApp = reloadApp;
window.setRandom = setRandom;
window.getFilterValues = getFilterValues;
renderApp();
loadAndPrepareData();
