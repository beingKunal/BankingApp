const initialState  = []
   
    // currentBalance : 0

const Transactions= (state = initialState, action)=>{
    switch(action.type){
        case 'TRANSACTIONS':
            console.log("Action payload" , action.payload)
            console.log(state)
            const newState =  [...state , ...action.payload]
            console.log("new State" , newState)
            return newState ;
            // return state.transactions.slice(0).push(action.payload)
        default :
            return state
    }
}

export default Transactions ;