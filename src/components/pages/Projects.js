import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {useState} from "react";
import ProjectsModal from "../ProjectsModal";

export default function Projects() {

    let history = useHistory()
    let authorized = window.sessionStorage.getItem("userId") !== null;
    const [isOpen, setIsOpen] = useState(false);

    if (!authorized) {
        return <Redirect to="/login" />
    }


    const logout = (e) => {
        window.sessionStorage.clear();
        history.push("/login");
    }

    const createProject = (e) => {
        setIsOpen(true);
    }

    return (
        <div>
            <Link type="button" id="top-right-href" onClick={logout}>Logout</Link>

            <ProjectsModal title={"New project"} open={isOpen} onClose={() => setIsOpen(false)}>
                modal
            </ProjectsModal>

            <div className="container shadow p-3 mb-5 bg-white rounded w-50 p-4 " style={{marginTop: 200}}>
                <h1 className="display-6 p-1" style={{display : 'inline-block'}}>Projects</h1>

                <button onClick={createProject} type="button" className="btn btn-outline-dark btn-lg" style={{float:'right'}}>+</button>

                <div className="list-group" id="projects-list">

                </div>
            </div>
        </div>
    );
}