import {useEffect, useState} from "react";
import ReactDom from "react-dom";
import Modal from "react-bootstrap/Modal";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CRUD from "../../api/CRUD";

export default function RelationshipModal({ open, title, onClose, entity, setEntity, entities }) {


    entities = entities.filter(e => e.name !== entity.name);

    let name = entities[0] === undefined ? "undefined" : entities[0].name;

    const [annotation, setAnnotation] = useState("ManyToOne");
    const [entityChoice, setEntityChoice] = useState(name);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();


        let relation = {
            entity: {
                id: entity.id
            },
            annotation: annotation,
            relatedTo: entityChoice
        };



        await CRUD.create(relation, "relations")
            .then(res => {
                entity.relations.push(res.data)
                setEntity(entity);
            })
            .then(close);
    }

    const resetStates = () => {
        setAnnotation("ManyToOne");
        setEntityChoice(name);
    }

    const close = () => {
        resetStates();
        onClose();

    }

    return ReactDom.createPortal(
        <div className="overlay">
            <Form>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={close}>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default1">Annotation</InputGroup.Text>
                            <Form.Select onClick={e => setAnnotation(e.target.value)} aria-label="Default select example">
                                <option value="ManyToOne">ManyToOne</option>
                                <option value="OneToMany">OneToMany</option>
                                <option value="OneToOne">OneToOne</option>
                            </Form.Select>

                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default2">Entity</InputGroup.Text>
                            <Form.Select onClick={e => setEntityChoice(e.target.value)} aria-label="Default select example">
                                {entities.map(e =>
                                    <option value={e.name}>{e.name}</option>
                                )}
                            </Form.Select>

                        </InputGroup>
                    </Modal.Body>

                    <Modal.Footer>
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