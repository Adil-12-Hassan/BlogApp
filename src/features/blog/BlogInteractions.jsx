import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../lib/api';
import { useUserAuth } from '../user/UserAuthContext';
import { userRequest } from '../user/userApi';

const dateLabel = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function BlogInteractions({ blog }) {
    const { user, loading: authLoading } = useUserAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [counts, setCounts] = useState({ up: 0, down: 0 });
    const [reaction, setReaction] = useState(null);
    const [saved, setSaved] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [commentDraft, setCommentDraft] = useState('');
    const [editingId, setEditingId] = useState('');
    const [editDraft, setEditDraft] = useState('');
    const [busy, setBusy] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!blog?._id || authLoading) return undefined;
        const controller = new AbortController();
        let active = true;
        setCommentsLoading(true);
        setComments([]);
        setCounts({ up: 0, down: 0 });
        setReaction(null);
        setSaved(false);
        setError('');

        async function loadInteractions() {
            try {
                const [reactionResponse, commentsResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/blogs/${blog._id}/reactions`, { signal: controller.signal }),
                    fetch(`${API_BASE_URL}/blogs/${blog._id}/comments`, { signal: controller.signal }),
                ]);
                const [reactionData, commentsData] = await Promise.all([
                    reactionResponse.json().catch(() => ({})),
                    commentsResponse.json().catch(() => ({})),
                ]);
                if (!reactionResponse.ok) throw new Error(reactionData.message || 'Could not load reactions.');
                if (!commentsResponse.ok) throw new Error(commentsData.message || 'Could not load comments.');
                if (!active) return;
                setCounts({ up: reactionData.up || 0, down: reactionData.down || 0 });
                setComments(commentsData.items || []);

                if (user) {
                    const [userReaction, bookmark] = await Promise.allSettled([
                        userRequest(`/users/me/reactions/${blog._id}`, { signal: controller.signal }),
                        userRequest(`/users/me/bookmarks/${blog._id}`, { signal: controller.signal }),
                    ]);
                    if (!active) return;
                    if (userReaction.status === 'fulfilled') setReaction(userReaction.value.type || null);
                    if (bookmark.status === 'fulfilled') setSaved(Boolean(bookmark.value.saved));
                    const statusError = [userReaction, bookmark].find((result) => result.status === 'rejected');
                    if (statusError) setError(statusError.reason?.message || 'Could not load your account actions.');
                }
            } catch (loadError) {
                if (active && loadError.name !== 'AbortError') setError(loadError.message || 'Could not load article activity.');
            } finally {
                if (active) setCommentsLoading(false);
            }
        }

        loadInteractions();
        return () => {
            active = false;
            controller.abort();
        };
    }, [blog?._id, user, authLoading]);

    useEffect(() => {
        if (!blog?._id || !user || authLoading) return;
        userRequest(`/users/me/history/${blog._id}`, { method: 'POST' }).catch(() => {});
    }, [blog?._id, user, authLoading]);

    function requestSignIn() {
        navigate('/login', { state: { from: location } });
    }

    async function handleReaction(type) {
        if (!user) return requestSignIn();
        const nextReaction = reaction === type ? null : type;
        setBusy(type);
        setError('');
        try {
            if (nextReaction) {
                await userRequest(`/users/me/reactions/${blog._id}`, { method: 'POST', body: JSON.stringify({ type: nextReaction }) });
            } else {
                await userRequest(`/users/me/reactions/${blog._id}`, { method: 'DELETE' });
            }
            setCounts((current) => {
                const updated = { ...current };
                if (reaction) updated[reaction] = Math.max(0, updated[reaction] - 1);
                if (nextReaction) updated[nextReaction] += 1;
                return updated;
            });
            setReaction(nextReaction);
        } catch (actionError) {
            setError(actionError.message || 'Could not save your reaction.');
        } finally {
            setBusy('');
        }
    }

    async function handleBookmark() {
        if (!user) return requestSignIn();
        setBusy('bookmark');
        setError('');
        try {
            if (saved) await userRequest(`/users/me/bookmarks/${blog._id}`, { method: 'DELETE' });
            else await userRequest(`/users/me/bookmarks/${blog._id}`, { method: 'POST' });
            setSaved((current) => !current);
        } catch (actionError) {
            setError(actionError.message || 'Could not update your saved articles.');
        } finally {
            setBusy('');
        }
    }

    async function createComment(event) {
        event.preventDefault();
        if (!user) return requestSignIn();
        const content = commentDraft.trim();
        if (!content || content.length > 2000) return;
        setBusy('comment');
        setError('');
        try {
            const data = await userRequest(`/users/me/comments/${blog._id}`, { method: 'POST', body: JSON.stringify({ content }) });
            setComments((current) => [data.comment, ...current]);
            setCommentDraft('');
        } catch (actionError) {
            setError(actionError.message || 'Could not post your comment.');
        } finally {
            setBusy('');
        }
    }

    async function saveComment(comment) {
        const content = editDraft.trim();
        if (!content || content.length > 2000) return;
        setBusy(comment._id);
        setError('');
        try {
            const data = await userRequest(`/users/me/comments/${comment._id}`, { method: 'PUT', body: JSON.stringify({ content }) });
            setComments((current) => current.map((item) => item._id === comment._id ? data.comment : item));
            setEditingId('');
            setEditDraft('');
        } catch (actionError) {
            setError(actionError.message || 'Could not update your comment.');
        } finally {
            setBusy('');
        }
    }

    async function deleteComment(comment) {
        if (!window.confirm('Delete this comment? This cannot be undone.')) return;
        setBusy(comment._id);
        setError('');
        try {
            await userRequest(`/users/me/comments/${comment._id}`, { method: 'DELETE' });
            setComments((current) => current.filter((item) => item._id !== comment._id));
        } catch (actionError) {
            setError(actionError.message || 'Could not delete your comment.');
        } finally {
            setBusy('');
        }
    }

    function ownsComment(comment) {
        const authorId = comment.user?._id || comment.user?.id || comment.user;
        return Boolean(user && authorId && String(authorId) === String(user.id || user._id));
    }

    return (
        <section className="mt-12 border-t border-border pt-10 dark:border-border-dark" aria-labelledby="article-actions-heading">
            <div className="card p-5 md:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div><h2 id="article-actions-heading" className="text-xl font-bold text-ink dark:text-ink-dark">Enjoyed this article?</h2><p className="mt-1 text-sm text-ink-muted dark:text-ink-dark-muted">React to it or save it for later.</p></div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button type="button" onClick={() => handleReaction('up')} disabled={Boolean(busy)} aria-pressed={reaction === 'up'} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${reaction === 'up' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'border-border text-ink-soft hover:border-emerald-500 hover:text-emerald-600 dark:border-border-dark dark:text-ink-dark-soft'}`}><span aria-hidden="true">👍</span><span>{counts.up}</span><span className="sr-only">Like</span></button>
                        <button type="button" onClick={() => handleReaction('down')} disabled={Boolean(busy)} aria-pressed={reaction === 'down'} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${reaction === 'down' ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'border-border text-ink-soft hover:border-rose-500 hover:text-rose-600 dark:border-border-dark dark:text-ink-dark-soft'}`}><span aria-hidden="true">👎</span><span>{counts.down}</span><span className="sr-only">Dislike</span></button>
                        <button type="button" onClick={handleBookmark} disabled={Boolean(busy)} aria-pressed={saved} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${saved ? 'border-accent bg-accent-soft text-accent dark:border-accent-dark dark:bg-accent-dark-soft dark:text-accent-dark' : 'border-border text-ink-soft hover:border-accent hover:text-accent dark:border-border-dark dark:text-ink-dark-soft'}`}><i className={saved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'} />{busy === 'bookmark' ? 'Saving…' : saved ? 'Saved' : 'Save for later'}</button>
                    </div>
                </div>
                {!user && <p className="mt-4 text-xs text-ink-muted dark:text-ink-dark-muted">Sign in to react, comment, or save articles. <button type="button" onClick={requestSignIn} className="font-semibold text-accent hover:underline dark:text-accent-dark">Sign in</button></p>}
                {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
            </div>

            <div className="mt-10">
                <div className="mb-5 flex items-end justify-between"><div><p className="section-eyebrow !mb-1">Join the conversation</p><h2 className="text-2xl font-extrabold text-ink dark:text-ink-dark">Comments <span className="text-sm font-semibold text-ink-muted dark:text-ink-dark-muted">({comments.length})</span></h2></div></div>
                {user ? <form onSubmit={createComment} className="card mb-6 p-5"><label htmlFor="new-comment" className="field-label">Write a comment</label><textarea id="new-comment" className="field-input" rows="4" maxLength={2000} placeholder="Share a helpful thought…" value={commentDraft} onChange={(event) => setCommentDraft(event.target.value)} /><div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs text-ink-muted dark:text-ink-dark-muted">{commentDraft.length} / 2000</span><button type="submit" className="btn-primary !px-5 !py-2.5 text-xs" disabled={!commentDraft.trim() || Boolean(busy)}>{busy === 'comment' ? 'Posting…' : 'Post comment'}<i className="fa-solid fa-paper-plane" /></button></div></form> : <div className="card mb-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-ink-soft dark:text-ink-dark-soft">Sign in to add a comment to this article.</p><button type="button" onClick={requestSignIn} className="btn-outline !px-4 !py-2 text-xs">Sign in to comment</button></div>}
                {commentsLoading ? <p className="py-6 text-sm text-ink-muted dark:text-ink-dark-muted">Loading comments…</p> : comments.length === 0 ? <div className="card p-6 text-center"><p className="font-semibold text-ink dark:text-ink-dark">No comments yet</p><p className="mt-1 text-sm text-ink-muted dark:text-ink-dark-muted">Be the first to share a thought.</p></div> : <div className="space-y-4">{comments.map((comment) => {
                    const isOwner = ownsComment(comment);
                    const isEditing = editingId === comment._id;
                    return <article key={comment._id} className="card p-5">
                        <div className="mb-3 flex items-start justify-between gap-4"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft font-bold text-accent dark:bg-accent-dark-soft dark:text-accent-dark">{(comment.user?.name || 'R').slice(0, 1).toUpperCase()}</div><div><p className="text-sm font-semibold text-ink dark:text-ink-dark">{comment.user?.name || 'Reader'}</p><p className="text-xs text-ink-muted dark:text-ink-dark-muted">{dateLabel(comment.createdAt)}{comment.updatedAt && comment.updatedAt !== comment.createdAt ? ' · edited' : ''}</p></div></div>{isOwner && !isEditing && <div className="flex gap-3"><button type="button" onClick={() => { setEditingId(comment._id); setEditDraft(comment.content); }} className="text-xs font-semibold text-accent hover:underline dark:text-accent-dark">Edit</button><button type="button" onClick={() => deleteComment(comment)} disabled={Boolean(busy)} className="text-xs font-semibold text-red-500 hover:underline">Delete</button></div>}</div>
                        {isEditing ? <div className="space-y-3"><textarea className="field-input" rows="3" maxLength={2000} value={editDraft} onChange={(event) => setEditDraft(event.target.value)} aria-label="Edit your comment" /><div className="flex gap-2"><button type="button" onClick={() => saveComment(comment)} disabled={!editDraft.trim() || Boolean(busy)} className="btn-primary !px-4 !py-2 text-xs">{busy === comment._id ? 'Saving…' : 'Save changes'}</button><button type="button" onClick={() => { setEditingId(''); setEditDraft(''); }} className="btn-outline !px-4 !py-2 text-xs">Cancel</button></div></div> : <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-soft dark:text-ink-dark-soft">{comment.content}</p>}
                    </article>;
                })}</div>}
            </div>
        </section>
    );
}
