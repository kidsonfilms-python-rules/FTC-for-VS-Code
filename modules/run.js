const fs = require('fs');
const vscode = require('vscode')
const path = require('path')
const cp = require('child_process')

let runCMD = vscode.commands.registerCommand('ftc-for-vs-code.runApp', async function () {
	var terminal = null;
	const runCommand = process.platform == 'darwin' || process.platform == 'linux' ? './gradlew installRelease' : './gradlew.bat installRelease'
	if (!fs.existsSync(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'local.properties'))) {
		const andriodSdkPath = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || await vscode.window.showInputBox({title: 'Android SDK Path', prompt: "Enter the path of your Android SDK path. On Windows, it is sometimes C://Android/", ignoreFocusOut: true})
		const createLocalPropertiesCommand = `cd "${vscode.workspace.workspaceFolders[0].uri.path}" && echo sdk.dir=${andriodSdkPath} > local.properties`
		cp.exec(createLocalPropertiesCommand, (err, stdout, stderr) => {
			console.log('stderr: ' + stderr);
			if (err) {
				console.log('error: ' + err);
			}
		})
	}
	vscode.window.terminals.forEach((t) => {
		if (t.name == 'FTC Build') {
			terminal = t
		}
	})
	if (terminal == null) terminal = vscode.window.createTerminal('FTC Build')
	terminal.show()
	terminal.sendText(runCommand)
});

module.exports = runCMD