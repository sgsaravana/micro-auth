# micro-auth
NodeJS Microservice based on JWT for managing Authentication.
Register with email, verify account, forgot reset / password, login and authenticate via JWT token

Supports multiple Databases: MySQL & Mongo

## Tests
#### Start docker containers to run MySQL & MongoDB
* Start containers
`docker-compose -f tests/docker-images/docker-compose.yml up -d`
* Execute tests
`npm run test`
* Stop containers
`docker-compose -f tests/docker-images/docker-compose.yml stop`


*Still under development...
Working with e-to-e tests

API

POST /register

POST /user/:id

POST /activate

POST /forgot

POST /reset

POST /login
