#!/usr/bin/env python3
"""
validate_people_diets.py

Checks schema consistency for people_diets.json.
Fails fast if required keys/types are missing or invalid.
"""

import json
import sys
from pathlib import Path

REQUIRED_TOP = ["name", "diet", "aliases", "tags", "needs_verification", "certified_vegan"]
REQUIRED_DIET = ["type", "sources", "status_note"]

def validate(path: Path) -> int:
    with open(path, "r", encoding="utf-8") as f:
        db = json.load(f)

    people = db.get("people", [])
    errors = []

    for idx, p in enumerate(people):
        name = p.get("name", f"index-{idx}")

        # top-level keys
        for k in REQUIRED_TOP:
            if k not in p:
                errors.append(f"{name}: missing top-level key '{k}'")

        # type checks
        if not isinstance(p.get("name"), str):
            errors.append(f"{name}: 'name' not string")
        if not isinstance(p.get("aliases"), list):
            errors.append(f"{name}: 'aliases' not list")
        if not isinstance(p.get("tags"), list):
            errors.append(f"{name}: 'tags' not list")
        if not isinstance(p.get("needs_verification"), bool):
            errors.append(f"{name}: 'needs_verification' not bool")
        if not isinstance(p.get("certified_vegan"), bool):
            errors.append(f"{name}: 'certified_vegan' not bool")

        diet = p.get("diet", {})
        if not isinstance(diet, dict):
            errors.append(f"{name}: 'diet' not object")
            continue

        for k in REQUIRED_DIET:
            if k not in diet:
                errors.append(f"{name}: diet missing key '{k}'")

        if not isinstance(diet.get("type"), str):
            errors.append(f"{name}: diet.type not string")
        if not isinstance(diet.get("status_note"), str):
            errors.append(f"{name}: diet.status_note not string")

        # sources
        srcs = diet.get("sources", [])
        if not isinstance(srcs, list):
            errors.append(f"{name}: diet.sources not list")
        else:
            for i, s in enumerate(srcs):
                if not isinstance(s, dict):
                    errors.append(f"{name}: source[{i}] not object")
                    continue
                for key in ["title", "url", "date"]:
                    if key not in s:
                        errors.append(f"{name}: source[{i}] missing '{key}'")
                    elif not isinstance(s[key], str):
                        errors.append(f"{name}: source[{i}].{key} not string")

        if "last_verified" in diet and diet["last_verified"] is not None:
            if not isinstance(diet["last_verified"], str):
                errors.append(f"{name}: diet.last_verified not string")

    if errors:
        print(f"❌ Validation failed: {len(errors)} issues found")
        for e in errors[:50]:  # show only first 50
            print(" -", e)
        if len(errors) > 50:
            print(f"... and {len(errors)-50} more")
        return 1
    else:
        print(f"✅ {len(people)} people validated successfully. No errors.")
        return 0

if __name__ == "__main__":
    path = Path("people_diets.json")
    if len(sys.argv) > 1:
        path = Path(sys.argv[1])
    sys.exit(validate(path))
