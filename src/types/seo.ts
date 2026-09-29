export interface SEOProps {
  title?: string;
  description?: string;
  canonicalURL?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCreator?: string;
  twitterSite?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

