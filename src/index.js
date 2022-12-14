import { sortingComands } from './sorting-comands.js';

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
  
  sortingComands();

  process.on('SIGINT', () => {
    // console.log(`Thank you for using File Manager, ${myArgv}, goodbye!`);
    process.exit();
  })
  process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${myArgv}, goodbye!`);
  })
}
argsName();
