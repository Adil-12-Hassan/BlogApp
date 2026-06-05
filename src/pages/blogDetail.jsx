import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import API_BASE_URL from '../config';

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogAndRecent = async () => {
            setLoading(true);
            try {
                // Fetch current blog
                const blogRes = await fetch(`${API_BASE_URL}/blogs/${id}`);
                const blogData = await blogRes.json();
                
                if (blogRes.ok) {
                    setBlog(blogData);
                } else {
                    setError(blogData.message || 'Blog not found');
                }

                // Fetch recent blogs for the sidebar/footer
                const recentRes = await fetch(`${API_BASE_URL}/blogs`);
                const recentData = await recentRes.json();
                if (recentRes.ok) {
                    // Filter out current blog and take top 3
                    const otherBlogs = recentData.filter(b => b._id !== id).slice(0, 3);
                    setRecentBlogs(otherBlogs);
                }
            } catch {
                setError('Could not connect to the server');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogAndRecent();
        // Scroll to top when blog changes
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <>
            <Navbar />
            <div className="blog-detail-loading">
                <div className="loader"></div>
                <p>Loading your story...</p>
            </div>
            <Footer />
        </>
    );

    if (error) return (
        <>
            <Navbar />
            <div className="blog-detail-error">
                <h2>Oops!</h2>
                <p>{error}</p>
                <Link to="/" className="btn-hire">Go Back Home</Link>
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <Navbar />
            <main className="blog-detail-page">
                <div className="blog-detail-container">
                    {/* Header */}
                    <header className="blog-header">
                        <div className="blog-detail-meta">
                            <span className="blog-detail-date">
                                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                            {blog.tags && blog.tags.map((tag, index) => (
                                <span key={index} className="blog-detail-tag">{tag}</span>
                            ))}
                        </div>
                        <h1 className="blog-detail-title">{blog.title}</h1>
                        <p className="blog-detail-desc">{blog.description}</p>
                    </header>

                    {/* Featured Image */}
                    {blog.thumbnail && (
                        <div className="blog-detail-image">
                            <img src={blog.thumbnail} alt={blog.title} />
                        </div>
                    )}

                    {/* Content */}
                    <article className="blog-detail-content">
                        {/* Using white-space: pre-wrap to preserve line breaks from the textarea */}
                        <div className="content-body" style={{ whiteSpace: 'pre-wrap' }}>
                            {blog.content}
                        </div>
                    </article>

                    {/* Related/Recent Blogs */}
                    {recentBlogs.length > 0 && (
                        <section className="related-blogs">
                            <h3 className="related-title">More Stories</h3>
                            <div className="related-grid">
                                {recentBlogs.map((recent) => (
                                    <Link to={`/blog/${recent._id}`} key={recent._id} className="related-card">
                                        {recent.thumbnail && <img src={recent.thumbnail} alt={recent.title} />}
                                        <div className="related-info">
                                            <h4>{recent.title}</h4>
                                            <span>{new Date(recent.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="blog-detail-footer">
                        <Link to="/" className="back-link">
                            <i className="fa-solid fa-arrow-left"></i> Back to Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
