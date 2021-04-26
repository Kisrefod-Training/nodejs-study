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
exports.correctParsedData = exports.TestOctokit = void 0;
var collaborators = [
    {
        login: '1 PR Collaborator 1',
        id: 1,
        node_id: '123',
        avatar_url: '',
        gravatar_id: null,
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: false
    },
    {
        login: '3 PR Collaborator 3',
        id: 3,
        node_id: '345',
        avatar_url: '',
        gravatar_id: null,
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: false
    },
    {
        login: '2 PR Collaborator 2',
        id: 2,
        node_id: '234',
        avatar_url: '',
        gravatar_id: null,
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: false
    }
];
var pullReqs = {
    status: 200,
    data: {
        items: [
            {
                html_url: 'http://api.github.com/Repository/Pull/PR1',
                id: '1',
                user: {
                    id: 1
                }
            },
            {
                html_url: 'http://api.github.com/Repository/Pull/PR3',
                id: '3',
                user: {
                    id: 1
                }
            },
            {
                html_url: 'http://api.github.com/Repository/Pull/PR5',
                id: '5',
                user: {
                    id: 2
                }
            },
            {
                html_url: 'http://api.github.com/Repository/Pull/PR2',
                id: '2',
                user: {
                    id: 2
                }
            },
            {
                html_url: 'http://api.github.com/Repository/Pull/PR4',
                id: '4',
                user: {
                    id: 3
                }
            },
        ]
    }
};
var branchCommits = {
    branchWithAuthor: {
        data: [
            {
                author: {
                    login: 'Branch with author - Author1'
                },
                html_url: 'http://github.com/Repository/Repo/1',
                sha: '1'
            },
            {
                author: {
                    login: 'Branch with author - Author2'
                },
                html_url: 'http://github.com/Repository/Repo/2',
                sha: '2'
            },
            {
                author: {
                    login: 'There is 2 identical commits (should view only 1)'
                },
                html_url: 'http://github.com/Repository/Repo/100',
                sha: '100'
            },
            {
                author: {
                    login: 'There is 2 identical commits (should view only 1)'
                },
                html_url: 'http://github.com/Repository/Repo/100',
                sha: '100'
            },
        ]
    },
    branchWithoutAuthor: {
        data: [
            {
                html_url: 'http://github.com/Repository/Repo/3',
                sha: '3'
            },
            {
                html_url: 'http://github.com/Repository/Repo/4',
                sha: '4'
            },
        ]
    }
};
var branchNames = {
    status: 200,
    data: []
};
Object.keys(branchCommits).forEach(function (key) {
    branchNames.data.push({ name: key });
});
exports.TestOctokit = {
    rest: {
        repos: {
            listCollaborators: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, {
                                status: 200,
                                data: collaborators
                            }];
                    });
                });
            },
            listBranches: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, branchNames];
                    });
                });
            },
            listCommits: function (params) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, params.sha ? branchCommits[params.sha] : false];
                    });
                });
            }
        }
    },
    search: {
        issuesAndPullRequests: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, pullReqs];
                });
            });
        }
    }
};
function getExpectedResult() {
    var expectedPullReqs = getExpectedPullReqs();
    var expectedCommits = getExpectedCommits();
    var expectedResult = expectedPullReqs.concat(expectedCommits);
    expectedResult = expectedResult
        .filter(function (value, index, arr) { return arr.indexOf(value) === index; })
        .sort(function (a, b) {
        if (a.user >= b.user)
            return 1;
        return -1;
    });
    return expectedResult;
}
function getExpectedPullReqs() {
    var result = [];
    collaborators.forEach(function (collaborator) {
        var items = pullReqs.data.items;
        var collaboratorPullReqs = items.filter(function (pullReq) { return pullReq.user.id === collaborator.id; });
        collaboratorPullReqs.forEach(function (pullReq) {
            result.push({
                user: collaborator.login,
                type: 'PR',
                URL: pullReq.html_url,
                ID: pullReq.id
            });
        });
    });
    return result;
}
function getExpectedCommits() {
    var result = [];
    Object.values(branchCommits).forEach(function (branch) {
        branch.data.forEach(function (data) {
            var commitData = data;
            if (!result.find(function (elem) { return elem.ID === commitData.sha; })) {
                result.push({
                    user: commitData.author ? commitData.author.login : 'null',
                    type: 'commit',
                    URL: commitData.html_url,
                    ID: commitData.sha
                });
            }
        });
    });
    return result;
}
exports.correctParsedData = getExpectedResult();
