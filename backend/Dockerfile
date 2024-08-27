FROM node:18

WORKDIR /usr/src/app

COPY --chown=node:node . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm ci --only=production --maxsockets 1

# npm start is the command to start the application in development mode
USER node

# Set environment variable for NODE_ENV, default to 'production' if not set
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

CMD ["sh", "-c", "npm start"]