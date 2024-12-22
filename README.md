# 🚀 Clips_Astro

A simple SSR application built with Astro, Neon DB, and Cloudinary for cloud storage; a social posting app with features like private mode, likes, and comments.

## Tech Stack

#### Core Framework

```
  astro
  astrojs/node
  astrojs/react
```

#### Authentication

```
 better-auth
```

#### Database

```
drizzle-orm
neondatabase/serverless
```

#### Image Handling

```
cloudinary
```

## Screenshots

![App Screenshot](https://i.ibb.co/nLGHbbt/Screenshot-2024-12-22-at-5-44-59-PM.png)

![App Screenshot](https://i.ibb.co/qN3mfKC/Screenshot-2024-12-22-at-5-45-13-PM.png)

![App Screenshot](https://i.ibb.co/SQQ18F8/Screenshot-2024-12-22-at-5-45-49-PM.png)

![App Screenshot](https://i.ibb.co/ZxSmgMy/Screenshot-2024-12-22-at-5-45-19-PM.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/JoelDeonDsouza/Clips_Astro.git
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start server

```bash
  npm run dev
```

## .env file

Ensure to include a .env file with the provided data

```
DATABASE_URL=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=http://localhost:4321

CLIENT_ID= // Your gitHub user ID (For user authentication) //

CLIENT_SECRET= // Your gitHub access secret (For user authentication) //

PUBLIC_CLOUDINARY_CLOUD_NAME=

PUBLIC_CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

## Neondb

```
https://neon.tech/docs/introduction
```

## Better Auth

```
https://www.better-auth.com/docs/introduction
```

## Cloudinary

```
https://cloudinary.com/
```
