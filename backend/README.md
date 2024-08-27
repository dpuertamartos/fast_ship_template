# .env requirements (ONLY use .env for development, not in docker container)

DB_TYPE='mongodb'  # 'mongodb' or 'postgres' to switch databases
MONGODB_URI = 'mongodb://localhost:27017/notes'
DEV_MONGODB_URI = 'mongodb://localhost:27017/notes'
TEST_MONGODB_URI = 'mongodb://localhost:27017/notes'
POSTGRES_URI='postgres://myuser:mypassword@localhost:5432/notes'
DEV_POSTGRES_URI='postgres://myuser:mypassword@localhost:5432/notes'
TEST_POSTGRES_URI='postgres://myuser:mypassword@localhost:5432/notes'
PORT = 3001
SECRET = 'string-used-for-auth'

# docker

docker build -t template-backend .
docker run -p 3001:3001 --name template-backend-container template-backend
