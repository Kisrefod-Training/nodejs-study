"use strict";
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
exports.__esModule = true;
var rest_1 = require("@octokit/rest");
var config_js_1 = require("./config.js");
var GitParser = /** @class */ (function () {
    function GitParser() {
        var _a;
        this.owner = config_js_1.owner;
        this.repository = config_js_1.repository;
        _a = config_js_1.repository.split('/'), this.repo = _a[1]; // Repo: Kisrefod-training/nodejs-server: [0] - Kisrefod-training, [1] - nodejs-server
        this.octokit = new rest_1.Octokit();
    }
    GitParser.prototype.getAuthorizedOctokit = function (authToken) {
        return new rest_1.Octokit({
            type: 'oauth',
            auth: authToken
        });
    };
    GitParser.prototype.getCollaborators = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.octokit.rest.repos.listCollaborators({
                            owner: this.owner,
                            repo: this.repo
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    GitParser.prototype.getAllPullReqs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.octokit.search.issuesAndPullRequests({ q: "repo:" + config_js_1.repository + " is:pr" })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data.items];
                }
            });
        });
    };
    GitParser.prototype.getPullReqData = function (collaborators) {
        return __awaiter(this, void 0, void 0, function () {
            var data, allPullReqs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        return [4 /*yield*/, this.getAllPullReqs()];
                    case 1:
                        allPullReqs = _a.sent();
                        collaborators.forEach(function (collaborator) {
                            var collaboratorPullReqs = allPullReqs.filter(function (pullReq) { return pullReq.user.id === collaborator.id; });
                            collaboratorPullReqs.forEach(function (pullReq) {
                                var item = {
                                    user: collaborator.login,
                                    type: 'PR',
                                    URL: pullReq.html_url,
                                    ID: '' + pullReq.id
                                };
                                data.push(item);
                            });
                        });
                        return [2 /*return*/, data];
                }
            });
        });
    };
    GitParser.prototype.getBranchNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, branchNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.octokit.rest.repos.listBranches({
                            owner: this.owner,
                            repo: this.repo
                        })];
                    case 1:
                        data = (_a.sent()).data;
                        branchNames = [];
                        data.forEach(function (branch) {
                            branchNames.push(branch.name);
                        });
                        return [2 /*return*/, branchNames];
                }
            });
        });
    };
    GitParser.prototype.getBranchCommits = function (branchName) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.octokit.rest.repos.listCommits({ owner: this.owner, repo: this.repo, sha: branchName })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    GitParser.prototype.getAllCommits = function () {
        return __awaiter(this, void 0, void 0, function () {
            var branchNames, allCommits;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBranchNames()];
                    case 1:
                        branchNames = _a.sent();
                        allCommits = [];
                        return [4 /*yield*/, Promise.all(branchNames.map(function (branchName) { return __awaiter(_this, void 0, void 0, function () {
                                var branchCommits;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getBranchCommits(branchName)];
                                        case 1:
                                            branchCommits = _a.sent();
                                            allCommits = allCommits.concat(branchCommits);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, allCommits];
                }
            });
        });
    };
    GitParser.prototype.getCommitData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allCommits, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllCommits()];
                    case 1:
                        allCommits = _a.sent();
                        data = [];
                        return [4 /*yield*/, Promise.all(allCommits.map(function (commit) { return __awaiter(_this, void 0, void 0, function () {
                                var item;
                                return __generator(this, function (_a) {
                                    item = {
                                        user: commit.author ? commit.author.login : 'null',
                                        type: 'commit',
                                        URL: commit.html_url,
                                        ID: commit.sha
                                    };
                                    if (data.find(function (elem) { return elem.ID === item.ID; }) === undefined)
                                        data.push(item);
                                    return [2 /*return*/];
                                });
                            }); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    GitParser.prototype.getParsedData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collaborators, pullReqData, commitData, parsedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.octokit = this.getAuthorizedOctokit(config_js_1.token);
                        return [4 /*yield*/, this.getCollaborators()];
                    case 1:
                        collaborators = _a.sent();
                        return [4 /*yield*/, this.getPullReqData(collaborators)];
                    case 2:
                        pullReqData = _a.sent();
                        return [4 /*yield*/, this.getCommitData()];
                    case 3:
                        commitData = _a.sent();
                        parsedData = pullReqData.concat(commitData);
                        parsedData.sort(function (a, b) {
                            if (a.user >= b.user)
                                return 1;
                            return -1;
                        });
                        return [2 /*return*/, parsedData];
                }
            });
        });
    };
    return GitParser;
}());
exports["default"] = GitParser;
