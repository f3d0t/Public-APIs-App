import React from 'react';

import { icons } from '../../data';
import styles from './ApiHtml.css';

export function ApiHtml({ API, Auth, Cors, Description, HTTPS, Link }, key) {
  return (
    <a key={key} href={Link} target="_blank" className={styles.api}>
      <h3 className={styles.api__name}>{API}</h3>
      <div className={styles.heart_container}>
        <div className={styles.heart + ' ' + styles.heart__l}></div>
        <div className={styles.heart + ' ' + styles.heart__r}></div>
      </div>
      <div className={styles.api__features}>
        <img
          src={icons.auth[Auth]}
          className={styles.api__auth_icon}
          title={'auth: ' + Auth}
          alt={'auth: ' + Auth}
        ></img>
        <span
          title={'HTTPS: ' + HTTPS}
          data-https={HTTPS ? 'true' : 'false'}
          className={styles.api__https}
        >
          {HTTPS ? 'HTTPS://' : 'HTTP://'}
        </span>
        <span title={'CORS: ' + Cors}>CORS: {Cors === 'unknown' ? '??' : Cors}</span>
      </div>
      <p className={styles.api__description}>{Description}</p>
    </a>
  );
}
