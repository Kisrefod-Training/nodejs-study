import { ParsedData } from '../../src/git-parser-types';
const parsedDataPromise: Promise<Array<ParsedData>> = Promise.resolve([
    {
        user: 'a',
        type: 'PR',
        URL: 'b',
        ID: ''
    },
    {
        user: 'A',
        type: 'PR',
        URL: '',
        ID: 'b'
    },
    {
        user: 'Aaa',
        type: 'commit',
        URL: '',
        ID: ''
    },
    {
        user: 'b',
        type: 'commit',
        URL: '',
        ID: ''
    },
    {
        user: 'null',
        type: 'commit',
        URL: 'null',
        ID: 'null'
    },
]);
export default parsedDataPromise;
