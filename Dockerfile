FROM node:14-alpine

WORKDIR /tmp/install
RUN yarn global add serve
COPY package*.json ./
RUN yarn install

# build app
COPY . ./
RUN yarn build

# convert dos newline characters to unix
RUN dos2unix entrypoint.sh

# move build artifact to the permanent app location
WORKDIR /app
RUN mv /tmp/install/build/*
RUN mv /tmp/install/entrypoint.sh .

# remove temporary files
RUN rm -rf /tmp/install

CMD ./entrypoint.sh
