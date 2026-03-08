FROM oven/bun AS base

WORKDIR /app

FROM base AS install

RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

RUN bun --bun run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/build .

# default port for the app
EXPOSE 3000

ENTRYPOINT [ "bun", "--bun", "run", "index.js" ]