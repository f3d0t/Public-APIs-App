import { renderApp } from './framework/render.js';
import { fetchData } from './data/fetchData.js';
import { dataStore } from './data/dataStore';
import { App } from './components/App/App';

import { loadAndPrepareData } from './data/prepareData.js';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = dataStore;

renderApp(App, document.getElementById('app-root'));
loadAndPrepareData();
