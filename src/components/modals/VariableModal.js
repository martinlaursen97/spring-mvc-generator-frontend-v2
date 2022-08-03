import {useCallback, useEffect, useState} from "react";
import ReactDom from "react-dom";
import Modal from "react-bootstrap/Modal";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CRUD from "../../api/CRUD";

export default function VariableModal({ open, title, onClose, entity, setEntity, setModalMethod, modalMethod, selectedVariable }) {

    let isPut = modalMethod === "PUT";

    const [name, setName] = useState("");
    const [dataType, setDataType] = useState("");
    const [columnName, setColumnName] = useState("");
    const [hasColumn, setHasColumn] = useState(false);

    const close = () => {
        resetStates(true);
        setModalMethod("POST");
        onClose();
    }

    const resetStates = () => {
        setName("");
        setDataType("");
        setColumnName("");
        setHasColumn(false);
    }

    useEffect(() => {
        (async function() {
            try {
                setName (     isPut ? selectedVariable.name : "");
                setDataType(  isPut ? selectedVariable.dataType : "");
                setColumnName(isPut ? selectedVariable.columnName : "");
                //setHasColumn( isPut ? selectedVariable.name : true);
                
            } catch (e) {
                console.error(e);
            }
        })();
    }, [isPut, selectedVariable.columnName, selectedVariable.dataType, selectedVariable.name]);

    const remove = useCallback( async () => {
        CRUD.remove("variables", selectedVariable.id)
            .then(() => {
                entity.variables = entity.variables.filter(v => v.id !== selectedVariable.id);
                setEntity(entity);
            })
            .then(resetStates)
            .then(onClose);
    }, [entity, onClose, selectedVariable.id, setEntity])
    
    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length > 0 && dataType.length > 0) {
            if (isPut) {
                selectedVariable.name = name;
                selectedVariable.dataType = dataType;
                selectedVariable.columnName = columnName;

                await CRUD.update(selectedVariable, "variables", selectedVariable.id)
                    .then(close);
            } else {
                let variable = {
                    entity: {
                        id: entity.id
                    },
                    name: name,
                    dataType: dataType,
                    columnName: columnName
                };

                await CRUD.create(variable, "variables")
                    .then(res => {
                        if (entity.variables === null) {
                            entity.variables = [];
                        }
                        entity.variables.push(res.data);
                        setEntity(entity);
                    })

                    .then(resetStates)
                    .then(close);
            }
        }
    }
    
    
    return ReactDom.createPortal(
        <div className="overlay">
            <Form>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={close}>
                        <Modal.Title>{isPut ? "Update: " + selectedVariable.name : title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default1">Data type</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default1"
                                    onChange={e => setDataType(e.target.value)}
                                    value={dataType}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default2">Variable name</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default2"
                                    onChange={e => setName(e.target.value)}
                                    value={name}

                            />
                        </InputGroup>
                        { hasColumn ?
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default3">Column name</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default3"
                                    onChange={e => setColumnName(e.target.value)}
                                    value={columnName}

                                />
                            </InputGroup>
                            :
                            <fieldset disabled>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-default3">
                                        Column name
                                    </InputGroup.Text>
                                    <Form.Control/>
                                </InputGroup>
                            </fieldset>
                        }
                        <Form.Check onChange={(e) => setHasColumn(e.target.checked)} checked={hasColumn}  label="Choose column name?" inline/>
                    </Modal.Body>

                    <Modal.Footer>
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