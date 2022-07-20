import React, {useState} from "react";

import {
    BrowserRouter,
        Switch,
        Route,

} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import HTTP from "./components/HTTP"

function App() {


    const [user, setUser] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const Login = async details => {
        console.log(details);
        let response = await HTTP.create(details, "users/verify");
        if (response.status === 200) {
            let data = response.data;
            setUser({email: data.email, password: data.password});
        }
    }

    const Logout = () => {

    }

    return (
      <div className="App">
          {(user.email != "") ? (
              <div className="welcome">
                  <h2>Welcome, <span>{user.name}</span></h2>
              </div>
          ) : <LoginForm Login={Login} error={error}/>}
      </div>
    );
}

export default App;
