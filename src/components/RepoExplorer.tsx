import { useState } from "react";
import { searchRepositories } from "../services/githubApi";
import SearchForm from "./SearchForm";
import ErrorMessage from "./ErrorMessage";
import RepoCard from "./RepoCard";
import Pagination from "./Pagination";
import RepoFilters from "./RepoFilter";
import type { GithubRepo, SearchResponse } from "../models/github";

const RepoExplorer = () => {
    const [query, setQuery] = useState('');
    const [repos, setRepos] = useState<SearchResponse<GithubRepo> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);
    const [sort, setSort] = useState('stars');
    const [order, setOrder] = useState('desc');

    const performSearch = async (pageNum = 1, sortValue = sort, orderValue = order) => {
        if (query.trim()) {
            setLoading(true);
            setError(null);
            setPage(pageNum);

            try {
                const data = await searchRepositories(query, pageNum, 30, sortValue, orderValue);
                setRepos(data);
                setTotalCount(data.total_count);
                setHasSearched(true);
            }
            catch (e: any) {
                setError(e.message || 'Something went wrong');
                setRepos(null);
                setTotalCount(0);
            }
            finally {
                setLoading(false);
            }
        };
    };

    const handleSearch = async (e: React.SubmitEvent, pageNum = 1) => {
        e.preventDefault();
        await performSearch(pageNum);
    };

    const handleFilterChange = (type: string, value: string) => {
        const newSort = type === 'sort' ? value : sort;
        const newOrder = type === 'order' ? value : order;

        if (type === 'sort') setSort(value);
        else setOrder(value);

        if (hasSearched && query.trim()) {
            performSearch(1, newSort, newOrder);
        }
    };

    const totalPages = Math.ceil(totalCount / 30);
    const containerClass = `bg-gradient-to-br from-gray-300 via-gray-800 to-gray-900 py-8 px-4 ${hasSearched ? 'min-h-full' : 'h-full flex items-center justify-center'}`;

    return (
        <div className={containerClass}>
            <div className={`max-w-7xl mx-auto ${hasSearched ? '' : 'w-full'}`}>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Github Repository Explorer</h1>
                    <p className="text-gray-400">Search and explore Github repositories</p>
                </div>
                <SearchForm value={query} onChange={(e) => setQuery(e.target.value)} onSubmit={handleSearch} placeholder="Search repositories (e.g, react, python machine learning)..." loading={loading}/>

                {hasSearched && <RepoFilters sort={sort} order={order} onSortChange={(v) => handleFilterChange('sort', v)} onOrderChange={(v) => handleFilterChange('order', v)} disabled={loading}/>}
                <ErrorMessage message={error} className="max-w-3xl"/>
                {hasSearched && !loading && <div className="mb-6 text-center"><p className="text-gray-400">Found <span className="text-white font-semibold">{totalCount.toString()}</span> repositories</p></div>}
                {repos && repos.items.length > 0 && !loading && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {repos?.items?.map((repo) => <RepoCard key={repo.id} repo={repo} showOwner={true} variant="enhanced" dateFormat={{ year: 'numeric', month: 'short', day:'numeric' }} />)}
                        </div>
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={(pageNum) => performSearch(pageNum)} loading={loading} />   
                    </>
                )}
                {hasSearched && repos?.total_count === 0 && !loading && !error && <div className="text-center py-12"><p className="text-gray-400 text-lg ">No repository found. Try a different search query.</p></div>}
            </div>
        </div>
    )
}

export default RepoExplorer;