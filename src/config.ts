import * as dotenv from 'dotenv';

dotenv.config();

const innerHost:string = process.env.HOST || 'localhost';
const strPort:string = process.env.PORT || '1337';
const innerPort:number = parseInt(strPort, 10);

console.log(innerHost);
console.log(innerPort);

export default { host: innerHost, port: innerPort };
export const config = { host: innerHost, port: innerPort };
export const host:string = innerHost;
export const port:number = innerPort;

