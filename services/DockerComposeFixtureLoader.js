var DockerComposeFixtureLoader = function (Garden, config, logger) {

    var wait = Garden.wait;



    this.load = function () {
        console.log('> load with config', config.get('fixtures-docker-compose'));
        logger.info('Loading fixtures docker compose fixtures');
    };

    this.drop = function () {
        console.log('> drop with config', config.get('fixtures-docker-compose'));
        logger.info('Dropping docker compose fixtures');
        logger.info('success');
    };

};

module.exports = DockerComposeFixtureLoader;

module.exports.$inject = ['Garden', 'config', 'Logger'];
module.exports.$tags = ['garden.js', 'fixtures', 'loader'];