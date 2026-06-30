import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPublishedBlogs = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/blogs`);
                const data = await res.json();
                if (res.ok) {
                    // Backend already filters for published blogs
                    setBlogs(data);
                } else {
                    setError(data.message || 'Failed to fetch blogs');
                }
            } catch     {
                setError('Could not connect to the server');
            } finally {
                setLoading(false);
            }
        };

        fetchPublishedBlogs();
    }, []);

    if (loading) return (
        <section className="blog-section" id="blog">
            <div className="section-title">
                <h2>Latest <span>Blogs</span></h2>
                <div className="title-line"></div>
            </div>
            <div className="blog-loading">Loading blogs...</div>
        </section>
    );

    return (
        <section className="blog-section" id="blog">
            <div className="section-title">
                <h2>Latest <span>Blogs</span></h2>
                <div className="title-line"></div>
            </div>

            {error && <div className="blog-error">{error}</div>}

            {!loading && blogs.length === 0 && (
                <div className="no-blogs">No blogs published yet. Stay tuned!</div>
            )}

            <div className="blog-grid">
                {blogs.map((blog) => (
                    <div className="blog-card" key={blog._id}>
                        {blog.thumbnail && (
                            <div className="blog-image">
                                <img src={blog.thumbnail} alt={blog.title} loading="lazy" />
                            </div>
                        )}
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span className="blog-date">
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                                {blog.tags && blog.tags.length > 0 && (
                                    <span className="blog-category">{blog.tags[0]}</span>
                                )}
                            </div>
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-desc">{blog.description}</p>
                            <Link to={`/blog/${blog.slug || blog._id}`} className="read-more-btn">
                                Read More <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
