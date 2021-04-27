import express from 'express';
import * as http from 'http';
import { once } from 'events';
import { Socket } from 'net';
import debug from 'debug';
import GitParser from './git-parser.js';
import { ParsedData } from './git-parser-types';

export default class HttpServer {
    private sockets: Array<Socket>;
    private server: http.Server;
    private app: express.Express;

    constructor () {
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
        let parsedData:Array<ParsedData>;

        try {
            parsedData = await gitParser.getParsedData();
        }
        catch (e) {
            const serverDebug = debug('httpServer');

            serverDebug('Can\'t get data from github - check owner, repository, or oauth-token');
            parsedData = [{
                user: 'sample',
                type: 'commit',
                URL:  'sample',
                ID:   'sample',
            }];
        }
        return parsedData;
    }
    async startServer (host: string, port:number) {
        const data = await this.getData();

        this.app.use((req, res, next) => {
            res.status(200).render('response.pug', { data });
        });

        this.server.listen(port, host);
        await once(this.server, 'listening');
    }
    async stopServer () {
        this.server.close();
        await once(this.server, 'close');
    }
}
