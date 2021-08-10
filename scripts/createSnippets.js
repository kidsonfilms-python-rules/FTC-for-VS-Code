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


var http = require('https');
var os = require('os');
const fs = require('fs')
const listGithubDir = require('list-github-dir-content');
require('dotenv').config()

// const snippetURLLinks = [
//     "https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/master/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples/BasicOpMode_Iterative.java",
//     'https://raw.githubusercontent.com/FIRST-Tech-Challenge/FtcRobotController/master/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples/ConceptI2cAddressChange.java',
//     "https://raw.githubusercontent.com/FIRST-Tech-Challenge/FtcRobotController/master/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples/ConceptMotorBulkRead.java",
//     "https://raw.githubusercontent.com/FIRST-Tech-Challenge/FtcRobotController/master/FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples/ConceptNullOp.java"
// ]

async function getExampleFiles() {
    var snippetURLLinks = await listGithubDir.viaTreesApi({
        user: 'FIRST-Tech-Challenge',
        repository: 'FtcRobotController',
        directory: 'FtcRobotController/src/main/java/org/firstinspires/ftc/robotcontroller/external/samples',
        token: process.env.GITHUB_PUBLIC_REPO_TOKEN
    });
    snippetURLLinks = snippetURLLinks.map((ourl) => 'https://github.com/FIRST-Tech-Challenge/FtcRobotController/blob/master/' + ourl)
    snippetURLLinks = snippetURLLinks.filter((ourl) => ourl.includes('.java'));
    return snippetURLLinks
}

async function main() {
    const snippetURLLinks = await getExampleFiles();

    snippetURLLinks.forEach((s) => {
        console.log(`Reading Data from: ${s}`)
        var options = {
            host: 'raw.githubusercontent.com',
            path: s.replace('https://raw.githubusercontent.com', '').replace('blob/', '')
        }
        var request = http.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                console.log('Stripping Code...');
                var re = new RegExp(/((?:[\n\r]|.)*)(public class*)((?:[\n\r]|.)*)/);
                var arrMatches = data.match(re);
    
                var code = arrMatches[2] + arrMatches[3]
                console.log('Formatting Code...')
    
                code = code.replace(/\"/g, '\\"')
                code = code.replace(/\\\"/, '\"')
                const codeLines = code.split(os.EOL);
                console.log('Stripping Description...')
    
                re = new RegExp(/((?:[\n\r]|.)*)(\/\*\*\n\**)((?:[\n\r]|.)*)/)
                var re2 = new RegExp(/((?:[\n\r]|.)*)(\/\*\*\n*)((?:[\n\r]|.)*)/)
                arrMatches = data.match(re) != null ? data.match(re) : data.match(re2)
                const description = arrMatches != null ? arrMatches[3].split('*/')[0].replace(/ \* /g, '').replace(/ \*/g, '').replace('Use Android Studios to Copy this Class, and Paste it into your team\'s code folder with a new name.\nRemove or comment out the @Disabled line to add this opmode to the Driver Station OpMode list', '') : 'No Description Given'
                const prefix = s.split('/')[s.split('/').length - 1].replace(/\_/g, ' ').split('.')[0].charAt(0).toLowerCase() + s.split('/')[s.split('/').length - 1].replace(/\_/g, '').split('.')[0].slice(1)
                console.log('Adding to Cache...')
    
                if (fs.existsSync('../cache/snippets-generated.json')) {
                    const rawData = JSON.parse(fs.readFileSync('../cache/snippets-generated.json', { encoding: 'utf8' }))
                    rawData[s.split('/')[s.split('/').length - 1].replace(/\_/g, ' ').split('.')[0]] = { prefix: prefix, description: description, body: codeLines }
                    const newData = JSON.stringify(rawData).replace(/\\\\\\\"/, '\\"')
                    fs.writeFileSync('../cache/snippets-generated.json', newData)
                } else {
                    fs.writeFileSync('../cache/snippets-generated.json', '{}', 'utf8')
                    const rawData = {}
                    rawData[s.split('/')[s.split('/').length - 1].replace(/\_/g, ' ').split('.')[0]] = { prefix: prefix, description: description, body: codeLines }
                    const newData = JSON.stringify(rawData)
                    fs.writeFileSync('../cache/snippets-generated.json', newData)
                }
    
            });
        });
        request.on('error', function (e) {
            console.log(e.message);
        });
        request.end();
    })
}

main()