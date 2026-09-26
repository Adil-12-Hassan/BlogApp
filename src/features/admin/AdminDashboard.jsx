import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import SEOHead from '../../components/seo/SEOHead'
import API_BASE_URL from '../../lib/api'

export default function AdminDashboard() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        async function fetchBlogs() {
            const token = localStorage.getItem('cwh_token')
            try {
                const res = await fetch(`${API_BASE_URL}/blogs/admin/all`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const data = await res.json()
                if (res.ok) {
                    setBlogs(data)
                } else {
                    setError(data.message || 'Failed to fetch blogs')
                }
            } catch {
                setError('Could not connect to the server')
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    async function handleDelete(id) {
        if (!window.confirm('Are you sure you want to delete this blog?')) return
        const token = localStorage.getItem('cwh_token')
        try {
            const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                setBlogs(blogs.filter(b => b._id !== id))
            } else {
                alert('Failed to delete blog')
            }
        } catch {
            alert('Error deleting blog')
        }
    }

    const stats = [
        { label: 'Total Blogs', value: blogs.length, hint: 'All posts' },
        { label: 'Published', value: blogs.filter(b => b.isPublished).length, hint: 'Live on site' },
        { label: 'Drafts', value: blogs.filter(b => !b.isPublished).length, hint: 'Not published' },
    ]

    return (
        <>
            <SEOHead title="Admin Dashboard" noindex={true} />

            {/* Mobile topbar */}
            <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-surface-soft dark:bg-surface-dark-soft border-b border-border dark:border-border-dark sticky top-0 z-40">
                <span className="font-extrabold text-ink dark:text-ink-dark">CodeWithHassan</span>
                <button
                    className="grid h-9 w-9 place-items-center text-ink dark:text-ink-dark"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle Sidebar"
                >
                    {sidebarOpen ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>
            </div>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex min-h-screen bg-surface dark:bg-surface-dark">
                <div className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <AdminSidebar onClose={() => setSidebarOpen(false)} />
                </div>

                <main className="flex-1 min-w-0 p-6 md:p-10">
                    <h1 className="text-2xl font-bold text-ink dark:text-ink-dark">Dashboard</h1>
                    <p className="text-sm text-ink-soft dark:text-ink-dark-soft mt-1 mb-8">Welcome back, Hassan. Here's your overview.</p>

                    {error && (
                        <div className="mb-6 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-3">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                        {stats.map((s) => (
                            <div key={s.label} className="card p-6">
                                <h3 className="text-xs uppercase tracking-wider text-ink-muted dark:text-ink-dark-muted">{s.label}</h3>
                                <p className="text-3xl font-extrabold text-ink dark:text-ink-dark mt-2">{s.value}</p>
                                <span className="text-xs text-ink-muted dark:text-ink-dark-muted">{s.hint}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-ink dark:text-ink-dark">Recent Blogs</h3>
                        <Link to="/admin/blog/new" className="btn-primary !py-2 !px-4 text-xs">+ New Blog</Link>
                    </div>

                    {loading ? (
                        <p className="text-ink-muted dark:text-ink-dark-muted">Loading blogs...</p>
                    ) : blogs.length === 0 ? (
                        <div className="card p-10 text-center">
                            <p className="text-ink-soft dark:text-ink-dark-soft mb-4">No blogs yet.</p>
                            <Link to="/admin/blog/new" className="btn-primary">Create First Blog</Link>
                        </div>
                    ) : (
                        <div className="card overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border dark:border-border-dark text-left text-xs uppercase tracking-wider text-ink-muted dark:text-ink-dark-muted">
                                        <th className="px-5 py-3">Title</th>
                                        <th className="px-5 py-3">Tags</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Date</th>
                                        <th className="px-5 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map(blog => (
                                        <tr key={blog._id} className="border-b border-border dark:border-border-dark last:border-0">
                                            <td className="px-5 py-4 font-medium text-ink dark:text-ink-dark">{blog.title}</td>
                                            <td className="px-5 py-4 text-ink-soft dark:text-ink-dark-soft">
                                                {Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                    blog.isPublished
                                                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                                }`}>
                                                    {blog.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-ink-soft dark:text-ink-dark-soft">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Link to={`/admin/blog/edit/${blog._id}`} className="text-accent dark:text-accent-dark font-medium hover:underline">
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="text-red-500 font-medium hover:underline"
                                                        onClick={() => handleDelete(blog._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}
