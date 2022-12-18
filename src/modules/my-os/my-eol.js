import os from 'os';

export const myEol = () => {
  console.log(JSON.stringify(os.EOL));
}