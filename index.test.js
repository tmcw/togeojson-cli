const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

describe("@tmcw/togeojson-cli", () => {
  it("converts a file", async () => {
    const { stdout } = await exec("./index.js data/twopoints.kml");
    expect(stdout).toMatchSnapshot();
  });
  it("converts multiple files", async () => {
    const { stdout } = await exec(
      "./index.js data/twopoints.kml data/blue_hills.gpx"
    );
    expect(stdout).toMatchSnapshot();
  });
  it("supports stdin", async () => {
    const { stdout } = await exec("./index.js < data/twopoints.kml");
    expect(stdout).toMatchSnapshot();
  });
});
