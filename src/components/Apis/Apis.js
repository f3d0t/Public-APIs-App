import React from 'react';
import { useFiltersContext } from '../../context';
import { filterApiArray } from '../../data';

import styles from './Apis.css';

export function Apis({ apiArray, displayRandom }) {
  const {
    filters,
    filterArrays: { Category: fullCategoryList },
    search,
  } = useFiltersContext();
  const currentCategory = filters.Category;
  const currentCategoryList = [];
  if (currentCategory !== '') {
    currentCategoryList.splice(0, 0, currentCategory);
  } else {
    currentCategoryList.splice(0, 0, ...fullCategoryList);
  }
  const currentApiArray = filterApiArray(apiArray, filters, displayRandom, search);
  if (currentApiArray.length === 0)
    return (
      <p className={styles.message}>
        Nothing found <span className={styles.message__icon}>🕵️</span>
      </p>
    );
  return (
    <>
      <span className={styles.apis_counter}>
        Showing {currentApiArray.length} of {apiArray.length} APIs
      </span>
      {currentCategoryList.map(category => {
        const apisByCategory = currentApiArray.filter(api => api.Category === category);
        if (apisByCategory.length === 0) return null;
        else
          return (
            <div key={category} className={styles.apis_category}>
              <h2 className={styles.apis_category__name}>{category}</h2>
              {apisByCategory.map(api => api.HTML)}
            </div>
          );
      })}
    </>
  );
}
