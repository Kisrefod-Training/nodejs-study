"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
var config_js_1 = __importStar(require("../../src/config.js"));
describe('Import config parsed correctly', function () {
    it('host should be correct', function () {
        assert_1["default"].deepStrictEqual(config_js_1.host, 'localhost');
    });
    it('port should be correct', function () {
        assert_1["default"].deepStrictEqual(config_js_1.port, 1337);
    });
    it('all config should be correct', function () {
        assert_1["default"].deepStrictEqual(config_js_1.config, { host: 'localhost', port: 1337 });
    });
    it('default config should be correct', function () {
        assert_1["default"].deepStrictEqual(config_js_1["default"], { host: 'localhost', port: 1337 });
    });
});
