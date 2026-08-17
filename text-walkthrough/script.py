import re
import os


INPUT_FILE = "guide.txt"
OUTPUT_DIR = "walkthrough"


# ------------------------------------------------------------
# 1. Load the guide
# ------------------------------------------------------------

def load_guide():
    print(f"Reading {INPUT_FILE}...")

    if not os.path.exists(INPUT_FILE):
        raise FileNotFoundError(
            f"Could not find '{INPUT_FILE}'. "
            f"Make sure it is in the same folder as this script."
        )

    # utf-8-sig also handles UTF-8 files with a BOM
    with open(INPUT_FILE, "r", encoding="utf-8-sig") as f:
        return f.read()


# ------------------------------------------------------------
# 2. Find the Table of Contents
# ------------------------------------------------------------

def parse_toc(text):
    """
    Find walkthrough entries in the Table of Contents.

    Expected format is roughly:

        01) Alistel (Prologue)........................ALST1
        02) Lazvil Hills (Prologue)...................LZVL1
        ...

    Returns:

        [
            {
                "number": 1,
                "title": "Alistel (Prologue)",
                "code": "ALST1"
            },
            ...
        ]
    """

    lines = text.splitlines()

    entries = []

    # We only want the Walkthrough section of the TOC.
    in_walkthrough = False

    # Example:
    #
    # 01) Alistel (Prologue)..........................ALST1
    #
    toc_pattern = re.compile(
        r"^\s*(\d{2})\)\s+(.*?)\s*\.{2,}\s*([A-Za-z0-9]+)\s*$"
    )

    for line in lines:

        # Start looking after the Walkthrough heading.
        if re.search(r"\bII\.\s*Walkthrough\b", line, re.IGNORECASE):
            in_walkthrough = True
            continue

        if not in_walkthrough:
            continue

        # Stop when the next major TOC section starts.
        if re.search(
            r"\bIII\.\s*Node Completion List\b",
            line,
            re.IGNORECASE
        ):
            break

        match = toc_pattern.match(line)

        if not match:
            continue

        number = int(match.group(1))
        title = match.group(2).strip()
        code = match.group(3).strip()

        entries.append({
            "number": number,
            "title": title,
            "code": code
        })

    return entries


# ------------------------------------------------------------
# 3. Fallback TOC parser
# ------------------------------------------------------------

def parse_toc_fallback(text):
    """
    If the normal TOC parser fails because the spacing in guide.txt
    is slightly different, try a more forgiving parser.
    """

    lines = text.splitlines()

    entries = []

    for line in lines:

        match = re.match(
            r"^\s*(\d{2})\)\s+(.+?)\s+([A-Za-z0-9]{3,})\s*$",
            line
        )

        if not match:
            continue

        number = int(match.group(1))
        remainder = match.group(2).strip()
        code = match.group(3).strip()

        # We only accept reasonable chapter numbers.
        if not 1 <= number <= 66:
            continue

        # The code normally consists of letters/numbers and is
        # separated from the title by dots or spaces.
        title = re.sub(r"\.{2,}", "", remainder).strip()

        entries.append({
            "number": number,
            "title": title,
            "code": code
        })

    # Remove duplicates while preserving order.
    unique = {}

    for entry in entries:
        unique[entry["number"]] = entry

    return [
        unique[number]
        for number in sorted(unique)
    ]


# ------------------------------------------------------------
# 4. Find the actual walkthrough sections
# ------------------------------------------------------------

def find_sections(text, toc):
    """
    Locate each walkthrough section in the actual guide.

    We use the unique code from the TOC, e.g.

        [ALST1]
        [LZVL1]

    This is much safer than trying to determine section boundaries
    from the chapter titles.
    """

    lines = text.splitlines()

    sections = []

    for entry in toc:

        number = entry["number"]
        title = entry["title"]
        code = entry["code"]

        # Look for [CODE]
        pattern = re.compile(
            rf"\[{re.escape(code)}\]",
            re.IGNORECASE
        )

        start = None

        for i, line in enumerate(lines):

            if pattern.search(line):
                start = i
                break

        if start is None:
            print(
                f"WARNING: Could not find section "
                f"{number:02d} [{code}]"
            )
            continue

        sections.append({
            "number": number,
            "title": title,
            "code": code,
            "start": start
        })

    # Sort by actual position in the document.
    sections.sort(key=lambda x: x["start"])

    # End of a section = beginning of the next section.
    for i in range(len(sections) - 1):
        sections[i]["end"] = sections[i + 1]["start"]

    # Last section goes until the end of the document.
    if sections:
        sections[-1]["end"] = len(lines)

    return sections, lines


# ------------------------------------------------------------
# 5. Clean the extracted text
# ------------------------------------------------------------

def clean_text(lines):
    """
    Clean only unnecessary whitespace.

    We deliberately preserve ASCII art, maps, indentation,
    item lists, etc.
    """

    # Remove trailing spaces only.
    lines = [line.rstrip() for line in lines]

    # Remove excessive blank lines at beginning.
    while lines and not lines[0].strip():
        lines.pop(0)

    # Remove excessive blank lines at end.
    while lines and not lines[-1].strip():
        lines.pop()

    return "\n".join(lines) + "\n"


# ------------------------------------------------------------
# 6. Write files in groups of 10 chapters
# ------------------------------------------------------------

def write_chunks(sections, lines):

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # We expect 66 chapters:
    #
    # 01-10
    # 11-20
    # 21-30
    # 31-40
    # 41-50
    # 51-60
    # 61-66

    for start_number in range(1, 67, 10):

        end_number = min(start_number + 9, 66)

        selected = [
            section
            for section in sections
            if start_number <= section["number"] <= end_number
        ]

        if not selected:
            print(
                f"WARNING: No sections found for "
                f"{start_number:02d}-{end_number:02d}"
            )
            continue

        filename = f"{start_number:02d}-{end_number:02d}.txt"

        filepath = os.path.join(
            OUTPUT_DIR,
            filename
        )

        with open(
            filepath,
            "w",
            encoding="utf-8"
        ) as f:

            for section in selected:

                number = section["number"]
                title = section["title"]
                code = section["code"]

                # Nice separator between chapters.
                f.write("\n")
                f.write("=" * 78)
                f.write("\n")

                f.write(
                    f"{number:02d}) {title} [{code}]\n"
                )

                f.write("=" * 78)
                f.write("\n\n")

                section_lines = lines[
                    section["start"]:
                    section["end"]
                ]

                f.write(
                    clean_text(section_lines)
                )

                f.write("\n")

        print(
            f"Created: {filename} "
            f"({len(selected)} chapters)"
        )


# ------------------------------------------------------------
# 7. Print a summary
# ------------------------------------------------------------

def print_summary(toc, sections):

    print()
    print("=" * 60)
    print("SUMMARY")
    print("=" * 60)

    print(
        f"TOC entries found:        {len(toc)}"
    )

    print(
        f"Walkthrough sections:     {len(sections)}"
    )

    if toc:
        print(
            f"First TOC entry:           "
            f"{toc[0]['number']:02d}) {toc[0]['title']}"
        )

        print(
            f"Last TOC entry:            "
            f"{toc[-1]['number']:02d}) {toc[-1]['title']}"
        )

    print()

    missing = []

    found_numbers = {
        section["number"]
        for section in sections
    }

    for number in range(1, 67):

        if number not in found_numbers:
            missing.append(number)

    if missing:

        print(
            "WARNING: These chapters could not be located:"
        )

        print(
            ", ".join(
                f"{number:02d}"
                for number in missing
            )
        )

    else:

        print(
            "All 66 walkthrough sections were located!"
        )

    print("=" * 60)
    print()


# ------------------------------------------------------------
# Main
# ------------------------------------------------------------

def main():

    print()
    print("Radiant Historia Walkthrough Splitter")
    print("=" * 60)

    # Load guide.txt
    text = load_guide()

    # Parse TOC
    print("Parsing Table of Contents...")

    toc = parse_toc(text)

    # If normal parser didn't find enough entries,
    # try the fallback parser.
    if len(toc) < 10:

        print(
            "Normal TOC parser found too few entries."
        )

        print(
            "Trying fallback parser..."
        )

        toc = parse_toc_fallback(text)

    print(
        f"Found {len(toc)} TOC entries."
    )

    # Find actual sections
    print()
    print("Finding walkthrough sections...")

    sections, lines = find_sections(
        text,
        toc
    )

    print(
        f"Found {len(sections)} actual sections."
    )

    # Print summary
    print_summary(
        toc,
        sections
    )

    # Write files
    print("Creating output files...")
    print()

    write_chunks(
        sections,
        lines
    )

    print()
    print("=" * 60)
    print("DONE!")
    print("=" * 60)

    print(
        f"Output folder: {OUTPUT_DIR}\\"
    )

    print()


if __name__ == "__main__":
    main()