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
    let outputArray;
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
        await once(process, 'close');
        const filterIndex = testcafeOutput.indexOf(' Filter works correctly');
        outputArray = testcafeOutput.slice(filterIndex).split('\n');
    });
    after(done => {
        server.stopServer();
        done();
    });
    it('All data printed out', () => {
        assert.deepStrictEqual(outputArray[1], ' √ All data printed out');
    });
    it('PRs printed out correctly', () => {
        assert.deepStrictEqual(outputArray[2], ' √ PRs printed out correctly');
    });
    it('Commits printed out correctly', () => {
        assert.deepStrictEqual(outputArray[3], ' √ Commits printed out correctly');
    });
    it('Filter is case-insensitive - \'a\' and \'A\' returns the same', () => {
        assert.deepStrictEqual(outputArray[4], ' √ Filter is case-insensitive - \'a\' and \'A\' returns the same');
    });
    it('Filter is field-insensitive - \'b\' viewed in all fields', () => {
        assert.deepStrictEqual(outputArray[5], ' √ Filter is field-insensitive - \'b\' viewed in all fields');
    });
    it('Filter works correctly with requests of different lengths', () => {
        assert.deepStrictEqual(outputArray[6], ' √ Filter works correctly with requests of different lengths');
    });
    it('Filter works correctly with multi-word requests', () => {
        assert.deepStrictEqual(outputArray[7], ' √ Filter works correctly with multi-word requests');
    });
    it('Filter works correctly with null result requests', () => {
        assert.deepStrictEqual(outputArray[8], ' √ Filter works correctly with null result requests');
    });
    it('Filter works correctly with null result requests', () => {
        assert.deepStrictEqual(outputArray[8], ' √ Filter works correctly with null result requests');
    });
});
