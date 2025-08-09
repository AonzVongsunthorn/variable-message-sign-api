# variable-message-sign-api
This API is to upload the image with ediable base on `nestjs`.

## Prerequitsite
- nodejs version >= v16.18.0
- mysql version 8
## Run
| env           | command                                                      |
|---------------|--------------------------------------------------------------|
| dev           | npm run start:dev                                            |
| prod          | npm run build & npm run start:prod                           |
| prod with pm2 | npm run build & pm2 start dist/src/main.js --name "imps-api" |

## Migration
| command                   | detail                         |
|---------------------------|--------------------------------|
| npm run migrate:up        | To create the table            |
| npm run migrate:down      | To drop the table              |
| npm run migrate:refresh   | To drop and recreate the table |
| npm run seed:run          | To generate the data           |
| npm run seed:refresh      | To reset and generate all data |


## Technical
|                    | Tool    |
|--------------------|---------|
| ORM                | typeorm |
| Migration & Seeder | typeorm |
| Time               | day.js  |
| Authentication     | JWT     |
| HTTP manager       | axios   |
| bundle tools       | webpack |

## .env Configuration
This project has many configuration which be setted through `env` command line (`process.env`) and `dotenv` (can set variable in `.env` file).

**App**

|Configuration|Required| type   | Default value | Description                                                   |
|-------------|--------|--------|---------------|---------------------------------------------------------------|
|APP_NAME|Yes| string | imps-backend  | Application name which be displayed when call route url (`/`) |
|PORT|Yes| 8080   | number        | Port which application be run                                 |
|CORS|Yes| http://localhost:3000  | string        | The url of front-end that we allow to connect with our API    |
|NODE_ENV|Yes| development  | string        | To define the runtime of nodejs environment                   |

**Database**

|Configuration|Required|type|Default value|Description|
|-------------|--------|----|-------------|-----------|
|DB_TYPE|Yes|string||Dialect of database which use in the system like `mssql`, `mysql`, etc.|
|DB_HOST|Yes|string||URL of database which use in the system|
|DB_PORT|Yes|number||Port of database which use in the system|
|DB_USERNAME|Yes|string||Username of database which use in the system|
|DB_PASSWORD|Yes|string||Password of database which use in the system|
|DB_DATABASE|Yes|string||Name of database which use in the system|
|DB_LOGGING|No|boolean|false|If true, log is shown on console|
**JTW**

|Configuration|Required| type   | Default value | Description                            |
|-------------|--------|--------|---------------|----------------------------------------|
|JWT_SECRET_KEY|Yes| string | dev           | The secret key for JWT token encryption |
|JWT_EXPIRES|Yes| string | JWT_EXPIRES           | The token expiration time              |

