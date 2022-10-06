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
    let config;

    if (options.config){
        // Print error message if config file does not exist
        if (!fs.existsSync(options.config)) 
            return console.log(chalk.bgRed("Error:") + chalk.red(" Config file does not exist."));
        // Print error message if config file is not a .json file
        if (path.extname(options.config) != ".json")
            return console.log(chalk.bgRed("Error:") + chalk.red(" Config file must be a .json file."));
        // Read config file
        config = JSON.parse(fs.readFileSync(options.config));
        // Print error message if config file is empty
        if (Object.keys(config).length == 0)
            return console.log(chalk.bgRed("Error:") + chalk.red(" Config file is empty"));

        if (config.output){
            outputFolder = config.output;
        }
        if (config.stylesheet){
            stylesheetURL = config.stylesheet;
        }
        if (config.input) 
            return ssg.input(config.input, outputFolder, stylesheetURL);
    }

    if (options.version) {
        console.log(chalk.green.bold("SSGulnur: ") + chalk.green(version));
    }
    if (options.help) {
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

    if (options.input) {
        let input = options.input;
        if (options.output) {
            outputFolder = options.output;
        } 
        if (options.stylesheet) {
            stylesheetURL = options.stylesheet;
        }
        ssg.input(input, outputFolder, stylesheetURL);
    } else {
        console.log(chalk.bgRed("Error:") + chalk.red(" unknown command or option, please see ssgulnur -help for available options."));
    }
}

module.exports = ssgulnur;