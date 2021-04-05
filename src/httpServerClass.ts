import express from 'express';
import * as http from 'http';
import { once } from 'events';
import {Socket} from "net";

export default class HttpServer {
    private sockets: Array<Socket>;
    private server: http.Server;
    constructor () {
        this.sockets = [];
        this.server = this.createServer();
    }

    createServer () {

        const app = express();

        this.server = new http.Server(app);

        app.get('/', (req, res) => {
            res
                .status(200)
                .sendFile('./serverResponse/html/main.html', { root: './' });
        });

        this.server.on('connection', socket => {
            this.sockets.push(socket);

            socket.on('close', () => {
                const socketIndex = this.sockets.indexOf(socket);

                this.sockets.splice(socketIndex, 1);
            });
        });
        return this.server;
    }

    async startServer (host: string, port:number) {
        this.server.listen(port, host);
        await once(this.server, 'listening');
    }

    async stopServer () {
        this.server.close();
        await once(this.server, 'close');
    }
}
