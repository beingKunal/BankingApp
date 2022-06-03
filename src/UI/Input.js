import React from 'react';

// import classes from './Input.module.css';

const Input = (props) => {
  return (
    // 
    <div>
      <input {...props.input } onChange = {props.onChange} onBlur={props.onBlur} value = {props.value} checked = {props.checked}/>
    </div>
  );
};

export default Input;