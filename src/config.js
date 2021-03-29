import dotenv from 'dotenv';

dotenv.config();

const innerHost = process.env.HOST || 'localhost';// Или возьмется значение из окружения, иои localhost - если так писать не принято - скажи - взял это из случайно статьи по сокращениям в js
const innerPort = process.env.PORT || '1337';

console.log(innerHost);
console.log(innerPort);

export default { host: innerHost, port: innerPort };
export const config = { host: innerHost, port: innerPort };
export const host = innerHost;
export const port = innerPort;
