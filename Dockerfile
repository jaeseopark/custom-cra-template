# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /tmp/install

# add `/tmp/install/node_modules/.bin` to $PATH
ENV PATH /tmp/install/node_modules/.bin:$PATH
RUN yarn global add serve

# install app dependencies
COPY package*.json ./
RUN yarn install

# build app
COPY . ./
RUN yarn build

# move build artifact to the permanent app location
WORKDIR /app
RUN mv /tmp/install/build/* .
RUN mv /tmp/install/entrypoint.sh .

# remove temporary files
RUN rm -rf /tmp/install

ENTRYPOINT [ "./entrypoint.sh" ]
