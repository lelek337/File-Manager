import crypto from 'crypto';

export const myHash = async (dataPath) => {
    try {
      const hash = crypto
      .createHash('sha256')
      .update(dataPath)
      .digest('hex');
      console.log('Hash as hex:', hash); 
    }catch (error) {
      console.error(notFile)
    }
  }