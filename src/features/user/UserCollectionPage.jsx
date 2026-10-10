import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogDate } from '../blog/blogUtils';
import useUserCollection from './useUserCollection';
import { userRequest } from './userApi';

const configs = {
    saved: { endpoint: '/users/me/bookmarks', empty: 'Saved articles will appear here.', icon: 'fa-regular fa-bookmark', action: 'Remove saved article' },
    reactions: { endpoint: '/users/me/reactions', empty: 'Your article reactions will appear here.', icon: 'fa-regular fa-thumbs-up' },
    history: { endpoint: '/users/me/history', empty: 'Articles you read will appear here.', icon: 'fa-solid fa-clock-rotate-left' },
    comments: { endpoint: '/users/me/comments', empty: 'Your comments will appear here.', icon: 'fa-regular fa-comments', action: 'Delete comment' },
};

function resolvePost(item) {
    return item?.blog || item?.post || item?.article || item;
}

export default function UserCollectionPage({ type }) {
    const config = configs[type];
    const { items, loading, error, refresh } = useUserCollection(config.endpoint);
    const [actionError, setActionError] = useState('');
    const [busyId, setBusyId] = useState('');
    const [editingId, setEditingId] = useState('');
    const [draft, setDraft] = useState('');

    async function removeItem(item) {
        if (type === 'comments' && !window.confirm('Delete this comment? This cannot be undone.')) return;
        const id = item._id || item.id;
        if (!id) return;
        setBusyId(id);
        setActionError('');
        try {
            const suffix = type === 'saved' ? `bookmarks/${item.blog?._id || item.blogId || id}` : `comments/${id}`;
            await userRequest(`/users/me/${suffix}`, { method: 'DELETE' });
            await refresh();
        } catch (requestError) {
            setActionError(requestError.message || 'Could not update this item.');
        } finally {
            setBusyId('');
        }
    }

    async function saveComment(item) {
        const id = item._id || item.id;
        setBusyId(id);
        setActionError('');
        try {
            await userRequest(`/users/me/comments/${id}`, { method: 'PUT', body: JSON.stringify({ content: draft }) });
            setEditingId('');
            setDraft('');
            await refresh();
        } catch (requestError) {
            setActionError(requestError.message || 'Could not update your comment.');
        } finally {
            setBusyId('');
        }
    }

    return (
        <div className="space-y-4">
            {(error || actionError) && <div role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{actionError || error}</div>}
            {loading ? <div className="card p-7 text-sm text-ink-muted dark:text-ink-dark-muted">Loading your account activity…</div> : items.length === 0 ? <div className="card px-6 py-14 text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent dark:bg-accent-dark-soft dark:text-accent-dark"><i className={config.icon} /></div><h2 className="font-bold text-ink dark:text-ink-dark">Nothing here yet</h2><p className="mt-2 text-sm text-ink-muted dark:text-ink-dark-muted">{config.empty}</p><Link to="/blogs" className="btn-outline mt-5 !px-4 !py-2.5 text-xs">Explore the blog</Link></div> : <div className="space-y-4">{items.map((item, index) => {
                const post = resolvePost(item);
                const itemId = item._id || item.id || index;
                const commentContent = item.content || item.text || (typeof item.comment === 'string' ? item.comment : item.comment?.content) || '';
                const postLink = post?.slug || post?._id ? `/blog/${post.slug || post._id}` : '/blogs';
                return <article key={itemId} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    {type === 'comments' ? <div className="min-w-0 flex-1"><div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-ink-muted dark:text-ink-dark-muted"><span>{getBlogDate(item.createdAt)}</span>{post?.title && <><span>·</span><Link to={postLink} className="font-medium text-accent hover:underline dark:text-accent-dark">{post.title}</Link></>}</div>{editingId === itemId ? <div className="space-y-3"><textarea className="field-input" rows="3" maxLength="2000" value={draft} onChange={(event) => setDraft(event.target.value)} aria-label="Edit your comment" /><div className="flex gap-2"><button disabled={!draft.trim() || busyId === itemId} onClick={() => saveComment(item)} className="btn-primary !px-4 !py-2 text-xs">{busyId === itemId ? 'Saving…' : 'Save edit'}</button><button onClick={() => { setEditingId(''); setDraft(''); }} className="btn-outline !px-4 !py-2 text-xs">Cancel</button></div></div> : <><p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-soft dark:text-ink-dark-soft">{commentContent || 'Comment'}</p><div className="mt-3 flex gap-3"><button onClick={() => { setEditingId(itemId); setDraft(commentContent || ''); }} className="text-xs font-semibold text-accent hover:underline dark:text-accent-dark">Edit</button><button disabled={busyId === itemId} onClick={() => removeItem(item)} className="text-xs font-semibold text-red-500 hover:underline">{busyId === itemId ? 'Deleting…' : 'Delete'}</button></div></>}</div> : <>
                        <Link to={postLink} className="flex min-w-0 flex-1 items-center gap-4">
                            <div className="grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-accent-soft text-accent dark:bg-accent-dark-soft dark:text-accent-dark">{post?.thumbnail ? <img src={post.thumbnail} alt="" className="h-full w-full object-cover" /> : <i className="fa-regular fa-file-lines" />}</div>
                            <div className="min-w-0"><h2 className="line-clamp-2 font-bold text-ink dark:text-ink-dark">{post?.title || 'Article'}</h2><p className="mt-1 text-xs text-ink-muted dark:text-ink-dark-muted">{type === 'history' ? `Read ${getBlogDate(item.readAt || item.createdAt)}` : type === 'reactions' ? `You ${item.type === 'down' || item.reaction === 'down' ? 'disliked' : 'liked'} this · ${getBlogDate(item.createdAt)}` : getBlogDate(item.createdAt)}</p></div>
                        </Link>
                        {type === 'saved' && <button disabled={busyId === itemId} onClick={() => removeItem(item)} className="shrink-0 text-xs font-semibold text-red-500 hover:underline">{busyId === itemId ? 'Removing…' : 'Remove saved'}</button>}
                    </>}
                </article>;
            })}</div>}
        </div>
    );
}
