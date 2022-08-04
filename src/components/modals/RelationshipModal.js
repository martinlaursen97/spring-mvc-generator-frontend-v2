import {useCallback, useEffect, useState} from "react";
import ReactDom from "react-dom";
import Modal from "react-bootstrap/Modal";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CRUD from "../../api/CRUD";

export default function RelationshipModal({ open, title, onClose, entity, setEntity, entities, selectedRelationship, setModalMethod, modalMethod }) {

    let isPut = modalMethod === "PUT";
    
    entities = entities.filter(e => e.name !== entity.name);

    let name = entities[0] === undefined ? "" : entities[0].name;

    const [annotation, setAnnotation] = useState("ManyToOne");
    const [entityChoice, setEntityChoice] = useState(name);
    const [entityChoiceOnChange, setEntityChoiceOnChange] = useState("");
    const [fromDropdown, setFromDropdown] = useState(true);

    const [error, setError] = useState("");

    const close = () => {
        resetStates();
        setModalMethod("POST");
        onClose();
    }
    
    const resetStates = () => {
        setAnnotation("ManyToOne");
        setEntityChoice(name);
        setEntityChoiceOnChange("");
        setError("");
    }

    useEffect(() => {
        (async function() {
            try {
                setAnnotation(isPut ? selectedRelationship.annotation : "ManyToOne");
                setEntityChoice(isPut ? selectedRelationship.relatedTo : name);
                setEntityChoiceOnChange(isPut ? selectedRelationship.relatedTo : "");
                setFromDropdown(true);

            } catch (e) {
                console.error(e);
            }
        })();
    }, [isPut, name, selectedRelationship.annotation, selectedRelationship.relatedTo]);

    const remove = useCallback( async () => {
        CRUD.remove("relations", selectedRelationship.id)
            .then(() => {
                entity.relations = entity.relations.filter(r => r.id !== selectedRelationship.id);
                setEntity(entity);
            })
            .then(onClose);
    }, [entity, onClose, selectedRelationship.id, setEntity])


    if (!open) return null;

    const emptyEntityInput = () => {

        if (entityChoice.length === 0 && fromDropdown) {
            setError("Empty input");
            return true;
        }

        if (entityChoiceOnChange.length === 0 && !fromDropdown) {
            setError("Empty input");
            return true;
        }

        return false;
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emptyEntityInput()) {

            if (isPut) {
                selectedRelationship.annotation = annotation;
                selectedRelationship.relatedTo = entityChoice;

                await CRUD.update(selectedRelationship, "relations", selectedRelationship.id)
                    .then(close);
            } else {
                let relation = {
                    entity: {
                        id: entity.id
                    },
                    annotation: annotation,
                    relatedTo: fromDropdown ? entityChoice : entityChoiceOnChange
                };

                await CRUD.create(relation, "relations")
                    .then(res => {
                        if (entity.relations === null) {
                            entity.relations = [];
                        }
                        entity.relations.push(res.data)
                        setEntity(entity);
                    })
                    .then(close);
            }
        }
    }

    return ReactDom.createPortal(
        <div className="overlay">
            <Form>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={close}>
                        <Modal.Title>{isPut ? "Update relationship:" : title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default1">Annotation</InputGroup.Text>
                            <Form.Select value={annotation} onChange={e => setAnnotation(e.target.value)}>
                                <option value="ManyToOne">ManyToOne</option>
                                <option value="OneToMany">OneToMany</option>
                                <option value="OneToOne">OneToOne</option>
                            </Form.Select>

                        </InputGroup>
                        { fromDropdown ?
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default2">Entity</InputGroup.Text>
                                <Form.Select value={entityChoice} onChange={e => setEntityChoice(e.target.value)}>
                                    {entities.map((e, index) =>
                                        <option key={index} value={e.name}>{e.name}</option>
                                    )}
                                </Form.Select>
                            </InputGroup>
                            :
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default3">
                                    Entity
                                </InputGroup.Text>
                                <Form.Control onChange={e => {
                                    setError("");
                                    setEntityChoiceOnChange(e.target.value)}} value={entityChoiceOnChange}/>
                            </InputGroup>
                        }
                        <Form.Check onChange={(e) => setFromDropdown(e.target.checked)} checked={fromDropdown}  label="Choose from dropdown?" inline/>
                    </Modal.Body>

                    <Modal.Footer>
                        {error !== "" ?
                            <p className={"error"}>{error}</p>
                            :
                            <p/>
                        }
                        {
                            isPut ?
                                <Button variant="danger" onClick={remove}>Delete</Button>
                                :
                                <p/>
                        }
                        <Button variant="secondary" onClick={close}>Close</Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>Save</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Form>
        </div>
        ,
        document.getElementById("portal")
    );
}