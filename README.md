# Tech Stack

PERN (PostgreSQL, Express, React, Node)

# Local Setup

Ensure you have `node` and `pnpm`(recomended) in your system or you can use `npm`.

## Server

##### Install dependencies

    cd server
    pnpm i

##### Rename eg.env file to .env, fill out the fields

- `DATABASE_URL` I use https://neon.tech/

##### Generate Prisma client

    prisma generate

##### Run dev server

    pnpm dev

## Client

Install dependencies

    cd client
    pnpm i
