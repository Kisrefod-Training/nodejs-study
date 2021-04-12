export default class HttpServer {
    private sockets;
    private readonly server;
    private readonly app;
    constructor();
    createServer(): void;
    startServer(host: string, port: number): Promise<void>;
    stopServer(): Promise<void>;
}
