# --------------> BUILD IMAGE
FROM node:18.17.1-alpine3.18 AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
COPY . ./
RUN npm run build

# --------------> TS REMOVER
FROM node:18.17.1-alpine3.18 as ts-remover
WORKDIR /app
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/build /app/build
RUN npm install --omit dev

# --------------> PRODUCTION IMAGE
FROM node:18.17.1-alpine3.18

ENV NODE_ENV ${NODE_ENV}

RUN addgroup --system app
RUN adduser --system app --ingroup app
USER app

WORKDIR /app
COPY --chown=app:app --from=ts-remover /app/build /app/build
COPY --chown=app:app --from=ts-remover /app/node_modules /app/build/node_modules

EXPOSE ${AUTH_PORT}
CMD ["node", "build/index.js"]
