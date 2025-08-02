FROM node:20.13.1-alpine

# Accept GitHub PAT as a build argument
ARG GITHUB_TOKEN

# Create app directory
WORKDIR /usr/src/app

# # Configure npm to use GitHub Packages
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose application port
EXPOSE 3200

# Start the app
CMD ["npm", "start"]