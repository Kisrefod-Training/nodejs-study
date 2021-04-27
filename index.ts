import { host, port } from './src/config.js';
import HttpServer from './src/http-server-class.js';
import sinon from 'sinon';

const server = new HttpServer();

export default server;

if (require.main === module) server.startServer(host, port);
