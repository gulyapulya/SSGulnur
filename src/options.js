//Npm terminal styling module used for better looking logs
//https://www.npmjs.com/package/chalk
const chalk = require("chalk");

//Lets us get all of the info from package.json file
//https://stackoverflow.com/questions/62345060/getting-name-property-from-package-json-with-nodejs
const {version, description} = require("../package.json");

//Get functions related to the ssg and html creation
const ssg = require("./ssg");

//NodeJS built-in core filesystem module
//https://nodejs.org/api/fs.html
const fs = require("fs");

//NodeJS built-in core path module
//https://nodejs.org/api/path.html
const path = require("path");

//Function for the main logic behind the command-line tool  
//parameters: options, received from commander action handler 
//https://www.npmjs.com/package/commander#custom-argument-processing
function ssgulnur(options) {
    //defaults
    let outputFolder = "./dist";
    let stylesheetURL = "";
    let config = {};

    if (options.config){
        if (!fs.existsSync(options.config)){
            console.log(chalk.bgRed("Error:") + chalk.red(" Config file does not exist."));
            return;
        }
        if (path.extname(options.config) != ".json"){
            console.log(chalk.bgRed("Error:") + chalk.red(" Config file must be a .json file."));
            return;
        }
        if (Object.keys(config).length == 0){
            console.log(chalk.bgRed("Error:") + chalk.red(" Config file is empty"));
            return;
        }
        config = require(options.config);
    }

    if (options.version) {
        return ssg.printVersion(version);
    }
    if (options.help) {
        return ssg.printHelp(description);
    } 

    if (options.input || config.input) {
        let input = options.input || config.input;
        if (options.output || config.output) {
            outputFolder = options.output || config.output;
        } 
        if (options.stylesheet || config.stylesheet) {
            stylesheetURL = options.stylesheet || config.stylesheet;
        }
        ssg.input(input, outputFolder, stylesheetURL);
    } else {
        console.log(chalk.bgRed("Error:") + chalk.red(" unknown command or option, please see ssgulnur -help for available options."));
    }
}

module.exports = ssgulnur;