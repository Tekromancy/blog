import { join } from 'path';

const SITE_URL = 'https://tekromancy.com';
const INDEXNOW_KEY = 'f6c4495ea11a478880bbab167e43685e';
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

async function ping() {
  console.log('Fetching live sitemap...');
  try {
    const sitemapUrl = `${SITE_URL}/sitemap-0.xml`;
    // Wait a few seconds to ensure the newly deployed site is fully live
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const responseSitemap = await fetch(sitemapUrl);
    if (!responseSitemap.ok) {
        throw new Error(`Failed to fetch sitemap: ${responseSitemap.status}`);
    }
    const sitemapContent = await responseSitemap.text();
    
    // Extract URLs from sitemap
    const urls = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    
    if (urls.length === 0) {
      console.log('No URLs found in sitemap');
      return;
    }

    console.log(`Found ${urls.length} URLs. Sending IndexNow ping...`);

    const response = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: new URL(SITE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls
      })
    });

    if (response.ok) {
      console.log('IndexNow ping successful!');
    } else {
      console.error('IndexNow ping failed:', response.status, await response.text());
    }

    // Ping Google Search Console
    const googlePingUrl = `https://www.google.com/ping?sitemap=${SITE_URL}/sitemap-index.xml`;
    console.log('Pinging Google...', googlePingUrl);
    const googleRes = await fetch(googlePingUrl);
    if (googleRes.ok) {
      console.log('Google ping successful!');
    } else {
      console.error('Google ping failed:', googleRes.status);
    }
  } catch (err) {
    console.error('Ping process failed:', err);
  }
}

ping();
