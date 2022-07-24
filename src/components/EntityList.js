import {useHistory} from "react-router-dom";

export default function EntityList({ entities }) {

    const loadEntity = id => {
        localStorage.setItem("entityId", id);
    }

    return (
        <div className="list-group">
            {entities.map(e =>
                <div className="list-group-item list-group-item-action" onClick={() => loadEntity(e.id)}>{e.name}</div>
            )}
        </div>
    );
}