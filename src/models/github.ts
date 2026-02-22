export interface GithubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    language: string;
    created_at: string;
    updated_at: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    topics: string[];
}

export interface GitHubProfile {
    login: string;
    avatar_url: string;
    name: string | null;
    company: string | undefined;
    blog: string | undefined;
    location: string | undefined;
    html_url: string | undefined;
    bio: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
}

export interface SearchResponse<T> {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
}