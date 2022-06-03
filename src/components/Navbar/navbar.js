import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './navbar.module.css';
import Button from '../../UI/Button';
import { useDispatch } from 'react-redux';
import allActions from '../../Actions';
const NavBar = () => {

   const dispatch = useDispatch()
  function handleLogout(){
    dispatch(allActions.userAction.logOut())
  }
  return (
    <header className={classes.header}>
      <nav>
        <ul>
        <li>
            <NavLink activeClassName={classes.active} to='/dashboard'>
             Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/dashboard/myProfile'>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/dashboard/withdrawDeposit'>
              Withdraw/Deposit
            </NavLink>
          </li>
          
          <li >
          <Button type={"button"} onClick = {handleLogout} className={classes.logOut}>
              Logout
            </Button>
          </li>
          
        </ul>
      </nav>
 
    </header>
  );
};

export default NavBar;