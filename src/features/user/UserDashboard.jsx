import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogDate } from '../blog/blogUtils';
import { userRequest } from './userApi';

const sections = [
    { key: 'saved', label: 'Saved articles', path: '/users/me/bookmarks', icon: 'fa-regular fa-bookmark', to: '/dashboard/saved', tone: 'indigo' },
    { key: 'reactions', label: 'Reactions', path: '/users/me/reactions', icon: 'fa-regular fa-thumbs-up', to: '/dashboard/reactions', tone: 'emerald' },
    { key: 'comments', label: 'Comments', path: '/users/me/comments', icon: 'fa-regular fa-comments', to: '/dashboard/comments', tone: 'amber' },
    { key: 'history', label: 'Reading history', path: '/users/me/history', icon: 'fa-solid fa-clock-rotate-left', to: '/dashboard/history', tone: 'sky' },
];

function asItems(data) {
    if (Array.isArray(data)) return data;
    return data?.items || data?.posts || [];
}

function getPost(item) {
    return item?.blog || item?.post || item?.article || item;
}

export default function UserDashboard() {
    const [collections, setCollections] = useState({});
    const [loading, setLoading] = useState(true);
    const [unavailable, setUnavailable] = useState(false);

    useEffect(() => {
        let active = true;
        Promise.all(sections.map(async (section) => {
            try {
                const data = await userRequest(section.path);
                return [section.key, asItems(data)];
            } catch {
                if (active) setUnavailable(true);
                return [section.key, []];
            }
        })).then((results) => {
            if (active) setCollections(Object.fromEntries(results));
        }).finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    const recentReading = collections.history?.slice(0, 4) || [];
    return (
        <div className="space-y-7">
            {unavailable && <div role="status" className="rounded-2xl border border-amber-300/70 bg-amber-500/10 px-5 py-4 text-sm leading-relaxed text-amber-800 dark:border-amber-500/30 dark:text-amber-200"><strong>Account activity is not connected yet.</strong> These dashboard sections need reader API endpoints from the server before they can load or save your data.</div>}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Account activity summary">
                {sections.map((section) => (
                    <Link key={section.key} to={section.to} className="card group p-5 transition-transform hover:-translate-y-1">
                        <div className="mb-5 flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-lg text-accent dark:bg-accent-dark-soft dark:text-accent-dark"><i className={section.icon} /></span><i className="fa-solid fa-arrow-up-right-from-square text-xs text-ink-muted transition-colors group-hover:text-accent dark:text-ink-dark-muted dark:group-hover:text-accent-dark" /></div>
                        <p className="text-3xl font-extrabold text-ink dark:text-ink-dark">{loading ? '—' : (collections[section.key]?.length ?? 0)}</p>
                        <p className="mt-1 text-sm text-ink-muted dark:text-ink-dark-muted">{section.label}</p>
                    </Link>
                ))}
            </section>
            <section className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-5 py-5 dark:border-border-dark md:px-7"><div><p className="section-eyebrow !mb-1">Keep going</p><h2 className="text-lg font-bold text-ink dark:text-ink-dark">Recently read</h2></div><Link to="/dashboard/history" className="text-xs font-semibold text-accent hover:underline dark:text-accent-dark">View history</Link></div>
                {loading ? <div className="p-7 text-sm text-ink-muted dark:text-ink-dark-muted">Loading your reading activity…</div> : recentReading.length === 0 ? <div className="px-5 py-10 text-center md:px-7"><div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-surface-soft text-ink-muted dark:bg-surface-dark-soft dark:text-ink-dark-muted"><i className="fa-solid fa-book-open" /></div><p className="font-semibold text-ink dark:text-ink-dark">Your reading list starts here</p><p className="mt-1 text-sm text-ink-muted dark:text-ink-dark-muted">Open an article and it will be easy to find again.</p><Link to="/blogs" className="btn-primary mt-5 !px-4 !py-2.5 text-xs">Browse articles</Link></div> : <div className="divide-y divide-border dark:divide-border-dark">{recentReading.map((item, index) => {
                    const post = getPost(item);
                    return <Link key={item._id || post._id || index} to={`/blog/${post.slug || post._id}`} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-soft dark:hover:bg-surface-dark-soft md:px-7"><div className="grid h-12 w-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-accent-soft text-accent dark:bg-accent-dark-soft dark:text-accent-dark">{(post.coverImage || post.thumbnail) ? <img src={post.coverImage || post.thumbnail} alt="" className="h-full w-full object-cover" /> : <i className="fa-regular fa-file-lines" />}</div><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold text-ink dark:text-ink-dark">{post.title || 'Article'}</h3><p className="mt-1 text-xs text-ink-muted dark:text-ink-dark-muted">{getBlogDate(item.readAt || item.createdAt || post.createdAt)}</p></div><i className="fa-solid fa-arrow-right text-xs text-ink-muted dark:text-ink-dark-muted" /></Link>;
                })}</div>}
            </section>
        </div>
    );
}
