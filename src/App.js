import React from "react";

import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import Login from "./components/pages/Login";
import Projects from "./components/pages/Projects";
import Register from "./components/pages/Register";
import Project from "./components/pages/Project";

function App() {

    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => {
                        return (
                                <Redirect to="/login" />
                        )
                    }}
                />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/projects" component={() => <Projects/> }/>
                <Route path="/project" component={Project}/>
            </Switch>
        </Router>
    )
}

export default App;
