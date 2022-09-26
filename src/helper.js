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
        // first check if directory already exists
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    } catch (err) {
        console.log(chalk.bgRed("Error:") + chalk.red(err));
    }
}

exports.deleteFolder = (path) => {
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
