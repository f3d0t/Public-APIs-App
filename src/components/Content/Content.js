/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';

import { Apis } from '../Apis/Apis';
import styles from './Content.css';

export function Content() {
  if (window.dataStore.error !== null)
    return (
      <p class={styles.loading_text + ' ' + styles.loading_text__error}>{window.dataStore.error}</p>
    );
  else if (window.dataStore.isDataLoading)
    return <p class={styles.loading_text}>Data is loading</p>;
  else if (window.dataStore.currentApiArray.length === 0)
    return <p class={styles.loading_text}>Nothing found 🕵️</p>;

  return <Apis />;
}
