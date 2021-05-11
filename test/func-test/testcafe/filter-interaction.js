"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var testcafe_1 = require("testcafe");
var view_test_data_1 = require("../../test-data/view-test-data");
var config_1 = require("../../../src/config");
var http_server_class_1 = __importDefault(require("../../../src/http-server-class"));
var proxyquire_1 = __importDefault(require("proxyquire"));
var sinon_1 = __importDefault(require("sinon"));
var server = new http_server_class_1["default"]();
fixture(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Filter works correctly"], ["Filter works correctly"]))).page(templateObject_2 || (templateObject_2 = __makeTemplateObject(["127.0.0.1:1337"], ["127.0.0.1:1337"]))).before(function () { return __awaiter(void 0, void 0, void 0, function () {
    var testData, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                testData = sinon_1["default"].stub();
                testData.withArgs().returns(view_test_data_1.parsedData);
                res = proxyquire_1["default"]('../../../src/http-server-class', { 'getData': testData });
                console.log(res);
                // const spiedServer = mockito.spy(server);
                //
                // mockito.when(spiedServer.getData()).thenReturn(parsedDataPromise);
                //
                // server.testConstructor();
                return [4 /*yield*/, server.startServer(config_1.host, config_1.port)];
            case 1:
                // const spiedServer = mockito.spy(server);
                //
                // mockito.when(spiedServer.getData()).thenReturn(parsedDataPromise);
                //
                // server.testConstructor();
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('All data printed out', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expected = view_test_data_1.parsedData.length;
                return [4 /*yield*/, t
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count).eql(expected)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('PRs printed out correctly', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expected = view_test_data_1.parsedData.filter(function (item) { return item.type === 'PR'; }).length;
                return [4 /*yield*/, t
                        .typeText('#filterInput', 'PR')
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count).eql(expected)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('Commits printed out correctly', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expected = view_test_data_1.parsedData.filter(function (item) { return item.type === 'commit'; }).length;
                return [4 /*yield*/, t
                        .typeText('#filterInput', 'commit')
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count).eql(expected)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('Filter is case-insensitive - \'a\' and \'A\' returns the same', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expected = view_test_data_1.parsedData.filter(function (item) { return item.user.toLowerCase().indexOf('a') !== -1
                    || item.type.toLowerCase().indexOf('a') !== -1
                    || item.URL.toLowerCase().indexOf('a') !== -1
                    || item.ID.toLowerCase().indexOf('a') !== -1; }).length;
                return [4 /*yield*/, t
                        .typeText('#filterInput', 'a')
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count).eql(expected)
                        .typeText('#filterInput', 'A', { replace: true })
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count)
                        .eql(expected)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('Filter is field-insensitive - \'b\' viewed in all fields', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expected = view_test_data_1.parsedData.filter(function (item) { return item.user.toLowerCase().indexOf('b') !== -1
                    || item.type.toLowerCase().indexOf('b') !== -1
                    || item.URL.toLowerCase().indexOf('b') !== -1
                    || item.ID.toLowerCase().indexOf('b') !== -1; }).length;
                return [4 /*yield*/, t
                        .typeText('#filterInput', 'b')
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count).eql(expected)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('Filter works correctly with requests of different lengths', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expected = view_test_data_1.parsedData.filter(function (item) { return item.user.toLowerCase().indexOf('aaa') !== -1
                    || item.type.toLowerCase().indexOf('aaa') !== -1
                    || item.URL.toLowerCase().indexOf('aaa') !== -1
                    || item.ID.toLowerCase().indexOf('aaa') !== -1; }).length;
                return [4 /*yield*/, t
                        .typeText('#filterInput', 'aAa')
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count).eql(expected)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('Filter works correctly with multi-word requests', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expected = view_test_data_1.parsedData.filter(function (item) { return item.user.toLowerCase().indexOf('two words') !== -1
                    || item.type.toLowerCase().indexOf('two words') !== -1
                    || item.URL.toLowerCase().indexOf('two words') !== -1
                    || item.ID.toLowerCase().indexOf('two words') !== -1; }).length;
                return [4 /*yield*/, t
                        .typeText('#filterInput', 'two words')
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count).eql(expected)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('Filter works correctly with null result requests', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var expected;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expected = view_test_data_1.parsedData.filter(function (item) { return item.user.toLowerCase().indexOf('null') !== -1
                    || item.type.toLowerCase().indexOf('null') !== -1
                    || item.URL.toLowerCase().indexOf('null') !== -1
                    || item.ID.toLowerCase().indexOf('null') !== -1; }).length;
                return [4 /*yield*/, t
                        .typeText('#filterInput', 'null')
                        .expect(testcafe_1.Selector('tbody tr').filterVisible().count).eql(expected)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2;
