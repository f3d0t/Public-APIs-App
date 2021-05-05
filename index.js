import { apiArray } from './fixtures';
import styles from './style.css';
import { icons } from './icons';

if (module.hot) {
  module.hot.accept();
}

window.renderApp = renderApp;
window.dataStore = {
  fullApiArray: apiArray.entries,
  currentApiArray: apiArray.entries,
  filterArrays: {
    categories: [],
    cors: [],
    https: [],
  },
  filters: {
    Category: '',
    Cors: '',
    HTTPS: '',
  },
  displayFavorites: false,
  appIsLoading: false,
};

function getCategories() {
  window.dataStore.filterArrays.categories = [
    ...new Set(apiArray.entries.map(apiDataObject => apiDataObject.Category)),
  ];
}

function loadData() {
  const url = `http://api.publicapis.org/entries/`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({ data }));
}

window.loadData = loadData;

function setFilter(key, value) {
  window.dataStore.filters[key] = value;
  filterApiArray();
}
function removeFilter(key) {
  delete window.dataStore.filters[key];
}
window.setFilter = setFilter;
window.filterApiArray = filterApiArray;
function filterApiArray() {
  let { filters, fullApiArray: apiArray } = window.dataStore;
  Object.entries(filters).map(([key, value]) => {
    if (value !== '' && value !== false) {
      apiArray = apiArray.filter(api => api[key] == value);
    }
  });
  window.dataStore.currentApiArray = apiArray;
}

function setCategoryFilter(category) {
  if (category === 'All' || category === '') {
    setFilter('Category', '');
  } else {
    setFilter('Category', category);
  }
  renderApp();
}

function App() {
  return `<div class="${styles.container}">
  ${Header()}
  ${Menu()}
  ${Apis()}
  </div>`;
}
function Header() {
  return `<header class="${styles.header}">
    <h1 class="${styles.header__title}">🔌 Public APIs app</h1>
  </header>`;
}
function Menu() {
  return `<div class="${styles.menu}">
  <div>${CategoryFilter(setCategoryFilter)}</div>
  <form action="" class="search-form" role="search"></form>
</div>`;
}

function renderApp() {
  //console.log('render');
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}

function Apis() {
  const {
    filterArrays: { categories },
    currentApiArray,
    filters: { Category: currentCategory },
  } = window.dataStore;
  const currentCategoryList = categories.slice();
  if (currentCategory !== '') {
    currentCategoryList.splice(0, currentCategoryList.length, currentCategory);
  }
  return currentCategoryList
    .map(category => {
      const apisByCategory = currentApiArray.filter(api => {
        return api.Category === category;
      });
      return apisByCategory.length === 0
        ? ``
        : `<div class="${styles.apis_category}">
    <h2 class="${styles.apis_category__name}">${category}</h2>
    `.concat(
            apisByCategory
              .map(({ API, Auth, Cors, Description, HTTPS, Link }) =>
                ApiItem(API, Auth, Cors, Description, HTTPS, Link),
              )
              .join(''),
            `</div>`,
          );
    })
    .join('');
}

function Category() {}

function ApiItem(api, auth, cors, description, https, link) {
  return `<a href="${link}" target="_blank" class="${styles.api}">
            <h3 class="${styles.api__name}">${api}</h3>
            <div class="${styles.heart_container}">
              <div class="${styles.heart + ' ' + styles.heart__l}"></div>
              <div class="${styles.heart + ' ' + styles.heart__r}"></div>
            </div>
            <div class="${styles.api__features}">
              <img src='${icons.auth[auth === '' ? 'none' : auth]}' 
              class="${styles.api__auth_icon}" 
              title="auth: ${auth === '' ? 'none' : auth}" 
              alt="auth: ${auth === '' ? 'none' : auth}">
              <span title="HTTPS: ${https}" 
              data-https="${https ? 'true' : 'false'}" 
              class=${styles.api__https}>
               ${https ? 'HTTPS://' : 'HTTP://'}
              </span>
              <span title="CORS: ${cors}">CORS: ${cors === 'unknown' ? '??' : cors}</span>
            </div>
            <p class="${styles.api__description}">${description}</p>
          </a>`;
}

function CategoryFilter(setCategoryFilterCB) {
  let {
    filterArrays: { categories },
    filters: { Category: currentCategory },
  } = window.dataStore;
  //console.log(currentCategory);
  return ` 
  <label for="cat-select">Category:</label>
  <select name="pets" id="cat-select" class="${styles.category_select}"
    onchange="(${setCategoryFilterCB})(this.value)";
  >
    <option value='All'>All</option>
    ${categories.map(
      cat => `<option 
        value="${cat}"
        ${currentCategory === cat ? ' selected ' : ''}
      >${cat}</option>
    `,
    )}
  </select>
`;
}

getCategories();
renderApp();
