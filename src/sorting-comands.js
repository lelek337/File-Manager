import path from 'path';
import { fileURLToPath } from 'url';
import { myUp, myCd, myLs } from './modules/navigation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sortingComands = async () => {
  process.stdin.on('data', chunk => {
    const data = chunk.toString().split('\r');   
      if (data[0]) {
        if (data[0] === 'up') {
          myUp();
          }else if (data[0].slice(0, 2) === 'cd') {
            const dataPath = data[0].slice(3);
            myCd(dataPath);
          }else if (data[0] == 'ls') {
            myLs();
          }
      }else {
        console.log('sorry this comand is missing');
      }         
  }); 
};
