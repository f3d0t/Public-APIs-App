/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import { filterApiArray } from '../../data/filterData';

import styles from './Apis.css';

export function Apis() {
  const {
    filterArrays: { Category },
    fullApiArray,
    filters: { Category: currentCategory },
    filters,
    displayRandom,
  } = window.dataStore;
  const currentCategoryList = [];
  if (currentCategory !== '') {
    currentCategoryList.splice(0, 0, currentCategory);
  } else {
    currentCategoryList.splice(0, 0, ...Category);
  }
  const currentApiArray = filterApiArray(fullApiArray, filters, displayRandom);
  if (currentApiArray.length === 0)
    return (
      <p class={styles.message}>
        Nothing found <span class={styles.message__icon}>🕵️</span>
      </p>
    );
  return (
    <>
      <span class={styles.apis_counter}>
        Showing {currentApiArray.length} of {fullApiArray.length} APIs
      </span>
      {currentCategoryList.map(category => {
        const apisByCategory = currentApiArray.filter(api => api.Category === category);
        if (apisByCategory.length === 0) return null;
        else
          return (
            <div class={styles.apis_category}>
              <h2 class={styles.apis_category__name}>{category}</h2>
              {apisByCategory.map(api => api.HTML)}
            </div>
          );
      })}
    </>
  );
}
