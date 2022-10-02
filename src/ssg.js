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

//NodeJS built-in core path module
const nodePath = require("path");

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
        //only push file if it is a .txt or .md file
        if (nodePath.extname(source) == ".txt" || nodePath.extname(source) == ".md") {
            sourceFiles.push(source);
        }
    }
    
    //manage output folder
    let outputFolderType = helper.checkSource(outputFolder);
    if (outputFolderType == "file") {
        console.log(chalk.bgRed("Error:") + chalk.red("Output folder cannot be named as existing file, should be folder"));
    } else if (outputFolderType == "folder") {
        helper.deleteFolder(outputFolder);
    }
    if (outputFolder != "./dist" && outputFolder != "dist")
        helper.deleteFolder("./dist");
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
    let paragraph = ``;
    let body = ``;
    while ((line = liner.next())) {
        line = line.toString("utf-8");
        if (line == ``) {
            body += `
            <p>${paragraph}</p>
            `;
            paragraph = ``;
        }
        else {
            line = helper.markdownParser(line);
            paragraph += `${line} `;
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

function printVersion(version){
    console.log(chalk.green.bold("SSGulnur: ") + chalk.green(version));
}

function printHelp(description){
    console.log(chalk.green.bold("Help guide"));
    console.log(chalk.gray(description));
    console.log(chalk.green("Usage:"));
    console.log(chalk.green.dim("ssgulnur -v | --version") + chalk.gray(" current version"));
    console.log(chalk.green.dim("ssgulnur -h | --help") + chalk.gray(" help guide"));
    console.log(chalk.green.dim("ssgulnur -i | --input <source>") + chalk.gray(" specify a file or folder to use"));
    console.log(chalk.green("Options for input:"));
    console.log(chalk.green.dim("-o | --output <folder>") + chalk.gray(" specify an output folder for produced html"));
    console.log(chalk.gray("By default, the output folder would be ./dist unless specified otherwise"));
    console.log(chalk.green.dim("-s | --stylesheet <url>") + chalk.gray(" specify a stylesheet url to use"));
    console.log(chalk.gray("For example, https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"));
}

module.exports = {
    input,
    printVersion,
    printHelp
}