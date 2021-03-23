import assert from 'assert'

import {host} from './../src/config.js'
assert.deepStrictEqual(host, 'localhost')
import {port} from './../src/config.js'
assert.deepStrictEqual(port, '1337')
import {config} from './../src/config.js'
assert.deepStrictEqual(config, {host: 'localhost', port: '1337'})
import defaultConfig from './../src/config.js'
assert.deepStrictEqual(defaultConfig, {host: 'localhost', port: '1337'})

