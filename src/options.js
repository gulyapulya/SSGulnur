//Npm terminal styling module used for better looking logs
//https://www.npmjs.com/package/chalk
const chalk = require("chalk");

//Lets us get all of the info from package.json file
//https://stackoverflow.com/questions/62345060/getting-name-property-from-package-json-with-nodejs
const {version, description} = require("../package.json");

//Get functions related to the ssg and html creation
const ssg = require("./ssg");

//Get helper functions
const helper = require("./helper")


//Function for the main logic behind the command-line tool  
//parameters: options, received from commander action handler 
//https://www.npmjs.com/package/commander#custom-argument-processing
function ssgulnur(options) {

    if (options.version) {
        console.log(chalk.green.bold("SSGulnur: ") + chalk.green(version));
        return;
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
        console.log(chalk.green("Config:"));
        console.log(chalk.green.dim("-c | --config <file>") + chalk.gray(" specify a config file to use"));
        return;
    } 

    //defaults
    let outputFolder = "./dist";
    let stylesheetURL = "";

    if (options.config){
        const config = helper.parseJSON(options.config);
        if (config.output){
            outputFolder = config.output;
        }
        if (config.stylesheet){
            stylesheetURL = config.stylesheet;
        }
        if (config.input) {
            ssg(config.input, outputFolder, stylesheetURL);
        }
        return;
    }

    if (options.input) {
        let input = options.input;
        if (options.output) {
            outputFolder = options.output;
        } 
        if (options.stylesheet) {
            stylesheetURL = options.stylesheet;
        }
        ssg(input, outputFolder, stylesheetURL);
    } else {
        console.log(chalk.bgRed("Error:") + chalk.red(" unknown command or option, please see ssgulnur -help for available options."));
    }
}

module.exports = ssgulnur;