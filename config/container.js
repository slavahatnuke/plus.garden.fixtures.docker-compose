module.exports = function (container) {
    container.register('DockerComposeFixtureLoader', require('../services/DockerComposeFixtureLoader'));
};