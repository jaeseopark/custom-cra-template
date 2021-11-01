FROM node:14-alpine

WORKDIR /app

COPY package.json ./
RUN yarn

COPY src/ ./src/
COPY public/ ./public/
COPY tsconfig.json .

RUN yarn build --production && yarn global add serve
RUN rm -rf src public

CMD ["serve", "-s", "build"]
