const vscode = require('vscode')
const fs = require('fs')
const newClassSnippets = require('../resources/snippets-new-class')

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

module.exports = createClassCMD