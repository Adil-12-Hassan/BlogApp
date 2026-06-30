import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/navbar'
import AdminSidebar from '../../components/adminsidebar'
import SEOHead from '../../components/SEOHead'
import API_BASE_URL from '../../config'

export default function AdminBlogEditor() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const isEditMode = !!id

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        thumbnail: '',
        coverImage: '',
        tags: '',
        isPublished: false
    })

    useEffect(() => {
        async function fetchBlog() {
            setLoading(true)
            const token = localStorage.getItem('cwh_token')
            try {
                const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await res.json()
                if (res.ok) {
                    setFormData({
                        title: data.title || '',
                        description: data.description || '',
                        content: data.content || '',
                        thumbnail: data.thumbnail || '',
                        coverImage: data.coverImage || '',
                        tags: Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags || ''),
                        isPublished: data.isPublished || false
                    })
                } else {
                    setError(data.message || 'Failed to fetch blog details')
                }
            } catch {
                setError('Could not connect to the server')
            } finally {
                setLoading(false)
            }
        }

        if (isEditMode) {
            fetchBlog()
        }
    }, [id, isEditMode])

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        const token = localStorage.getItem('cwh_token')

        try {
            const url = isEditMode ? `${API_BASE_URL}/blogs/${id}` : `${API_BASE_URL}/blogs`
            const method = isEditMode ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    tags: typeof formData.tags === 'string'
                        ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
                        : formData.tags
                })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Failed to save blog')
                setLoading(false)
                return
            }

            navigate('/admin/dashboard')
        } catch {
            setError('Server not reachable. Make sure backend is running.')
            setLoading(false)
        }
    }

    return (
        <>
            <SEOHead title={isEditMode ? 'Edit Blog' : 'New Blog Post'} noindex={true} />
            <Navbar />
            <div className="admin-layout">
                <AdminSidebar />

                <main className="admin-main">
                    <h1 className="admin-page-title">{isEditMode ? 'Edit Blog' : 'New Blog Post'}</h1>
                    <p className="admin-page-subtitle">
                        {isEditMode ? 'Update your blog content below.' : 'Fill in the details to publish a new blog.'}
                    </p>

                    {error && <div className="admin-error-msg">{error}</div>}

                    {loading && !formData.title && isEditMode ? (
                        <p>Loading blog details...</p>
                    ) : (
                        <div className="admin-form-card">
                            <form onSubmit={handleSubmit}>

                                <div className="admin-form-group">
                                    <label>Blog Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g. How to Learn React in 30 Days"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>Short Description *</label>
                                    <textarea
                                        name="description"
                                        placeholder="A brief summary of this blog post (shown in cards)"
                                        value={formData.description}
                                        onChange={handleChange}
                                        style={{ minHeight: '80px' }}
                                        required
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>Full Content *</label>
                                    <textarea
                                        name="content"
                                        placeholder="Write your full blog content here..."
                                        value={formData.content}
                                        onChange={handleChange}
                                        style={{ minHeight: '240px' }}
                                        required
                                    />
                                </div>

                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label>Thumbnail URL</label>
                                        <input
                                            type="text"
                                            name="thumbnail"
                                            placeholder="https://example.com/image.jpg"
                                            value={formData.thumbnail}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="admin-form-group">
                                        <label>Cover Image URL</label>
                                        <input
                                            type="text"
                                            name="coverImage"
                                            placeholder="https://example.com/cover.jpg"
                                            value={formData.coverImage}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label>Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        placeholder="React, JavaScript, Tutorial"
                                        value={formData.tags}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="admin-form-group">
                                    <label>Visibility</label>
                                    <div className="admin-toggle-row">
                                        <label className="admin-toggle">
                                            <input
                                                type="checkbox"
                                                name="isPublished"
                                                checked={formData.isPublished}
                                                onChange={handleChange}
                                            />
                                            <span className="admin-toggle-slider"></span>
                                        </label>
                                        <span className="admin-toggle-label">
                                            {formData.isPublished ? '✅ Publish immediately' : '📝 Save as Draft'}
                                        </span>
                                    </div>
                                </div>

                                <div className="admin-form-actions">
                                    <button type="submit" className="admin-btn-primary" disabled={loading}>
                                        {loading ? 'Saving...' : formData.isPublished ? '🚀 Publish Blog' : '💾 Save Draft'}
                                    </button>
                                    <Link to="/admin/dashboard" className="admin-btn-secondary">
                                        Cancel
                                    </Link>
                                </div>

                            </form>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}