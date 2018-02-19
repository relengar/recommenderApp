## Prerequisites

[Node.js](https://nodejs.org/)
[postgreSQL](https://www.postgresql.org/)
[npm](https://www.npmjs.com/)

## run

start and setup postgreDB
create and update the `./config.json` file accordingly

```
{
  "development": {
    "app": {
      "port": "8080",
    },
    "db": {
      "username": "insert_db_username",
      "password": "insert_db_password",
      "database": "insert_db_name",
      "host": "127.0.0.1",
      "port": "5432",
      "dialect": "postgres"
    }
  }
```
run following commands:
```
$ npm install
$ sequelize db:migrate
$ sequelize db:seed:all
$ npm start
```

open your browser on url `http://localhost:8080/`
