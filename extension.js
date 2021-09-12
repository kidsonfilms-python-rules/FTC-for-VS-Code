/*
------------------------------------------------------------------------------------------
Copyright (c) 2021 Siddharth Ray

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
------------------------------------------------------------------------------------------
*/


// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const newClassSnippets = require('./resources/snippets-new-class')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const fs = require('fs')
const snippets = [
	"Blank Class",
	"Blank OpMode",
    "BasicOpMode Linear",
    "ConceptDIMAsIndicator",
    "ConceptI2cAddressChange",
    "ConceptNullOp",
    "ConceptRevSPARKMini",
    "ConceptMotorBulkRead",
    "ConceptRampMotorSpeed",
    "BasicOpMode Iterative",
    "ConceptScanServo",
    "ConceptTensorFlowObjectDetection",
    "ConceptTensorFlowObjectDetectionSwitchableCameras",
    "ConceptTensorFlowObjectDetectionWebcam",
    "ConceptSoundsOnBotJava",
    "ConceptTelemetry",
    "ConceptSoundsSKYSTONE",
    "ConceptCompassCalibration",
    "ConceptSoundsASJava",
    "HardwarePushbot",
    "ConceptVuforiaNavigationWebcam",
    "PushbotAutoDriveByTime Linear",
    "PushbotAutoDriveByEncoder Linear",
    "PushbotAutoDriveByGyro Linear",
    "ConceptVuforiaUltimateGoalNavigationWebcam",
    "ConceptWebcam",
    "ConceptVuforiaNavigation",
    "ConceptVuMarkIdentificationWebcam",
    "ConceptVuMarkIdentification",
    "SensorAdafruitRGB",
    "PushbotTeleopTank Iterative",
    "SensorDIO",
    "SensorBNO055IMU",
    "SensorBNO055IMUCalibration",
    "SampleRevBlinkinLedDriver",
    "SensorColor",
    "SensorKLNavxMicro",
    "ConceptVuforiaUltimateGoalNavigation",
    "PushbotAutoDriveToLine Linear",
    "PushbotTeleopPOV Linear",
    "SensorDigitalTouch",
    "SensorMRCompass",
    "SensorMROpticalDistance",
    "SensorMRGyro",
    "SensorMRColor",
    "SensorMRIrSeeker",
    "SensorMRRangeSensor",
    "SensorREV2mDistance"
]
var subCmds = []

let disposable = vscode.commands.registerCommand('ftc-for-vs-code.helloWorld', function () {
	vscode.window.showInformationMessage('Hello World from FTC for VS Code!');
});
let runCMD = vscode.commands.registerCommand('ftc-for-vs-code.runApp', function () {
	var terminal = null;
	vscode.window.terminals.forEach((t) => {
		if (t.name == 'FTC Build') {
			terminal = t
		}
	})
	if (terminal == null) terminal = vscode.window.createTerminal('FTC Build')
	terminal.show()
	terminal.sendText('./gradlew')
});
let createClassCMD = vscode.commands.registerCommand('ftc-for-vs-code.createClass', async function () {
	const classChoice = await vscode.window.showQuickPick(snippets, {
		title: "Choose Class Template",
		placeHolder: "Blank OpMode"
	})
	const className = await vscode.window.showInputBox({
		title: "Choose Class Name",
		prompt: "Type the Class Name"
	})
	var classOpName = 'null'
	var classOpGroup = 'null'
	if (classChoice != "Blank Class") {
		classOpName = await vscode.window.showInputBox({
			title: "Choose an OpMode Name",
			prompt: "Type the name for the OpMode"
		})
		classOpGroup = await vscode.window.showInputBox({
			title: "Choose an OpMode Group",
			prompt: "Type the name for the OpMode Group"
		})
	}
	vscode.window.showInformationMessage(`Making ${className}${classChoice != 'Blank Class' ? ` with the template ${classChoice}` : ''}...`)
	const wsedit = new vscode.WorkspaceEdit();
	const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
	const filePath = vscode.Uri.file(wsPath + `/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/${className}.java`);
	wsedit.createFile(filePath, { ignoreIfExists: true });
	await vscode.workspace.applyEdit(wsedit);
	fs.writeFileSync(wsPath + `/TeamCode/src/main/java/org/firstinspires/ftc/teamcode/${className}.java`, newClassSnippets[classChoice].replace(/REPLACE_CLASS/g, className).replace('REPLACE_OPMODE_NAME', classOpName).replace('REPLACE_OPMODE_GROUP', classOpGroup))
});
subCmds.push(runCMD)
subCmds.push(createClassCMD)
subCmds.push(disposable)

function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ftc-for-vs-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	subCmds.forEach((cmd) => {
		console.log('Registering ' + cmd)
		context.subscriptions.push(cmd);
	})
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
