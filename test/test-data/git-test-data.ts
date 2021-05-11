import { Collaborator, ParsedData } from '../../src/git-parser-types';

type BranchName = 'branchWithAuthor' | 'branchWithoutAuthor';
type Param = {
    owner: string,
    repo: string,
    sha?: BranchName
}
type TestModule = any;

const collaborators: Array<Collaborator> = [
    {
        login:               '1 PR Collaborator 1',
        id:                  1,
        node_id:             '123',
        avatar_url:          '',
        gravatar_id:         null,
        url:                 '',
        html_url:            '',
        followers_url:       '',
        following_url:       '',
        gists_url:           '',
        starred_url:         '',
        subscriptions_url:   '',
        organizations_url:   '',
        repos_url:           '',
        events_url:          '',
        received_events_url: '',
        type:                '',
        site_admin:          false,
    },
    {
        login:               '3 PR Collaborator 3',
        id:                  3,
        node_id:             '345',
        avatar_url:          '',
        gravatar_id:         null,
        url:                 '',
        html_url:            '',
        followers_url:       '',
        following_url:       '',
        gists_url:           '',
        starred_url:         '',
        subscriptions_url:   '',
        organizations_url:   '',
        repos_url:           '',
        events_url:          '',
        received_events_url: '',
        type:                '',
        site_admin:          false,
    },
    {
        login:               '2 PR Collaborator 2',
        id:                  2,
        node_id:             '234',
        avatar_url:          '',
        gravatar_id:         null,
        url:                 '',
        html_url:            '',
        followers_url:       '',
        following_url:       '',
        gists_url:           '',
        starred_url:         '',
        subscriptions_url:   '',
        organizations_url:   '',
        repos_url:           '',
        events_url:          '',
        received_events_url: '',
        type:                '',
        site_admin:          false,
    }];
const pullReqs = {
    status: 200,
    data:   {
        items: [
            {
                html_url: 'http://api.github.com/Repository/Pull/PR1',
                id:       '1',
                user:     {
                    id: 1,
                },
            },
            {
                html_url: 'http://api.github.com/Repository/Pull/PR3',
                id:       '3',
                user:     {
                    id: 1,
                },
            },
            {
                html_url: 'http://api.github.com/Repository/Pull/PR5',
                id:       '5',
                user:     {
                    id: 2,
                },
            },
            {
                html_url: 'http://api.github.com/Repository/Pull/PR2',
                id:       '2',
                user:     {
                    id: 2,
                },
            },
            {
                html_url: 'http://api.github.com/Repository/Pull/PR4',
                id:       '4',
                user:     {
                    id: 3,
                },
            },
        ],
    },
};
const branchCommits = {
    branchWithAuthor: {
        data: [
            {
                author: {
                    login: 'Branch with author - Author1',
                },
                html_url: 'http://github.com/Repository/Repo/1',
                sha:      '1',
            },
            {
                author: {
                    login: 'Branch with author - Author2',
                },
                html_url: 'http://github.com/Repository/Repo/2',
                sha:      '2',
            },
            {
                author: {
                    login: 'There is 2 identical commits (should view only 1)',
                },
                html_url: 'http://github.com/Repository/Repo/100',
                sha:      '100',
            },
            {
                author: {
                    login: 'There is 2 identical commits (should view only 1)',
                },
                html_url: 'http://github.com/Repository/Repo/100',
                sha:      '100',
            },
        ],
    },
    branchWithoutAuthor: {
        data: [
            {
                html_url: 'http://github.com/Repository/Repo/3',
                sha:      '3',
            },
            {
                html_url: 'http://github.com/Repository/Repo/4',
                sha:      '4',
            },
        ],
    },
};
const branchNames:{ status: number, data: Array<{name: string}> } = {
    status: 200,
    data:   [],
};

Object.keys(branchCommits).forEach(key => {
    branchNames.data.push({ name: key });
});

export const TestOctokit:TestModule = {
    rest: {
        repos: {
            async listCollaborators () {
                return {
                    status: 200,
                    data:   collaborators,
                };
            },
            async listBranches () {
                return branchNames;
            },
            async listCommits (params:Param) {
                return params.sha ? branchCommits[params.sha] : false;
            },
        },
    },
    search: {
        async issuesAndPullRequests () {
            return pullReqs;
        },
    },
};

function getExpectedResult () {
    const expectedPullReqs = getExpectedPullReqs();
    const expectedCommits = getExpectedCommits();
    let expectedResult = expectedPullReqs.concat(expectedCommits);

    expectedResult = expectedResult
        .filter((value, index, arr) => arr.indexOf(value) === index)
        .sort((a, b) => {
            if (a.user >= b.user) return 1;
            return -1;
        });
    return expectedResult;
}

function getExpectedPullReqs () {
    const result:Array<ParsedData> = [];

    collaborators.forEach(collaborator => {
        const { items } = pullReqs.data;
        const collaboratorPullReqs = items.filter(pullReq => pullReq.user.id === collaborator.id);

        collaboratorPullReqs.forEach(pullReq => {
            result.push({
                user: collaborator.login,
                type: 'PR',
                URL:  pullReq.html_url,
                ID:   pullReq.id,
            });
        });
    });
    return result;
}

function getExpectedCommits () {
    const result:Array<ParsedData> = [];

    Object.values(branchCommits).forEach(branch => {
        branch.data.forEach(data => {
            type CommitData = {
                author?: {
                    login: string
                },
                html_url: string,
                sha: string
            };
            const commitData: CommitData = data;

            if (!result.find(elem => elem.ID === commitData.sha)) {
                result.push({
                    user: commitData.author ? commitData.author.login : 'null',
                    type: 'commit',
                    URL:  commitData.html_url,
                    ID:   commitData.sha,
                });
            }
        });
    });
    return result;
}

export const correctParsedData = getExpectedResult();
