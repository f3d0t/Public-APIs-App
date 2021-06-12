import React from 'react';

import styles from './Header.css';

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>🔌 Public APIs app</h1>
    </header>
  );
}
