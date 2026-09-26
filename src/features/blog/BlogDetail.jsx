import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/seo/SEOHead';
import API_BASE_URL from '../../lib/api';

export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogAndRecent = async () => {
            setLoading(true);
            try {
                const blogRes = await fetch(`${API_BASE_URL}/blogs/${slug}`);
                const blogData = await blogRes.json();

                if (blogRes.ok) {
                    setBlog(blogData);
                } else {
                    setError(blogData.message || 'Blog not found');
                }

                const recentRes = await fetch(`${API_BASE_URL}/blogs`);
                const recentData = await recentRes.json();
                if (recentRes.ok) {
                    const otherBlogs = recentData.filter(b => b._id !== blogData._id).slice(0, 3);
                    setRecentBlogs(otherBlogs);
                }
            } catch {
                setError('Could not connect to the server');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogAndRecent();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return (
        <>
            <Navbar />
            <div className="section flex flex-col items-center justify-center gap-4 min-h-[50vh]">
                <div className="h-10 w-10 rounded-full border-2 border-border dark:border-border-dark border-t-accent dark:border-t-accent-dark animate-spin" />
                <p className="text-ink-muted dark:text-ink-dark-muted">Loading your story...</p>
            </div>
            <Footer />
        </>
    );

    if (error) return (
        <>
            <Navbar />
            <div className="section flex flex-col items-center justify-center gap-4 text-center min-h-[50vh]">
                <h2 className="text-2xl font-bold text-ink dark:text-ink-dark">Oops!</h2>
                <p className="text-ink-soft dark:text-ink-dark-soft">{error}</p>
                <Link to="/" className="btn-primary">Go Back Home</Link>
            </div>
            <Footer />
        </>
    );

    const blogSchema = blog ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.description,
        "image": blog.coverImage || blog.thumbnail || "https://code-with-hassan-phi.vercel.app/my.jpg",
        "datePublished": blog.createdAt,
        "dateModified": blog.updatedAt || blog.createdAt,
        "author": {
            "@type": "Person",
            "name": "Adil Hassan",
            "url": "https://code-with-hassan-phi.vercel.app"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CodeWithHassan",
            "logo": {
                "@type": "ImageObject",
                "url": "https://code-with-hassan-phi.vercel.app/favicon.svg"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://code-with-hassan-phi.vercel.app/blog/${blog.slug}`
        }
    } : null;

    return (
        <>
            {blog && (
                <>
                    <SEOHead
                        title={blog.title}
                        description={blog.description}
                        url={`/blog/${blog.slug}`}
                        image={blog.coverImage || blog.thumbnail || "https://code-with-hassan-phi.vercel.app/my.jpg"}
                        keywords={blog.tags ? blog.tags.join(', ') : 'adil12hassan'}
                        ogType="article"
                    />
                    <Helmet>
                        <script type="application/ld+json">
                            {JSON.stringify(blogSchema)}
                        </script>
                    </Helmet>
                </>
            )}
            <Navbar />
            <main className="section !pb-16">
                <div className="container-page max-w-3xl">
                    <header className="mb-8">
                        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                            <span className="text-ink-muted dark:text-ink-dark-muted">
                                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                    month: 'long', day: 'numeric', year: 'numeric'
                                })}
                            </span>
                            {blog.tags && blog.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 rounded-full bg-accent-soft dark:bg-accent-dark-soft text-accent dark:text-accent-dark font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink dark:text-ink-dark mb-4">{blog.title}</h1>
                        <p className="text-lg text-ink-soft dark:text-ink-dark-soft leading-relaxed">{blog.description}</p>
                    </header>

                    {(blog.coverImage || blog.thumbnail) && (
                        <div className="rounded-2xl overflow-hidden mb-10 shadow-card dark:shadow-card-dark">
                            <img src={blog.coverImage || blog.thumbnail} alt={blog.title} loading="lazy" className="w-full h-auto" />
                        </div>
                    )}

                    <article className="prose prose-neutral dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap leading-relaxed text-ink dark:text-ink-dark-soft">
                            {blog.content}
                        </div>
                    </article>

                    {recentBlogs.length > 0 && (
                        <section className="mt-16 pt-10 border-t border-border dark:border-border-dark">
                            <h3 className="text-xl font-bold text-ink dark:text-ink-dark mb-6">More Stories</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {recentBlogs.map((recent) => (
                                    <Link to={`/blog/${recent.slug || recent._id}`} key={recent._id} className="card overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                                        {(recent.coverImage || recent.thumbnail) && (
                                            <div className="aspect-[16/10] overflow-hidden">
                                                <img src={recent.coverImage || recent.thumbnail} alt={recent.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <h4 className="text-sm font-bold text-ink dark:text-ink-dark line-clamp-2 mb-1">{recent.title}</h4>
                                            <span className="text-xs text-ink-muted dark:text-ink-dark-muted">{new Date(recent.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="mt-12">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ink dark:text-ink-dark hover:text-accent dark:hover:text-accent-dark transition-colors">
                            <i className="fa-solid fa-arrow-left"></i> Back to Home
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
