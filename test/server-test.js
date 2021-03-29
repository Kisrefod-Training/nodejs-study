import got from 'got';
import assert from 'assert';
import server from '../index.js';// eslint-disable-line import/extensions
import { host, port } from '../src/config.js';// eslint-disable-line import/extensions

describe('Server work correctly', () => {
    beforeEach(done => {
        server.startServer(host, port);
        done();
    });

    it('server response status code = 200', () => {
        async function getServeResponse () {
            const response = await got(`http://${host}:${port}/`);

            return response.statusCode;
        }

        getServeResponse().then(serverAnswer => {
            assert.deepStrictEqual(serverAnswer, 200);
            server.stopServer();
        });
    });
});
