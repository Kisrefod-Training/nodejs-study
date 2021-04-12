import dotenv from 'dotenv';

dotenv.config();
const innerHost = process.env.HOST || 'localhost';
const strPort = process.env.PORT || '1337';
const innerPort = parseInt(strPort, 10);

export default { host: innerHost, port: innerPort };
export const config = { host: innerHost, port: innerPort };
export const host = innerHost;
export const port = innerPort;
export const owner = process.env.OWNER || 'kisrefod';
export const repository = process.env.REPOSITORY || 'Kisrefod-Training/nodejs-study';
export const token = process.env.TOKEN || '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';
