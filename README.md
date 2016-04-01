# Plus Garden docker fixtures provider
In simple words it re-creates docker box with fresh services.
Main idea of this to integrate [plus.garden](https://www.npmjs.com/package/plus.garden) to exist project with big data sets. Sometimes it is pretty complex to build fixtures for exists project. docker-compose fixtures can help here.


## Requirements
- `plus.garden` [plus.garden](https://www.npmjs.com/package/plus.garden)
- `docker` [https://www.docker.com/](https://www.docker.com/)
- `docker-compose` [https://docs.docker.com/compose/](https://docs.docker.com/compose/)

## Installation
- `npm install plus.garden.fixtures.docker-compose --save`
- add module to your `container.js` garden project

**[your-folder]/container.js**

```javascript
module.exports = function (container) {
    container.register('DockerComposeFixturesModule', require('plus.garden.fixtures.docker-compose'));
}
```

- add configuration to your

**[your folder]/config.json**
```json
{
  "fixtures-docker-compose": {
    "compose": "fixtures/docker-compose/docker-compose.yml",
    "autoSudo": true,
    "sudo": false
  }
}
```


fixtures looks like this, this is example with fresh mongodb:

**fixtures/docker-compose**
floder has 2 files:
- `docker-compose.yml`
- `Dockerfile`

**fixtures/docker-compose/docker-compose.yml**
```
fixtures:
  build: ./
  command: "mongod --smallfiles"
  ports:
    - "17017:27017" #host:service
```
it publishes port for fresh version of mongodb on your host


**fixtures/docker-compose/Dockerfile**
```
FROM ubuntu:precise

RUN mkdir /project
WORKDIR /project

# common
RUN apt-get update
RUN apt-get install -y build-essential python-software-properties git

#mongo
RUN apt-get install -y mongodb
RUN mkdir -p /data/db/

RUN echo "version 0.0.3"
ADD ./dump /dump

RUN (mongod --smallfiles &) && sleep 15 && cd / && mongorestore
```
Dockerfile builds your image with services.

This integrated with [plus.garden](https://www.npmjs.com/package/plus.garden) to have fresh fixtures/datasets of your DB or other services.

When you use garden CLI
```
./garden.js fixtures.load
./garden.js fixtures.drop
```
it drops or creates docker container(s) to support your app with fresh datasets and services.
take a look [plus.garden bdd framework](https://www.npmjs.com/package/plus.garden) for more details.

if you need debug loading fixtures just add flag `--debug` like:
`./garden.js fixtures.load --debug` it should print additional info about process.

Have a fun!



