var DockerComposeFixture = function (config, Garden, logger) {

    var fixturesConfig = config.get('fixtures-docker-compose');
    var which = require('which');
    var child_process = require('child_process');
    var exec = child_process.exec;
    var wait = Garden.wait;
    var path = require('path');

    var workDir = path.dirname(fixturesConfig.compose);
    var composeFile = path.basename(fixturesConfig.compose);

    function isSudo(next) {
        which('sudo', function (err, path) {
            next(null, !!path);
        });
    }

    function run(args, next) {

        var command = args.join(' ');
        logger.debug(command);

        var child = exec(command, {
            cwd: workDir,
            maxBuffer: 1024 * 1024 * 1024
        }, function (error, stdout, stderr) {
            if (error) {
                logger.error(error);
                logger.error('command: ' + command);
                next(error);
            } else {
                next();
            }

        });

        child.stdout.on('data', function (data) {
            logger.debug(data.toString());
        });

        child.stderr.on('data', function (data) {
            logger.debug(data.toString());
        });
    }

    function getBaseArgs(next) {
        var args = [];

        isSudo(function (err, hasSudo) {

            if (fixturesConfig.autoSudo && hasSudo) {
                args.push('sudo')
            }

            if (fixturesConfig.sudo) {
                args.push('sudo')
            }

            args.push('docker-compose');
            args.push('--file');
            args.push(composeFile);

            return next(null, args);
        });
    }

    this.up = function (next) {
        getBaseArgs(function (err, args) {
            args.push('up');
            args.push('-d');
            run(args, next);
        });
    };

    this.kill = function (next) {
        getBaseArgs(function (err, args) {
            args.push('kill');
            run(args, next);
        });
    };

    this.build = function (next) {
        getBaseArgs(function (err, args) {
            args.push('build');
            run(args, next);
        });
    }

    this.ps = function (next) {
        getBaseArgs(function (err, args) {
            args.push('ps');
            run(args, next);
        });
    }
};

DockerComposeFixture.$inject = ['config', 'Garden', 'Logger'];
module.exports = DockerComposeFixture;