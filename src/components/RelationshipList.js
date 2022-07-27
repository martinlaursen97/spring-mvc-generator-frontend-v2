export default function RelationshipList({ entity }) {
    if (entity.relations === undefined) return null;
    let relations = entity.relations;
    return (
        <div className="list-group">
            {relations.map(r =>
                <div className="list-group-item list-group-item-action">{r.annotation} {r.relatedTo}</div>
            )}
        </div>
    )
}
