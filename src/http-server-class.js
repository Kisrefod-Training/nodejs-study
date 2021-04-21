import express from 'express';
import * as http from 'http';
import { once } from 'events';
import debug from 'debug';
import GitParser from './git-parser.js';
export default class HttpServer {
    constructor() {
        this.sockets = [];
        this.app = express();
        this.server = new http.Server(this.app);
        this.app.set('view engine', 'pug');
        this.app.use(express.static('views'));
        this.server.on('connection', socket => {
            this.sockets.push(socket);
            socket.on('close', () => {
                const socketIndex = this.sockets.indexOf(socket);
                this.sockets.splice(socketIndex, 1);
            });
        });
    }
    testConstructor() {
        this.sockets = [];
        this.app = express();
        this.server = new http.Server(this.app);
        this.app.set('view engine', 'pug');
        this.app.use(express.static('views'));
        this.server.on('connection', socket => {
            this.sockets.push(socket);
            socket.on('close', () => {
                const socketIndex = this.sockets.indexOf(socket);
                this.sockets.splice(socketIndex, 1);
            });
        });
    }
    async getData() {
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
                    ID: 'sample',
                }];
        }
        return parsedData;
    }
    async startServer(host, port) {
        const data = await this.getData();
        this.app.get('/', (req, res) => {
            res.status(200).render('response.pug', { data });
        });
        this.server.listen(port, host);
        await once(this.server, 'listening');
    }
    async stopServer() {
        this.server.close();
        await once(this.server, 'close');
    }
}
