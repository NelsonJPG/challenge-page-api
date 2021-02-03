
# Challenge Page
API for create pages by name of person

| Name | Versión |
| ---------- | ---------- |
| NodeJS   | v10.16.3   |
| Mongodb |  v4.2.7 |
| Express   | v4.16.1   |
| NPM   | v6.9.0   |
| YARN   | v1.10.1   |
| Mongoose | v5.10.8 |

## Systems Requeriments
- NodeJS >= v10.16.3
- ExpressJS >= v4.16.1
- MongoDB >= v4.2.7
- YARN >= v1.22.4
- NPM >= v6.9.0


## Skeleton del Proyecto 
```
build/ => folder deploy was created by command `npm run build` or `yarn build` (this contain basic minimize app)
services/ =>  (AWS, Validations, Third Party Apps)
repositories/ => Pattern Repository (Abstract Model Functionality)
models/ => folder models (entities and business logic).
helpers/ => code reutilizable.
controllers/ => folder controllers (logic app).
routes/ => folder route.
    |- v1/ => versioning.
.env => config app.
database.js => config DB by enviroments.
package.json => package devs and prods applications.
```

## Config
1. Connect database with permission admin `mongo` o `mongo -u MY_USER_ADMIN -pMY_PASSWORD`.
2. Create Database
```
use name_of_database
```
3. Create user and password role database.
```
db.createUser({ user: "my_user", pwd: "my_pass", roles: [ { role: "readWrite", db: "my_database" }]})
```
4. Rename file `env-example` to `.env` or create file `.env`.
5. set enviroment `.env`.
```
APP_NAME=My APP
PORT=My_PORT
DB_HOST=MY_HOST
DB_PORT=MY_PORT_DB
DB_NAME= MY_DB_NAME
DB_USER= MY_USER_DB
DB_PASS=MY_PASS_DB
```
6. Install all Package `yarn` or `npm`.
- Install with NPM
```
    npm install
```
- Install with YARN
```
yarn install
```

## Deploy
### Dev
- **NPM**
```
npm run dev
```
- **YARN**
```
yarn run dev
```

### Prod
1. execute run build app.
- **NPM**
```
npm run build
```
- **YARN**
```
yarn build
```

2. start application.
- **NPM**
```
npm start
```
- **YARN**
```
yarn start
```