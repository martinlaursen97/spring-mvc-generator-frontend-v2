export default function EntityList({ entity, entities, setEntity }) {

    const loadEntity = e => {
        setEntity(e);
    }

    return (
        <div className="list-group">
            {entities.map(e =>
                <div key={e.id} className={`list-group-item list-group-item-action ${e === entity ? "active" : ""}`} onClick={() => loadEntity(e)}>{e.name}</div>
            )}
        </div>
    );
}