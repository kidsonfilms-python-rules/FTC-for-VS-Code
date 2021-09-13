const vscode = require('vscode')
const path = require('path')

let initCMD = vscode.commands.registerCommand('ftc-for-vs-code.intializeProject', async function () {
    const projectName = await vscode.window.showInputBox({ title: "Choose Project Name", prompt: "Type a name for your project", placeHolder: "FtcRobotController" })
    const projectLocation = await vscode.window.showSaveDialog({ title: "Choose New Project Location", saveLabel: "Create Project" })
    const gitCloneCMD = `cd ${projectLocation.path.replace('/Untitled', '')} && git clone https://github.com/FIRST-Tech-Challenge/FtcRobotController.git .`
    const gitCleanupCMD = process.platform == 'darwin' ? `cd ${projectLocation.path.replace('/Untitled', '')} && chmod +x gradlew` : 'echo Done!'
    const cp = require('child_process')
    vscode.window.showInformationMessage('Creating FTC Project...')
    cp.exec(gitCloneCMD, (err, stdout, stderr) => {
        console.log('stderr: ' + stderr);
        if (err) {
            console.log('error: ' + err);
        } else {
            cp.exec(gitCleanupCMD, (err, stdout, stderr) => {
                console.log('stderr: ' + stderr);
                if (err) {
                    console.log('error: ' + err);
                }
            })
        }
    });
});

module.exports = initCMD