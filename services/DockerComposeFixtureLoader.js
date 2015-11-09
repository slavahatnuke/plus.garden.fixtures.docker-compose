var DockerComposeFixtureLoader = function (Garden, config, logger, DockerComposeFixture) {

    var wait = Garden.wait;

    this.load = function () {

        logger.info('Loading docker compose fixtures');
        logger.debug(' > build container(s)');
        wait.forMethod(DockerComposeFixture, 'build');

        logger.debug(' > up container(s)');
        wait.forMethod(DockerComposeFixture, 'up');

        logger.info('done');
    };

    this.drop = function () {

        logger.info('Dropping docker compose fixtures');
        logger.debug(' > kill container(s)');
        wait.forMethod(DockerComposeFixture, 'kill');

        logger.info('done');
    };

};

module.exports = DockerComposeFixtureLoader;

module.exports.$inject = ['Garden', 'config', 'Logger', 'DockerComposeFixture'];
module.exports.$tags = ['garden.js', 'fixtures', 'loader'];