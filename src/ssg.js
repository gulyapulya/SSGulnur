//Npm terminal styling module used for better looking logs
//https://www.npmjs.com/package/chalk
const chalk = require("chalk");

//Get helper functions
const helper = require("./helper")

//NodeJS built-in core filesystem module
//https://nodejs.org/api/fs.html
const fs = require("fs");

//Npm module for file reading
//https://www.npmjs.com/package/n-readlines
const nReadlines = require('n-readlines');

function input(source, outputFolder, stylesheetURL) {
    //manage source
    let sourceFiles = [];
    //check the source type (folder, file, does not exist)
    let sourceType = helper.checkSource(source);
    if (sourceType == "none") {
        console.log(chalk.bgRed("Error:") + chalk.red(" source folder or file does not exist."));
        return;
    }
    else if (sourceType == "folder") {
        sourceFiles = sourceFiles.concat(helper.readFilesFrom(source));
    //then it is file
    } else {
        sourceFiles.push(source);
    }
    
    //manage output folder
    let outputFolderType = helper.checkSource(outputFolder);
    if (outputFolderType == "file") {
        console.log(chalk.bgRed("Error:") + chalk.red("Output folder cannot be named as existing file, should be folder"));
    } else if (outputFolderType == "folder") {
        helper.deleteFolder(outputFolder);
    }
    helper.createFolder(outputFolder);
    
    sourceFiles.forEach((currentFile) => {createHTML(currentFile, outputFolder, stylesheetURL);});
}


function createHTML(filePath, outputFolder, stylesheetURL) {
    //get file name solely with no extension
    let file = filePath.split('\\').pop().split('/').pop().split(".")[0] + ".html";

    const liner = new nReadlines(filePath);
    let title = '';
    let firstline = liner.next().toString("ascii");

    //check for title
    if (liner.next().toString("ascii") == "" && liner.next().toString("ascii") == "") {
        title = firstline;
    }
    else {
        liner.reset();
    }

    //create body
    let line;
    let paragraph = '';
    let body = '';
    while ((line = liner.next())) {
        line = line.toString("ascii");
        if (line == '') {
            body += `
            <p>${paragraph}</p>
            `;
            paragraph = '';
        }
        else {
            paragraph += (line + ' ');
        }
    }

    let html = helper.pasteIntoTemplate(title, body, stylesheetURL);

    fs.writeFile(outputFolder + "/" + file, html, function (err) {
        if (err) {
            console.log(chalk.bgRed("Error:") + chalk.red(err));
        }
        console.log(chalk.green(file) + chalk.gray(' was created for ') + chalk.gray(filePath));
    });
}

module.exports = input;