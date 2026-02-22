import type { GitHubProfile, GithubRepo, SearchResponse } from "../models/github";

const GITHUB_API_BASE = 'https://api.github.com'

const handleResponse = async <T>(response : Response, errorMsg: string): Promise<T> => {
    if (!response.ok) {
        if (response.status === 404 && errorMsg.includes('User')) throw new Error('User now found!');
        throw new Error(errorMsg);
    }
    return await response.json() as T;
};

export const fetchUserProfile = async (username: string) => {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);

    return handleResponse<GitHubProfile>(response, 'Failed to fetch user profile!');
};

export const fetchUserRepos = async (username: string, page: number = 1, perPage: number = 30) => {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`);

    return handleResponse<GithubRepo[]>(response, 'Failed to fetch repositories!');
}

export const searchRepositories = async (query: string, page = 1, perPage = 30, sort = 'stars' , order = 'desc') => {
    const params = new URLSearchParams({ q: query, page: page.toString(), per_page: perPage.toString(), sort, order});
    const response = await fetch(`${GITHUB_API_BASE}/search/repositories?${params.toString()}`);
    return handleResponse<SearchResponse<GithubRepo>>(response, 'Failed to search repositories!');
}

export const fetchRepoDetails = async (owner: string, repo: string) => {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`);
    return handleResponse<GithubRepo>(response, 'Failed to fetch repository details!');
}