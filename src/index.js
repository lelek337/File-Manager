import { sortingComands } from './sorting-comands.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argsName = () => {
  const argv = process.argv.slice(2);
  const myArgv = argv[0].split('=').pop();

  const parsed = () => {
      try {
        if(myArgv) {
          return `Welcome to the File Manager, ${myArgv}!`
        }
      } catch (error) {
        throw error
      }   
  };

  console.log(parsed());
  console.log(`You are currently in`, __dirname)
  
  sortingComands();

  process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${myArgv}, goodbye!`);
    process.exit();
  })
}
argsName();
