# morebeachvolley

Astro source code for website morebeachvolley.ch.
Production deploy works via ansible and terraform and steered from separate repositories. 
The below refers to setting up a local development environment. 
The site uses an containerized  appwrite based backendend. 
To fully test  server side functionality, in particular user registration and data storage, 
you need to have appwrite running. 
We use a containerized version of appwrite that you can run on the server as well as on your 
local computer using docker CE (linux) or Docker Desktop (Win / Mac).  

## Start Dev Server

assuming node and npm are installed. 


```
npm install
```


```
npm run dev
```

Backend only works with a dockerized appwrite running and configured. 

## Build

```
npm run build
```


```
npm start
```

