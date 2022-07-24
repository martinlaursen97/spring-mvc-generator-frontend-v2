import {Link, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import CRUD from "../../api/CRUD";

export default function Project() {

    let history = useHistory();
    const [entities, setEntities] = useState([]);

    let projectId = localStorage.getItem("projectId");

    useEffect(() => {
        CRUD.getAll(`entities/project/${projectId}`)
            .then(response => {
                setEntities(response.data);
            })
    })

    const createEntity = () => {

    }

    const downloadProject = () => {

    }

    const projects = () => {
        history.push("/projects")
    }

    const updateEntity = () => {

    }

    const deleteCurrentEntity = () => {

    }

    const createRelation = () => {

    }

    const createVariable = () => {

    }

    return (
        <div className="d-flex" id="wrapper">
            <div className="bg-light" id="sidebar-wrapper">
                <div className="sidebar-heading">
                    Entities
                    <button onClick={createEntity}  type="button" id="create-entity-btn" className="btn btn-outline-dark">
                        +
                    </button>
                </div>

                <hr/>

                <div className="list-group">

                </div>

                <div className="sidebar-heading w-100 position-absolute" style={{bottom:0, borderTop: '1px solid lightgrey'}}>
                    <button onClick={downloadProject()} type="button" style={{height:80, width:200}} className="btn btn-outline-dark">
                        Download project
                    </button>
                </div>
            </div>

            <Link type="button" id="top-right-href" onClick={projects}>Projects</Link>

            { entities.length > 0 ?
            <div className="container" id="content" style={{maxWidth: 900}}>
                <h1 className="display-3 p-1" id="page-entity-name" style={{display: 'inline-block', marginTop: 45}}>
                    Entity name
                </h1>
                <button onClick={updateEntity} type="button" className="btn btn-outline-dark btn-lg" style={{marginBottom: 30, marginLeft: 10}}
                        >Update
                </button>
                <button onClick={deleteCurrentEntity} type="button" className="btn btn-outline-danger btn-lg" style={{marginBottom: 30}}>
                    Delete
                </button>

                <div className="container- shadow p-3 mb-5 bg-white rounded w-100 p-4" style={{marginTop: 100}}>
                    <h1 className="display-6 p-1" style={{display: 'inline-block'}}>Variables</h1>
                    <button onClick={createVariable} type="button" className="btn btn-outline-dark btn-lg" style={{float: 'right'}}>
                        +
                    </button>

                    <div className="list-group" id="variable-list">

                    </div>

                    <hr/>

                    <h1 className="display-6 p-1" style={{display: 'inline-block'}}>
                        Relationships
                    </h1>

                    <button onClick={createRelation} type="button" className="btn btn-outline-dark btn-lg" style={{float: 'right'}}>
                        +
                    </button>

                    <div className="list-group" id="relationship-list">

                    </div>
                </div>
            </div>
                :
                <p/>
            }
        </div>
    )
}