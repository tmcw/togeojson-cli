#!/usr/bin/env node

const tj = require("@tmcw/togeojson");
const argv = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const xmldom = new (require("xmldom")).DOMParser();

function* convert(data) {
  let snippet = data.substring(0, 200);
  if (snippet.includes("<kml")) {
    yield* tj.kmlGen(xmldom.parseFromString(data));
  } else if (snippet.includes("<gpx")) {
    yield* tj.gpxGen(xmldom.parseFromString(data));
  } else {
    throw new Error("Could not detect file format of an input");
  }
}

if (process.stdin.isTTY && !argv._.length) {
  console.error(`Usage:

togeojson FILE
togeojson < FILE
togeojson FILE1 FILE2 FILE3…`);
} else if (argv._.length) {
  process.stdout.write('{\n  "type": "FeatureCollection",\n  "features": [\n');
  let first = true;
  for (let file of argv._) {
    for (let feature of convert(fs.readFileSync(file, "utf8"))) {
      if (!first) {
        process.stdout.write(",\n    ");
      } else {
        process.stdout.write("    ");
        first = false;
      }
      process.stdout.write(JSON.stringify(feature));
    }
  }
  process.stdout.write("\n  ]\n}\n");
} else {
  let data = "";

  process.stdin.setEncoding("utf8");

  process.stdin.on("readable", () => {
    let chunk;
    while ((chunk = stdin.read())) {
      data += chunk;
    }
  });

  process.stdin.on("end", () => {
    console.log(
      JSON.stringify({
        type: "FeatureCollection",
        features: Array.from(convert(data))
      })
    );
  });
}
