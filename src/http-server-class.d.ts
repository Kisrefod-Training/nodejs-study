import { ParsedData } from './git-parser-types';
export default class HttpServer {
    private sockets;
    private server;
    private app;
    constructor();
    testConstructor(): void;
    getData(): Promise<ParsedData[]>;
    startServer(host: string, port: number): Promise<void>;
    stopServer(): Promise<void>;
}
