import {Link} from "react-router-dom";
import React, {useState} from "react";
import ErrorMessage from "./ErrorMessage";

import CRUD from "./CRUD.js";

export default function Register() {
    const [email, setEmail] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");

    const [emailErr, setEmailErr] = useState("");
    const [pwMismatch, setPwMismatch] = useState(false);
    const [success, setSuccess] = useState(false);

    const submitHandler = async e => {
        e.preventDefault();
        await Register();
    }

    const Register = async () => {
        if (pw1 === pw2
            && pw1.length >= 8
            && pw1.length <= 20) {

            await CRUD.create({email: email, password: pw1}, "users"
            ).then(() => {
                setSuccess(true);
            })
            .catch(() => {
                setEmailErr("Email already taken!")
            });

        } else {
            setPwMismatch(true);
        }
    }

    return (
        <div className="d-flex" style={{marginTop: 150}}>
            <div className="container shadow p-3 mb-5 bg-white rounded w-25 p-4">
                <form onSubmit={submitHandler}>
                    {
                        emailErr !== "" ? <ErrorMessage message={emailErr}/>
                            : <p/>
                    }

                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input className="form-control" type="email" name="email" id="email" onChange=
                            {e => setEmail(e.target.value)} value={email}/>
                    </div>

                    {
                        pwMismatch ?
                            <ErrorMessage message={"Passwords did not match."}/>
                            :<p/>
                    }

                    {
                        pw1 !== "" && (pw1.length < 8 || pw1.length > 20 ?
                        <ErrorMessage message={"Your password has to contain 8-20 characters."}/>
                            :<p/>)

                    }
                    <div className="mb-3">
                        <label className="form-label" htmlFor="pw1">Password:</label>
                        <input className="form-control" type="password" name="pw1" id="pw1" onChange=
                            {e => setPw1(e.target.value)} value={pw1}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="pw2">Confirm Password:</label>
                        <input className="form-control" type="password" name="pw2" id="pw2" onChange=
                            {e => setPw2(e.target.value)} value={pw2}/>
                    </div>

                    <button type="submit" className="btn btn-secondary">Register</button>
                    <Link to="/login" className="btn btn-outline-primary">Back</Link>
                </form>
            </div>
        </div>
    )
}