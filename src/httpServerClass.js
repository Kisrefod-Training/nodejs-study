import express from 'express';
import http from 'http';

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
        const promise = new Promise((res) => {
            this.server.on('listening', () => {
                res();
            });
            this.server.listen(port, host);
        });

        await promise;
    }

    async stopServer () {
        const promise = new Promise(res => {
            this.server.close();
            this.sockets.forEach(socket => socket.destroy());
            res();
        });

        await promise;
    }
}
