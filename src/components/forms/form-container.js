import React from 'react';

import styles from './form-container.module.scss';

function FormContainer({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export default FormContainer;
