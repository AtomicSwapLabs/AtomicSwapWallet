# Use an official Node.js runtime as a parent image
FROM node:16 as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package*.json ./

COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Bundle app source
COPY . .

# Build the Electron app
RUN yarn electron:build

CMD ["sleep", "infinity"]
