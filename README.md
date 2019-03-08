# togeojson-cli

[![CircleCI](https://circleci.com/gh/tmcw/togeojson-cli.svg?style=svg)](https://circleci.com/gh/tmcw/togeojson-cli)

Converts KML and GPX to GeoJSON on the command line. You can provide a stream
of data from stdin, or a list of filenames. Auto-detects file types, and
if provided multiple files, concatenates them automatically.

Install with yarn:

    yarn global add @tmcw/togeojson-cli

With npm:

    npm install -g @tmcw/togeojson-cli

Run it just once with npx:

    npx @tmcw/togeojson-cli file.kml
