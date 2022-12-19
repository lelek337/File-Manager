// import { myUp, myCd, myLs, myCat, myAdd, myRm } from './modules/navigation.js';
import * as comand from './modules/navigation.js';
import { myEol } from './modules/my-os/my-eol.js';
import { myCpus } from './modules/my-os/my-cpus.js';
import { myHomeDir } from './modules/my-os/my-homedir.js';
import { myUserName } from './modules/my-os/my-username.js';
import { myArchitecture } from './modules/my-os/my-architecture.js';
import { myHash } from './modules/my-hash.js';

export const sortingComands = async () => {
  process.stdin.on('data', chunk => {
    const data = chunk.toString().split('\r');   

    if (data[0] === 'up') {
      comand.myUp();
      }else if (data[0] === '.exit') {
        process.exit();
      }else if (data[0].slice(0, 2) === 'cd') {
        const dataPath = data[0].slice(3);
        comand.myCd(dataPath);
      }else if (data[0].slice(0, 2) === 'rm') {
        const dataPath = data[0].slice(3);
        comand.myRm(dataPath);
      }else if (data[0].slice(0, 2) === 'cp') {
        const dataPath = data[0].slice(3);
        comand.myCp(dataPath);
      }else if (data[0].slice(0, 2) === 'rn') {
        const dataPath = data[0].slice(3);
        comand.myRn(dataPath);
      }else if (data[0].slice(0, 2) === 'mv') {
        const dataPath = data[0].slice(3);
        comand.myMv(dataPath);
      }else if (data[0].slice(0, 3) === 'cat') {
        const dataPath = data[0].slice(4);
        comand.myCat(dataPath);
      }else if (data[0].slice(0, 4) === 'hash') {
        const dataPath = data[0].slice(5);
        myHash(dataPath);
      }else if (data[0].slice(0, 8) === 'compress') {
        const dataPath = data[0].slice(9);
        comand.myCompress(dataPath);
      }else if (data[0].slice(0, 10) === 'decompress') {
        const dataPath = data[0].slice(11);
        comand.myDeCompress(dataPath);
      }else if (data[0].slice(0, 3) === 'add') {
        const dataPath = data[0].slice(4);
        comand.myAdd(dataPath);
      }else if (data[0] == 'ls') {
        comand.myLs();
      }else if (data[0] === 'os --EOL'){
        myEol();
      }else if (data[0] === 'os --cpus'){
        myCpus();
      }else if (data[0] === 'os --homedir'){
        myHomeDir();
      }else if (data[0] === 'os --username'){
        myUserName();
      }else if (data[0] === 'os --architecture'){
        myArchitecture();
      }else {
        console.log('sorry this comand is missing');
      }         
  });
};
