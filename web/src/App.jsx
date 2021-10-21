import React from "react";
import Signup from "./component/Signup"
import Login from "./component/Login"
import {

  Switch,
  Route,
  Link

} from "react-router-dom";

function App() {

  return (
    <>
    
      <nav>
        <ul>
          <li>
            <Link to="/">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Switch>

        <Route path="/login">
          <Login />
        </Route>

        <Route exact path="/">
          <Signup />
        </Route>

      </Switch>
    </>




  );
}

export default App;
