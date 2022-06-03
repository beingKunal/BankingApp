import React, { Fragment, useState } from "react";
// import { useSelector } from "react-redux";
import useInput from "../../Hooks/input-hook";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../Actions";
import {Redirect} from 'react-router-dom';
const Login = () => {
  // const currentUser =  useSelector((state)=>state.currentUser)
  // const isLoggedIn = useSelector((state)=> state.isLoggedIn)
  const [invalidUser ,setInvalidUser] = useState(false) ; 
  const {isLoggedIn}  = useSelector((state)=> state.UserReducer)

  // console.log("receiving user state" , isLoggedIn)
  const dispatch = useDispatch();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enterdPassword,
    isValid: enterdPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.length >= 6);
  let formIsValid = false;

  if (enteredNameIsValid && enterdPasswordIsValid) {
    formIsValid = true;
  }

  async function validateUser(){
   await fetch('http://localhost:3000/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then((res) => {
      console.log("AccountNumber ==> "+  enteredName + "\nPassword===>" + enterdPassword )
      console.log(res[2].AccountNumber , res[2].Password)
        const currentUser = res.find((user)=>user.AccountNumber === enteredName && user.Password === enterdPassword)
        if(currentUser)
          // dispatch(allActions.userAction.login(currentUser))  
          dispatch(allActions.userAction.login(currentUser))       
        else{
          setInvalidUser(true) ;
        }
  
    }).catch((err)=> console.log(err))

  }
  const handleSubmit = (event) => {
    event.preventDefault();

    // if (!enteredNameIsValid) {
    //   return;
    // }
    validateUser()
    resetNameInput();
    resetPasswordInput();
  };
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

    if (isLoggedIn) {
      return <Redirect to='/dashboard'/>;
    }
  return (
    <Fragment>
     

      <form onSubmit={handleSubmit}>
        <div className={nameInputClasses}>
          <Input
            input={{
              type: "text",
              placeholder: "Account Number",
            }}
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          ></Input>
          {nameInputHasError && (
            <p className="error-text">Name must not be empty.</p>
          )}
        </div>
        <div className={passwordInputClasses}>
          <Input
            input={{
              type: "password",
              placeholder: "Password",
            }}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enterdPassword}
          ></Input>
          {passwordInputHasError && (
            <p className="error-text">Please enter a valid password.</p>
          )}
        </div>
        <div className="form-actions">
          <div>
          <Button disabled={!formIsValid}>Login</Button>
          </div>
          <div >
          <Link to={{ pathname: '/' }}>
            <Button type={"button"}>
            Register
          </Button></Link>
        </div>
          
        </div>
        {invalidUser && <div className ="error-text">
            <p> AccountNumber or Password is incorrect</p>
      </div>}
      </form>

    </Fragment>
  );
};

export default Login;
