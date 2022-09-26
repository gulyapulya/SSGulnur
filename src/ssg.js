//Npm terminal styling module used for better looking logs
//https://www.npmjs.com/package/chalk
const chalk = require("chalk");

//Get helper functions
const helper = require("./helper")

//NodeJS built-in core filesystem module
//https://nodejs.org/api/fs.html
const fs = require("fs");

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


function createHTML(file, outputFolder, stylesheetURL) {
    let filename = file.split('\\').pop().split('/').pop().split(".")[0] + ".html";
    fs.writeFile(outputFolder + "/" + filename, "created", function (err) {
        if (err) {
            console.log(chalk.bgRed("Error:") + chalk.red(err));
        }
        console.log(chalk.bgGreen(filename) + chalk.green(' is created successfully.'));
    });
}

module.exports = input;