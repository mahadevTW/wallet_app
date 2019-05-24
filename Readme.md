Wallet App:

1. UI is built in React reflux
2. API is built in Go lang
3. Database is Mysql with gorm as ORM.
4. Assets are served from Nginx , see Dockerfile of wallet_ui
4. Nginx as web server

All services has been dockerized and orchestrated usig docker-compose.

### To run App
```
docker-compose build --no-cache
docker-compose up
```
Nginx container tries to mount port 80 to host machine. make sure its available to use.