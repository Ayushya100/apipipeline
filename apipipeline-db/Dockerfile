FROM node:20.13.1-alpine

# Accept GitHub PAT as a build argument
ARG GITHUB_TOKEN

# Create app directory
WORKDIR /usr/src/app

# Configure npm to use GitHub Packages
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc

# Copy package
COPY package.json package-lock.json ./
RUN npm install

# Copy db source code
COPY . .

# Run migration + seed on container start
CMD ["npm", "run", "reset-db"]