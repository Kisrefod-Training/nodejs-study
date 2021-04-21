import dotenv from 'dotenv';

dotenv.config();

const innerHost = process.env.HOST || 'localhost';
const innerPort = process.env.PORT || '1337';

export default { host: innerHost, port: innerPort };
export const config = { host: innerHost, port: innerPort };
export const host = innerHost;
export const port = innerPort;