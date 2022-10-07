//Npm terminal styling module used for better looking logs
//https://www.npmjs.com/package/chalk
const chalk = require("chalk");

//NodeJS built-in core filesystem module
//https://nodejs.org/api/fs.html
const fs = require("fs");

exports.checkSource = (path) => {
    try {
        var statsResult = fs.lstatSync(path);
        if (statsResult.isDirectory()) {
            return "folder";
        }
        else {
            return "file";
        }
    } catch (err) {
        return "none";
    }
}

exports.createFolder = (path) => {
    try {
        // if folder already exists
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    } catch (err) {
        console.log(chalk.bgRed("Error:") + chalk.red(err));
    }
}

exports.deleteFolder = (path) => {
    // if folder is already nonexistent 
    if (this.checkSource(path) == "none")
        return;
    fs.rmSync(path, { recursive: true}, (err) => {
        if (err) {
            console.log(chalk.bgRed("Error:") + chalk.red(err));
        }
    });
}

exports.readFilesFrom = (path) => {
    let files = [];
    let inside = fs.readdirSync(path);
    inside.forEach((current) => {
        let currentPath = path + "/" + current;
        let currentType = this.checkSource(currentPath);
        if (currentType == "folder"){
            files.concat(this.readFilesFrom(currentPath));
        }
        //should be file as cannot be nonexistent - we found it
        else {
            files.push(currentPath);
        }
    });
    return files;
}

exports.pasteIntoTemplate = (title, body, stylesheet) => {
    let html = `
    <!doctype html>
    <html lang="en">
        <head>
            <link rel="stylesheet" href="${stylesheet}">
            <meta charset="utf-8">`;
    if (title != '') {
        html += `
            <title>${title}</title>`;
    }
    html += `<meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body`
    if (stylesheet == '') {
        html += ` style="background-color:#F2EECB;"`;
    }
    html += `>`;
    if (title != '') {
        html += `
            <h1>${title}</h1>`;
    }
    html += ` 
            ${body}
        </body>
    </html>
    `;
    return html;
}

exports.markdownParser = (line) => {
     //convert markdown heading 1 # to html <h1> element
     line = line.replace(/(^#{1}\s)(.*)/, '<h1>$2</h1>');
     //convert markdown heading 2 ## to html <h2> element
     line = line.replace(/(^#{2}\s)(.*)/, '<h2>$2</h2>');
    //convert markdown link to href 
    line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    //convert markdown bold ** to html <b> element
    line = line.replace(/\*\*(.*)\*\*/g, '<b>$1</b>');
    //convert markdown bold __ to html <b> element
    line = line.replace(/__(.*)__/g, '<b>$1</b>');
    //convert markdown italics * to html <i> element
    line = line.replace(/\*(.*)\*/g, '<i>$1</i>');
    //convert markdown italics _ to html <i> element
    line = line.replace(/_(.*)_/g, '<i>$1</i>');
    return line;
}


exports.parseJSON = (path) => {
    if (this.checkSource(path) == "none") 
        return console.log(chalk.bgRed("Error:") + chalk.red(" config file does not exist."));
    try {
        const jsonString = fs.readFileSync(path);
        const json = JSON.parse(jsonString);
        return json;
    } catch (err) {
        console.log(chalk.bgRed("Error:") + chalk.red(" config file should be a valid json."));
        return null;
    }
}
