import esMain from 'es-main';
import { host, port } from './src/config.js';// eslint-disable-line import/extensions
import HttpServer from './src/httpServerClass.js';// eslint-disable-line import/extensions

const server = new HttpServer();

export default server;


// @ts-ignore
if (esMain(import.meta)) server.startServer(host, port).then();


