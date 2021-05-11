export type ParsedData = {
    user: string,
    type: 'commit' | 'PR',
    URL: string,
    ID: string
}
export type Collaborator = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    permissions?: undefined | {
        admin: boolean,
        push: boolean,
        pull: boolean
    };
}
export type Commit = {
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
