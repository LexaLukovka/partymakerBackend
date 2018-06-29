module.exports = {
    'globals': {
        'use': true,
    },
    'extends': 'eslint-config-airbnb',
    'parser': 'babel-eslint',
    'rules': {
        'no-trailing-spaces': 0,
        'max-len': [2, 120],
        'linebreak-style': 0,
        'no-extra-semi': 2,
        'arrow-parens': 0,
        'padded-blocks': 0,
        'no-param-reassign': ['error', {'props': false}],
        'semi': [2, 'never'],
        'class-methods-use-this': 0,
        'object-curly-newline': 0,
        'no-unused-vars': 0,
        'comma-dangle': 0,
        'strict': 0,
        'no-plusplus': 0,
    },
    'settings': {
        'import/resolver': {
            'babel-module': {}
        }
    },
    'env': {
        'jasmine': true,
        'jest': true,
        'browser': true,
        'node': true
    }
};