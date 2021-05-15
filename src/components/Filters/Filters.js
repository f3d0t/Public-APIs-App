import styles from './Filters.css';

export function Filters() {
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
