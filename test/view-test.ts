// Tests of user interactions powered by testcafe-framework
import { executor } from 'ts-child-process';
import mockito from 'ts-mockito';
import { host, port } from '../src/config.js';
import parsedDataPromise from './test-data/view-test-data.js';
import HttpServer from '../src/http-server-class.js';

// Инициировать заглушку
// Запустить сервер
// После запуска сервера запустить testcafe
// Распарсить ответ testcafe
// Ассерт на "все норм"

const server = new HttpServer();
const spiedServer = mockito.spy(server);
mockito.when(spiedServer.getData()).thenReturn(parsedDataPromise);

server.testConstructor();
server.startServer(host, port).then(() => {
    const process = executor().then(exec => exec.execute(['npx', 'testcafe', 'chrome', './test/testcafe/filter-interaction-test.ts'], {shell: true}));
    process.then(res => {
        res.on('out', txt => console.log(txt));
    });
});

/*describe('Table filter works correctly', () => {
    before(done => {
        const gitParser = new GitParser();
        const spiedParser = mockito.spy(gitParser);
        mockito.when(spiedParser.getParsedData()).thenReturn(parsedDataPromise);

        server.startServer(host, port).then(() => done);
    });

    it('asdasd', () => {
        const process = executor().then(exec => exec.execute(['npx', 'testcafe', 'chrome', './test/testcafe/filter-interaction-test.ts'], {shell: true}));
        process.then(res => {
            res.on('out', txt => console.log(txt));
        });
    })
});*/


