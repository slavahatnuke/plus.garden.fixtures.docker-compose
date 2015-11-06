var DockerComposeFixtureLoader = function (Garden, config, logger) {

    var wait = Garden.wait;
    var which = require('which');
    var child_process = require('child_process');
    var spawn = child_process.spawn;

    var fixturesConfig = config.get('fixtures-docker-compose');

    function isSudo(next) {
        which('sudo', function (err, path) {
            next(null, !!path);
        });
    }

    function run(args, next) {
        var command = args.shift();
        var processing = true;

        function done() {
            processing && next();
            processing = false;
        }

        var child = spawn(command, args, {
            detached: true,
            stdio: 'pipe'
        });

        child.stdout.on('data', function (data) {
            logger.info('  ' + data.toString());
            done();
        });

        child.stderr.on('data', function (data) {
            logger.info('  ' + data.toString());
            done();
        });

        child.on('close', function (code) {
            if (code !== 0) {
                logger.error('something went wrong, exit code: ', code);
                logger.error('command: ' + command + ' ' + args.join(' '));
            }
            done();
        });
    }

    function getBaseArgs() {
        var args = [];

        if (fixturesConfig.autoSudo && wait.for(isSudo)) {
            args.push('sudo')
        }

        if (fixturesConfig.sudo) {
            args.push('sudo')
        }

        args.push('docker-compose');
        args.push('--file');
        args.push(fixturesConfig.compose);
        return args;
    }

    this.load = function () {

        var args = getBaseArgs();
        args.push('up');

        logger.info('Loading docker compose fixtures');

        wait.for(run, args);
        logger.info('done');

    };

    this.drop = function () {
        logger.info('Dropping docker compose fixtures');
        var args = getBaseArgs();
        args.push('kill');
        wait.for(run, args);
        logger.info('done');
    };

};

module.exports = DockerComposeFixtureLoader;

module.exports.$inject = ['Garden', 'config', 'Logger'];
module.exports.$tags = ['garden.js', 'fixtures', 'loader'];