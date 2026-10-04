#!/usr/bin/env python3
"""Print a Mermaid ER diagram of the app's Room schema.

Reads the schema JSON that Room exports into the app repository and prints an `erDiagram`
block for docs/developers/data-model.mdx, so the diagram on the site is generated from what
the app actually ships rather than drawn by hand.

    python3 scripts/schema-to-mermaid.py \
        ../../titan/core/data/schemas/com.titan.core.data.db.TitanDatabase/1.json

Paste the output between the ```mermaid fences on that page. By default only the tables and
their foreign keys are drawn, which is what fits on a page; `--columns` adds every column.
"""

import json
import sys

SQL_TO_MERMAID = {"INTEGER": "int", "TEXT": "text", "REAL": "real", "BLOB": "blob"}


def main(path: str, columns: bool) -> None:
    database = json.load(open(path))["database"]
    lines = ["erDiagram"]

    for entity in database["entities"] if columns else []:
        table = entity["tableName"]
        primary = set(entity["primaryKey"]["columnNames"])
        foreign = {c for fk in entity.get("foreignKeys", []) for c in fk["columns"]}
        lines.append(f"    {table} {{")
        for field in entity["fields"]:
            column = field["columnName"]
            kind = SQL_TO_MERMAID.get(field["affinity"], field["affinity"].lower())
            keys = ",".join(k for k, on in (("PK", column in primary), ("FK", column in foreign)) if on)
            lines.append(f"        {kind} {column}{' ' + keys if keys else ''}")
        lines.append("    }")

    for entity in database["entities"]:
        for fk in entity.get("foreignKeys", []):
            child_columns = fk["columns"]
            nullable = any(
                not f.get("notNull", False) for f in entity["fields"] if f["columnName"] in child_columns
            )
            # A child row points at zero-or-one parent when the key is nullable, exactly one otherwise.
            parent_side = "|o" if nullable else "||"
            label = f"{', '.join(child_columns)} ({fk.get('onDelete', 'NO ACTION').lower()})"
            lines.append(f'    {fk["table"]} {parent_side}--o{{ {entity["tableName"]} : "{label}"')

    print("\n".join(lines))


if __name__ == "__main__":
    arguments = [a for a in sys.argv[1:] if a != "--columns"]
    if len(arguments) != 1:
        sys.exit(__doc__)
    main(arguments[0], columns="--columns" in sys.argv)
