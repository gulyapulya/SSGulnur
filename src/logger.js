//Npm terminal styling module used for better looking logs
//https://www.npmjs.com/package/chalk
const chalk = require('chalk');

exports.logErr = (errMessage) => {
  console.log(chalk.bgRed('Error:') + ' ' + chalk.red(errMessage) + '.');
};
