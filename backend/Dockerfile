FROM node:18

WORKDIR /usr/src/app

COPY --chown=node:node . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm ci --only=production --maxsockets 1

# npm start is the command to start the application in development mode
USER node
CMD ["sh", "-c", "npm start"]