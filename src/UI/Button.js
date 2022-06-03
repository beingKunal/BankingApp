import React from 'react';

import styles from './Button.module.css';

const Button = props => {
  return (
    <div>
      {/* {console.log(props.className)} */}
    <button {...props} className={props.className ? props.className : styles.button}>
      {props.children}
    </button>
    </div>
  );
};

export default Button;