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
var ts_mockito_1 = __importStar(require("ts-mockito"));
var git_parser_js_1 = __importDefault(require("../../src/git-parser.js"));
var git_test_data_js_1 = require("../test-data/git-test-data.js");
describe('Github-data parsed correctly', function () {
    var checkingParsedData;
    before(function (done) {
        var gitParser = new git_parser_js_1["default"]();
        var spiedParser = ts_mockito_1["default"].spy(gitParser);
        // getAuthorizedOctokit gets github-authToken (string)
        // and return interface for comfort web-requests.
        // For this tests was created substitute-interface TestOctokit with predefined returns.
        ts_mockito_1["default"].when(spiedParser.getAuthorizedOctokit(ts_mockito_1.anyString())).thenReturn(git_test_data_js_1.TestOctokit);
        gitParser.getParsedData().then(function (result) {
            checkingParsedData = result;
            done();
        });
    });
    function getArraysDifference(a, b) {
        // Compare two arrays with the same length and return the difference
        if (a.length !== b.length)
            return false;
        return a.filter(function (item, index) { return item !== b[index]; });
    }
    it('Number of returned data blocks is correct', function () {
        assert_1["default"].deepStrictEqual(0, 0);
        assert_1["default"].deepStrictEqual(checkingParsedData.length, git_test_data_js_1.correctParsedData.length);
    });
    it('Number of returned PR is correct', function () {
        var checkingPRNum = checkingParsedData.filter(function (value) { return value.type === 'PR'; }).length;
        var correctPRNum = git_test_data_js_1.correctParsedData.filter(function (value) { return value.type === 'PR'; }).length;
        assert_1["default"].deepStrictEqual(checkingPRNum, correctPRNum);
    });
    it('Number of returned commits is correct', function () {
        var checkingCommitNum = checkingParsedData.filter(function (value) { return value.type === 'commit'; }).length;
        var correctCommitNum = git_test_data_js_1.correctParsedData.filter(function (value) { return value.type === 'commit'; }).length;
        assert_1["default"].deepStrictEqual(checkingCommitNum, correctCommitNum);
    });
    it('All usernames are correct', function () {
        var checkingUsernames = checkingParsedData.map(function (_a) {
            var user = _a.user;
            return user;
        });
        var correctUsernames = git_test_data_js_1.correctParsedData.map(function (_a) {
            var user = _a.user;
            return user;
        });
        assert_1["default"].deepStrictEqual(getArraysDifference(checkingUsernames, correctUsernames), []);
    });
    it('All types are correct', function () {
        var checkingTypes = checkingParsedData.map(function (_a) {
            var type = _a.type;
            return type;
        });
        var correctTypes = git_test_data_js_1.correctParsedData.map(function (_a) {
            var type = _a.type;
            return type;
        });
        assert_1["default"].deepStrictEqual(getArraysDifference(checkingTypes, correctTypes), []);
    });
    it('All URLs are correct', function () {
        var checkingURLs = checkingParsedData.map(function (_a) {
            var URL = _a.URL;
            return URL;
        });
        var correctURLs = git_test_data_js_1.correctParsedData.map(function (_a) {
            var URL = _a.URL;
            return URL;
        });
        assert_1["default"].deepStrictEqual(getArraysDifference(checkingURLs, correctURLs), []);
    });
    it('All IDs are correct', function () {
        var checkingIDs = checkingParsedData.map(function (_a) {
            var ID = _a.ID;
            return ID;
        });
        var correctIDs = git_test_data_js_1.correctParsedData.map(function (_a) {
            var ID = _a.ID;
            return ID;
        });
        assert_1["default"].deepStrictEqual(getArraysDifference(checkingIDs, correctIDs), []);
    });
});
