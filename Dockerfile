FROM node:latest AS node
WORKDIR /app
COPY package.json /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/mycloud-ui /usr/share/nginx/html

EXPOSE 80

