import React from "react";
import { useSelector } from "react-redux";
import styles from './MyProfile.module.css';
const MyProfile = (props)=>{
    const {currentUser}  = useSelector((state)=> state.UserReducer)
    console.log("Current User" , currentUser)
    return (
        <div className = {styles.myProfile}>
            <div>
                <h1> My Profile</h1>
            </div>
            <div>                
                <h2>Name</h2>
                <p>{currentUser.Name}</p>
                </div>
                <div>
                <h2>Account Number</h2>
                <p>{currentUser.AccountNumber}</p>
                </div>
                <div>                    
                <h2>Date of Birth</h2>
                <p>{currentUser.DateOfBirth}</p>
                </div>
                <div>
                <h2>Address</h2>
                <p>{currentUser.City},{currentUser.State}</p>
                </div>
                <div>
                <h2>Account Type</h2>
                <p>{currentUser.AccountType}</p>
                </div>
          
            </div>
            
    )
}

export default MyProfile;