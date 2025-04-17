import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
    const writings = await getCollection("writings")
    const items = writings.map((writing) => ({
        title: writing.data.title,
        description: writing.data.description ?? `${writing.body?.slice(0, 200)}...`,
        pubDate: writing.data.published,
        link: `${context.site}writings/${writing.id}`,
    }))

    return rss({
        title: 'Torben Haack [t128n]',
        description: 'Engineer of scalable, high-reliability software systems.',
        // @ts-expect-error: site is always set in astro.config
        site: context.site,
        customData: '<language>en-us</language>',
        items
    });
}