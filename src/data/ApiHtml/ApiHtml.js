/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../../framework/element';

import { icons } from '../icons';
import styles from './ApiHtml.css';

export function ApiHtml({ API, Auth, Cors, Description, HTTPS, Link }) {
  return (
    <a href={Link} target="_blank" class={styles.api}>
      <h3 class={styles.api__name}>{API}</h3>
      <div class={styles.heart_container}>
        <div class={styles.heart + ' ' + styles.heart__l}></div>
        <div class={styles.heart + ' ' + styles.heart__r}></div>
      </div>
      <div class={styles.api__features}>
        <img
          src={icons.auth[Auth]}
          class={styles.api__auth_icon}
          title={'auth: ' + Auth}
          alt={'auth: ' + Auth}
        ></img>
        <span
          title={'HTTPS: ' + HTTPS}
          data-https={HTTPS ? 'true' : 'false'}
          class={styles.api__https}
        >
          {HTTPS ? 'HTTPS://' : 'HTTP://'}
        </span>
        <span title={'CORS: ' + Cors}>CORS: {Cors === 'unknown' ? '??' : Cors}</span>
      </div>
      <p class={styles.api__description}>{Description}</p>
    </a>
  );
}
