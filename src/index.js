#!/usr/bin/env node
//shebang line to tell cl to interpret as node.js

//Npm CLI module for node.js
//https://www.npmjs.com/package/commander#commanderjs
const { program } = require('commander');

//Get a function we want our program to execute
const ssgulnur = require('./options');

//Configuring program details such as name, description and different required options
program
  .name('ssgulnur')
  .description('A custom Static Site Generator (SSG)')
  .option('-v, --version', 'current version')
  .option('-h, --help', 'help guide')
  .option('-i, --input <source>', 'specify file or folder to use')
  .option('-o, --output <folder>', 'specify an output folder for produced html')
  .option('-s, --stylesheet <url>', 'specify a stylesheet to use')
  .option('-c, --config <source>', 'specify a config file to use')
  .action(ssgulnur);

program.parse();
