import fs from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFile } from '../helper/my-consts.js';
import zlib from 'zlib';

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

export const myCat = async (dataPath) => {
  try {
    const stream = createReadStream( path.join(dirName, dataPath), "utf-8");
    if (!stream) throw new Error('invalid path_to_file');
    stream.pipe(process.stdout);
  } catch (error) {
    console.error('Sorry, this file was not found.');
  }   
}

export const myAdd = (dataPath) => {
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

export const myRm = async (dataPath) => {
  try {
    fs.unlink(
      path.join(dirName, dataPath),
      (err) => {
        if (err) throw err;
        console.log('file delete');
      }
    )
  } catch (error) {
    console.error(notFile);
  }
  
}

export const myRn = (dataPath) => {
  const dataOldPath = path.join(dirName, dataPath.split(' ')[0]);
  const dataRenamePath = path.join(dirName, dataPath.split(' ')[1]);
  fs.rename(dataOldPath, dataRenamePath, err => {
    if(err) throw err;
    console.log('File renamed successfully');
  });
}

export const myCp = async (dataPath) => {
  try {
    const dataReadPath = dataPath.split(' ')[0];
    const dirPath = dataPath.split(' ')[1];
    const readStream = createReadStream(path.join(dirName, dataReadPath), "utf-8");
    const writeStream = createWriteStream(path.join(dirName, dirPath, dataReadPath), "utf-8"); 
    readStream.pipe(writeStream);
    console.log('File moved');
  } catch (error) {
    console.error(notFile)
  }
  
}

export const myMv = async (dataPath) => {
  try {
    const deletePath = dataPath.split(' ')[0];
    await myCp(dataPath);
    await myRm(deletePath); 
  } catch (error) {
    console.error(notFile)
  } 
}

export const myCompress = async (dataPath) => {
  try {
    const readPath = path.join(dirName, dataPath.split(' ')[0]);
    const compressPath = path.join(dirName, dataPath.split(' ')[1]);
    const readableStream = fs.createReadStream(readPath, 'utf-8');
    const writebleStream = fs.createWriteStream();
    readableStream.pipe(zlib.createGzip()).pipe(writebleStream);
    console.log('Compression process completed')
  } catch (error) {
    console.error(notFile);
  }
}
export const myDeCompress = async (dataPath) => {
  try {
    const readPath = path.join(dirName, dataPath.split(' ')[0]);
    const deCompressPath = path.join(dirName, dataPath.split(' ')[1]);
    const readableStream = fs.createReadStream(readPath);
    const writebleStream = fs.createWriteStream(deCompressPath, 'utf-8');
    readableStream.pipe(zlib.createUnzip()).pipe(writebleStream);
    console.log('Decompression process completed')
  } catch (error) {
    console.error(notFile);
  }
}
