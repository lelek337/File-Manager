import { myUp, myCd, myLs, myCat, myAdd } from './modules/navigation.js';

export const sortingComands = async () => {
  process.stdin.on('data', chunk => {
    const data = chunk.toString().split('\r');   
      if (data[0]) {
        if (data[0] === 'up') {
          myUp();
          }else if (data[0].slice(0, 2) === 'cd') {
            const dataPath = data[0].slice(3);
            myCd(dataPath);
          }else if (data[0].slice(0, 3) === 'cat') {
            const dataPath = data[0].slice(4);
            myCat(dataPath);
          }else if (data[0].slice(0, 3) === 'add') {
            const dataPath = data[0].slice(4);
            myAdd(dataPath);
          }else if (data[0] == 'ls') {
            myLs();
          }
      }else {
        console.log('sorry this comand is missing');
      }         
  }); 
};
