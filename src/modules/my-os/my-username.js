import os from 'os';

export const myUserName = () => {
  const userName = os.homedir().split('\\').slice(-1).toString();
  console.log(userName);
}