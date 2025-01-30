import { z, defineCollection, render } from 'astro:content';


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
    })
  });

  const faqCollection = defineCollection({
    type: 'content',
    schema: z.object({
      question: z.string()
    })
  });



  export const collections = {
    'hero': heroCollection,
    'features': featureCollection,
    'faqs': faqCollection
  };
  