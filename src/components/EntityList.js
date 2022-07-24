export default function EntityList({ entities, setEntity }) {

    const loadEntity = e => {
        setEntity(e);
        localStorage.setItem("entityId", e.id);
    }

    return (
        <div className="list-group">
            {entities.map(e =>
                <div className="list-group-item list-group-item-action" onClick={() => loadEntity(e)}>{e.name}</div>
            )}
        </div>
    );
}