/* eslint-disable no-undef */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        "@vue/typescript/recommended",
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        'arrow-body-style': ["error", "as-needed"],
        'no-multiple-empty-lines': 'error',
        'semi': 'error',
        'semi-style': 'error',
    }
}