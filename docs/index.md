# FTC for VS Code Documentation
## Our Goal
When coding a robot for FTC, Android Studio is usually one of the only options you have if you want an easy coding experience. Andriod Studio however can be clunky and hard to navigate if you are used to another IDE. No longer is that the case, FTC for VS Code is going to try to make the FTC coding experience easier and faster by using VS Code!

> ### **DISCLAIMER**
>
> This extension has no official affiliation with FTC (First Tech Challenge) or FIRST®. This is a community extension originally made by FTC Team Juice 16236. All snippets and class templates originate from the [Official FTC Examples](https://github.com/FIRST-Tech-Challenge/FtcRobotController/tree/master/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples). It is recommended by FIRST® that you use Android Studio.

## How to use this Docs
Each page has their own Table of Contents, and navigate to different pages by going to the top and clicking on different pages.

## Pages
- Home/Getting Started (You are on this page)
- [Commands](./commands)

## Getting Started
1. Make sure you have all the prerequisites fulfilled
   - The official JDK
   - Android Studio Command-line Tools/Android SDK
   - Acceptance of the Android Studio Command-line Tools License
   - Git (For the Project Creation Command) 
2. Install the Extension - Install the Extension using the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Juice16236.ftc-for-vs-code&ssr=false#overview)
3. Open your project and the plugin is ready to use!

## Table of Contents
- [Installing the JDK](#installing-the-jdk)
- [Setting up Android Studio Command-line Tools](#setting-up-android-studio-command-line-tools)
- [Common Error: Acceptance of the Android Studio Command-line Tools License](#common-error-acceptance-of-the-android-studio-command-line-tools)
- [Common Error: Find Android SDK Location](#common-error-find-android-sdk-location)

## Installing the JDK 8
The Java SE Development Kit 8 is available from
[Oracle](http://www.oracle.com/technetwork/java/javase/downloads/). Select the version that corresponds to the operating system of your computer.
Once the JDK is downloaded, launch the installer application. I've always just accepted the default install options.

## Setting up Android Studio Command-line Tools
### Prerequistes:
- Android Studio

### Steps
1. Open Android Studio. Do **NOT** choose a folder or project to open.
2. Click on `Configure` in the bottom-right and then click `SDK Manager` in the menu
3. Switch over to the `SDK Tools` tab and make sure the `Android SDK Command-line Tools (latest)` is checked
4. If you made any changes, click the `Apply` button in the bottom-right corner and let it install.
5. When the install is complete, hit the `OK` button to close the install window and hit the `OK` button again to close the Configure window.

## Common Error: Acceptance of the Android Studio Command-line Tools
This error occurs when you have not accepted the licenses needed for Android SDK to run.

the following solution has been taken from [Hugo (StackOverflow User)](https://stackoverflow.com/users/803900/hugo) and is from this [StackOverflow Answer](https://stackoverflow.com/a/43003932/13946018)

The way to accept license agreements from the command line has changed. You can use the SDK manager which is located at: `$ANDROID_SDK_ROOT/tools/bin`

e.g on linux:
```sh
cd ~/Library/Android/sdk/tools/bin/
```
Run the sdkmanager as follows:
```sh
./sdkmanager --licenses
```
e.g on Windows:
```bash
cd /d "%ANDROID_SDK_ROOT%/tools/bin"
```
Run the sdkmanager as follows:
```bash
sdkmanager --licenses
```
And accept the licenses you did not accept yet (but need to).

For more details see the [Android Studio documentation](https://developer.android.com/studio/command-line/sdkmanager.html), although the current documentation is missing any description on the `--licenses` option.

## Common Error: Find Android SDK Location
When you are using the `Build and Run` function for the first time in a project, it may ask you to input the root folder of your Android SDK. When you do this, it will create a file called `local.properties` so you won't have to input this information again. Deleting this file will cause you to input the information again

### Where to find the Root Folder Location
Prerequistes:
- Android Studio

Steps:
1. Open Android Studio. Do **NOT** choose a folder or project to open.
2. Click on `Configure` in the bottom-right and then click `SDK Manager` in the menu
3. Copy the `Android SDK Location` to your clipboard
4. Paste it into the input box inside of VS Code

### Automaticly Get The Location in the Future
1. Open a terminal or Command Prompt (Windows Only)
2. Set an Enviroment Variable by using `ANDROID_SDK_ROOT=your-sdk-root-path` for Linux/MacOS or `set ANDROID_SDK_ROOT=your-sdk-root-path` for Windows