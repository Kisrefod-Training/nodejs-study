export const parsedData = [
    {
        user: 'a',
        type: 'PR',
        URL: 'b',
        ID: '',
    },
    {
        user: 'A',
        type: 'PR',
        URL: '',
        ID: 'b',
    },
    {
        user: 'Aaa',
        type: 'commit',
        URL: '',
        ID: '',
    },
    {
        user: 'AaaA',
        type: 'commit',
        URL: '',
        ID: '',
    },
    {
        user: 'b',
        type: 'commit',
        URL: '',
        ID: '',
    },
    {
        user: 'two words',
        type: 'commit',
        URL: 'null',
        ID: 'null',
    },
];
export const parsedDataPromise = Promise.resolve(parsedData);
