/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';
import styles from './Header.css';

export function Header() {
  return (
    <header class={styles.header}>
      <h1 class={styles.header__title}>🔌 Public APIs app</h1>
    </header>
  );
}
