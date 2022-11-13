//NodeJS built-in core filesystem module
//https://nodejs.org/api/fs.html
const fs = require('fs');

//Npm terminal styling module used for better looking logs
//https://www.npmjs.com/package/chalk
const chalk = require('chalk');

//Npm module for file reading
//https://www.npmjs.com/package/n-readlines
const nReadlines = require('n-readlines');

//Npm module for markdown to html converter
//https://github.com/showdownjs/showdown
const showdown = require('showdown');

//Get log functions
const { logErr } = require('./logger');

exports.checkSource = (path) => {
  try {
    var statsResult = fs.lstatSync(path);
    if (statsResult.isDirectory()) {
      return 'folder';
    } else {
      return 'file';
    }
  } catch (err) {
    return 'none';
  }
};

exports.createFolder = (path) => {
  try {
    // if folder does not already exist
    if (this.checkSource(path) == 'none') {
      fs.mkdirSync(path);
    }
  } catch (err) {
    logErr(err);
  }
};

exports.deleteFolder = (path) => {
  // if folder is already nonexistent
  if (this.checkSource(path) == 'none') return;
  fs.rmSync(path, { recursive: true }, (err) => {
    if (err) {
      logErr(err);
    }
  });
};

exports.readFilesFrom = (path) => {
  let files = [];
  let inside = fs.readdirSync(path);
  inside.forEach((current) => {
    let currentPath = path + '/' + current;
    let currentType = this.checkSource(currentPath);
    if (currentType == 'folder') {
      files.concat(this.readFilesFrom(currentPath));
    }
    //should be file as cannot be nonexistent - we found it
    else {
      files.push(currentPath);
    }
  });
  return files;
};

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
        <body`;
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
};

exports.markdownParser = (lines) => {
  const converter = new showdown.Converter();
  lines = converter.makeHtml(lines);
  return lines;
};

exports.createHTML = (path, style = '') => {
  const liner = new nReadlines(path);
  let title = '';
  let firstline = liner.next().toString('ascii');

  //check for title
  if (liner.next().toString('ascii') == '' && liner.next().toString('ascii') == '') {
    title = firstline;
  } else {
    liner.reset();
  }

  //create body
  let line;
  let paragraph = ``;
  let body = ``;
  while ((line = liner.next())) {
    line = line.toString('utf-8');
    if (line == ``) {
      body += `${this.markdownParser(paragraph)}`;
      paragraph = ``;
    } else {
      paragraph += `${line} `;
    }
  }
  body += `${this.markdownParser(paragraph)}`;

  return this.pasteIntoTemplate(title, body, style);
};

exports.process = (filePath, outputFolder, stylesheetURL) => {
  //get file name solely with no extension
  let file = filePath.split('\\').pop().split('/').pop().split('.')[0] + '.html';

  let html = this.createHTML(filePath, stylesheetURL);

  fs.writeFile(outputFolder + '/' + file, html, function (err) {
    if (err) {
      logErr(err);
    }
    console.log(chalk.green(file) + chalk.gray(' was created for ') + chalk.gray(filePath));
  });
};

exports.parseJSON = (path) => {
  if (this.checkSource(path) == 'none') logErr('config file does not exist');
  try {
    const jsonString = fs.readFileSync(path);
    const json = JSON.parse(jsonString);
    return json;
  } catch (err) {
    logErr('config file should be a valid json');
    return null;
  }
};
