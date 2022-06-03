let initialState = {
    currentUser : {},
    isLoggedIn : false
}
const userFromLocalStorage = localStorage.getItem('login');
if(userFromLocalStorage)
    initialState = JSON.parse(userFromLocalStorage)



const UserReducer = (state = initialState , action)=>{
    switch (action.type){
        case "LOGIN":
            // console.log("insideReducer" , action.payload)
            const newUser = {...state,
                currentUser: action.payload,
                isLoggedIn: true}           
            localStorage.setItem('login' ,JSON.stringify(newUser))    
            // console.log("IN Reducer" , newUser)        
            return newUser ; 
        
        case "LOGOUT":
            // console.log("Iside logout reducer")
            localStorage.removeItem('login')
            const loggedOut = {...state,
                currentUser: {},
                isLoggedIn: false} 
            return loggedOut
        default : 
            return state
    }
}
export default UserReducer ; 