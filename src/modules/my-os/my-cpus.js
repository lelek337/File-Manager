import os from 'os';

export const myCpus = () => {
  console.table(os.cpus());
}