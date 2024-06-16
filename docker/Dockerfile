FROM node:lts-alpine as dev
RUN npm install -g @quasar/cli
# expecting . to be mounted to /app
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./

RUN --mount=type=cache,target=/app/.npmcache \
    npm install --cache /app/.npmcache --loglevel error

# RUN npm install
# ENTRYPOINT tail -f /dev/null
ENTRYPOINT npm run dev -- --port 80

FROM node:lts-alpine as build
RUN npm i -g @quasar/cli
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
RUN chown -R node /usr/src/app
USER node
# ENV NODE_ENV=production
ENV VITE_API_HOST=
RUN npm run build:debug

FROM nginx:stable-alpine as production
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/spa /usr/share/nginx/html
