import { Octokit } from '@octokit/rest';
import type { ParsedData } from './git-parser-types';
export default class GitParser {
    private readonly owner;
    private readonly repository;
    private readonly repo;
    private octokit;
    constructor();
    getAuthorizedOctokit(authToken: string): Octokit;
    private getCollaborators;
    private getAllPullReqs;
    private getPullReqData;
    private getBranchNames;
    private getBranchCommits;
    private getAllCommits;
    private getCommitData;
    getParsedData(): Promise<ParsedData[]>;
}
