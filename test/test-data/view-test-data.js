const parsedDataPromise = Promise.resolve([
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
