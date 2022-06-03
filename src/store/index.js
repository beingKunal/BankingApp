import {createStore} from 'redux' ;

// const initialState = {
//     currentUser : {
//         username : 'Kunal@nagarro.com' ,
//         password : 'Kunal123'
//     },
//     isLoggedIn : false
// }

// const AuthReducer = (state = initialState , action)=>{
//     switch (action.type){
//         case "LOGIN":
//             localStorage.setItem('login' , true)
//             return Object.assign({} , state , {isLoggedIn : true})
        
//         case "LOGOUT":
//             localStorage.removeItem('login')
//             return Object.assign({} ,state , {isLoggedIn : false})
//         default : 
//             return state
//     }

// }
// const store = createStore(AuthReducer) ; 

// export default store ; 