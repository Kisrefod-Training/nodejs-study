import assert from 'assert';
import defaultConfig, { host, port, config } from '../src/config.js';// eslint-disable-line import/extensions

describe('Import config', () => {
    it('host should be correct', () => {
        assert.deepStrictEqual(host, 'localhost');
    });
    it('port should be correct', () => {
        assert.deepStrictEqual(port, 1337);
    });
    it('all config should be correct', () => {
        assert.deepStrictEqual(config, { host: 'localhost', port: 1337 });
    });
    it('default config should be correct', () => {
        assert.deepStrictEqual(defaultConfig, { host: 'localhost', port: 1337 });
    });
});
