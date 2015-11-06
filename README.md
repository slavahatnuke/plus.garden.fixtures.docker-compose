# Plus Garden docker fixtures provider

## Requirements
- `docker`
- `docker-compose`

## Installation
- `npm install plus.garden.fixtures.docker-compose --save`
- add module to your `container.js` garden project

**[your-folder]/container.js**

```javascript
module.exports = function (container) {
    container.register('DockerComposeFixturesModule', require('plus.garden.fixtures.docker-compose'));
}
```