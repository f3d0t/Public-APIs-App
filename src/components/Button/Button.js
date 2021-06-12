import React from 'react';

import styles from './Button.css';

export function Button({ text = '', callbackFunction = null }) {
  return (
    <button
      type="button"
      id={text.replace(/\s/g, '')}
      className={styles.menu_button}
      onClick={e => {
        callbackFunction(true);
      }}
    >
      {text}
    </button>
  );
}
