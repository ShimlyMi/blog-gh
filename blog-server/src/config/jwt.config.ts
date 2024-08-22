import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRECT,
  };
});
