import path from 'path';
import { fileURLToPath } from 'url';
import { up } from './modules/up.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sortingComands = async () => {

  process.stdin.on('data', chunk => {
    const data = chunk.toString();

      if (data) {
        if (data === 'up') {
          console.log('hello');
          up();
        }
        const up = 'up';
        console.log(data, data === up, typeof data)
        console.log(`You are currently in`, __dirname);
      }
  }); 
};
