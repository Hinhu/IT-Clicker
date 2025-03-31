import fs from 'node:fs';
import path from 'path';
import { highlightText } from '@speed-highlight/core';
import { parse } from 'node-html-parser';

function findFilesInDir(startPath, filter) {
  var results = [];

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFilesInDir(filename, filter)); //recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      results.push(filename);
    }
  }
  return results;
}

const EXTENTIONS = [
  '.js',
];

const codePaths = EXTENTIONS.reduce((acc, ext) => acc.concat(findFilesInDir('./repos', ext)), []);
let prepedCodes = [];

for (let codePath of codePaths) {
  const code = fs.readFileSync(codePath, { encoding: 'utf8', flag: 'r' });
  const html = await highlightText(code, 'js', true, { hideLineNumbers: true });

  const parsedHtml = parse(html);

  const codeMap = parsedHtml.childNodes[0].childNodes[1].childNodes.map((node) => ({
    className: ((className) => className || 'shj-syn-oper')(node.getAttribute && node.getAttribute('class')),
    text: node.text
  }))

  prepedCodes = [...prepedCodes, codeMap];
}


fs.writeFileSync('./code.json', JSON.stringify(prepedCodes));

