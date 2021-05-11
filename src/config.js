"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.token = exports.repository = exports.owner = exports.port = exports.host = exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var innerHost = process.env.HOST || 'localhost';
var strPort = process.env.PORT || '1337';
var innerPort = parseInt(strPort, 10);
exports["default"] = { host: innerHost, port: innerPort };
exports.config = { host: innerHost, port: innerPort };
exports.host = innerHost;
exports.port = innerPort;
exports.owner = process.env.OWNER || 'kisrefod';
exports.repository = process.env.REPOSITORY || 'Kisrefod-Training/nodejs-study';
exports.token = process.env.TOKEN || 'null';
