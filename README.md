<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  
<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
<p align="center"></p>

## Description

Simple CRUD with this powerfull typescript framework, [NEST](https://docs.nestjs.com/).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker Config

```bash
# Create an Oracle container
$ docker run --rm -it -d --shm-size=1g -p 8080:8080 -p 1521:1521 --name oracle-xe -v /local-initdb:/etc/entrypoint-initdb.d andersjanmyr/oracle-12c-extended:latest

# Get container ID
$ docker ps

# Execute docker container
$ docker exec -it <container_ID> bash -c "source /home/oracle/.bashrc; sqlplus /nolog"

# Connect to your Oracle DB and create a new User
$ connect sys as sysdba;
-- Here enter the password as 'oracle'
$ alter session set "_ORACLE_SCRIPT"=true;
$ create user admin identified by admin;
$ GRANT ALL PRIVILEGES TO admin;
```

## Endpoint 
```
# To consume the API
http://localhost:3000/tasks
http://localhost:3000/password/create
http://localhost:3000/password/validate

# To see the API documentation
http://localhost:3000/api
```
