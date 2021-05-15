import styles from './Button.css';

export function Button(text = '', callbackFn) {
  return `<button 
            type="button"
            id="${text.replace(/\s/g, '')}"
            class="${styles.menu_button}" 
            onclick="window.dataStore.activeInputId = '${text.replace(
              /\s/g,
              '',
            )}'; (${callbackFn})()">
              ${text}
          </button>`;
}
