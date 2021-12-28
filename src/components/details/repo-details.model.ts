export interface RepositoryDetails {
    archived: boolean;
    created_at: string;
    description: string;
    forks_count: number;
    has_issues: boolean;
    has_wiki: boolean;
    id: number;
    language: string;
    license: {
        name: string;
    };
    name: string;
    open_issues_count: number;
    owner: {
        avatar_url: string;
        login: string;

    };
    watchers_count: number;
}
