import styles from './style.css';
import { icons } from './icons';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  fullApiArray: [],
  currentApiArray: [],
  filterArrays: {
    Category: [],
    Cors: [],
    HTTPS: [],
  },
  filters: {
    Category: '',
    Cors: '',
    HTTPS: '',
  },
  error: null,
  displayFavorites: false,
  isDataLoading: false,
};
window.renderApp = renderApp;
window.checkBooleanAndConvert = checkBooleanAndConvert;
window.filterApiArray = filterApiArray;
window.prepareData = prepareData;
window.clearFilters = clearFilters;

function checkBooleanAndConvert(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}

function initApp() {
  renderApp();
  prepareData(renderApp);
}
function reloadApp() {
  clearFilters();
  prepareData(renderApp);
}

function getFilterValues(data, key) {
  return [...new Set(data.map(api => api[key]))];
}

function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}

function loadData() {
  window.dataStore.isDataLoading = true;
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

function prepareData(renderCB) {
  const { filterArrays } = window.dataStore;
  loadData().then(data => {
    if (data !== {}) {
      window.dataStore.fullApiArray = data.map(function (api) {
        api.HTML = ApiItem(api);
        return api;
      });
      window.dataStore.currentApiArray = window.dataStore.fullApiArray;
      window.dataStore.isDataLoading = false;
      Object.keys(filterArrays).map(key => {
        filterArrays[key] = getFilterValues(data, key);
      });
    }
    renderCB();
  });
}

function filterApiArray() {
  const { filters } = window.dataStore;
  let apiArray = window.dataStore.fullApiArray.slice();
  Object.entries(filters).map(([key, value]) => {
    if (value !== '') {
      apiArray = apiArray.filter(api => api[key] === value);
    }
  });
  window.dataStore.currentApiArray = apiArray;
}

function setFilter(key, value) {
  if (value === 'All' || value === '') {
    window.dataStore.filters[key] = '';
  } else {
    window.dataStore.filters[key] = checkBooleanAndConvert(value);
  }
  window.filterApiArray();
  window.renderApp();
}
function setRandom() {
  window.clearFilters(false);
  const apiArray = window.dataStore.currentApiArray.slice();
  window.dataStore.currentApiArray = [apiArray[Math.floor(Math.random() * apiArray.length)]];
  window.renderApp();
}
function clearFilters(render = true) {
  let { filters, fullApiArray: apiArray } = window.dataStore;
  Object.keys(filters).map(key => {
    window.dataStore.filters[key] = [].join();
  });
  window.dataStore.currentApiArray = apiArray;
  if (render) window.renderApp();
}

function App() {
  return `<div class="${styles.container}">
  ${Header()}
  ${Menu()}
  ${Content()}
  </div>`;
}
function Header() {
  return `<header class="${styles.header}">
    <h1 class="${styles.header__title}">🔌 Public APIs app</h1>
  </header>`;
}
function Menu() {
  return `<div class="${styles.menu}">
  ${Filters(setFilter)}
  ${Button('Get random', setRandom)}
  ${Button('Clear filters', clearFilters)}
  ${Button('Reload data', reloadApp)}
</div>`;
}
function Filters(setFilterCB) {
  const { filterArrays, filters } = window.dataStore;
  return Object.entries(filters)
    .map(([key, value]) => {
      return `<div class=${styles.menu_filter}>
      <label for="${key}_select">${key}:</label>
      <select name="${key}" id="${key}_select" class="${styles.filter_select}"
        onchange="(${setFilterCB})('${key}', this.value)"
      >
        <option value='All'>All</option>
        ${filterArrays[key]
          .map(
            cat => `<option 
            value="${cat}"
            ${value === cat ? ' selected ' : ''}
          >${cat}</option>
        `,
          )
          .join('')}
      </select>
        </div>`;
    })
    .join('');
}
function Button(text = 'undefined', callbackFn) {
  return `<button type="button" class="${styles.menu_button}" onclick='(${callbackFn})()'>${text}</button>`;
}

function Content() {
  if (window.dataStore.error !== null) {
    return `<p>${window.dataStore.error}</p>`;
  } else if (window.dataStore.isDataLoading) {
    return `<p class="${styles.loading}">Data is loading</p>`;
  } else if (window.dataStore.currentApiArray === []) {
    window.prepareData();
  }
  return `${Apis()}`;
}

function Apis() {
  const {
    filterArrays: { Category },
    currentApiArray,
    filters: { Category: currentCategory },
  } = window.dataStore;
  const currentCategoryList = Category.slice();
  if (currentCategory !== '') {
    currentCategoryList.splice(0, currentCategoryList.length, currentCategory);
  }
  return currentCategoryList
    .map(category => {
      const apisByCategory = currentApiArray.filter(api => api.Category === category);
      return apisByCategory.length === 0
        ? ``
        : `<div class="${styles.apis_category}">
    <h2 class="${styles.apis_category__name}">${category}</h2>
    `.concat(apisByCategory.map(api => api.HTML).join(''), `</div>`);
    })
    .join('');
}
function ApiItem({ API, Auth, Cors, Description, HTTPS, Link }) {
  return `<a href="${Link}" target="_blank" class="${styles.api}">
            <h3 class="${styles.api__name}">${API}</h3>
            <div class="${styles.heart_container}">
              <div class="${styles.heart + ' ' + styles.heart__l}"></div>
              <div class="${styles.heart + ' ' + styles.heart__r}"></div>
            </div>
            <div class="${styles.api__features}">
              <img src='${icons.auth[Auth === '' ? 'none' : Auth]}' 
              class="${styles.api__auth_icon}" 
              title="auth: ${Auth === '' ? 'none' : Auth}" 
              alt="auth: ${Auth === '' ? 'none' : Auth}">
              <span title="HTTPS: ${HTTPS}" 
              data-https="${HTTPS ? 'true' : 'false'}" 
              class=${styles.api__https}>
               ${HTTPS ? 'HTTPS://' : 'HTTP://'}
              </span>
              <span title="CORS: ${Cors}">CORS: ${Cors === 'unknown' ? '??' : Cors}</span>
            </div>
            <p class="${styles.api__description}">${Description}</p>
          </a>`;
}

initApp();
