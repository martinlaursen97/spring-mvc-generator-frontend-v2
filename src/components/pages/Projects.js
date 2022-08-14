import {Link, Redirect, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import ProjectsModal from "../modals/ProjectsModal";
import CRUD from "../../api/CRUD";
import ProjectsList from "../ProjectsList";

export default function Projects() {

    let history = useHistory()
    let userId = window.sessionStorage.getItem("userId");
    let authorized = userId !== null;
    const [isOpen, setIsOpen] = useState(false);
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        CRUD.getAll(`projects/user/${userId}`)
            .then(response => {
                setProjects(response.data);
            })
    }, [userId])

    if (!authorized) {
        return <Redirect to="/login"/>
    }

    const logout = () => {
        window.sessionStorage.clear();
        history.push("/login");
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <div>
            <Link type="button" id="top-right-href" onClick={() => logout} to={"/login"}>Logout</Link>

            <ProjectsModal title={"New project"} modalMethod={"POST"} open={isOpen} projects={projects} setProjects={setProjects} onClose={() => setIsOpen(false)}/>

            <div className="container shadow p-3 mb-5 bg-white rounded w-50 p-4 " style={{marginTop: 200}}>
                <h1 className="display-6 p-1" style={{display: 'inline-block'}}>Projects</h1>

                <button onClick={() => openModal} type="button" className="btn btn-outline-dark btn-lg"
                        style={{float: 'right'}}>+
                </button>

                <ProjectsList projects={projects}/>
                <div className="list-group" id="projects-list">

                </div>
            </div>
        </div>
    );
}