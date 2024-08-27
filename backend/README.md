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

# running postgres locally

`docker run --name my_postgres_db -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -v /path/to/local/directory:/var/lib/postgresql/data -d postgres`

run backend with

`npm run dev` to use `DEV_POSTGRES_URI` env variable