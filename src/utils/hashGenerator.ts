import { createHash } from 'crypto';

export const hashGenerator = (originalString: string) => {
  return createHash('sha384').update(originalString, 'utf8').digest('hex');
};
