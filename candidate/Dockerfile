# --------------> BUILD IMAGE
FROM node:18.17.1-alpine3.18 AS build
WORKDIR /app
COPY package.json tsconfig.json ./
COPY prisma ./prisma/
RUN corepack enable
RUN pnpm install --silent
COPY . ./
RUN pnpm run build

# --------------> TS REMOVER
FROM node:18.17.1-alpine3.18 as ts-remover
WORKDIR /app
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/build /app/build
COPY --from=build /app/prisma /app/prisma
RUN corepack enable
RUN pnpm install --only=production

# --------------> PRODUCTION IMAGE
FROM node:18.17.1-alpine3.18

ENV NODE_ENV ${NODE_ENV}

RUN addgroup --system app
RUN adduser --system app --ingroup app
USER app

WORKDIR /app
COPY --chown=app:app --from=ts-remover /app/build /app/build
COPY --chown=app:app --from=ts-remover /app/node_modules /app/build/node_modules
COPY --chown=app:app --from=ts-remover /app/prisma /app/prisma

EXPOSE ${CANDIDATE_PORT}
CMD ["node", "build/index.js"]
