const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
    alias({
        '@utils': 'src/utils',
    })(config)

    return config
}
