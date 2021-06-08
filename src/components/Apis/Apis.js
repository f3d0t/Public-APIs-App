/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework';
import { filterApiArray } from '../../data';

import styles from './Apis.css';

export function Apis({ apiArray, filterArrays, filters, displayRandom }) {
  const currentCategory = filters.Category;
  const currentCategoryList = [];
  if (currentCategory !== '') {
    currentCategoryList.splice(0, 0, currentCategory);
  } else {
    const fullCategoryList = filterArrays.Category;
    currentCategoryList.splice(0, 0, ...fullCategoryList);
  }
  const currentApiArray = filterApiArray(apiArray, filters, displayRandom);
  if (currentApiArray.length === 0)
    return (
      <p class={styles.message}>
        Nothing found <span class={styles.message__icon}>🕵️</span>
      </p>
    );
  return (
    <>
      <span class={styles.apis_counter}>
        Showing {currentApiArray.length} of {apiArray.length} APIs
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
