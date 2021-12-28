import axiosInstance from "./axios";

export const getPublicRepos = async (initialPage: boolean, nextLink: string) => {
    try {
        const url = initialPage ? 'repositories' : `repositories${nextLink ? `?since=${nextLink}` : ''}`;
        const res = await axiosInstance.get(url);
        return { data: res.data, hasError: false, headerLinks: res.headers.link };
    } catch (error) {
        return { data: [], hasError: false, headerLinks: '' };
    }
};

export const getReposBySearchValue = async (searchVal: string) => {
    try {
        const res = await axiosInstance.get(`search/repositories?q=${searchVal}`);
        return { data: res.data.items, hasError: false };
    } catch (error) {
        return { data: [], hasError: false };
    }
};
