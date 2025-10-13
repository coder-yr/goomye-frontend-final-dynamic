import React from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_NAME } from '@/lib/env';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

/**
 * SEOHead component for managing page metadata
 * Use this on every page to improve SEO
 */
export function SEOHead({
  title,
  description = 'Shop the latest products with fast delivery and secure checkout',
  keywords = 'ecommerce, shopping, online store',
  ogImage = '/og-image.jpg',
  ogUrl,
  canonical,
}: SEOProps) {
  const pageTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Additional SEO best practices */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  );
}