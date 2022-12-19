import { sortingComands } from './sorting-comands.js';

const argsName = () => {
  const argv = process.argv.slice(2);
  let myArgv;
if (typeof argv === 'string') {
    myArgv = argv[0].split('=').pop();
  }else {
    myArgv = 'unknown';
  }

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
  
  sortingComands();

  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${myArgv}, goodbye!`);
  })
  process.on('SIGINT', () => {
    process.exit();
  })
}
argsName();
