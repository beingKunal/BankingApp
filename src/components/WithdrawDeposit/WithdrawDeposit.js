import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../../Hooks/input-hook'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import RadioButtons from '../../UI/RadioButtons'
import allActions from '../../Actions'
const WithdrawDeposit = (props) => {
    const [accountType, setAccountType] = useState('Withdraw')
    const transactions = useSelector(state => state.Transactions);
    const user = useSelector(state => state.UserReducer)

    const dispatch = useDispatch()

    const currentBalance = transactions.reduce((acc ,transaction)=>{
        if(transaction.tType === 'Deposit'){
           
            return acc + transaction.Amount;
        }
        else{
            
            return acc - transaction.Amount
        }
    },0)


    const {
        value: transactionAmount,
        isValid: transactionAmountIsValid,
        hasError: transactionAmounttHasError,
        valueChangeHandler: transactionAmountChangedHandler,
        inputBlurHandler: transactionAmountBlurHandler,
        reset: resettransactionAmountInput,
    } = useInput((value) => value.trim() !== "" && value > 0);
    const {
        value: description,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetdescriptionInput,
    } = useInput((value) => value.trim() !== "");
    let formIsValid = false;
    if (transactionAmountIsValid && descriptionIsValid) {
        formIsValid = true;
    }
    if((currentBalance <= 10000 && accountType === 'Withdraw') || (((currentBalance  - transactionAmount) <= 10000) && accountType === 'Withdraw')){
        formIsValid = false ;
    }

    function addTransaction(formData){
        (async () => {
          const rawResponse = await fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          const content = await rawResponse.json();
          if(content){
            dispatch(allActions.Transactions([content]))
            // dispatch(allActions.userAction.login({AccountNumber :content.AccountNumber , id : content.id}))  
          }
        })();
       }

    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
            userId: user.currentUser.id,
            // id: getRandomIdforTransaction(1,10000),
            tType: accountType,
            Amount: +transactionAmount,
            Date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            Description: description
          }
          addTransaction(formData)
        // dispatch(allActions.Transactions([formData]))
        resettransactionAmountInput()
        resetdescriptionInput()
    }
    function handleRadioChange(receivedAccountType) {
        setAccountType(receivedAccountType)
    }
    const transactionAmountInputClasses = transactionAmounttHasError
        ? "form-control invalid"
        : "form-control";

    const descriptionInputClasses = descriptionHasError
        ? "form-control invalid"
        : "form-control";
    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3> Select Transaction Type</h3>
                    <RadioButtons checked={accountType} onChange={handleRadioChange} />
                </div>
                <div>
                    <h3> Current Balance</h3>
                    <label>{currentBalance}</label>
                </div>
                <div>
                    <h3>Description</h3>
                    <div className={descriptionInputClasses}>
                        <Input input={{
                            type: 'text',
                            id: 'description'
                        }} onChange={descriptionChangedHandler}
                            onBlur={descriptionBlurHandler}
                            value={description} />
                        {descriptionHasError && (
                            <p className="error-text">Enter some description</p>
                        )}
                    </div>
                </div>
                <div>
                    <h3>Transaction Amount</h3>
                    <div className={transactionAmountInputClasses}>
                        <Input input={{
                            type: 'number',
                            id: 'transactionAmount'
                        }} onChange={transactionAmountChangedHandler}
                            onBlur={transactionAmountBlurHandler}
                            value={transactionAmount} />
                        {transactionAmounttHasError && (
                            <p className="error-text">Transaction amount must be greater than 0.</p>
                        )}
                    </div>
                </div>


                <div className="form-actions">
                    <div >
                        <Button disabled={!formIsValid}>Submit</Button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default WithdrawDeposit;