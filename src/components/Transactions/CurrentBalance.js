import React from 'react'
import { useSelector } from 'react-redux';
import styles from './CurrentBalance.module.css'
const CurrentBalance = (props)=>{
    const transactions = useSelector(state => state.Transactions);

    const currentBalance = transactions.reduce((acc ,transaction)=>{
        if(transaction.tType === 'Deposit'){
            // console.log("Deposit" , transaction.Amount)
            return acc + transaction.Amount;
        }
        else{
            // console.log("Withdraw" , transaction.Amount)
            return acc - transaction.Amount
        }
    },0)
    // console.log("CurrentBalance" , currentBalance)
    return (
        <div className = {styles.currentBalance}>
            <div><h2>Current Balance</h2></div>
            <div>
                <p>
                    {currentBalance}
                </p>
            </div>
        </div>
    )
}

export default CurrentBalance ;