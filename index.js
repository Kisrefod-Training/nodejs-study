"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var config_js_1 = require("./src/config.js");
var http_server_class_js_1 = __importDefault(require("./src/http-server-class.js"));
var server = new http_server_class_js_1["default"]();
exports["default"] = server;
if (require.main === module)
    server.startServer(config_js_1.host, config_js_1.port);
