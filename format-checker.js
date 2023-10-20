const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');

const MAX_LINE_LENGTH = 100; // Define the maximum line length

function getFormattedTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

function logInfo(message) {
  const timestamp = getFormattedTimestamp();
  const logLine = `[INFO]---${timestamp}---${message}`;
  console.log(logLine.padEnd(MAX_LINE_LENGTH, '-'));
}

function logError(message) {
  const timestamp = getFormattedTimestamp();
  const logLine = `[ERROR]---${timestamp}---${message}`;
  console.error(logLine.padEnd(MAX_LINE_LENGTH, '-'));
}

function logIndentedInfo(message, indentationLevel = 0) {
  const timestamp = getFormattedTimestamp();
  const indentation = ' '.repeat(indentationLevel * 2);
  const logLine = `[INFO]---${timestamp}---${indentation}${message}`;
  console.log(logLine.padEnd(MAX_LINE_LENGTH, '-'));
}

function logIndentedError(message, indentationLevel = 0) {
  const timestamp = getFormattedTimestamp();
  const indentation = ' '.repeat(indentationLevel * 2);
  const logLine = `[ERROR]---${timestamp}---${indentation}${message}`;
  console.error(logLine.padEnd(MAX_LINE_LENGTH, '-'));
}

function getAllFiles(directoryPath, fileList, indentationLevel = 0) {
  const files = fs.readdirSync(directoryPath);

  fileList = fileList || [];

  logIndentedInfo(`Checking files in directory: ${directoryPath}`, indentationLevel);

  files.forEach(file => {
    const fullPath = path.join(directoryPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fileList = getAllFiles(fullPath, fileList, indentationLevel + 1);
    } else {
      logIndentedInfo(`Checking file: ${fullPath}`, indentationLevel);
      fileList.push(fullPath);
    }
  });

  return fileList;
}

async function checkCodeStyle() {
  const startTime = performance.now();
  logInfo('Scanning for projects');

  const eslint = new ESLint();
  let totalErrors = 0; // Declare totalErrors outside the loop

  // Specify the directories you want to check
  const directoriesToCheck = ['middlewares', 'helpers', 'controllers', 'models', 'routes', 'tests'];

  logInfo(`Checking ${directoriesToCheck.length} directories`);

  for (const directory of directoriesToCheck) {
    getAllFiles(directory);
  }

  logIndentedInfo('Checking files in directory: tests', 1); // Indent the "tests" directory

  const filesToCheck = getAllFiles('tests', [], 1);

  const results = await eslint.lintFiles(filesToCheck);

  // Process ESLint results
  const errorReports = results.reduce((acc, result) => {
    if (result.errorCount > 0) {
      acc.push({
        filePath: result.filePath,
        messages: result.messages,
      });
    }
    return acc;
  }, []);

  // Add the errors in the "tests" directory to the total
  totalErrors += errorReports.reduce((acc, report) => acc + report.messages.length, 0);

  // Generate a report based on the total errors
  if (totalErrors === 0) {
    logInfo('You have 0 format errors');
  } else {
    logError(`You have ${totalErrors} format error(s)`);
  }

  logInfo('BUILD SUCCESS');

  const endTime = performance.now();
  const elapsedTime = ((endTime - startTime) / 1000).toFixed(3);

  return { totalErrors, elapsedTime };
}

checkCodeStyle()
  .then(({ totalErrors, elapsedTime }) => {
    const finishedAt = getFormattedTimestamp();
    logInfo(`Total time: ${elapsedTime} s`);
    logInfo(`Finished at: ${finishedAt}`);

    if (typeof totalErrors === 'undefined' || totalErrors === 0) {
      process.exit(0); // Exit with success (0) status
    } else {
      logError(`Format check failed---You have ${totalErrors} format error(s)`);
      process.exit(1); // Exit with failure (1) status
    }
  });
