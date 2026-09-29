-- ==============================================================================
-- Tekromancy Engineering Telemetry & Unified Google Ads Data Models
-- GA4 Property: 408486434 | Measurement ID: G-YBFSBJRJK8
-- Target Dataset: `tekromancy.analytics_408486434`
-- ==============================================================================

-- 1. High-Value Engineer Code Copy Leaderboard (Top Copied Recipes)
-- Feeds back which technical implementations engineers are using in production.
SELECT
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'article_id') AS article_slug,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'language') AS code_language,
  COUNT(1) AS copy_events_count,
  COUNT(DISTINCT user_pseudo_id) AS unique_engineers_copying
FROM
  `tekromancy.analytics_408486434.events_*`
WHERE
  event_name = 'code_copy'
  AND _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY))
GROUP BY
  article_slug, code_language
ORDER BY
  copy_events_count DESC
LIMIT 20;

-- 2. Internal Search Query Radar (Content Gap Detector)
-- Reveals what technologies engineers are searching for that returned zero or low results.
SELECT
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'query') AS search_term,
  (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'result_count') AS results_returned,
  COUNT(1) AS query_frequency,
  COUNT(DISTINCT user_pseudo_id) AS distinct_searching_users
FROM
  `tekromancy.analytics_408486434.events_*`
WHERE
  event_name = 'internal_search'
  AND _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY))
GROUP BY
  search_term, results_returned
ORDER BY
  query_frequency DESC;

-- 3. Google Ads Campaign ROI & App Install Conversion Funnel
-- Unites Google Ads paid clicks (gclid/campaign) with app store conversions.
SELECT
  traffic_source.source AS traffic_source,
  traffic_source.medium AS traffic_medium,
  traffic_source.name AS campaign_name,
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'app_id') AS app_id,
  COUNTIF(event_name = 'page_view') AS total_landing_views,
  COUNTIF(event_name = 'scroll_milestone' AND (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'depth') >= 75) AS deep_readers,
  COUNTIF(event_name = 'app_portal_click') AS portal_launches,
  COUNTIF(event_name = 'app_play_store_click') AS play_store_install_clicks,
  SAFE_DIVIDE(COUNTIF(event_name = 'app_play_store_click'), COUNTIF(event_name = 'page_view')) * 100 AS install_conversion_rate_pct
FROM
  `tekromancy.analytics_408486434.events_*`
WHERE
  _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY))
GROUP BY
  traffic_source, traffic_medium, campaign_name, app_id
ORDER BY
  play_store_install_clicks DESC;

-- 4. Reader Drop-off Curve (Scroll Depth Telemetry per Article)
-- Pinpoints where engineers lose interest in technical articles.
SELECT
  (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'article_id') AS article_slug,
  COUNTIF((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'depth') = 25) AS readers_reached_25pct,
  COUNTIF((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'depth') = 50) AS readers_reached_50pct,
  COUNTIF((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'depth') = 75) AS readers_reached_75pct,
  COUNTIF((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'depth') = 90) AS readers_completed_90pct,
  SAFE_DIVIDE(
    COUNTIF((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'depth') = 90),
    COUNTIF((SELECT value.int_value FROM UNNEST(event_params) WHERE key = '25') = 25)
  ) * 100 AS article_completion_rate_pct
FROM
  `tekromancy.analytics_408486434.events_*`
WHERE
  event_name = 'scroll_milestone'
  AND _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY))
GROUP BY
  article_slug
ORDER BY
  readers_reached_25pct DESC;
