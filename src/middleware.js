// src/middleware.js

import { defineMiddleware } from "astro:middleware";
// import { createSessionClient } from "./server/appwrite";


// export function onRequest (context, next) {
//   // intercept data from a request
//   // optionally, modify the properties in `locals`
//   const url = new URL(context.url);

//   context.locals.title = "some middleware shizzle";
//   context.locals.loc = url.pathname.startsWith('/en/') ? 'en' : 'de';

//   // return a Response or the result of calling `next()`
//   return next();
// };


export const onRequest = defineMiddleware(async ({ request, locals }, next) => {
  try {
    const { account } = createSessionClient(request);
    locals.user = await account.get();
  } catch {}

  return next();
});

