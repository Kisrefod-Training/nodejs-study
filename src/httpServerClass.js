import express from 'express';
import * as http from 'http';
import { once } from 'events';
import GitParser from './gitParser.js';
import debug from 'debug';
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
        let parsedData;
        try {
            parsedData = await gitParser.getParsedData();
        }
        catch (e) {
            const serverDebug = debug('httpServer');
            serverDebug('Can\'t get data from github - check owner, repository, or oauth-token');
            parsedData = [{
                    user: 'sample',
                    type: 'commit',
                    URL: 'sample',
                    ID: 'sample'
                }];
        }
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
