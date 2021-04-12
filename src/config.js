import dotenv from 'dotenv';

dotenv.config();

const innerHost = process.env.HOST || 'localhost';
const innerPort = process.env.PORT || '1337';

console.log(innerHost);
console.log(innerPort);

export default { host: innerHost, port: innerPort };
export const config = { host: innerHost, port: innerPort };
export const host = innerHost;
export const port = innerPort;
