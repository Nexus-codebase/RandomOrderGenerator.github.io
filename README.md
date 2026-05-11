# Random Order Generator — Bites & Banter

A JavaScript program that generates a randomised takeaway order every time it runs. Part of the **Bites & Banter** restaurant site built as a Codecademy Mixed Messages project.

Each run picks a random main, side, drink, dessert, estimated delivery time, and a kitchen message. Enter a name for a personalised order slip.

## Live Site

https://nexus-codebase.github.io/RandomOrderGenerator.github.io/

## Run (Node.js)

From the project root, run interactively — the script will prompt for a name:

    node mixed-messages/messageGenerator.js

Or pass a name directly as a CLI argument:

    node mixed-messages/messageGenerator.js "Jamie"

## Browser Version

The **Bites & Banter** site (`index.html`) includes a live Random Order Generator section. Open the page, scroll to "Can't Decide?", enter a name, and click **Generate My Order**. Use the **Copy Order** button to copy the result to the clipboard.

## Project Structure

    portfolio project/
    ├── index.html               — Bites & Banter takeaway website
    ├── assets/
    │   ├── css/style.css        — Site styles (warm food palette)
    │   └── js/main.js           — Nav, scroll reveals, order generator
    └── mixed-messages/
        ├── messageGenerator.js  — Standalone Node.js order generator
        └── README.md
