"use strict";
exports.__esModule = true;
exports.parsedDataPromise = exports.parsedData = void 0;
exports.parsedData = [
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
        user: 'AaaA',
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
        user: 'two words',
        type: 'commit',
        URL: 'null',
        ID: 'null'
    },
];
exports.parsedDataPromise = Promise.resolve(exports.parsedData);
