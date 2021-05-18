import { ApiHtml } from './ApiHtml/ApiHtml';
import { renderApp } from '../framework/render';
import { fetchData } from './fetchData';

export function getFilterValues(data, key) {
  return [...new Set(data.map(api => api[key]))];
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
        window.dataStore.isDataLoading = false;
        Object.keys(filters).map(key => {
          filterArrays[key] = getFilterValues(data, key);
        });
      }
    })
    .finally(renderApp);
}
