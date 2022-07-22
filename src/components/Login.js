import React, { useState } from "react";
import CRUD from "./CRUD.js";
import {BrowserRouter, Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import Projects from "./Projects";
import Register from "./Register";
import ErrorMessage from "./ErrorMessage";

export default function Login() {
    const [user, setUser] = useState({id: 0, email: "", password: ""});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [details, setDetails] = useState({email: "", password: ""});


    const Login = async () => {
        await CRUD.create(details, "users/verify").then(res => {
            setSuccess(true);
            let data = res.data;
            setUser({id: data.id, email: data.email, password: data.password})
        })
        .catch((error) => {
            alert(JSON.stringify(error));
            setError("Error");
        });
    }

    if (success) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/projects" component={Projects}/>
                    <Redirect to={"/projects"}/>
                </Switch>
            </BrowserRouter>
        )
    }

    const submitHandler = async e => {
        e.preventDefault()

        await Login();
    }

    return (

        <div className="d-flex" style={{marginTop: 150}}>
            <div className="container shadow p-3 mb-5 bg-white rounded w-25 p-4">
                {error !== "" ?
                    <ErrorMessage message={"Error"}/>:<p/>
                }
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-control" type="text" name="email" id="email" onChange=
                        {e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-control" type="text" name="password" id="password" onChange=
                        {e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/register" className="btn btn-outline-secondary">Register</Link>
            </form>
            </div>
        </div>
    )
}

