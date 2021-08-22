const { exec } = require("child_process");
const fs = require('fs')

exec("yarn install", (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`${stdout}`);
});

if (!fs.existsSync('./.env')) {
    fs.writeFileSync('./.env', 'GITHUB_PUBLIC_REPO_TOKEN=')
}