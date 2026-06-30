import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO Header component.
 * Handles primary meta tags, Open Graph (OG), Twitter Cards, and canonical links.
 */
export default function SEOHead({
  title = "Adil Hassan | adil12hassan — Web Developer & Blogger",
  description = "Official portfolio and blog of Adil Hassan (adil12hassan/adil-12-hassan). Explore web development insights, MERN stack tutorials, and portfolio projects.",
  url = "https://code-with-hassan-phi.vercel.app",
  image = "https://code-with-hassan-phi.vercel.app/my.jpg",
  keywords = "adil12hassan, adil-12-hassan, Adil Hassan, CodeWithHassan, MERN stack developer, web developer portfolio, JavaScript blogger, Pakistan developer",
  noindex = false,
  ogType = "website"
}) {
  const cleanTitle = title.includes("Adil Hassan") ? title : `${title} | Adil Hassan (adil12hassan)`;
  const canonicalUrl = url.startsWith("http") ? url : `https://code-with-hassan-phi.vercel.app${url}`;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{cleanTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Adil Hassan (adil12hassan)" />

      {/* Indexing Control */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={cleanTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={cleanTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
