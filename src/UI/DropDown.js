import React from 'react';
import styles from './Dropdown.module.css';
const DropDown = (props)=> {

    function blurHandler(event){
        console.log("Id" ,event.target.id)
        props.onBlur(event.target.id)
    }
    
    return (
        
        <select name={props.name} id={props.id} onChange ={props.onChange} value = {props.selected} onBlur={blurHandler}>
        
            { props.value && props.value.map((value , i)=>{
                return <option value = {i} key={i} >{value}</option>
            })}
        </select>
    )
}
export default DropDown ; 