import React, {useState} from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/pages/Login";
import Projects from "./components/pages/Projects";
import Register from "./components/pages/Register";

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/projects" component={() => <Projects/> }/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </Router>
    )
}

export default App;
