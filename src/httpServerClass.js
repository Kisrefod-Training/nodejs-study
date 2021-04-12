import express from 'express';
import * as http from 'http';
import { once } from 'events';
import GitParser from './gitParser.js';
export default class HttpServer {
    constructor() {
        this.sockets = [];
        this.app = express();
        this.server = new http.Server(this.app);
        this.createServer();
    }
    createServer() {
        this.app.set("view engine", "pug");
        this.server.on('connection', socket => {
            this.sockets.push(socket);
            socket.on('close', () => {
                const socketIndex = this.sockets.indexOf(socket);
                this.sockets.splice(socketIndex, 1);
            });
        });
    }
    async startServer(host, port) {
        const gitParser = new GitParser();
        const parsedData = await gitParser.getParsedData();
        this.app.get('/', (req, res) => {
            res.status(200).render('response.pug', { parsedData });
        });
        this.server.listen(port, host);
        await once(this.server, 'listening');
    }
    async stopServer() {
        this.server.close();
        await once(this.server, 'close');
    }
}
