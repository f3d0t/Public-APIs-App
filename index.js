import { apiArray } from './fixtures';
import {
  CELSIUS_UNITS,
  displayInUnits,
  FAHRENHEIT_UNITS,
  getDateFromUnixTimestamp,
  getIconFromCode,
} from './utils';
import styles from './style.css';

if (module.hot) {
  module.hot.accept();
}

window.dataStore = {
  currentCity: '',
  currentUnits: CELSIUS_UNITS,
};

window.renderApp = renderApp;

const setCurrentUnits = function (value) {
  window.dataStore.currentUnits = value;
  window.renderApp();
};

renderApp();

function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}

function App() {
  return `<div class="${styles.container}">
  ${getMenu()}
  ${getApis()}
  </div>`;
  /*return `<div>
 ${SearchByCity()}asdasdasd
 ${UnitSwitch(window.dataStore.currentUnits, setCurrentUnits)}
 <br/> 
 ${WeatherToday()}
 <br/>
 ${WeatherForecast()}
</div>`*/
}

function getApis() {
  return apiArray.entries
    .map(
      api => `<div class="${styles.card}">
        <a href="${api.Link}" target="_blank">
          <h3 class="card__name">${api.API}</h3>
        </a>
        <p class="card__name">${api.Description}</p>
        <p class="card__name">${api.Auth === '' ? 'none' : api.Auth}</p>
        <p class="card__name">${api.HTTPS}</p>
        <p class="card__name">${api.Cors}</p>
        <p class="card__name">Category: ${api.Category}</p>
      </div>`,
    )
    .join('');
}

function getMenu() {
  return getCategoriesFilter();
}

function getCategoriesFilter() {
  let categories = apiArray.entries.map(apiDataObject => apiDataObject.Category);
  return [...new Set(categories)];
}

function UnitSwitch(currentUnits, setCurrentUnitsCB) {
  return `
    <p>Select units</p>
  ${[
    { id: 'celsius-units', value: CELSIUS_UNITS, name: 'C' },
    { id: 'fahrenheit-units', value: FAHRENHEIT_UNITS, name: 'F' },
  ]
    .map(
      ({ id, value, name }) =>
        `<div>
          <input 
              type="radio" 
              id="${id}"
              name="temperature-units" 
              value="${value}" 
              ${currentUnits === value ? ' checked ' : ''} 
              onchange="(${setCurrentUnitsCB})(this.value);"
          >
            <label for="${id}">˚${name}</label>
        </div>`,
    )
    .join('')}
`;
}

function SearchByCity() {
  const weatherData = weatherByCity[window.dataStore.currentCity];

  return `
    <input
        type="text"
        value="${window.dataStore.currentCity}"
        onchange="window.dataStore.currentCity = this.value; window.renderApp();" 
    />
    ${!weatherData ? `Enter one of the city names: ${Object.keys(weatherByCity).join(', ')}.` : ''}
`;
}

function WeatherToday() {
  const { currentCity, currentUnits } = window.dataStore;
  const weatherData = weatherByCity[currentCity];
  let content = '';

  if (weatherData) {
    const {
      current: {
        dt,
        temp,
        weather: [{ main, description, icon }],
      },
    } = weatherData;
    const tempInUnits = displayInUnits(temp, currentUnits);
    const dateString = getDateFromUnixTimestamp(dt);
    const weatherIcon = getIconFromCode(icon);
    content += `<div>Weather for ${dateString} in ${currentCity}:</div>`;
    content += `<div>${weatherIcon} ${main} (${description}). Temperature is ${tempInUnits}</div>`;
  }

  return content ? `<div>${content}</div>` : '';
}

function WeatherForecast() {
  const { currentCity, currentUnits } = window.dataStore;
  const weatherData = weatherByCity[currentCity];
  let content = '';
  if (weatherData) {
    content += `Weather forecast for ${currentCity}:`;
    const { daily } = weatherData;
    content += daily
      .slice(1)
      .map(({ dt, temp: { day, night }, weather: [{ main, description, icon }] }) => {
        const dateString = getDateFromUnixTimestamp(dt);
        const dayTempInUnits = displayInUnits(day, currentUnits);
        const nightTempInUnits = displayInUnits(night, currentUnits);
        const weatherIcon = getIconFromCode(icon);
        return `<div>For ${dateString}, ${weatherIcon} ${main} (${description}). Day at ${dayTempInUnits}, night at ${nightTempInUnits}</div>`;
      })
      .join('');
  }

  return content ? `<div>${content}</div>` : '';
}
