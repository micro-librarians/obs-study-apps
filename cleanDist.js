/**
 * This script cleans up hard coded paths in exported html
 *
 * to debug: node --inspect-brk cleanDist.js
 */
const path = require('path-extra');
const fs = require('fs-extra');

/**
 * if filePath exists, tries to read in the file, replaces sourceText with targetText, and if content has changed writes it back to filePath
 * @param {string} filePath
 * @param {string} sourceText
 * @param {string} targetText
 */
function replaceInFile(filePath, sourceText, targetText) {
  console.log(`replaceInFile(${filePath}) - replace ${sourceText} with ${targetText}`);
  if (filePath && fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath).toString();
      let newData = data.replaceAll(sourceText, targetText);
      if ( data !== newData) {
        fs.outputFileSync(filePath, newData);
        console.log(`replaceInFile(${filePath}) - data updated`)
      } else {
        console.log(`replaceInFile(${filePath}) - data unchanged`)
      }
    } catch (e) {
      console.error(`replaceInFile(${filePath}) - file edit failed`, e)
    }
  } else {
    console.error(`replaceInFile(${filePath}) - could not find file`)
  }
}

/**
 * searches files in folderPath looking for a file that has both prefix and extension
 * @param {string} folderPath
 * @param {string} prefix
 * @param {string} extension
 */
function findFile(folderPath, prefix, extension) {
  try {
    const files = fs.readdirSync(folderPath);
    if (files && files.length) {
      for (const file of files) {
        const parts = path.parse(file);
        if (parts.ext === extension) {
          const filePrefix = file.substring(0, prefix.length);
          if (prefix === filePrefix) {
            const foundFile = path.join(folderPath, file);
            console.log(`replaceInFile(${folderPath}) - found file: ${foundFile}`)
            return foundFile;
          }
        }
        console.log(`replaceInFile(${folderPath}) - skipping file: ${file}`)
      }
    }
  } catch (e) {
    console.error(`replaceInFile(${folderPath}) - error finding file`, e)
  }
  return null;
}

/**
 * iterate through process arguments and separate out flags and other parameters
 * @return {{flags: [], otherParameters: []}}
 */
function separateParams() {
  const flags = [];
  const otherParameters = [];

  for (let i = 2, l = process.argv.length; i < l; i++) {
    const param = process.argv[i];

    if (param.substr(0, 1) === '-') { // see if flag
      flags.push(param);
    } else {
      otherParameters.push(param);
    }
  }
  return { flags, otherParameters };
}

/**
 * see if flag is in flags
 * @param {Array} flags
 * @param {String} flag - flag to match
 * @return {Boolean}
 */
function findFlag(flags, flag) {
  const found = flags.find((item) => (item === flag));
  return !!found;
}

// run as main
if (require.main === module) {
  const { flags, otherParameters } = separateParams();
  const baseFolder = path.join(__dirname, 'dist/apps/obs-study/exported');

  replaceInFile(path.join(baseFolder, 'index.html'), '="/', '="./');
  replaceInFile(path.join(baseFolder, '404.html'), '="/', '="./');
  const appFileName = findFile(path.join(baseFolder, '_next/static/chunks/pages'), '_app-', '.js');
  replaceInFile(appFileName, 'src:"/favicon-', 'src:"./favicon-');
  // const nameFileName = findFile(path.join(baseFolder, '_next/static/chunks'), 'main-', '.js');
  // replaceInFile(nameFileName, 'window.location.origin+"/sw.js"', 'window.location.origin+"./sw.js"');

  const code = 0;
  console.log(`Returning code ${code}`);
  process.exitCode = code; // set exit code, 0 = no error
}
