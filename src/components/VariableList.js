export default function VariableList({ entity, setModalMethod, setVariableIsOpen, setSelectedVariable }) {

    if (entity.variables === undefined) return null;
    let variables = entity.variables

    const updateVariable = variable => {
        setModalMethod("PUT");
        setVariableIsOpen(true);
        setSelectedVariable(variable);
    }

    return (
        <div>
            { variables !== null ?
                <div className="list-group">
                    {variables.map(v =>
                        <div key={v.id} className="list-group-item list-group-item-action" onClick={() => updateVariable(v)}>
                            private {v.dataType} {v.name}
                        </div>
                    )}
                </div>
                :
                <div/>
            }
        </div>
    )
}
