import { Octokit } from '@octokit/rest';
import { owner, repository, token } from './config.js';

type ParsedData = {
    user: string,
    type: 'commit' | 'PR',
    URL:  string,
    ID:   string | number
}
type Collaborator = {
    login:                  string;
    id:                     number;
    node_id:                string;
    avatar_url:             string;
    gravatar_id:            string | null;
    url:                    string;
    html_url:               string;
    followers_url:          string;
    following_url:          string;
    gists_url:              string;
    starred_url:            string;
    subscriptions_url:      string;
    organizations_url:      string;
    repos_url:              string;
    events_url:             string;
    received_events_url:    string;
    type:                   string;
    site_admin:             boolean;
    permissions?:           undefined | {
        admin:  boolean,
        push:   boolean,
        pull:   boolean
    };
}
type Commit = {
    url: string,
    sha: string,
    node_id: string
    html_url: string,
    comments_url: string,
    commit: any
    author: any
    committer: any
    parents: any
}

export default class GitParser {
    private readonly owner: string;
    private readonly repository: string;// Kisrefod-training/nodejs-server - all repository name
    private readonly repo: string;// nodejs-server - project repository
    private readonly octokit: Octokit;

    constructor () {
        this.owner = owner;
        this.repository = repository;
        this.repo = repository.split('/')[1];// Repo: Kisrefod-training/nodejs-server: [0] - Kisrefod-training, [1] - nodejs-server
        this.octokit = this.getAuthorizedOctokit(token);
    }
    private getAuthorizedOctokit (authToken: string):Octokit {
        return new Octokit({
            type: 'oauth',
            auth: authToken,
        });
    }
    async getCollaborators () {
        const { data } = await this.octokit.rest.repos.listCollaborators({
            owner: this.owner,
            repo: this.repo
        });

        return data;
    }
    async getPullReqs () {
        const { data } = await this.octokit.search.issuesAndPullRequests({ q: `repo:${repository} is:pr` });

        return data.items;
    }
    async getCollaboratorPullReqs (collaborator:Collaborator) {
        const allPullReqs = await this.getPullReqs();

        return allPullReqs.filter(pullReq => pullReq.user.id === collaborator.id);
    }
    async getPullReqData (collaborators:Array<Collaborator>) {
        const data:Array<ParsedData> = [];

        await Promise.all(collaborators.map(async collaborator => {
            const collaboratorPullReqs = await this.getCollaboratorPullReqs(collaborator);

            collaboratorPullReqs.forEach(pullReq => {
                const item: ParsedData = {
                    user: collaborator.login,
                    type: 'PR',
                    URL:  pullReq.html_url,
                    ID:   pullReq.id,
                };

                data.push(item);
            });
        }));
        return data;
    }
    async getBranchNames () {
        const branches = await this.octokit.rest.repos.listBranches({ owner: this.owner, repo: this.repo });
        const branchNames: Array<string> = [];

        branches.data.forEach(branch => {
            branchNames.push(branch.name);
        });

        return branchNames;
    }
    async getBranchCommits (branchName: string) {
        const commits = await this.octokit.rest.repos.listCommits({ owner: this.owner, repo: this.repo, sha: branchName });

        return commits.data;
    }
    async getAllCommits () {
        const branchNames = await this.getBranchNames();

        let allCommits:Array<Commit> = [];

        await Promise.all(branchNames.map(async branchName => {
            const branchCommits = await this.getBranchCommits(branchName);

            allCommits = allCommits.concat(branchCommits);
        }));

        return allCommits;
    }
    async getCommitData (collaborators: Array<Collaborator>) {
        const allCommits = await this.getAllCommits();
        const data:Array<ParsedData> = [];

        await Promise.all(allCommits.map(async commit => {
            const item: ParsedData = {
                user: commit.author ? commit.author.login : 'null',
                type: 'commit',
                URL:  commit.html_url,
                ID:   commit.sha,
            };

            data.push(item);
        }));
        return data;
    }
    async getParsedData () {
        const collaborators = await this.getCollaborators();
        const pullReqData = await this.getPullReqData(collaborators);
        const commitData = await this.getCommitData(collaborators);
        const commitsAndPR = pullReqData.concat(commitData);

        commitsAndPR.sort((a, b) => {
            if (a.user >= b.user) return 1;
            return -1;
        });
        return commitsAndPR;
    }
}
