FROM node:14-alpine

WORKDIR /app

COPY package.json ./
RUN yarn

COPY src/ ./src/
COPY public/ ./public/
COPY tsconfig.json .
COPY create-env-file.sh ./create-env-file.sh

RUN dos2unix ./create-env-file.sh

ARG REACT_APP_IMF_HOST
ARG REACT_APP_IMF_PORT

RUN sh ./create-env-file.sh \
    REACT_APP_IMF_HOST=$REACT_APP_IMF_HOST \
    REACT_APP_IMF_PORT=$REACT_APP_IMF_PORT

RUN yarn build --production && yarn global add serve

CMD ["serve", "-s", "build"]
