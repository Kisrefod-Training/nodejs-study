/// <reference types="node" />
import * as http from 'http';
export default class HttpServer {
    private sockets;
    private server;
    constructor();
    createServer(): http.Server;
    startServer(host: string, port: number): Promise<void>;
    stopServer(): Promise<void>;
}
