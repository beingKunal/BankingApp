import './App.css';
import Register from './components/Register/Register'
import { Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

import NotFound  from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Switch>
           <Route  path='/' component={Register} exact/>
           <Route   path='/login' component={Login}/>
           <Route  path='/dashboard' component={Dashboard}/>   
           <Route   path='*' component={NotFound}/>  
 
        </Switch>
    </div>
  );
}

export default App;
