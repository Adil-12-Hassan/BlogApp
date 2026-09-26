import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../lib/api';
import SectionTitle from '../../components/ui/SectionTitle'

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
                    setBlogs(data);
                } else {
                    setError(data.message || 'Failed to fetch blogs');
                }
            } catch {
                setError('Could not connect to the server');
            } finally {
                setLoading(false);
            }
        };

        fetchPublishedBlogs();
    }, []);

    return (
        <section id="blog" className="section bg-surface-soft dark:bg-surface-dark-soft">
            <div className="container-page">
                <SectionTitle heading="Latest" accent="Blogs" />

                {loading && (
                    <p className="text-center text-ink-muted dark:text-ink-dark-muted">Loading blogs...</p>
                )}

                {error && (
                    <p className="text-center text-red-500 mb-6">{error}</p>
                )}

                {!loading && blogs.length === 0 && (
                    <p className="text-center text-ink-muted dark:text-ink-dark-muted">No blogs published yet. Stay tuned!</p>
                )}

                {!loading && blogs.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <Link
                                to={`/blog/${blog.slug || blog._id}`}
                                key={blog._id}
                                className="card group flex flex-col overflow-hidden hover:-translate-y-1 hover:border-accent dark:hover:border-accent-dark transition-all duration-300"
                            >
                                {blog.thumbnail && (
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img
                                            src={blog.thumbnail}
                                            alt={blog.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-3 text-xs">
                                        <span className="text-ink-muted dark:text-ink-dark-muted">
                                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                        {blog.tags && blog.tags.length > 0 && (
                                            <span className="px-2 py-0.5 rounded-full bg-accent-soft dark:bg-accent-dark-soft text-accent dark:text-accent-dark font-medium">
                                                {blog.tags[0]}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-ink dark:text-ink-dark mb-2 line-clamp-2">{blog.title}</h3>
                                    <p className="text-sm text-ink-soft dark:text-ink-dark-soft leading-relaxed line-clamp-3 flex-1">{blog.description}</p>
                                    <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-ink dark:text-ink-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-colors">
                                        Read More <i className="fa-solid fa-arrow-right text-xs"></i>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
