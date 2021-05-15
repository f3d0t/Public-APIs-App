import styles from './Apis.css';

export function Apis() {
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
