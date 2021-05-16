/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import styles from './Button.css';

export function Button({ text = '', callbackFunction }) {
  return (
    <button
      type="button"
      id={text.replace(/\s/g, '')}
      class={styles.menu_button}
      onclick={e => {
        window.dataStore.activeInputId = text.replace(/\s/g, '');
        callbackFunction();
      }}
    >
      ${text}
    </button>
  );
}
