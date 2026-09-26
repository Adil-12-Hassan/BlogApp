import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import AdminSidebar from './AdminSidebar'
import SEOHead from '../../components/seo/SEOHead'
import API_BASE_URL from '../../lib/api'

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
                    headers: { 'Authorization': `Bearer ${token}` }
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
            <div className="flex min-h-screen bg-surface dark:bg-surface-dark">
                <div className="hidden lg:block sticky top-0 h-screen w-64 shrink-0">
                    <AdminSidebar />
                </div>

                <main className="flex-1 min-w-0 p-6 md:p-10">
                    <h1 className="text-2xl font-bold text-ink dark:text-ink-dark">{isEditMode ? 'Edit Blog' : 'New Blog Post'}</h1>
                    <p className="text-sm text-ink-soft dark:text-ink-dark-soft mt-1 mb-8">
                        {isEditMode ? 'Update your blog content below.' : 'Fill in the details to publish a new blog.'}
                    </p>

                    {error && (
                        <div className="mb-6 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-3">
                            {error}
                        </div>
                    )}

                    {loading && !formData.title && isEditMode ? (
                        <p className="text-ink-muted dark:text-ink-dark-muted">Loading blog details...</p>
                    ) : (
                        <div className="card p-6 md:p-8 max-w-3xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="field-label">Blog Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g. How to Learn React in 30 Days"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="field-input"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">Short Description *</label>
                                    <textarea
                                        name="description"
                                        placeholder="A brief summary of this blog post (shown in cards)"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        className="field-input min-h-[90px]"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">Full Content *</label>
                                    <textarea
                                        name="content"
                                        placeholder="Write your full blog content here..."
                                        value={formData.content}
                                        onChange={handleChange}
                                        required
                                        className="field-input min-h-[240px]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="field-label">Thumbnail URL</label>
                                        <input
                                            type="text"
                                            name="thumbnail"
                                            placeholder="https://example.com/image.jpg"
                                            value={formData.thumbnail}
                                            onChange={handleChange}
                                            className="field-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="field-label">Cover Image URL</label>
                                        <input
                                            type="text"
                                            name="coverImage"
                                            placeholder="https://example.com/cover.jpg"
                                            value={formData.coverImage}
                                            onChange={handleChange}
                                            className="field-input"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="field-label">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        placeholder="React, JavaScript, Tutorial"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className="field-input"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">Visibility</label>
                                    <div className="flex items-center gap-3">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="isPublished"
                                                checked={formData.isPublished}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-border dark:bg-border-dark rounded-full peer peer-checked:bg-accent dark:peer-checked:bg-accent-dark transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                                        </label>
                                        <span className="text-sm text-ink-soft dark:text-ink-dark-soft">
                                            {formData.isPublished ? '✅ Publish immediately' : '📝 Save as Draft'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-2">
                                    <button type="submit" className="btn-primary" disabled={loading}>
                                        {loading ? 'Saving...' : formData.isPublished ? '🚀 Publish Blog' : '💾 Save Draft'}
                                    </button>
                                    <Link to="/admin/dashboard" className="btn-outline">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}
