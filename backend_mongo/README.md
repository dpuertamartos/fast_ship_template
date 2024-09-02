# .env requirements (ONLY use .env for development, not in docker container)

MONGODB_URI = 'mongodb://localhost:27017/notes'
DEV_MONGODB_URI = 'mongodb://localhost:27017/notes'
PORT = 3001
SECRET = 'string-used-for-auth'
ADMIN_EMAIL = 'admin@admin.com'        
ADMIN_PASSWORD = 'admin'      

# docker

docker build -t template-backend .
docker run -p 3001:3001 --name template-backend-container template-backend

# running mongodb locally

`docker run --name mongodb -d -p 27017:27017 mongo:6.0.4-focal`

run backend with

`npm run dev` to use `DEV_MONGODB_URI` env variable