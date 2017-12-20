FROM nginx:1.13.7-alpine

WORKDIR /usr/share/nginx/html

COPY ./build ./
