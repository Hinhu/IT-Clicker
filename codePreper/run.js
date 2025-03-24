const fs = require('node:fs');
const path = require('path');

function findFilesInDir(startPath, filter){

  var results = [];

  if (!fs.existsSync(startPath)){
      console.log("no dir ",startPath);
      return;
  }

  var files=fs.readdirSync(startPath);
  for(var i=0;i<files.length;i++){
      var filename=path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()){
          results = results.concat(findFilesInDir(filename,filter)); //recurse
      }
      else if (filename.indexOf(filter)>=0) {
          results.push(filename);
      }
  }
  return results;
}

const EXTENTIONS = [
  '.java',
  '.js',
  '.css',
  '.html',
  '.py'
];

const codePaths = EXTENTIONS.reduce((acc, ext) => acc.concat(findFilesInDir('./repos', ext)),[]);

const codes = codePaths.map((codePath) => fs.readFileSync(codePath, { encoding: 'utf8', flag: 'r' }));

fs.writeFileSync('../code.json', JSON.stringify(codes));