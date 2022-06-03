const login = (userObj) => {
    return {
        type: "LOGIN",
        payload : userObj 
    }
}


const logOut = () => {
    return {
        type: "LOGOUT"        
    }
}

// const setUser = (userObj) => {
//     return {
//         type : "SETUSER" ,
//         payload : userObj
//     }
// }

export default {
    login,
    logOut
}