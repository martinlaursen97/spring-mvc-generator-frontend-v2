import {Link, Redirect, useHistory, useLocation} from "react-router-dom";

export default function Projects() {

    let history = useHistory()
    let authorized = window.sessionStorage.getItem("userId") !== null;

    if (!authorized) {
        return <Redirect to="/login" />
    }



    const logout = () => {
        window.sessionStorage.clear();
        history.push("/login");
    }

    return (
        <div>
            <Link type="button" id="top-right-href" onClick={logout}>Logout</Link>

            <div className="container shadow p-3 mb-5 bg-white rounded w-50 p-4 " style={{marginTop: 200}}>
                <h1 className="display-6 p-1" style={{display : 'inline-block'}}>Projects</h1>
            </div>
        </div>
    );
}