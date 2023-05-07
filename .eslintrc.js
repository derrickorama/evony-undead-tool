/* eslint-disable no-undef */

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    'ignorePatterns': ['dist/*'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        'parser': '@typescript-eslint/parser',
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        'arrow-body-style': ['error', 'as-needed'],
        'vue/max-attributes-per-line': ['off'],
        'no-multiple-empty-lines': 'error',
        'semi': 'error',
        'semi-style': 'error',
    }
};