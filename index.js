import esMain from 'es-main';
import { host, port } from './src/config.js';
import HttpServer from './src/httpServerClass.js';

const server = new HttpServer();

export default server;

if (esMain(import.meta)) server.startServer(host, port);

