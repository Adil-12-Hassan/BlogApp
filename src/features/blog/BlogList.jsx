import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/seo/SEOHead';
import API_BASE_URL from '../../lib/api';
import { getBlogDate } from './blogUtils';

const PAGE_SIZE = 9;

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        async function loadBlogs() {
            try {
                const response = await fetch(`${API_BASE_URL}/blogs`, { signal: controller.signal });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Could not load blog posts.');
                const posts = Array.isArray(data) ? data : [];
                setBlogs(posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (fetchError) {
                if (fetchError.name !== 'AbortError') setError(fetchError.message || 'Could not connect to the server.');
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        loadBlogs();
        return () => controller.abort();
    }, []);

    const filteredBlogs = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return blogs;
        return blogs.filter((blog) => [blog.title, blog.description, ...(blog.tags || [])]
            .some((value) => String(value || '').toLowerCase().includes(normalizedQuery)));
    }, [blogs, query]);
    const pageCount = Math.ceil(filteredBlogs.length / PAGE_SIZE);
    const visibleBlogs = filteredBlogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    function updateQuery(event) {
        setQuery(event.target.value);
        setPage(1);
    }

    return (
        <>
            <SEOHead title="All Blogs | CodeWithHassan" description="Browse web development tutorials, project notes, and the latest articles from CodeWithHassan." url="/blogs" />
            <Navbar />
            <main>
                <section className="bg-surface-soft py-16 dark:bg-surface-dark-soft md:py-24">
                    <div className="container-page">
                        <p className="section-eyebrow">The blog</p>
                        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-2xl">
                                <h1 className="text-4xl font-extrabold tracking-tight text-ink dark:text-ink-dark md:text-6xl">Ideas worth <span className="text-accent dark:text-accent-dark">building on.</span></h1>
                                <p className="mt-5 text-base leading-relaxed text-ink-soft dark:text-ink-dark-soft md:text-lg">Practical notes on web development, product craft, and the lessons behind the work.</p>
                            </div>
                            <label className="relative block w-full md:max-w-sm">
                                <span className="sr-only">Search blog posts</span>
                                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                                <input className="field-input !rounded-full !py-3 !pl-11" type="search" placeholder="Search articles..." value={query} onChange={updateQuery} />
                            </label>
                        </div>
                        <p className="mt-8 text-sm text-ink-muted dark:text-ink-dark-muted">{loading ? 'Loading articles…' : `${filteredBlogs.length} ${filteredBlogs.length === 1 ? 'article' : 'articles'}`}</p>
                    </div>
                </section>

                <section className="section !pt-12 md:!pt-16">
                    <div className="container-page">
                        {loading && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading articles">{Array.from({ length: 6 }, (_, index) => <div key={index} className="card h-80 animate-pulse bg-surface-soft dark:bg-surface-dark-soft" />)}</div>}
                        {error && <div className="card mx-auto max-w-xl p-8 text-center"><p className="font-semibold text-red-500">{error}</p><button className="btn-outline mt-5" onClick={() => window.location.reload()}>Try again</button></div>}
                        {!loading && !error && visibleBlogs.length > 0 && (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {visibleBlogs.map((blog) => (
                                    <Link to={`/blog/${blog.slug || blog._id}`} key={blog._id} className="card group flex min-h-[360px] flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent dark:hover:border-accent-dark">
                                        {blog.thumbnail ? <div className="aspect-[16/10] overflow-hidden bg-surface-soft dark:bg-surface-dark-soft"><img src={blog.thumbnail} alt={blog.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div> : <div className="grid aspect-[16/10] place-items-center bg-accent-soft text-4xl text-accent dark:bg-accent-dark-soft dark:text-accent-dark"><i className="fa-regular fa-file-lines" /></div>}
                                        <div className="flex flex-1 flex-col p-6">
                                            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-ink-muted dark:text-ink-dark-muted"><span>{getBlogDate(blog.createdAt)}</span></div>
                                            {blog.tags?.[0] && <span className="mb-3 w-fit rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent dark:bg-accent-dark-soft dark:text-accent-dark">{blog.tags[0]}</span>}
                                            <h2 className="mb-2 text-xl font-bold text-ink dark:text-ink-dark">{blog.title}</h2>
                                            <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft dark:text-ink-dark-soft">{blog.description}</p>
                                            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent dark:text-accent-dark">Read article <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" /></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {!loading && !error && visibleBlogs.length === 0 && <div className="py-20 text-center"><div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-xl text-accent dark:bg-accent-dark-soft dark:text-accent-dark"><i className="fa-regular fa-file-lines" /></div><h2 className="text-xl font-bold text-ink dark:text-ink-dark">{query ? 'No matching articles' : 'No articles yet'}</h2><p className="mt-2 text-ink-muted dark:text-ink-dark-muted">{query ? 'Try a different search term.' : 'New stories will show up here soon.'}</p></div>}
                        {pageCount > 1 && <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Blog pages"><button className="btn-outline !px-4 !py-2" disabled={page === 1} onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Previous</button><span className="px-3 text-sm text-ink-muted dark:text-ink-dark-muted">Page {page} of {pageCount}</span><button className="btn-outline !px-4 !py-2" disabled={page === pageCount} onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Next</button></nav>}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
