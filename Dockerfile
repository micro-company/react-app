FROM node:8-alpine as builder

ENV NODE_ENV production

# Configuration
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL ${REACT_APP_API_URL:-http://localhost:4070}
ARG REACT_APP_GOOGLE_RECAPTCHA_SITEKEY
ENV REACT_APP_GOOGLE_RECAPTCHA_SITEKEY ${REACT_APP_GOOGLE_RECAPTCHA_SITEKEY:-secretKey}

# Build project
WORKDIR /src
COPY ./ ./
RUN npm i --ignore-scripts
RUN npm run build

FROM nginx:1.13.7-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /src/build ./
