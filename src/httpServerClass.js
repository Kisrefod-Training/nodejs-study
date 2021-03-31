import express from 'express';
import http from 'http';
import { once, EventEmitter } from 'events';

export default class HttpServer {
    constructor () {
        this.sockets = [];
        this.server = this.createServer();
    }

    createServer () {
        const app = express();

        this.server = http.Server(app);

        app.get('/', (req, res) => {
            res
                .status(200)
                .sendFile('./html/main.html', { root: './' });
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

    async startServer (host, port) {
        this.server.listen(port, host);
        await once(this.server, 'listening');
    }

    async stopServer () {
        this.server.close();
        await once(this.server, 'close');
    }
}
