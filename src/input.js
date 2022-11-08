//NodeJS built-in core path module
const nodePath = require('path');

//Get helper functions
const { checkSource, readFilesFrom, deleteFolder, createFolder, createHTML } = require('./helper');

//Get log functions
const { logErr } = require('./logger');

function input(source, outputFolder, stylesheetURL) {
  //manage source
  let sourceFiles = [];
  //check the source type (folder, file, does not exist)
  let sourceType = checkSource(source);
  if (sourceType == 'none') {
    logErr('source folder or file does not exist');
    return;
  } else if (sourceType == 'folder') {
    sourceFiles = sourceFiles.concat(readFilesFrom(source));
    //then it is file
  } else {
    //only push file if it is a .txt or .md file
    if (nodePath.extname(source) == '.txt' || nodePath.extname(source) == '.md') {
      sourceFiles.push(source);
    }
  }

  //manage output folder
  let outputFolderType = checkSource(outputFolder);
  if (outputFolderType == 'file') {
    logErr('output folder cannot be named as existing file, should be folder');
  } else if (outputFolderType == 'folder') {
    deleteFolder(outputFolder);
  }
  if (outputFolder != './dist' && outputFolder != 'dist') deleteFolder('./dist');
  createFolder(outputFolder);

  sourceFiles.forEach((currentFile) => {
    createHTML(currentFile, outputFolder, stylesheetURL);
  });
}

module.exports = input;
