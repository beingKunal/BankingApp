import Search from "./search";
import {combineReducers} from 'redux'
import UserReducer from "./User";
import Transactions from "./Transactions";

const appReducer = combineReducers({
    Search,
    UserReducer,
    Transactions
}
)
const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
  }


export default rootReducer ;