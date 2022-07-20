import React, { useState } from "react";

export default function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({email: "", password: ""});

    const submitHandler = e => {
        e.preventDefault()

        Login(details);
    }

    return (
        <div className="d-flex">
            <div className="container shadow p-3 mb-5 bg-white rounded w-25 p-4">
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
                <button type="button" className="btn btn-outline-secondary">Register</button>
            </form>
            </div>
        </div>
    )
}

