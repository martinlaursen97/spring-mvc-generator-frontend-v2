import React, { useState } from "react";
import CRUD from "../../api/CRUD.js";
import {Link, Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import SuccessBox from "../SuccessBox"


export default function Login() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [details, setDetails] = useState({email: "", password: ""});
    let history = useHistory();

    const location = useLocation();
    const registered = location.state === undefined ? false : location.state;

    const login = async () => {
        await CRUD.create(details, "users/verify").then(res => {
            setSuccess(true);
            let data = res.data;
            window.sessionStorage.setItem("userId", data.id);
        })
        .catch((error) => {
            setError("Incorrect details.");
        });
    }

    if (success) {

        history.push("/projects", { authorized: true });
    }

    const submitHandler = async e => {
        e.preventDefault()

        await login();
    }

    return (

        <div>

            {
                registered ? <SuccessBox message="Registered"/>
                    : <p/>
            }

            <div className="d-flex" style={{marginTop: 150}}>
                <div className="container shadow p-3 mb-5 bg-white rounded w-25 p-4">
                    {error !== "" ?
                        <ErrorMessage message={"Error"}/>:<p/>
                    }
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input className="form-control" required={true} type="email" name="email" id="email" onChange=
                            {e => setDetails({...details, email: e.target.value})} value={details.email}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input className="form-control" required={true} type="password" name="password" id="password" onChange=
                            {e => setDetails({...details, password: e.target.value})} value={details.password}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" onClick={() => history.push("/register")} className="btn btn-outline-secondary" style={{marginLeft: 10}}>Register</button>
                </form>
                </div>
            </div>
        </div>
    )
}

