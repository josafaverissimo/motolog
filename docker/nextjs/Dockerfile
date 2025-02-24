FROM oven/bun:1 AS base
WORKDIR /app

COPY ./frontend /app

COPY ./docker/nextjs/start.sh /start.sh
RUN chmod +x /start.sh

RUN bun install
