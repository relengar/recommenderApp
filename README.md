## Prerequisites

[Node.js](https://nodejs.org/)
[postgreSQL](https://www.postgresql.org/)
[npm](https://www.npmjs.com/)

## run

start and setup postgreDb
update the `/db/config/config.json` file accordingly

run following commands:
```
$ npm install
$ sequelize db:migrate
$ sequelize db:seed:all
$ npm start
```

open your browser on url `http://localhost:8080/#!/`
