import path from 'path';
import { fileURLToPath } from 'url';
import { myUp } from './modules/up.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sortingComands = async () => {
  process.stdin.on('data', chunk => {
    const data = chunk.toString().split('\r');   
      if (data[0]) {
        if (data[0] === 'up') {
          myUp();
          }
      }          
  }); 
  // console.log(`You are currently in`, __dirname);
};
