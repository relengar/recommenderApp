## Prerequisites

[Node.js](https://nodejs.org/) \n
[postgreSQL](https://www.postgresql.org/) \n
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
