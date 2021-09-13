const vscode = require('vscode')

let runCMD = vscode.commands.registerCommand('ftc-for-vs-code.runApp', function () {
	var terminal = null;
	vscode.window.terminals.forEach((t) => {
		if (t.name == 'FTC Build') {
			terminal = t
		}
	})
	if (terminal == null) terminal = vscode.window.createTerminal('FTC Build')
	terminal.show()
	terminal.sendText('./gradlew installRelease')
});

module.exports = runCMD