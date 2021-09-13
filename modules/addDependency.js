const vscode = require('vscode')
const fs = require('fs')

vscode.commands.registerCommand('ftc-for-vs-code.addDependency', async () => {
    const dependency = await vscode.window.showInputBox({ title: "Add Dependency", prompt: "Enter the URL (\"com.domain.name:version\") of the dependency you want to add. IF YOUR DEPENDENCY HAS ANY ADDITIONAL STEPS DO THIS MANUALLY" })
    if (dependency) {
        vscode.window.showInformationMessage(`Adding ${dependency}...`)
        const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
        const oldGradle = fs.readFileSync(wsPath + `/TeamCode/build.gradle`, 'utf8')
        const newFileEdits = oldGradle.split('dependencies {')[0] + 'dependencies {\n    ' + `implementation '${dependency}'` + oldGradle.split('dependencies {')[1]
        fs.writeFileSync(wsPath + `/TeamCode/build.gradle`, newFileEdits)
    }
})