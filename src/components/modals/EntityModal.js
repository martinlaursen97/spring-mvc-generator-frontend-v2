import {useEffect} from "react";
import useState from 'react-usestateref'
import ReactDom from "react-dom";
import Modal from "react-bootstrap/Modal";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CRUD from "../../api/CRUD";

export default function EntityModal({ open, title, onClose, entities, setEntities, entity, modalMethod }) {

    let isPut = modalMethod === "PUT";

    const [name, setName] = useState(isPut ? entity.name : "");

    const [hasCreate , setHasCreate ] = useState(false);
    const [hasReadAll, setHasReadAll] = useState(false);
    const [hasRead   , setHasRead   ] = useState(false);
    const [hasUpdate , setHasUpdate ] = useState(false);
    const [hasDelete , setHasDelete ] = useState(false);

    useEffect(() => {
        (async function() {
            try {
                setHasCreate (isPut ? entity.hasCreate  : true);
                setHasReadAll(isPut ? entity.hasReadAll : true);
                setHasRead   (isPut ? entity.hasRead    : true);
                setHasUpdate (isPut ? entity.hasUpdate  : true);
                setHasDelete (isPut ? entity.hasDelete  : true);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [entity.hasCreate, entity.hasDelete, entity.hasRead, entity.hasReadAll, entity.hasUpdate, isPut]);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length > 0) {
            if (modalMethod === "POST") {
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

                await CRUD.create(entity, "entities")
                    .then(res => {
                        let data = res.data;
                        entities.push(data);
                        setEntities(entities);
                    })
                    .then(close);
            } else {
                entity.name = name;
                entity.hasCreate = hasCreate;
                entity.hasReadAll = hasReadAll;
                entity.hasRead = hasRead;
                entity.hasUpdate = hasUpdate;
                entity.hasDelete = hasDelete;

                await CRUD.update(entity, "entities", entity.id)
                    .then(close);
            }
            resetStates(true);
        }
    }

    const close = () => {
        resetStates(true);
        onClose();
    }

    const resetStates = (bool) => {
        setName("");
        setHasCreate (isPut ? entity.hasCreate  : bool);
        setHasReadAll(isPut ? entity.hasReadAll : bool);
        setHasRead   (isPut ? entity.hasRead    : bool);
        setHasUpdate (isPut ? entity.hasUpdate  : bool);
        setHasDelete (isPut ? entity.hasDelete  : bool);
    }

    return ReactDom.createPortal(
        <div className="overlay">
            <Modal.Dialog>
                <Modal.Header closeButton onClick={close}>
                    <Modal.Title>{isPut ? "Update entity: " + entity.name : title}</Modal.Title>
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


                    <Form.Check onChange={(e) => setHasCreate(e.target.checked)}  checked={hasCreate }  name="create" label="Create" inline/>
                    <Form.Check onChange={(e) => setHasReadAll(e.target.checked)} checked={hasReadAll} name="readAll" label="ReadAll" inline/>
                    <Form.Check onChange={(e) => setHasRead(e.target.checked)}    checked={hasRead   }    name="read" label="Read" inline/>
                    <Form.Check onChange={(e) => setHasUpdate(e.target.checked)}  checked={hasUpdate }  name="update" label="Update" inline/>
                    <Form.Check onChange={(e) => setHasDelete(e.target.checked)}  checked={hasDelete }  name="delete" label="Delete" inline/>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>{isPut ? "Update" : "Save" } </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
        ,
        document.getElementById("portal")
    );

}