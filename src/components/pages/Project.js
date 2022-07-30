import {Link, Redirect, useHistory} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import CRUD from "../../api/CRUD";
import ProjectsModal from "../modals/ProjectsModal";
import EntityModal from "../modals/EntityModal";
import VariableList from "../VariableList";
import RelationshipList from "../RelationshipList";
import EntityList from "../EntityList";
import VariableModal from "../modals/VariableModal";
import RelationshipModal from "../modals/RelationshipModal";

export default function Project(callback, deps) {

    let history = useHistory();

    const [entities, setEntities] = useState([]);

    const [entity, setEntity] = useState({});
    const [modalMethod, setModalMethod] = useState("");
    const [entityIsOpen, setEntityIsOpen] = useState(false);

    const [variableIsOpen, setVariableIsOpen] = useState(false);
    const [relationshipIsOpen, setRelationshipIsOpen] = useState(false);

    let projectId = localStorage.getItem("projectId");

    useEffect(() => {
        CRUD.getAll(`entities/project/${projectId}`)
            .then(response => {
                setEntities(response.data);
            })
    }, [projectId]);

    const deleteCurrentEntity = useCallback(async () => {
        if (entities.length > 0) {
            CRUD.remove("entities", entity.id).then(() => {
                let newArr = entities.filter(e => e.id !== entity.id);
                setEntities(newArr);
                setEntity(newArr[0]);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entities, entity.id !== undefined ? entity.id : 0])

    let userId = window.sessionStorage.getItem("userId");
    let authorized = userId !== null;
    if (!authorized) {
        return <Redirect to="/login"/>
    }

    if (Object.keys(entity).length === 0) {
        if (entities[0] !== undefined) {
            setEntity(entities[0]);
        }
    }

    const createEntity = () => {
        setModalMethod("POST");
        setEntityIsOpen(true);
    }

    const downloadProject = () => {

    }

    const projects = () => {
        history.push("/projects")
    }

    const updateEntity = () => {
        setModalMethod("PUT");
        setEntityIsOpen(true);

    }



    const createRelation = () => {
        setModalMethod("POST");
        setRelationshipIsOpen(true);
    }

    const createVariable = () => {
        setVariableIsOpen(true);
    }

    return (
        <div className="d-flex" id="wrapper">

            {
                modalMethod === "PUT" ?
                    <EntityModal title={"Update entity"} entity={entity} modalMethod={modalMethod} open={entityIsOpen} onClose={() => setEntityIsOpen(false)} entities={entities} setEntities={setEntities}/>
                    :

                    <EntityModal title={"New entity"} entity={entity} modalMethod={modalMethod} open={entityIsOpen} onClose={() => setEntityIsOpen(false)} entities={entities} setEntities={setEntities}/>

            }

            <VariableModal title={"New variable"} entity={entity} open={variableIsOpen} setEntity={setEntity} onClose={() => setVariableIsOpen(false)}/>
            <RelationshipModal title={"New relationship"} entity={entity} open={relationshipIsOpen} setEntity={setEntity} onClose={() => setRelationshipIsOpen(false)} entities={entities}/>

            <div className="bg-light" id="sidebar-wrapper">
                <div className="sidebar-heading">
                    Entities
                    <button onClick={createEntity}  type="button" id="create-entity-btn" className="btn btn-outline-dark">
                        +
                    </button>
                </div>

                <hr/>

                <EntityList entity={entity} entities={entities} setEntity={setEntity}/>

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
                    {entity.name}
                </h1>
                <button onClick={updateEntity} type="button" className="btn btn-outline-dark btn-lg" style={{marginBottom: 30, marginLeft: 10}}>
                    Update
                </button>
                <button onClick={deleteCurrentEntity} type="button" className="btn btn-outline-danger btn-lg" style={{marginBottom: 30}}>
                    Delete
                </button>

                <div className="container- shadow p-3 mb-5 bg-white rounded w-100 p-4" style={{marginTop: 100}}>
                    <h1 className="display-6 p-1" style={{display: 'inline-block'}}>Variables</h1>
                    <button onClick={createVariable} type="button" className="btn btn-outline-dark btn-lg" style={{float: 'right'}}>
                        +
                    </button>

                    <VariableList entity={entity}/>

                    <hr/>

                    <h1 className="display-6 p-1" style={{display: 'inline-block'}}>
                        Relationships
                    </h1>

                    <button onClick={createRelation} type="button" className="btn btn-outline-dark btn-lg" style={{float: 'right'}}>
                        +
                    </button>

                    <RelationshipList entity={entity}/>

                </div>
            </div>
                :
                <p/>
            }
        </div>
    )
}