/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework';
import styles from './Button.css';

export function Button({ text = '', callbackFunction = null }) {
  return (
    <button
      type="button"
      id={text.replace(/\s/g, '')}
      class={styles.menu_button}
      onclick={e => {
        //window.dataStore.activeInputId = e.target.id;
        callbackFunction(true);
      }}
    >
      {text}
    </button>
  );
}
