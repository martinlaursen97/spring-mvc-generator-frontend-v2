export default function VariableList({ entity }) {

    if (entity.variables === undefined) return null;
    let variables = entity.variables

    return (
        <div>
            { variables !== null ?
                <div className="list-group">
                    {variables.map(v =>
                        <div key={v.id} className="list-group-item list-group-item-action">private {v.dataType} {v.name}</div>
                    )}
                </div>
                :
                <div/>
            }
        </div>
    )
}
