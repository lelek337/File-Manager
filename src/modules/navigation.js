import fs, { ReadStream } from 'fs';
// import { stat } from 'node:fs';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { finished, pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { isModuleNamespaceObject } from 'util/types';

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
    const stream = await createReadStream( path.join(dirName, dataPath), "utf-8");
    if (!stream) throw new Error('invalid path_to_file');
    await stream.pipe(process.stdout);
    // await pipeline(stream, process.stdout);
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
  fs.unlink(
    path.join(dirName, dataPath),
    (err) => {
      if (err) throw console.error('Error: FS operation failed');
      console.log('file delete');
    }
  )
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
  const dataReadPath = dataPath.split(' ')[0];
  const dirPath = dataPath.split(' ')[1];
  
  fs.access(path.join(dirName, dirPath), (err) => {
    if (err) {
      fs.mkdir(path.join(dirName, dirPath), (error) => {
        if (error) throw error;
      })
      console.log('Create directory');
    }
    const writeStream = createWriteStream(path.join(dirName, dirPath, dataReadPath), "utf-8");
    const readStream = createReadStream(path.join(dirName, dataReadPath), "utf-8");
    readStream.pipe(writeStream);
  })
}

// const myStat = async (dataPath) => {
//   return fs.stat(path.join(dirName, dataPath), (error, stats) => {
//     // if (error) throw error;
//     // console.log(stats.blksize);
//     return stats.blksize 
//   });
// }

export const myMv = async (dataPath) => {
  try {
    const deletePath = dataPath.split(' ')[0];
    const newPath = dataPath.split(' ')[1];
    await myCp(dataPath);
    await myRm(deletePath); 
  } catch (error) {
    console.error('file not found')
  } 
}