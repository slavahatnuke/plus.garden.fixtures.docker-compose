module.exports = function (container) {

    container.register('DockerComposeFixtureLoader', require('../services/DockerComposeFixtureLoader'));
    container.register('DockerComposeFixture', require('../services/DockerComposeFixture'));
};