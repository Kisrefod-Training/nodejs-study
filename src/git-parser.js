import { Octokit } from '@octokit/rest';
import { owner, repository, token } from './config.js';
export default class GitParser {
    constructor() {
        this.owner = owner;
        this.repository = repository;
        [, this.repo] = repository.split('/'); // Repo: Kisrefod-training/nodejs-server: [0] - Kisrefod-training, [1] - nodejs-server
        this.octokit = new Octokit();
    }
    getAuthorizedOctokit(authToken) {
        return new Octokit({
            type: 'oauth',
            auth: authToken,
        });
    }
    async getCollaborators() {
        const { data } = await this.octokit.rest.repos.listCollaborators({
            owner: this.owner,
            repo: this.repo,
        });
        return data;
    }
    async getAllPullReqs() {
        const { data } = await this.octokit.search.issuesAndPullRequests({ q: `repo:${repository} is:pr` });
        return data.items;
    }
    async getPullReqData(collaborators) {
        const data = [];
        const allPullReqs = await this.getAllPullReqs();
        collaborators.forEach(collaborator => {
            const collaboratorPullReqs = allPullReqs.filter(pullReq => pullReq.user.id === collaborator.id);
            collaboratorPullReqs.forEach(pullReq => {
                const item = {
                    user: collaborator.login,
                    type: 'PR',
                    URL: pullReq.html_url,
                    ID: pullReq.id,
                };
                data.push(item);
            });
        });
        return data;
    }
    async getBranchNames() {
        const { data } = await this.octokit.rest.repos.listBranches({
            owner: this.owner,
            repo: this.repo,
        });
        const branchNames = [];
        data.forEach(branch => {
            branchNames.push(branch.name);
        });
        return branchNames;
    }
    async getBranchCommits(branchName) {
        const { data } = await this.octokit.rest.repos.listCommits({ owner: this.owner, repo: this.repo, sha: branchName });
        return data;
    }
    async getAllCommits() {
        const branchNames = await this.getBranchNames();
        let allCommits = [];
        await Promise.all(branchNames.map(async (branchName) => {
            const branchCommits = await this.getBranchCommits(branchName);
            allCommits = allCommits.concat(branchCommits);
        }));
        return allCommits;
    }
    async getCommitData() {
        const allCommits = await this.getAllCommits();
        const data = [];
        await Promise.all(allCommits.map(async (commit) => {
            const item = {
                user: commit.author ? commit.author.login : 'null',
                type: 'commit',
                URL: commit.html_url,
                ID: commit.sha,
            };
            if (data.find(elem => elem.ID === item.ID) === undefined)
                data.push(item);
        }));
        return data;
    }
    async getParsedData() {
        this.octokit = this.getAuthorizedOctokit(token);
        const collaborators = await this.getCollaborators();
        const pullReqData = await this.getPullReqData(collaborators);
        const commitData = await this.getCommitData();
        const parsedData = pullReqData.concat(commitData);
        parsedData.sort((a, b) => {
            if (a.user >= b.user)
                return 1;
            return -1;
        });
        return parsedData;
    }
}
