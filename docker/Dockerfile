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

FROM nginx:stable-alpine
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/spa /usr/share/nginx/html
