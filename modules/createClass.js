const vscode = require('vscode')
const fs = require('fs')
const newClassSnippets = require('../resources/snippets-new-class')

const snippets = [
    "BasicOpMode Iterative",
    "ConceptCompassCalibration",
    "ConceptGamepadRumble",
    "ConceptDIMAsIndicator",
    "BasicOpMode Linear",
    "ConceptGamepadTouchpad",
    "ConceptI2cAddressChange",
    "ConceptRampMotorSpeed",
    "ConceptMotorBulkRead",
    "ConceptRevSPARKMini",
    "ConceptNullOp",
    "ConceptSoundsOnBotJava",
    "ConceptTensorFlowObjectDetection",
    "ConceptVuMarkIdentification",
    "ConceptVuMarkIdentificationWebcam",
    "ConceptScanServo",
    "ConceptTensorFlowObjectDetectionSwitchableCameras",
    "ConceptSoundsASJava",
    "ConceptSoundsSKYSTONE",
    "ConceptTelemetry",
    "ConceptVuforiaFieldNavigation",
    "ConceptTensorFlowObjectDetectionWebcam",
    "ConceptVuforiaFieldNavigationWebcam",
    "ConceptVuforiaDriveToTargetWebcam",
    "HardwarePushbot",
    "PushbotAutoDriveByTime Linear",
    "PushbotAutoDriveToLine Linear",
    "ConceptWebcam",
    "SampleRevBlinkinLedDriver",
    "PushbotAutoDriveByEncoder Linear",
    "PushbotTeleopPOV Linear",
    "PushbotAutoDriveByGyro Linear",
    "PushbotTeleopTank Iterative",
    "SensorDIO",
    "SensorAdafruitRGB",
    "SensorColor",
    "SensorMRColor",
    "SensorBNO055IMU",
    "SensorKLNavxMicro",
    "SensorMRGyro",
    "SensorMRIrSeeker",
    "SensorMRCompass",
    "SensorMRRangeSensor",
    "SensorBNO055IMUCalibration",
    "SensorMROpticalDistance",
    "SensorDigitalTouch",
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