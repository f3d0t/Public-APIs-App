/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../../framework/element';

import { Filters } from '../Filters/Filters';
import { Button } from '../Button/Button';
import styles from './Menu.css';

export function Menu() {
  return (
    <div class="${styles.menu}">
      <Filters />
      <Button text="Get random" callbackFunction={window.setRandom} />
    </div>
  );
}
