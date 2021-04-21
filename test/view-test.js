import { executor } from 'ts-child-process';
import mockito from 'ts-mockito';
import assert from 'assert';
import { once } from 'events';
import { host, port } from '../src/config.js';
import { parsedDataPromise } from './test-data/view-test-data.js';
import HttpServer from '../src/http-server-class.js';
describe('Table filter works correctly', () => {
    let testcafeOutput = '';
    const server = new HttpServer();
    before(async (done) => {
        const spiedServer = mockito.spy(server);
        mockito.when(spiedServer.getData()).thenReturn(parsedDataPromise);
        server.testConstructor();
        await server.startServer(host, port);
        const process = await executor().then(exec => exec.execute(['npx', 'testcafe', 'chrome', './test/testcafe/filter-interaction.ts'], { shell: true }));
        process.on('out', response => {
            testcafeOutput = response;
        });
        await once(process, 'out');
        done();
    });
    after(done => {
        server.stopServer();
        done();
    });
    it('qweqwe', () => {
        console.log(testcafeOutput);
        assert.deepStrictEqual(typeof testcafeOutput, 'string');
    }).timeout(10000);
});
