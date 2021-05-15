import styles from './style.css';
import { icons } from './icons';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  fullApiArray: [],
  currentApiArray: [],
  apiCount: '',
  filterArrays: {
    Category: [],
    Cors: [],
    HTTPS: [],
    Auth: [],
  },
  filters: {
    Category: '',
    Cors: '',
    HTTPS: '',
    Auth: '',
  },
  activeInputId: '',
  error: null,
  displayFavorites: false,
  isDataLoading: false,
};

window.renderApp = renderApp;
window.fetchData = fetchData;
window.prepareData = prepareData;
window.checkBooleanAndConvert = checkBooleanAndConvert;
window.filterApiArray = filterApiArray;
window.setFilter = setFilter;
window.clearFilters = clearFilters;
window.reloadApp = reloadApp;
window.setRandom = setRandom;

function checkBooleanAndConvert(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}

function reloadApp() {
  window.clearFilters(false);
  window.prepareData();
}

function getFilterValues(data, key) {
  return [...new Set(data.map(api => api[key]))];
}

function renderApp() {
  let { activeInputId } = window.dataStore;
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
  if (activeInputId !== '' && document.getElementById(activeInputId) !== null)
    document.getElementById(activeInputId).focus();
}

function fetchData() {
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

function prepareData() {
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
          filterArrays[key] = getFilterValues(data, key);
        });
      }
    })
    .finally(window.renderApp);
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

function setFilter(key, value, id) {
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
            ${Filters()}
            ${Button('Get random', 'window.setRandom')}
            ${Button('Clear filters', 'window.clearFilters')}
            ${Button('Reload data', 'window.reloadApp')}
          </div>`;
}

function Filters() {
  const { filterArrays, filters } = window.dataStore;
  return Object.entries(filters)
    .map(([key, currentValue]) => {
      return `<div class=${styles.menu_filter}>
                <label for="${key}_select">${key}:</label>
                <select name="${key}" id="${key}_select" class="${styles.filter_select}"
                  onchange="window.setFilter('${key}', this.value, '${key}_select')"
                  >
                  <option value='All'>All</option>
                  ${filterArrays[key]
                    .map(
                      value => `<option 
                                  value="${value}"
                                  ${currentValue === value ? ' selected ' : ''}
                                  >
                                    ${value}
                                </option>`,
                    )
                    .join('')}
                </select>
              </div>`;
    })
    .join('');
}

function Button(text = '', callbackFn) {
  return `<button 
            type="button"
            id="${text.replace(/\s/g, '')}"
            class="${styles.menu_button}" 
            onclick="
            window.dataStore.activeInputId = '${text.replace(/\s/g, '')}'; ${callbackFn}()
            ">
              ${text}
          </button>`;
}

function Content() {
  if (window.dataStore.error !== null) {
    return `<p class="${styles.loading_text} ${styles.loading_text__error}">${window.dataStore.error}</p>`;
  } else if (window.dataStore.isDataLoading) {
    return `<p class="${styles.loading_text}">Data is loading</p>`;
  } else if (window.dataStore.currentApiArray.length === 0) {
    return `<p class="${styles.loading_text}">Nothing found 🕵️</p>`;
  }
  return `${Apis()}`;
}

function Apis() {
  const {
    filterArrays: { Category },
    currentApiArray,
    apiCount,
    filters: { Category: currentCategory },
  } = window.dataStore;
  const currentCategoryList = [];
  if (currentCategory !== '') {
    currentCategoryList.splice(0, 0, currentCategory);
  } else {
    currentCategoryList.splice(0, 0, ...Category);
  }
  return `<span class="${styles.apis_counter}">Showing ${currentApiArray.length} of ${apiCount} APIs</span>
    `.concat(
    currentCategoryList
      .map(category => {
        const apisByCategory = currentApiArray.filter(api => api.Category === category);
        return apisByCategory.length === 0
          ? ``
          : `<div class="${styles.apis_category}">
                    <h2 class="${styles.apis_category__name}">${category}</h2>
                  `.concat(apisByCategory.map(api => api.HTML).join(''), `</div>`);
      })
      .join(''),
  );
}

function ApiHtml({ API, Auth, Cors, Description, HTTPS, Link }) {
  return `<a href="${Link}" target="_blank" class="${styles.api}">
            <h3 class="${styles.api__name}">${API}</h3>
            <div class="${styles.heart_container}">
              <div class="${styles.heart + ' ' + styles.heart__l}"></div>
              <div class="${styles.heart + ' ' + styles.heart__r}"></div>
            </div>
            <div class="${styles.api__features}">
              <img src='${icons.auth[Auth]}' 
                    class="${styles.api__auth_icon}" 
                    title="auth: ${Auth}" 
                    alt="auth: ${Auth}">
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

window.prepareData();
