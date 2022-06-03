import React, { useEffect, useState } from 'react'
import { StaticData } from '../../Assets/StaticData';
import Button from '../../UI/Button';
import DropDown from '../../UI/DropDown';
import Input from '../../UI/Input';
import { Link } from 'react-router-dom';
import useInput from '../../Hooks/input-hook';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import allActions from '../../Actions';

const Register = (props) => {

  const { accountTypes, location } = StaticData;
  const { isLoggedIn } = useSelector(state => state.UserReducer)

  const stateNames = location.map((loc) => loc.state);
  const [stateName, setStateName] = useState(0)
  const [cityName, setCityName] = useState(0)
  const [accountType, setAccountType] = useState(0)
  const [accountTouched, setAccountTouched] = useState(false)
  const [cityTouched, setCityTouched] = useState(false)
  const [stateTouched, setStateTouched] = useState(false)
  const [requiredCities, setRequiredCities] = useState(['Select city'])

  const dispatch = useDispatch()

  const accountTypeisValid = accountType != 0;
  const accountTypeisInvalid = !accountTypeisValid && accountTouched;
  const cityisValid = cityName != 0;
  const cityisInvalid = !cityisValid && cityTouched;
  const stateisValid = stateName != 0;
  const stateisInvalid = !stateisValid && stateTouched;

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

  const {
    value: enterdConfirmPassword,
    isValid: enterdconfirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmpasswordChangeHandler,
    inputBlurHandler: confirmpasswordBlurHandler,
    reset: resetconfirmPasswordInput,
  } = useInput((value) => value.length >= 6 && enterdPassword === value);

  const {
    value: enteredDate,
    isValid: enterdDateIsValid,
    hasError: confirmenterdDateHasError,
    valueChangeHandler: confirmenterdDateChangeHandler,
    inputBlurHandler: confirmenterdDateBlurHandler,
    reset: resetenterdDateInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: accountNumber,
    isValid: accountNumberIsValid,
    hasError: accountNumberHasError,
    valueChangeHandler: accountNumberChangedHandler,
    inputBlurHandler: accountNumberBlurHandler,
    reset: resetaccountNumberInput,
  } = useInput((value) => value.trim() !== "");


  useEffect(() => {
    setRequiredCities(() => {
      let newState = ['Select City']
      if (stateName != 0)
        newState.push(location[stateName].city)
      return newState
    })
  }, [stateName, location])



  let formIsValid = false;
  if (enteredNameIsValid && enterdPasswordIsValid && accountNumberIsValid && enterdconfirmPasswordIsValid && enterdDateIsValid && accountTypeisValid && cityisValid && stateisValid) {
    formIsValid = true;
  }
  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    const inputData = { Name: enteredName, AccountNumber: accountNumber, Password: enterdPassword, AccountType: accountTypes[accountType], State: stateNames[stateName], City: location[stateName].city, DateOfBirth: enteredDate }

    registerUser(inputData)
    resetNameInput();
    resetPasswordInput();
    resetaccountNumberInput();
    resetenterdDateInput();
    resetconfirmPasswordInput();
  };

  function registerUser(inputData) {
    (async () => {
      const rawResponse = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });
      const content = await rawResponse.json();
      if (content) {
        dispatch(allActions.userAction.login(content))
      }
    })();
  }
  function handleStateChange(event) {
    setStateName(() => event.target.value)
    setCityName(0)
    // if(event.target.value!==0){
    //   setStateValid(true)
    // }
    // else{
    //   setStateValid(false)
    // }

  }

  function handleCityChange(event) {
    setCityName(() => event.target.value)
  }
  function handleAccountChange(event) {
    setAccountType(event.target.value)
  }
  function handleBlur(dropdownId) {
    switch (dropdownId) {
      case 'account':
        console.log("Touching Account")
        setAccountTouched(true)
        break;
      case 'state':
        setStateTouched(true)
        break;
      case 'city':
        setCityTouched(true)
        break;
      default:
        console.log("")
    }
  }

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const accountNumberInputClasses = accountNumberHasError
    ? "form-control invalid"
    : "form-control";

  const confirmPasswordInputClasses = confirmPasswordHasError
    ? "form-control invalid"
    : "form-control";

  const dateInputClasses = confirmenterdDateHasError ? "form-control invalid"
    : "form-control";


  if (isLoggedIn) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <React.Fragment>
      <form onSubmit={handleRegisterSubmit}>
        <div className={nameInputClasses}>
          <Input input={{
            placeholder: 'User name',
            type: 'text'
          }} onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={enteredName} />
          {nameInputHasError && (
            <p className="error-text">Name must not be empty.</p>
          )}
        </div>
        <div className={dateInputClasses} >
          <Input input={{ type: 'date', placeholder: 'DOB' }} onChange={confirmenterdDateChangeHandler}
            onBlur={confirmenterdDateBlurHandler}
            value={enteredDate} />
          {confirmenterdDateHasError && (
            <p className="error-text">Date must not be empty.</p>
          )}
        </div>
        <div className={accountNumberInputClasses}>
          <Input input={{ type: 'text', placeholder: 'Account Number' }} onChange={accountNumberChangedHandler}
            onBlur={accountNumberBlurHandler}
            value={accountNumber} />
          {accountNumberHasError && (
            <p className="error-text">Account number must not be empty.</p>
          )}</div> <div>
          <DropDown name={'accountType'} id={'account'} onBlur={handleBlur} value={accountTypes} selected={accountType} onChange={handleAccountChange}></DropDown>
          {accountTypeisInvalid && (
            <p className="error-text">Please select account type.</p>
          )}</div>
        <div>
          <DropDown name={'state'} id={'state'} onBlur={handleBlur} selected={stateName} value={stateNames} onChange={handleStateChange}></DropDown>
          {stateisInvalid && (
            <p className="error-text">Please select State.</p>
          )}</div>
        <div><DropDown name={'city'} id={'city'} onBlur={handleBlur} value={requiredCities} selected={cityName} onChange={handleCityChange}></DropDown>
          {cityisInvalid && (
            <p className="error-text">Please select city.</p>
          )}</div>
        <div className={passwordInputClasses}><Input input={{ type: 'password', placeholder: 'Password' }} onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enterdPassword} />
          {passwordInputHasError && (
            <p className="error-text">Please enter a valid password.</p>
          )}</div>
        <div className={confirmPasswordInputClasses}>
          <Input input={{ type: 'password', placeholder: 'Confirm Password' }}
            onChange={confirmpasswordChangeHandler}
            onBlur={confirmpasswordBlurHandler}
            value={enterdConfirmPassword} />
          {confirmPasswordHasError && (
            <p className="error-text">Passwords do not match.</p>
          )}
        </div>
        <div className="form-actions">
          <div >
            <Button disabled={!formIsValid}>Register</Button>
          </div>
          <div >
            <Link to={{ pathname: '/login' }}>
              <Button type={"button"}>
              Login
            </Button></Link>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Register;
