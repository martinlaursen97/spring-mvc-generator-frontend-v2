import ReactDom from "react-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import {useState} from "react";
import {InputGroup} from "react-bootstrap";
import CRUD from "../api/CRUD";

export default function ProjectsModal({ open, title, onClose }) {
    const [name, setName] = useState("");

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length > 0) {
            let project = {
                user: {
                    id: window.sessionStorage.getItem("userId")
                },
                name: name
            }

            await CRUD.create(project, "projects").then(onClose);

        }
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
                            placeholder={"spring-mvc-generator"}
                        />
                    </InputGroup>

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