# JSON Slugifier

Traverses through your JSON files in `src` directory and uses the [https://github.com/simov/slugify](Slugify) library to add proper slugs for entries.

Useful for simple JSON-based databases.

## Usage

1. `git clone https://github.com/patryk-bernasiewicz/json-slugifier`
2. `cd json-slugifier`
3. `yarn install`
4. Put your JSON files into `src/` directory
5. Run `yarn slugify` command

## Parameters

- `yarn slugify --param=<property name>` - will use given property to generate slug, defaults to `name`
