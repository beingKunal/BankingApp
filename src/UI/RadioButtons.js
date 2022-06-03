import React from "react"

const RadioButtons = (props) =>{

    function handleRadioButtonSelection(event){
        // console.log(event.target.value)
        props.onChange(event.target.value)
    }
    return (
        <React.Fragment>
            {console.log("Accocuntype", props.checked) }
        <input
            type =  'radio'
            value  =  'Withdraw'
            id  = 'withdraw'
            name   = "Account"
          onChange = {handleRadioButtonSelection} checked = {props.checked === 'Withdraw'} />
            <label htmlFor="Withdraw">Withdraw</label>
          <input 
            type = 'radio'
            value  = 'Deposit'
            id  = 'Deposit'
            name  = "Account"
          onChange = {handleRadioButtonSelection} checked = {props.checked === 'Deposit'} />
            <label htmlFor="Deposit">Deposit</label>
          </React.Fragment>
    )
}

export default RadioButtons ; 