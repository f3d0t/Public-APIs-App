import { Filters } from '../Filters/Filters';
import { Button } from '../Button/Button';
import styles from './Menu.css';

export function Menu() {
  return `<div class="${styles.menu}">
                ${Filters()}
                ${Button('Get random', window.setRandom)}
                ${Button('Clear filters', window.clearFilters)}
                ${Button('Reload data', window.reloadApp)}
            </div>`;
}
