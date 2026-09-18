import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../config/site.mjs";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
	const posts = await getCollection("blog");
	const sortedPosts = posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	);

	return rss({
		title: `${SITE.title} - ${SITE.subtitle}`,
		description: SITE.description,
		site: context.site?.toString() || SITE.url,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.id}/`,
			categories: post.data.tags,
			author: post.data.author,
		})),
		customData: `<language>${SITE.defaultLanguage || "en"}</language>`,
	});
}
