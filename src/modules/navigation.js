import fs from 'fs';
import { stat } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let index = 0;
let dirname = __dirname;
export const myUp = () => {
  index++;
  dirname = __dirname.split('\\').slice(0, -index).join('/')
  console.log(`You are currently in:`, dirname); 
};

export const myCd = (path) => {
  fs.readdir(dirname, (err, files) => {
    if (err) throw err;
    let index;
    if (path === '..') {
      index = 0;
      myUp();
    } 
    files.forEach(file => {
      if (path === file) {
        index = 1;
        dirname = `${dirname}/${file}`;
        console.log(`You are currently in:`, dirname);
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
  fs.readdir(dirname, (err, files) => {
    if (err) throw err;
    files.forEach((file, index) => {
      let fileType;
      fs.stat(`${dirname}/${file}`, (err, stats) => {
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