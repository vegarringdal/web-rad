/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { readFile, spawner, logInfo, logError } = require("./utils");

const buildDocker = async () => {
    let filePath = path.resolve(process.cwd(), `./package.json`);
    const packageJson = await readFile(filePath);
    const json = JSON.parse(packageJson);
    const name = json.dockerImage;
    logInfo(`About to run: ${name}:${json.version}`, "green");

    const err = await spawner(
        "docker.exe",
        ["run", "--env-file", ".env", "-p", "1080:1080", "-d", `${name}:${json.version}`],
        process.cwd(),
        true
    );

    if (err) {
        logError(`\nNode app failed: ${err}\n`, "green");
    } else {
        logInfo(`Run done : ${name}:${json.version}`, "green");
    }
};
buildDocker();
