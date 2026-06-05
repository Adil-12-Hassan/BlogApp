import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../../components/adminsidebar'
import API_BASE_URL from '../../config'

export default function AdminDashboard() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchBlogs() {
            const token = localStorage.getItem('cwh_token')
            try {
                const res = await fetch(`${API_BASE_URL}/blogs/admin/all`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
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
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
            <div className="admin-layout">
                <AdminSidebar />

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
                    <p>Loading blogs...</p>
                ) : (
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
                                    <td>{blog.title}</td>
                                    <td>{Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags}</td>
                                    <td>
                                        <span className={`admin-badge ${blog.isPublished ? 'admin-badge-published' : 'admin-badge-draft'}`}>
                                            {blog.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td style={{ display: 'flex', gap: '8px' }}>
                                        <Link to={`/admin/blog/edit/${blog._id}`} className="admin-btn-edit">Edit</Link>
                                        <button 
                                            className="admin-btn-danger" 
                                            onClick={() => handleDelete(blog._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                </main>
            </div>
        </>
    )
};