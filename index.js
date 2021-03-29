import esMain from 'es-main';
import { host, port } from './src/config.js';// eslint-disable-line import/extensions
import HttpServer from './src/httpServerClass.js';// eslint-disable-line import/extensions

const server = new HttpServer();

export default server;

if (esMain(import.meta)) {
    // Для линтера добавлен парсер babel-eslint, чтобы он не ругался на import.meta
    server.startServer(host, port).then();
}
