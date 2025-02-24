FROM oven/bun

WORKDIR /app

COPY ./backend /app

RUN bun install

ENV NODE_ENV=production

RUN bun prisma generate

RUN bun build \
	--compile \
	--minify-whitespace \
	--minify-syntax \
	--target bun \
	--outfile server \
	./src/index.ts


COPY ./docker/elysia/start.sh /start.sh
RUN chmod +x /start.sh

ENV NODE_ENV=production
