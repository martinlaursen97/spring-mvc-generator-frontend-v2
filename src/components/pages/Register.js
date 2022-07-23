import React, {useState} from "react";
import ErrorMessage from "../ErrorMessage";

import CRUD from "../../api/CRUD.js";
import {useHistory} from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [pw1, setPw1] = useState("");
    const [pw2, setPw2] = useState("");

    const [emailErr, setEmailErr] = useState("");
    const [pwMismatch, setPwMismatch] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [success, setSuccess] = useState(false);

    let history = useHistory();

    const submitHandler = async e => {
        e.preventDefault();
        await Register();
    }

    const Register = async () => {
        if (emailValid()
            && pw1 === pw2
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
            setEmailInvalid(true);
        }
    }

    const emailValid = () => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    if (success) {
        history.push("/login");
    }

    return (
        <div className="d-flex" style={{marginTop: 150}}>
            <div className="container shadow p-3 mb-5 bg-white rounded w-25 p-4">
                <form onSubmit={submitHandler}>
                    {
                        emailErr !== "" ?
                            <ErrorMessage message={emailErr}/>
                            : <p/>
                    }
                    {
                        emailInvalid ?
                            <ErrorMessage message="Invalid email."/>
                            : <p/>
                    }

                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email:</label>
                        <input className="form-control" required={true} type="email" name="email" id="email" onChange=
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
                        <input className="form-control" required={true} type="password" name="pw1" id="pw1" onChange=
                            {e => setPw1(e.target.value)} value={pw1}/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="pw2">Confirm Password:</label>
                        <input className="form-control" required={true} type="password" name="pw2" id="pw2" onChange=
                            {e => setPw2(e.target.value)} value={pw2}/>
                    </div>

                    <button type="submit" className="btn btn-secondary">Register</button>
                    <button type="login" onClick={() => history.push("/login")} className="btn btn-outline-primary" style={{marginLeft: 10}}>Back</button>
                </form>
            </div>
        </div>
    )
}