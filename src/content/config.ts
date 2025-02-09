import { z, defineCollection, render } from 'astro:content';
import { glob } from 'astro/loaders';

const heroCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      buttontext: z.string(),
      teasertitle: z.string(),
      teaser: z.string(),
    })
  });

  const featureCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      teaser: z.string(),
      icon: z.string()
    })
  });

  const faqCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/faqs" }),
    schema: z.object({
      question: z.string()
    })
  });


  const labelCollection = defineCollection({
    type: 'data',
    schema: z.object({
      email: z.string(),
      password: z.string(), 
      register_title: z.string(),
      register_desc: z.string(),
      register_password_desc: z.string(),
      register_email_desc: z.string(),
      join: z.string()
    })
  });


  export const collections = {
    'hero': heroCollection,
    'features': featureCollection,
    'faqs': faqCollection,
    'labels': labelCollection
  };
  