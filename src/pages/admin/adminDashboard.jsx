import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../../components/adminsidebar'
import SEOHead from '../../components/SEOHead'
import API_BASE_URL from '../../config'

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

    return (
        <>
            <SEOHead title="Admin Dashboard" noindex={true} />

            {/* ===== MOBILE TOPBAR ===== */}
            <div className="admin-mobile-topbar">
                <span className="admin-mobile-logo">CodeWithHassan</span>
                <button
                    className="admin-hamburger"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle Sidebar"
                >
                    {sidebarOpen ? (
                        // X icon
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        // Hamburger icon
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>
            </div>

            {/* ===== OVERLAY — Mobile sidebar open hone pe ===== */}
            {sidebarOpen && (
                <div
                    className={`admin-overlay ${sidebarOpen ? 'active' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="admin-layout">

                {/* ===== SIDEBAR ===== */}
                <div className={`admin-sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
                    <AdminSidebar onClose={() => setSidebarOpen(false)} />
                </div>

                {/* ===== MAIN CONTENT ===== */}
                <main className="admin-main">
                    <h1 className="admin-page-title">Dashboard</h1>
                    <p className="admin-page-subtitle">Welcome back, Hassan. Here's your overview.</p>

                    {error && <div className="admin-error-msg">{error}</div>}

                    {/* Stats */}
                    <div className="admin-stats-grid">
                        <div className="admin-stat-card">
                            <h3>Total Blogs</h3>
                            <p>{blogs.length}</p>
                            <span>All posts</span>
                        </div>
                        <div className="admin-stat-card">
                            <h3>Published</h3>
                            <p>{blogs.filter(b => b.isPublished).length}</p>
                            <span>Live on site</span>
                        </div>
                        <div className="admin-stat-card">
                            <h3>Drafts</h3>
                            <p>{blogs.filter(b => !b.isPublished).length}</p>
                            <span>Not published</span>
                        </div>
                    </div>

                    {/* Blog Table */}
                    <div className="admin-section-header">
                        <h3>Recent Blogs</h3>
                        <Link to="/admin/blog/new" className="admin-btn-primary">
                            + New Blog
                        </Link>
                    </div>

                    {loading ? (
                        <p style={{ color: 'var(--gray)' }}>Loading blogs...</p>
                    ) : blogs.length === 0 ? (
                        <div className="admin-empty-state">
                            <p>No blogs yet.</p>
                            <Link to="/admin/blog/new" className="admin-btn-primary">
                                Create First Blog
                            </Link>
                        </div>
                    ) : (
                        /* ✅ Table wrap kiya scroll ke liye */
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Tags</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map(blog => (
                                        <tr key={blog._id}>
                                            <td data-label="Title">{blog.title}</td>
                                            <td data-label="Tags">
                                                {Array.isArray(blog.tags)
                                                    ? blog.tags.join(', ')
                                                    : blog.tags}
                                            </td>
                                            <td data-label="Status">
                                                <span className={`admin-badge ${blog.isPublished
                                                    ? 'admin-badge-published'
                                                    : 'admin-badge-draft'}`}>
                                                    {blog.isPublished ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td data-label="Date">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </td>
                                            <td data-label="Actions">
                                                <div className="admin-action-btns">
                                                    <Link
                                                        to={`/admin/blog/edit/${blog._id}`}
                                                        className="admin-btn-edit"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="admin-btn-danger"
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