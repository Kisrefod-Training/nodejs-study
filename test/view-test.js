import { executor } from 'ts-child-process';
import mockito from 'ts-mockito';
import assert from 'assert';
import { once } from 'events';
import { host, port } from '../src/config.js';
import { parsedDataPromise } from './test-data/view-test-data.js';
import HttpServer from '../src/http-server-class.js';
describe('Table filter works correctly', () => {
    let testcafeOutput = '';
    let testResult = 0;
    const server = new HttpServer();
    before(async function () {
        this.timeout(20000);
        const spiedServer = mockito.spy(server);
        mockito.when(spiedServer.getData()).thenReturn(parsedDataPromise);
        server.testConstructor();
        await server.startServer(host, port);
        const process = await executor().then(exec => exec.execute(['npx', 'testcafe', 'chrome', './test/testcafe/filter-interaction.ts'], { shell: true }));
        process.on('out', response => {
            testcafeOutput += `${response}\n`;
        });
        process.on('close', responseCode => {
            testResult = responseCode;
        });
        await once(process, 'close');
        const filterIndex = testcafeOutput.indexOf(' Filter works correctly');
        testcafeOutput = testcafeOutput.slice(filterIndex + ' Filter works correctly'.length);
    });
    after(done => {
        server.stopServer();
        done();
    });
    it('Filter works correctly', () => {
        console.log(testcafeOutput); // print testcafe output to see, what goes wrong
        assert.deepStrictEqual(testResult, 0);
    });
});
