import {useState} from "react";
import ReactDom from "react-dom";
import Modal from "react-bootstrap/Modal";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CRUD from "../api/CRUD";

export default function EntityModal({ open, title, onClose, setEntities }) {
    const [name, setName] = useState("");

    const [hasCreate, setHasCreate]   = useState(true);
    const [hasReadAll, setHasReadAll] = useState(true);
    const [hasRead, setHasRead]       = useState(true);
    const [hasUpdate, setHasUpdate]   = useState(true);
    const [hasDelete, setHasDelete]   = useState(true);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length > 0) {
            let entity = {
                project: {
                    id: window.localStorage.getItem("projectId")
                },
                name: name,
                hasCreate: hasCreate,
                hasReadAll: hasReadAll,
                hasRead: hasRead,
                hasUpdate: hasUpdate,
                hasDelete: hasDelete
            }
            alert(JSON.stringify(entity));
            let createObj = await CRUD.create(entity, "entities")
                .then(onClose);

            resetStates(true);
            setEntities(...createObj);

        }
    }

    const resetStates = (bool) => {
        setName("");
        setHasCreate(bool);
        setHasReadAll(bool);
        setHasRead(bool);
        setHasUpdate(bool);
        setHasDelete(bool);
    }

    return ReactDom.createPortal(
        <div className="overlay">
            <Modal.Dialog>
                <Modal.Header closeButton onClick={onClose}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
                        <Form.Control
                            type="text"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            placeholder={"City..."}
                        />
                    </InputGroup>


                    <Form.Check onChange={(e) => setHasCreate(e.target.checked)} checked={hasCreate} name="create" label="Create" inline/>
                    <Form.Check onChange={(e) => setHasReadAll(e.target.checked)} checked={hasReadAll} name="readAll" label="ReadAll" inline/>
                    <Form.Check onChange={(e) => setHasRead(e.target.checked)} checked={hasRead} name="read" label="Read" inline/>
                    <Form.Check onChange={(e) => setHasUpdate(e.target.checked)} checked={hasUpdate} name="update" label="Update" inline/>
                    <Form.Check onChange={(e) => setHasDelete(e.target.checked)} checked={hasDelete} name="delete" label="Delete" inline/>


                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
        ,
        document.getElementById("portal")
    );

}