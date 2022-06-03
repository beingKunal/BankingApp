import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../Actions'
import Input from '../../UI/Input'
import classes from './Searchbox.module.css'
const SearchBox = (props)=>{

    const currentSearch = useSelector((state) => state.Search)

    const dispatch = useDispatch()
    function handleInputChange(event){
        dispatch(allActions.filterTransactions(event.target.value))
    }
    
    return (
        <div className ={`form-control ${classes.searchBox}`}>            
             <Input input={{
            placeholder: 'Search Transactions by description',
            type: 'text', 
          }} onChange={handleInputChange} value = {currentSearch}  
             />
            </div>
    )
}


export default SearchBox ; 