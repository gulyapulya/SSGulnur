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