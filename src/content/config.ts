import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        draft: z.boolean().default(false),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
    }),
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        year: z.string(),
        draft: z.boolean().default(false),
        tags: z.array(z.string()).optional(),
        link: z.string().optional(),
        github: z.string().optional(),
        image: z.string().optional(),
        pinned: z.boolean().default(false),
    }),
});

export const collections = {
    posts: postsCollection,
    projects: projectsCollection,
};
