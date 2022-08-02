export default function RelationshipList({ entity, setModalMethod, setRelationshipIsOpen, setSelectedRelationship }) {

    if (entity.relations === undefined) return null;
    let relations = entity.relations;

    const updateRelationship = relationship => {
        setModalMethod("PUT");
        setRelationshipIsOpen(true);
        setSelectedRelationship(relationship);
    }

    return (
        <div>
            {relations !== null ?
                <div className="list-group">
                    {relations.map(r =>
                        <div key={r.id} className="list-group-item list-group-item-action" onClick={() => updateRelationship(r)}>
                            {r.annotation} {r.relatedTo}
                        </div>
                    )}
                </div>
                :
                <div/>
            }
        </div>
    )
}
