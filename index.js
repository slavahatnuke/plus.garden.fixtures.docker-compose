module.exports = function (Garden) {
    Garden.load({dir: __dirname + '/config'});
};

module.exports.$inject = ['Garden'];
module.exports.$tags = ['garden.js', 'module'];
