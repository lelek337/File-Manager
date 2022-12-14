import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let index = 0;
export let myUp = () => {
  index++;
  console.log(__dirname.split('\\').slice(0, -index).join('/'), index); 
};
