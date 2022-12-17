import fs from 'fs';
import { stat } from 'node:fs';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let index = 0;
let dirName = __dirname;

export const myUp = () => {
  index++;
  dirName = __dirname.split('\\').slice(0, -index).join('/')
  console.log(`You are currently in:`, dirName); 
};

export const myCd = (path) => {
  fs.readdir(dirName, (err, files) => {
    if (err) throw err;
    let index;
    if (path === '..') {
      index = 0;
      myUp();
    } 
    files.forEach(file => {
      if (path === file) {
        index = 1;
        dirName = `${dirName}/${file}`;
        console.log(`You are currently in:`, dirName);
      }  
    })
    if (!index) {
      console.log(`sorry, this file: "${path}" is not in this section`);
    } 
  })
}

export const myLs = () => {
  function TableDir(Name, Type) {
    this.Name = Name;
    this.Type = Type;
  };
  const tableFiler = [];
  fs.readdir(dirName, (err, files) => {
    if (err) throw err;
    files.forEach((file, index) => {
      let fileType;
      fs.stat(`${dirName}/${file}`, (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          fileType = file.split('.').pop();
        }else {
          fileType = 'directory';
        }
        const myFile = new TableDir(file, fileType);
        tableFiler.push(myFile);        
        if (index === (files.length - 1)) {
          console.table(tableFiler);
        }
      });
    })
  }); 
}

export const myCat = (dataPath) => {
  const stream = createReadStream( path.join(dirName, dataPath), "utf-8");
  if (stream) {
    stream.pipe(process.stdout);
  }else {
    console.log('Sorry, this file was not found.');
  }
      
}

export const myAdd = (dataPath) => {
  console.log('Hello from myAdd')
  fs.access(path.join(dirName, dataPath), (err) => {
    if (err) {
      fs.writeFile(
        path.join(dirName, dataPath), '',
        (err) => {
            if (err) throw err;
            console.log('file create');
        }
      )
    } else {    
      console.error('Error: FS operation failed');
    }
    
  })
}